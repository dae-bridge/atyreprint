"use client";

import Link from "next/link";
import { useState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { useCartStore } from "@/lib/cartStore";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Palette, 
  MapPin, 
  Settings, 
  LogOut,
  ChevronRight,
  Package,
  CreditCard,
  X
} from "lucide-react";

const MOCK_ORDERS = [
  { id: "#ORD-8492", date: "24 Mar 2026", status: "Processing", total: "£45.00", items: 2, image: "/images/products/t-shirt-1.jpg" },
  { id: "#ORD-8311", date: "15 Mar 2026", status: "Delivered", total: "£125.50", items: 5, image: "/images/products/hoodie-1.jpg" },
  { id: "#ORD-7920", date: "02 Feb 2026", status: "Delivered", total: "£22.00", items: 1, image: "/images/products/mug-1.jpg" },
  { id: "#ORD-7540", date: "12 Jan 2026", status: "Delivered", total: "£88.00", items: 3, image: "/images/products/t-shirt-2.jpg" },
];

const MOCK_DESIGNS = [
  { id: "DS-101", name: "Custom Summer Tee", product: "Premium Cotton T-Shirt", slug: "custom-printed-tshirt", date: "25 Mar 2026", image: "/images/products/t-shirt-1.jpg" },
  { id: "DS-102", name: "Team Hoodie 2026", product: "Heavyweight Hoodie", slug: "embroidered-hoodie", date: "20 Mar 2026", image: "/images/products/hoodie-1.jpg" },
  { id: "DS-103", name: "Coffee Morning Mug", product: "Ceramic Mug", slug: "personalised-mug", date: "10 Mar 2026", image: "/images/products/mug-1.jpg" },
];

const MOCK_ADDRESSES = [
  { id: 1, type: "Default Shipping", name: "John Doe", street: "123 Typography Lane", city: "London", postal: "W1 1JY", country: "United Kingdom" },
  { id: 2, type: "Billing Address", name: "John Doe", street: "456 Design Road", city: "Manchester", postal: "M1 2AB", country: "United Kingdom" },
];

const SIDEBAR_LINKS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "orders", label: "Order History", icon: ShoppingBag },
  { id: "designs", label: "Saved Designs", icon: Palette },
  { id: "address", label: "Address Book", icon: MapPin },
  { id: "settings", label: "Account Details", icon: Settings },
];

function AccountContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const activeTab = searchParams ? (searchParams.get("tab") || "dashboard") : "dashboard";

  // Address Management State
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const [deletingAddressId, setDeletingAddressId] = useState<number | null>(null);

  const handleBuyAgain = (orderId: string) => {
    // Simulate finding order items and adding them to cart
    addItem({
      productId: "1",
      slug: "custom-printed-tshirt",
      name: "Custom Printed T-Shirt",
      price: 22.50,
      image: "/images/products/t-shirt-1.jpg",
      color: "Black",
      variants: { Size: "M", Fit: "Regular" },
      quantity: 1
    });
    router.push("/cart");
  };

  const setActiveTab = (id: string, params?: Record<string, string>) => {
    if (!searchParams) return;
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("tab", id);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        newParams.set(key, value);
      });
    } else {
      // Clear other params if switching main tabs
      const keysToDelete = Array.from(newParams.keys()).filter(k => k !== "tab");
      keysToDelete.forEach(k => newParams.delete(k));
    }
    router.push(`/account?${newParams.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Navigation */}
      <div className="w-full lg:w-[280px] shrink-0">
        <nav className="flex flex-col bg-white">
          {SIDEBAR_LINKS.map((link, index) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            const isLast = index === SIDEBAR_LINKS.length - 1;
            return (
              <Link
                key={link.id}
                href={`/account?tab=${link.id}`}
                scroll={false}
                className={`flex items-center justify-between w-full p-5 transition-all relative ${
                  isActive
                    ? "bg-primary text-white font-bold z-10"
                    : "text-foreground hover:bg-surface hover:text-primary font-medium"
                } ${!isLast && !isActive && "border-b border-border/50"}`}
              >
                <div className="flex items-center gap-4">
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "text-white" : "text-text-muted"} />
                  <span className="text-[13px] font-bold uppercase tracking-widest">{link.label}</span>
                </div>
                <ChevronRight size={16} className={isActive ? "opacity-100" : "opacity-0"} />
              </Link>
            );
          })}
          
          <Link
            href="/login"
            className="flex items-center gap-4 w-full p-5 bg-white border-t border-border/50 transition-colors text-red-600 hover:bg-red-50 font-bold"
          >
            <LogOut size={18} />
            <span className="text-[13px] font-bold uppercase tracking-widest">Log Out</span>
          </Link>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 flex items-center gap-6 transition-opacity hover:opacity-95">
                <div className="w-14 h-14 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                  <Package size={28} />
                </div>
                <div>
                  <p className="text-text-muted text-[12px] font-bold uppercase tracking-widest mb-1">Total Orders</p>
                  <p className="text-3xl font-bold text-foreground">12</p>
                </div>
              </div>
              
              <div className="bg-white p-8 flex items-center gap-6 transition-opacity hover:opacity-95">
                <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Palette size={28} />
                </div>
                <div>
                  <p className="text-text-muted text-[12px] font-bold uppercase tracking-widest mb-1">Saved Designs</p>
                  <p className="text-3xl font-bold text-foreground">4</p>
                </div>
              </div>

              <div className="bg-white p-8 flex items-center gap-6 transition-opacity hover:opacity-95">
                <div className="w-14 h-14 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <CreditCard size={28} />
                </div>
                <div>
                  <p className="text-text-muted text-[12px] font-bold uppercase tracking-widest mb-1">Store Credit</p>
                  <p className="text-3xl font-bold text-foreground">£0.00</p>
                </div>
              </div>
            </div>

            {/* Call to Action Banner */}
            <div className="bg-primary text-white p-10 flex flex-col sm:flex-row items-center justify-between gap-8 transition-opacity hover:opacity-95 overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors"></div>
              <div className="relative z-10 text-center sm:text-left">
                <h3 className="text-2xl font-bold mb-3">Ready to create something new?</h3>
                <p className="text-white/80 font-medium max-w-md">Jump back into the design studio and start personalising your next standout piece.</p>
              </div>
              <Link 
                href="/personalise-it" 
                className="relative z-10 shrink-0 px-10 py-4 bg-accent text-white font-bold text-[13px] uppercase tracking-widest hover:bg-[#8ba83a] transition-all shadow-xl shadow-accent/20"
              >
                Design Now
              </Link>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white transition-opacity hover:opacity-95">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h3 className="text-lg font-bold text-foreground uppercase tracking-wide">Recent Orders</h3>
                <Link 
                  href="/account?tab=orders"
                  scroll={false}
                  className="text-[13px] font-bold text-accent hover:text-primary transition-colors underline underline-offset-4 uppercase tracking-widest"
                >
                  View All
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface">
                      <th className="py-4 px-6 text-[12px] font-bold text-text-muted uppercase tracking-wider">Order ID</th>
                      <th className="py-4 px-6 text-[12px] font-bold text-text-muted uppercase tracking-wider">Date</th>
                      <th className="py-4 px-6 text-[12px] font-bold text-text-muted uppercase tracking-wider">Items</th>
                      <th className="py-4 px-6 text-[12px] font-bold text-text-muted uppercase tracking-wider">Total</th>
                      <th className="py-4 px-6 text-[12px] font-bold text-text-muted uppercase tracking-wider">Status</th>
                      <th className="py-4 px-6 text-[12px] font-bold text-text-muted uppercase tracking-wider text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_ORDERS.map((order) => (
                      <tr key={order.id} className="border-b border-border hover:bg-surface/50 transition-colors">
                        <td className="py-4 px-6 text-[14px] font-bold text-foreground">{order.id}</td>
                        <td className="py-4 px-6 text-[14px] text-text-muted">{order.date}</td>
                        <td className="py-4 px-6 text-[14px] text-text-muted">{order.items} Items</td>
                        <td className="py-4 px-6 text-[14px] font-semibold text-foreground">{order.total}</td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-sm text-[11px] font-bold uppercase tracking-wider ${
                            order.status === "Delivered" 
                              ? "bg-green-100 text-green-700" 
                              : "bg-orange-100 text-orange-700"
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button 
                            className="text-[13px] font-bold text-primary hover:text-accent transition-colors"
                            onClick={() => alert(`Viewing details for ${order.id}...`)}
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Order History Tab */}
        {activeTab === "orders" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-foreground">Order History</h2>
              <div className="flex gap-2">
                <select className="bg-white border border-border rounded px-3 py-2 text-[14px] outline-none">
                  <option>Last 3 months</option>
                  <option>Last 6 months</option>
                  <option>2025</option>
                  <option>2024</option>
                </select>
                <select className="bg-white border border-border rounded px-3 py-2 text-[14px] outline-none">
                  <option>All Statuses</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
              </div>
            </div>
            
            <div className="grid gap-6">
              {MOCK_ORDERS.map((order) => (
                <div key={order.id} className="bg-white p-6 sm:p-10 transition-opacity hover:opacity-95">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                      <div>
                        <p className="text-[12px] font-bold text-text-muted uppercase tracking-wider mb-1">Order Placed</p>
                        <p className="text-[14px] font-medium text-foreground">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-text-muted uppercase tracking-wider mb-1">Total Amount</p>
                        <p className="text-[14px] font-medium text-foreground">{order.total}</p>
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-text-muted uppercase tracking-wider mb-1">Order #</p>
                        <p className="text-[14px] font-medium text-foreground">{order.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-sm text-[11px] font-bold uppercase tracking-wider ${
                        order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                      }`}>
                        {order.status}
                      </span>
                      <Link 
                        href={`/account?tab=order-details&id=${order.id.replace("#", "")}`}
                        scroll={false}
                        className="text-[13px] font-bold text-accent hover:text-primary transition-colors underline underline-offset-4 uppercase tracking-widest"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 py-4 border-t border-border">
                    <div className="w-16 h-16 bg-surface rounded border border-border overflow-hidden relative grayscale opacity-50">
                      <div className="absolute inset-0 flex items-center justify-center text-text-muted">
                        <Package size={24} strokeWidth={1.5} />
                      </div>
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-foreground">Order contains {order.items} items</p>
                      <p className="text-[13px] text-text-muted">Tracking #ATY-89230291</p>
                    </div>
                    <div className="ml-auto flex gap-2">
                      <Link 
                        href={`/order-tracking?orderNumber=${order.id.replace("#", "")}`}
                        className="hidden sm:block px-4 py-2 text-[12px] font-bold border border-border rounded hover:bg-surface transition-colors uppercase tracking-wider"
                      >
                        Track Order
                      </Link>
                      <button 
                        onClick={() => handleBuyAgain(order.id)}
                        className="px-4 py-2 text-[12px] font-bold bg-foreground text-white rounded hover:bg-black transition-colors uppercase tracking-wider"
                      >
                        Buy Again
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Order Details View (Sub-tab) */}
        {activeTab === "order-details" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center gap-4 border-b border-border pb-6">
              <button 
                onClick={() => setActiveTab("orders")}
                className="p-2 hover:bg-surface rounded-full transition-colors text-text-muted hover:text-primary"
              >
                <ChevronRight size={24} className="rotate-180" />
              </button>
              <div>
                <h2 className="text-xl font-bold text-foreground">Order Details</h2>
                <p className="text-[13px] text-text-muted font-medium">Order #{searchParams?.get("id") || "8492"}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Items Section */}
                <div className="bg-white p-6 sm:p-10">
                  <div className="pb-4 border-b border-border mb-6">
                    <h4 className="text-[13px] font-bold uppercase tracking-wider text-foreground">Items in your order</h4>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-surface rounded border border-border flex items-center justify-center grayscale opacity-50">
                        <Package size={32} className="text-text-muted" strokeWidth={1} />
                      </div>
                      <div className="flex-1">
                        <h5 className="text-[15px] font-bold text-foreground mb-1">Custom Printed T-Shirt</h5>
                        <p className="text-[13px] text-text-muted mb-2">Black / Medium / Front Print</p>
                        <div className="flex items-center gap-4">
                          <span className="text-[14px] font-bold text-foreground">£22.50</span>
                          <span className="text-[13px] text-text-muted">Qty: 2</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[15px] font-bold text-foreground">£45.00</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="bg-white p-6 sm:p-10">
                  <h4 className="text-[13px] font-bold uppercase tracking-wider text-foreground mb-8 pb-4 border-b border-border">Delivery Progress</h4>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20"></div>
                        <div className="w-0.5 h-12 bg-primary"></div>
                      </div>
                      <div>
                        <h6 className="text-[14px] font-bold text-foreground">Order Processed</h6>
                        <p className="text-[12px] text-text-muted">24 Mar 2026, 10:45 AM</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-border"></div>
                        <div className="w-0.5 h-12 bg-border"></div>
                      </div>
                      <div className="opacity-50">
                        <h6 className="text-[14px] font-bold text-foreground">In Production</h6>
                        <p className="text-[12px] text-text-muted">Pending</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-border"></div>
                      </div>
                      <div className="opacity-50">
                        <h6 className="text-[14px] font-bold text-foreground">Shipped</h6>
                        <p className="text-[12px] text-text-muted">Pending</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Order Summary Section */}
                <div className="bg-white p-6 sm:p-10">
                  <h4 className="text-[13px] font-bold uppercase tracking-wider text-foreground mb-6 pb-4 border-b border-border">Order Summary</h4>
                  <div className="space-y-3 pb-6 border-b border-border/50">
                    <div className="flex justify-between text-[14px] text-text-muted">
                      <span>Subtotal</span>
                      <span>£45.00</span>
                    </div>
                    <div className="flex justify-between text-[14px] text-text-muted">
                      <span>Shipping</span>
                      <span>£0.00</span>
                    </div>
                    <div className="flex justify-between text-[14px] text-text-muted">
                      <span>Tax (VAT)</span>
                      <span>£9.00</span>
                    </div>
                    <div className="flex justify-between text-[16px] font-bold text-foreground pt-4 border-t border-border">
                      <span>Total</span>
                      <span>£54.00</span>
                    </div>
                  </div>
                </div>
                {/* Shipping Info Section */}
                <div className="bg-white p-6 sm:p-10">
                  <h4 className="text-[13px] font-bold uppercase tracking-wider text-foreground mb-6 pb-4 border-b border-border">Shipping To</h4>
                  <div className="text-[14px] text-text-muted space-y-1">
                    <p className="font-bold text-foreground">John Doe</p>
                    <p>123 Typography Lane</p>
                    <p>London, W1 1JY</p>
                    <p>United Kingdom</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border">
                    <p className="text-[12px] font-bold uppercase tracking-wider text-foreground mb-2">Shipping Method</p>
                    <p className="text-[14px] text-text-muted">Standard Delivery (3-5 Business Days)</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border flex gap-4">
                    <button 
                      onClick={() => handleBuyAgain(searchParams?.get("id") || "8492")}
                      className="flex-1 py-3 bg-foreground text-white font-bold rounded uppercase tracking-widest text-[12px] hover:bg-black transition-colors"
                    >
                      Buy Again
                    </button>
                    <Link 
                      href={`/order-tracking?orderNumber=${searchParams?.get("id") || "8492"}`}
                      className="flex-1 py-3 border border-border text-foreground font-bold rounded text-center uppercase tracking-widest text-[12px] hover:bg-surface transition-colors"
                    >
                      Track Order
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Saved Designs Tab */}
        {activeTab === "designs" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Saved Designs</h2>
              <Link href="/personalise-it" className="text-[13px] font-bold text-accent hover:text-primary transition-colors underline underline-offset-4 uppercase tracking-widest">
                Create New Design
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {MOCK_DESIGNS.map((design) => (
                <div key={design.id} className="bg-white p-6 transition-opacity hover:opacity-95 group">
                  <div className="aspect-square bg-surface relative overflow-hidden flex items-center justify-center grayscale opacity-50 rounded mb-6">
                    <Palette size={48} className="text-text-muted opacity-20" strokeWidth={1} />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <Link href="/personalise-it" className="px-4 py-2 bg-white text-foreground text-[12px] font-bold rounded shadow-lg hover:bg-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
                        Edit Design
                      </Link>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-[15px] font-bold text-foreground">{design.name}</h4>
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{design.id}</span>
                    </div>
                    <p className="text-[13px] text-text-muted mb-6">{design.product}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Saved: {design.date}</span>
                      <button 
                        onClick={() => handleBuyAgain(design.id)}
                        className="text-[12px] font-bold text-primary hover:text-accent transition-colors flex items-center gap-1"
                      >
                        Order Now <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Address Book Tab */}
        {activeTab === "address" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Address Book</h2>
              <button
                onClick={() => {
                  setEditingAddress(null);
                  setShowAddressModal(true);
                }}
                className="px-6 py-2.5 bg-foreground text-white font-bold text-[12px] uppercase tracking-widest hover:bg-black transition-all shadow-lg"
              >
                Add New Address
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_ADDRESSES.map((addr) => (
                <div key={addr.id} className="bg-white p-6 sm:p-10 transition-opacity hover:opacity-95 group">
                  <div className="pb-6 border-b border-border/50 mb-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className={`px-2 py-1 rounded bg-surface border border-border text-[10px] font-bold uppercase tracking-wider text-text-muted`}>
                        {addr.type}
                      </span>
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id={`default-${addr.id}`}
                          defaultChecked={addr.id === 1}
                          className="w-4 h-4 accent-primary cursor-pointer" 
                        />
                        <label htmlFor={`default-${addr.id}`} className="text-[11px] font-bold text-text-muted uppercase tracking-widest cursor-pointer group-hover:text-primary transition-colors">Default</label>
                      </div>
                    </div>
                    <h4 className="text-[17px] font-bold text-foreground mb-3">{addr.name}</h4>
                    <div className="space-y-1 text-[14px] text-text-muted">
                      <p>{addr.street}</p>
                      <p>{addr.city}, {addr.postal}</p>
                      <p>{addr.country}</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <button
                      onClick={() => {
                        setEditingAddress(addr);
                        setShowAddressModal(true);
                      }}
                      className="text-[13px] font-bold text-primary hover:text-accent transition-colors uppercase tracking-widest underline underline-offset-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setDeletingAddressId(addr.id);
                        setShowDeleteModal(true);
                      }}
                      className="text-[13px] font-bold text-red-600 hover:text-red-700 transition-colors uppercase tracking-widest underline underline-offset-4"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Account Details / Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h2 className="text-xl font-bold text-foreground">Account Details</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 sm:p-10">
                <div className="pb-4 border-b border-border mb-8">
                  <h4 className="text-[15px] font-bold text-foreground uppercase tracking-wide">Personal Information</h4>
                </div>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">First Name</label>
                      <input type="text" defaultValue="John" className="w-full px-4 py-4 bg-white border border-border rounded-none outline-none focus:border-primary transition-colors text-[14px] shadow-sm" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Last Name</label>
                      <input type="text" defaultValue="Doe" className="w-full px-4 py-4 bg-white border border-border rounded-none outline-none focus:border-primary transition-colors text-[14px] shadow-sm" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Email Address</label>
                    <input type="email" defaultValue="john.doe@example.com" className="w-full px-4 py-4 bg-white border border-border rounded-none outline-none focus:border-primary transition-colors text-[14px] shadow-sm" />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Phone Number</label>
                    <input type="tel" placeholder="+44 7700 900XXX" className="w-full px-4 py-4 bg-white border border-border rounded-none outline-none focus:border-primary transition-colors text-[14px] shadow-sm" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 sm:p-10">
                <div className="pb-4 border-b border-border mb-8">
                  <h4 className="text-[15px] font-bold text-foreground uppercase tracking-wide">Security</h4>
                </div>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-4 bg-white border border-border rounded-none outline-none focus:border-primary transition-colors text-[14px] shadow-sm" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">New Password</label>
                        <input type="password" placeholder="Min. 8 characters" className="w-full px-4 py-4 bg-white border border-border rounded-none outline-none focus:border-primary transition-colors text-[14px] shadow-sm" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Confirm New Password</label>
                        <input type="password" placeholder="Re-enter password" className="w-full px-4 py-4 bg-white border border-border rounded-none outline-none focus:border-primary transition-colors text-[14px] shadow-sm" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-6 p-10 bg-white">
                <button className="px-10 py-4 border border-border text-foreground font-bold text-[13px] uppercase tracking-widest hover:bg-surface transition-colors rounded-none">
                  Cancel
                </button>
                <button className="px-10 py-4 bg-primary text-white font-bold text-[13px] uppercase tracking-widest hover:bg-black transition-colors rounded-none shadow-xl shadow-primary/20">
                  Save All Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Address Modal (Add/Edit) */}
      {showAddressModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddressModal(false)}></div>
          <div className="bg-white w-full max-w-xl relative z-10 animate-in fade-in zoom-in duration-300 shadow-2xl overflow-hidden">
            <div className="p-8 border-b border-border flex items-center justify-between bg-surface/50">
              <h3 className="text-xl font-bold text-foreground uppercase tracking-widest">
                {editingAddress ? "Edit Address" : "Add New Address"}
              </h3>
              <button onClick={() => setShowAddressModal(false)} className="p-2 hover:bg-surface rounded-full transition-colors text-text-muted hover:text-primary">
                <X size={20} />
              </button>
            </div>
            <form className="p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest">Address Label</label>
                  <input type="text" defaultValue={editingAddress?.type || "Home"} className="w-full px-4 py-3 bg-surface border border-border outline-none focus:border-primary transition-colors text-[14px]" placeholder="e.g. Home, Office" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest">Full Name</label>
                  <input type="text" defaultValue={editingAddress?.name || ""} className="w-full px-4 py-3 bg-surface border border-border outline-none focus:border-primary transition-colors text-[14px]" placeholder="John Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest">Street Address</label>
                <input type="text" defaultValue={editingAddress?.street || ""} className="w-full px-4 py-3 bg-surface border border-border outline-none focus:border-primary transition-colors text-[14px]" placeholder="123 Printing Way" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest">City</label>
                  <input type="text" defaultValue={editingAddress?.city || ""} className="w-full px-4 py-3 bg-surface border border-border outline-none focus:border-primary transition-colors text-[14px]" placeholder="London" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest">Postcode</label>
                  <input type="text" defaultValue={editingAddress?.postal || ""} className="w-full px-4 py-3 bg-surface border border-border outline-none focus:border-primary transition-colors text-[14px]" placeholder="SW1A 1AA" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest">Country</label>
                <select className="w-full px-4 py-3 bg-surface border border-border outline-none focus:border-primary transition-colors text-[14px]">
                  <option>United Kingdom</option>
                  <option>France</option>
                  <option>Germany</option>
                  <option>United States</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input type="checkbox" id="default-addr" className="w-4 h-4 accent-primary" />
                <label htmlFor="default-addr" className="text-[13px] text-text-muted">Set as default address</label>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <button type="button" onClick={() => setShowAddressModal(false)} className="py-4 border border-border text-foreground font-bold text-[12px] uppercase tracking-widest hover:bg-surface transition-colors">
                  Cancel
                </button>
                <button type="button" onClick={() => setShowAddressModal(false)} className="py-4 bg-primary text-white font-bold text-[12px] uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-primary/20">
                  {editingAddress ? "Save Changes" : "Add Address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)}></div>
          <div className="bg-white max-w-sm w-full relative z-10 p-10 text-center animate-in fade-in zoom-in duration-300 shadow-2xl">
            <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <LogOut size={32} className="rotate-90" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3 uppercase tracking-widest">Delete Address?</h3>
            <p className="text-[14px] text-text-muted mb-8 leading-relaxed">
              Are you sure you want to remove this address? This action cannot be undone.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="py-4 border border-border text-foreground font-bold text-[12px] uppercase tracking-widest hover:bg-surface transition-colors"
              >
                No, Keep
              </button>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="py-4 bg-red-600 text-white font-bold text-[12px] uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-600/20"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AccountPage() {
  return (
    <div className="bg-[#f9f9f9] min-h-screen pt-4 pb-24 font-jost">
      <Container>
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">My Account</h1>
          <p className="text-text-muted text-[15px]">Welcome back, John! Manage your orders and designs here.</p>
        </div>

        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <AccountContent />
        </Suspense>
      </Container>
    </div>
  );
}
