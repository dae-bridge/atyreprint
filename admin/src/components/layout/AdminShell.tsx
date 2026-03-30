"use client";

import { useState, createContext, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FolderTree,
  FileText,
  MessageSquareQuote,
  Settings,
  Home,
  HelpCircle,
  Newspaper,
  Wrench,
  Tag,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bell,
  Search,
  Menu,
} from "lucide-react";
import Image from "next/image";

// ─── Sidebar context ─────────────────────────────────────────────────────

interface SidebarContextType {
  collapsed: boolean;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
  collapsed: false,
  toggle: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

// ─── Nav items ───────────────────────────────────────────────────────────

const navSections = [
  {
    label: "Main",
    items: [
      { label: "Dashboard", href: "/", icon: LayoutDashboard },
      { label: "Orders", href: "/orders", icon: ShoppingCart, badge: true },
    ],
  },
  {
    label: "Catalog",
    items: [
      { label: "Products", href: "/products", icon: Package },
      { label: "Categories", href: "/categories", icon: FolderTree },
      { label: "Coupons", href: "/coupons", icon: Tag },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Homepage", href: "/homepage", icon: Home },
      { label: "Blog Posts", href: "/blog", icon: Newspaper },
      {
        label: "Testimonials",
        href: "/testimonials",
        icon: MessageSquareQuote,
      },
      { label: "FAQs", href: "/faqs", icon: HelpCircle },
      { label: "Services", href: "/services", icon: Wrench },
      { label: "Pages", href: "/pages", icon: FileText },
    ],
  },
  {
    label: "People",
    items: [{ label: "Customers", href: "/customers", icon: Users }],
  },
  {
    label: "System",
    items: [{ label: "Settings", href: "/settings", icon: Settings }],
  },
];

// ─── Sidebar ─────────────────────────────────────────────────────────────

const Sidebar = ({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) => {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 bottom-0 z-40 flex flex-col bg-sidebar text-sidebar-text transition-all duration-300",
        collapsed ? "w-[68px]" : "w-64",
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-white/10">
          <Image
            src="/logo.png"
            alt="AtyrePrint"
            width={32}
            height={32}
            className="w-full h-full object-contain"
          />
        </div>
        {!collapsed && (
          <div className="ml-3 overflow-hidden">
            <h1 className="text-base font-bold text-white truncate">
              AtyrePrint
            </h1>
            <p className="text-[10px] text-white/50 uppercase tracking-wider">
              Admin
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 scrollbar-none">
        {navSections.map((section) => (
          <div key={section.label} className="mb-5">
            {!collapsed && (
              <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                {section.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg text-sm font-medium transition-colors relative",
                        collapsed
                          ? "justify-center px-2 py-2.5"
                          : "px-3 py-2.5",
                        isActive
                          ? "bg-sidebar-active text-white"
                          : "text-white/70 hover:bg-sidebar-hover hover:text-white",
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <item.icon size={18} className="flex-shrink-0" />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="flex items-center justify-center h-12 border-t border-white/10 text-white/50 hover:text-white hover:bg-sidebar-hover transition-colors"
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </aside>
  );
};

// ─── Top Header ──────────────────────────────────────────────────────────

const TopHeader = ({
  collapsed,
  onMenuToggle,
}: {
  collapsed: boolean;
  onMenuToggle: () => void;
}) => {
  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-16 bg-white border-b border-border flex items-center justify-between px-6 transition-all duration-300",
        collapsed ? "left-[68px]" : "left-64",
      )}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>
        <div className="relative hidden md:block">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="text"
            placeholder="Search products, orders, customers…"
            className="pl-9 pr-4 py-2 w-80 bg-gray-50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg hover:bg-gray-100 text-text-secondary">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
        </button>
        <div className="w-px h-8 bg-border" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white text-xs font-bold">AP</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-foreground">Admin</p>
            <p className="text-[11px] text-text-muted">admin@atyreprint.com</p>
          </div>
        </div>
      </div>
    </header>
  );
};

// ─── Admin Shell ─────────────────────────────────────────────────────────

export const AdminShell = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarContext.Provider
      value={{ collapsed, toggle: () => setCollapsed(!collapsed) }}
    >
      <div className="min-h-screen bg-background">
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />
        <TopHeader
          collapsed={collapsed}
          onMenuToggle={() => setCollapsed(!collapsed)}
        />
        <main
          className={cn(
            "pt-16 min-h-screen transition-all duration-300",
            collapsed ? "ml-[68px]" : "ml-64",
          )}
        >
          <div className="p-6">{children}</div>
        </main>
      </div>
    </SidebarContext.Provider>
  );
};
