<?php
/**
 * Plugin Name: BoraEcevit Membership Platform
 * Description: Membership, content library and TradingView resource management for boraecevit.com.
 * Version: 1.0.0
 * Author: BoraEcevit
 */

if (!defined('ABSPATH')) {
    exit;
}

class BoraEcevit_Membership_Platform
{
    public function __construct()
    {
        add_action('init', [$this, 'register_member_role']);
        add_action('init', [$this, 'register_content_types']);
        add_action('init', [$this, 'register_shortcodes']);
        add_action('init', [$this, 'handle_register_form']);
        add_filter('authenticate', [$this, 'block_pending_member_login'], 30, 3);
        add_filter('user_row_actions', [$this, 'add_user_approval_actions'], 10, 2);
        add_action('admin_init', [$this, 'handle_user_approval_actions']);
        add_action('add_meta_boxes', [$this, 'register_meta_boxes']);
        add_action('save_post', [$this, 'save_content_meta']);
        add_action('template_redirect', [$this, 'protect_member_content']);
    }

    public static function activate()
    {
        $instance = new self();
        $instance->register_member_role();
        $instance->register_content_types();
        $instance->create_core_pages();
        flush_rewrite_rules();
    }

    public static function deactivate()
    {
        flush_rewrite_rules();
    }

    public function register_member_role()
    {
        if (!get_role('member')) {
            add_role('member', 'Member', ['read' => true]);
        }
        if (!get_role('pending_member')) {
            add_role('pending_member', 'Pending Member', ['read' => true]);
        }
    }

    public function register_content_types()
    {
        // Post type key max 20 chars in WordPress.
        register_post_type('analysis_item', [
            'labels' => [
                'name' => 'Analiz Sunumlari',
                'singular_name' => 'Analiz Sunumu',
            ],
            'public' => true,
            'show_in_rest' => true,
            'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
            'has_archive' => true,
            'menu_icon' => 'dashicons-media-document',
            'rewrite' => ['slug' => 'analiz-sunumlari'],
        ]);

        register_post_type('tradingview_strategy', [
            'labels' => [
                'name' => 'TradingView Stratejileri',
                'singular_name' => 'TradingView Stratejisi',
            ],
            'public' => true,
            'show_in_rest' => true,
            'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
            'has_archive' => true,
            'menu_icon' => 'dashicons-chart-line',
            'rewrite' => ['slug' => 'tradingview-stratejileri'],
        ]);
    }

    public function register_shortcodes()
    {
        add_shortcode('bep_register_form', [$this, 'render_register_form']);
        add_shortcode('bep_login_form', [$this, 'render_login_form']);
        add_shortcode('bep_member_dashboard', [$this, 'render_member_dashboard']);
        add_shortcode('bep_content_library', [$this, 'render_content_library']);
    }

    public function handle_register_form()
    {
        if (!isset($_POST['bep_register_submit'])) {
            return;
        }

        if (!isset($_POST['bep_register_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['bep_register_nonce'])), 'bep_register_action')) {
            return;
        }

        $name = isset($_POST['bep_name']) ? sanitize_text_field(wp_unslash($_POST['bep_name'])) : '';
        $email = isset($_POST['bep_email']) ? sanitize_email(wp_unslash($_POST['bep_email'])) : '';
        $password = isset($_POST['bep_password']) ? wp_unslash($_POST['bep_password']) : '';

        if (empty($name) || empty($email) || empty($password)) {
            set_transient('bep_register_error', 'Tum alanlari doldurmaniz gerekir.', 30);
            return;
        }

        if (email_exists($email)) {
            set_transient('bep_register_error', 'Bu e-posta zaten kayitli.', 30);
            return;
        }

        $username = sanitize_user(current(explode('@', $email)), true);
        if (username_exists($username)) {
            $username = $username . wp_generate_password(4, false, false);
        }

        $user_id = wp_create_user($username, $password, $email);
        if (is_wp_error($user_id)) {
            set_transient('bep_register_error', 'Kayit olusturulamadi. Lutfen tekrar deneyin.', 30);
            return;
        }

        wp_update_user([
            'ID' => $user_id,
            'display_name' => $name,
            'first_name' => $name,
            'role' => 'pending_member',
        ]);

        set_transient('bep_register_success', 'Kayit alindi. Hesabiniz admin onayindan sonra aktif olacaktir.', 30);
        wp_safe_redirect(add_query_arg('registered', '1', wp_get_referer()));
        exit;
    }

    public function block_pending_member_login($user, $username, $password)
    {
        if (empty($username) || empty($password)) {
            return $user;
        }

        if ($user instanceof WP_Error) {
            return $user;
        }

        if (!$user instanceof WP_User) {
            $lookup = get_user_by('login', $username);
            if (!$lookup && is_email($username)) {
                $lookup = get_user_by('email', $username);
            }
            $user = $lookup;
        }

        if (!$user instanceof WP_User) {
            return $user;
        }

        if (in_array('pending_member', (array) $user->roles, true)) {
            return new WP_Error(
                'bep_pending_approval',
                'Hesabiniz henuz onaylanmadi. Admin onayi sonrasi giris yapabilirsiniz.'
            );
        }

        return $user;
    }

    public function add_user_approval_actions($actions, $user)
    {
        if (!current_user_can('promote_users')) {
            return $actions;
        }

        if (in_array('pending_member', (array) $user->roles, true)) {
            $approve_url = wp_nonce_url(
                add_query_arg([
                    'bep_action' => 'approve_member',
                    'user_id' => $user->ID,
                ], admin_url('users.php')),
                'bep_approve_member_' . $user->ID
            );
            $actions['bep_approve_member'] = '<a href="' . esc_url($approve_url) . '">Uyeyi Onayla</a>';
        }

        if (in_array('member', (array) $user->roles, true)) {
            $revoke_url = wp_nonce_url(
                add_query_arg([
                    'bep_action' => 'revoke_member',
                    'user_id' => $user->ID,
                ], admin_url('users.php')),
                'bep_revoke_member_' . $user->ID
            );
            $actions['bep_revoke_member'] = '<a href="' . esc_url($revoke_url) . '">Onayi Kaldir</a>';
        }

        return $actions;
    }

    public function handle_user_approval_actions()
    {
        if (!is_admin() || !current_user_can('promote_users') || !isset($_GET['bep_action'], $_GET['user_id'])) {
            return;
        }

        $action = sanitize_text_field(wp_unslash($_GET['bep_action']));
        $user_id = absint($_GET['user_id']);

        if ($user_id < 1) {
            return;
        }

        if ($action === 'approve_member') {
            check_admin_referer('bep_approve_member_' . $user_id);
            $user = get_user_by('id', $user_id);
            if ($user && in_array('pending_member', (array) $user->roles, true)) {
                $user->set_role('member');
            }
            wp_safe_redirect(admin_url('users.php?bep_notice=approved'));
            exit;
        }

        if ($action === 'revoke_member') {
            check_admin_referer('bep_revoke_member_' . $user_id);
            $user = get_user_by('id', $user_id);
            if ($user && in_array('member', (array) $user->roles, true)) {
                $user->set_role('pending_member');
            }
            wp_safe_redirect(admin_url('users.php?bep_notice=revoked'));
            exit;
        }
    }

    public function register_meta_boxes()
    {
        add_meta_box(
            'bep_content_meta',
            'Icerik Ayarlari',
            [$this, 'render_content_meta_box'],
            ['analysis_item', 'tradingview_strategy'],
            'normal',
            'high'
        );
    }

    public function render_content_meta_box($post)
    {
        wp_nonce_field('bep_content_meta_nonce', 'bep_content_meta_nonce');

        $pdf_url = get_post_meta($post->ID, '_bep_pdf_url', true);
        $video_url = get_post_meta($post->ID, '_bep_video_url', true);
        $tradingview_embed = get_post_meta($post->ID, '_bep_tradingview_embed', true);
        $access_level = get_post_meta($post->ID, '_bep_access_level', true);
        if (empty($access_level)) {
            $access_level = 'member';
        }
        ?>
        <p>
            <label for="bep_pdf_url"><strong>PDF URL</strong></label><br />
            <input type="url" id="bep_pdf_url" name="bep_pdf_url" value="<?php echo esc_attr($pdf_url); ?>" style="width:100%;" />
        </p>
        <p>
            <label for="bep_video_url"><strong>Video URL</strong></label><br />
            <input type="url" id="bep_video_url" name="bep_video_url" value="<?php echo esc_attr($video_url); ?>" style="width:100%;" />
        </p>
        <p>
            <label for="bep_tradingview_embed"><strong>TradingView Embed Kodu</strong></label><br />
            <textarea id="bep_tradingview_embed" name="bep_tradingview_embed" rows="6" style="width:100%;"><?php echo esc_textarea($tradingview_embed); ?></textarea>
        </p>
        <p>
            <label for="bep_access_level"><strong>Erisim Seviyesi</strong></label><br />
            <select id="bep_access_level" name="bep_access_level">
                <option value="public" <?php selected($access_level, 'public'); ?>>Public</option>
                <option value="member" <?php selected($access_level, 'member'); ?>>Member Only</option>
            </select>
        </p>
        <?php
    }

    public function save_content_meta($post_id)
    {
        if (!isset($_POST['bep_content_meta_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['bep_content_meta_nonce'])), 'bep_content_meta_nonce')) {
            return;
        }

        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        if (!current_user_can('edit_post', $post_id)) {
            return;
        }

        update_post_meta($post_id, '_bep_pdf_url', isset($_POST['bep_pdf_url']) ? esc_url_raw(wp_unslash($_POST['bep_pdf_url'])) : '');
        update_post_meta($post_id, '_bep_video_url', isset($_POST['bep_video_url']) ? esc_url_raw(wp_unslash($_POST['bep_video_url'])) : '');
        update_post_meta($post_id, '_bep_tradingview_embed', isset($_POST['bep_tradingview_embed']) ? wp_kses_post(wp_unslash($_POST['bep_tradingview_embed'])) : '');
        update_post_meta($post_id, '_bep_access_level', isset($_POST['bep_access_level']) ? sanitize_text_field(wp_unslash($_POST['bep_access_level'])) : 'member');
    }

    public function protect_member_content()
    {
        if (!is_singular(['analysis_item', 'tradingview_strategy'])) {
            return;
        }

        $access_level = get_post_meta(get_the_ID(), '_bep_access_level', true);
        if ($access_level !== 'member') {
            return;
        }

        if (is_user_logged_in()) {
            return;
        }

        wp_safe_redirect(site_url('/uye-giris'));
        exit;
    }

    public function render_register_form()
    {
        if (is_user_logged_in()) {
            return '<p>Zaten giris yaptiniz.</p>';
        }

        $error = get_transient('bep_register_error');
        $success = get_transient('bep_register_success');
        delete_transient('bep_register_error');
        delete_transient('bep_register_success');

        ob_start();
        ?>
        <?php if ($error) : ?>
            <p style="color:#a30000;"><?php echo esc_html($error); ?></p>
        <?php endif; ?>
        <?php if ($success) : ?>
            <p style="color:#087f23;"><?php echo esc_html($success); ?></p>
        <?php endif; ?>
        <form method="post">
            <?php wp_nonce_field('bep_register_action', 'bep_register_nonce'); ?>
            <p>
                <label>Ad Soyad</label><br />
                <input type="text" name="bep_name" required />
            </p>
            <p>
                <label>E-posta</label><br />
                <input type="email" name="bep_email" required />
            </p>
            <p>
                <label>Sifre</label><br />
                <input type="password" name="bep_password" required />
            </p>
            <p>
                <button type="submit" name="bep_register_submit">Kayit Ol</button>
            </p>
        </form>
        <?php
        return ob_get_clean();
    }

    public function render_login_form()
    {
        if (is_user_logged_in()) {
            return '<p>Zaten giris yaptiniz.</p>';
        }

        return wp_login_form([
            'echo' => false,
            'redirect' => site_url('/uye-dashboard'),
            'label_username' => 'E-posta veya Kullanici Adi',
            'label_password' => 'Sifre',
            'label_log_in' => 'Giris Yap',
        ]);
    }

    public function render_member_dashboard()
    {
        if (!is_user_logged_in()) {
            return '<p>Bu alani gormek icin giris yapmalisiniz.</p>';
        }

        $user = wp_get_current_user();
        ob_start();
        ?>
        <h2>Uye Dashboard</h2>
        <p>Hos geldiniz, <?php echo esc_html($user->display_name); ?>.</p>
        <ul>
            <li><a href="<?php echo esc_url(site_url('/analiz-kutuphanesi')); ?>">Analiz Kutuphanesi</a></li>
            <li><a href="<?php echo esc_url(site_url('/tradingview-kutuphanesi')); ?>">TradingView Kutuphanesi</a></li>
            <li><a href="<?php echo esc_url(wp_logout_url(site_url('/'))); ?>">Cikis Yap</a></li>
        </ul>
        <?php
        return ob_get_clean();
    }

    public function render_content_library($atts)
    {
        $atts = shortcode_atts([
            'post_type' => 'analysis_item',
            'title' => 'Icerik Kutuphanesi',
        ], $atts);

        if (!is_user_logged_in()) {
            return '<p>Bu kutuphaneyi goruntulemek icin giris yapmalisiniz.</p>';
        }

        $query = new WP_Query([
            'post_type' => $atts['post_type'],
            'post_status' => 'publish',
            'posts_per_page' => -1,
        ]);

        ob_start();
        ?>
        <h2><?php echo esc_html($atts['title']); ?></h2>
        <?php if (!$query->have_posts()) : ?>
            <p>Henuz icerik eklenmedi.</p>
        <?php else : ?>
            <ul>
                <?php while ($query->have_posts()) : $query->the_post(); ?>
                    <?php
                    $post_id = get_the_ID();
                    $pdf_url = get_post_meta($post_id, '_bep_pdf_url', true);
                    $video_url = get_post_meta($post_id, '_bep_video_url', true);
                    $tradingview_embed = get_post_meta($post_id, '_bep_tradingview_embed', true);
                    ?>
                    <li style="margin-bottom:24px;">
                        <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                        <p><?php echo esc_html(get_the_excerpt()); ?></p>
                        <?php if ($pdf_url) : ?>
                            <p><a href="<?php echo esc_url($pdf_url); ?>" target="_blank" rel="noopener noreferrer">PDF indir</a></p>
                        <?php endif; ?>
                        <?php if ($video_url) : ?>
                            <p><a href="<?php echo esc_url($video_url); ?>" target="_blank" rel="noopener noreferrer">Video izle</a></p>
                        <?php endif; ?>
                        <?php if ($tradingview_embed) : ?>
                            <div><?php echo wp_kses_post($tradingview_embed); ?></div>
                        <?php endif; ?>
                    </li>
                <?php endwhile; wp_reset_postdata(); ?>
            </ul>
        <?php endif; ?>
        <?php
        return ob_get_clean();
    }

    private function create_core_pages()
    {
        $pages = [
            'uye-kayit' => [
                'title' => 'Uye Kayit',
                'content' => '[bep_register_form]',
            ],
            'uye-giris' => [
                'title' => 'Uye Giris',
                'content' => '[bep_login_form]',
            ],
            'uye-dashboard' => [
                'title' => 'Uye Dashboard',
                'content' => '[bep_member_dashboard]',
            ],
            'analiz-kutuphanesi' => [
                'title' => 'Analiz Kutuphanesi',
                'content' => '[bep_content_library post_type="analysis_item" title="Analiz Kutuphanesi"]',
            ],
            'tradingview-kutuphanesi' => [
                'title' => 'TradingView Kutuphanesi',
                'content' => '[bep_content_library post_type="tradingview_strategy" title="TradingView Kutuphanesi"]',
            ],
        ];

        foreach ($pages as $slug => $page_data) {
            $existing = get_page_by_path($slug, OBJECT, 'page');
            if ($existing) {
                continue;
            }

            wp_insert_post([
                'post_title' => $page_data['title'],
                'post_name' => $slug,
                'post_type' => 'page',
                'post_status' => 'publish',
                'post_content' => $page_data['content'],
            ]);
        }
    }
}

register_activation_hook(__FILE__, ['BoraEcevit_Membership_Platform', 'activate']);
register_deactivation_hook(__FILE__, ['BoraEcevit_Membership_Platform', 'deactivate']);

new BoraEcevit_Membership_Platform();
