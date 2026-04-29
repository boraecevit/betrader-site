"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, BookOpen, Brain, LayoutDashboard, LogOut, User } from "lucide-react";

const nav = [
  { href: "/dashboard", label: "Genel Bakış", icon: LayoutDashboard },
  { href: "/dashboard/algo", label: "BETrader ALGO & V6", icon: Activity },
  { href: "/dashboard/library", label: "Strateji Kütüphanesi", icon: BookOpen },
  { href: "/dashboard/discipline", label: "Psikolojik Yönetim", icon: Brain }
];

type SidebarProps = {
  fullName: string | null;
  email: string | null;
};

function getDisplayName(fullName: string | null, email: string | null) {
  if (fullName && fullName.trim()) return fullName.trim();
  if (email) return email.split("@")[0] || "VIP Üye";
  return "VIP Üye";
}

export function Sidebar({ fullName, email }: SidebarProps) {
  const pathname = usePathname();
  const displayName = getDisplayName(fullName, email);
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <p className="sidebar-brand-main">BETRADER</p>
        <p className="sidebar-brand-sub">OPERASYON TERMİNALİ</p>
      </div>

      <nav className="sidebar-nav">
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className={`nav-item ${pathname === item.href ? "active" : ""}`}>
            <item.icon size={16} strokeWidth={1.6} aria-hidden="true" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user-panel">
          <div className="sidebar-user-icon">
            <User size={14} strokeWidth={1.7} aria-hidden="true" />
          </div>
          <div>
            <p className="sidebar-user-label">AUTHENTICATED OPERATOR</p>
            <p className="sidebar-user-name">{displayName}</p>
            {email && <p className="sidebar-user-email">{email}</p>}
          </div>
        </div>
        <form action="/auth/logout" method="post">
          <button type="submit" className="sidebar-logout">
            <LogOut size={14} strokeWidth={1.7} aria-hidden="true" />
            <span>Oturumu Kapat</span>
          </button>
        </form>
        <p className="sidebar-version">VERSION 2.0.4 | ENCRYPTED</p>
      </div>
    </aside>
  );
}
