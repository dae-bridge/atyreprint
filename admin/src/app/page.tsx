export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar text-sidebar-text flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold text-white">AtyrePrint</h1>
          <p className="text-sm text-white/60">Admin Dashboard</p>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {[
              { label: "Dashboard", href: "/" },
              { label: "Products", href: "/products" },
              { label: "Orders", href: "/orders" },
              { label: "Customers", href: "/customers" },
              { label: "Categories", href: "/categories" },
              { label: "Analytics", href: "/analytics" },
              { label: "Settings", href: "/settings" },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="block px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-sidebar-hover transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-8">
          <h2 className="text-lg font-semibold">Dashboard</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-text-secondary">Admin User</span>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Total Orders", value: "0", color: "bg-primary" },
              { label: "Total Revenue", value: "£0.00", color: "bg-secondary" },
              { label: "Products", value: "0", color: "bg-info" },
              { label: "Customers", value: "0", color: "bg-success" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-surface rounded-xl p-6 border border-border"
              >
                <p className="text-sm text-text-secondary mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-surface rounded-xl border border-border p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">
              Welcome to AtyrePrint Admin
            </h3>
            <p className="text-text-secondary">
              Manage your products, orders, and customers from this dashboard.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
