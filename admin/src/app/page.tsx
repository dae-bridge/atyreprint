"use client";

import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import {
  PageHeader,
  StatCard,
  Card,
  CardHeader,
  CardBody,
  Badge,
} from "@/components/ui";
import { formatMoney, timeAgo } from "@/lib/utils";

/* Placeholder data — will be replaced with Firestore reads */
const stats = [
  {
    label: "Total Revenue",
    value: "£12,450",
    icon: <DollarSign size={20} />,
    trend: { value: "12% vs last month", positive: true },
  },
  {
    label: "Orders",
    value: "156",
    icon: <ShoppingCart size={20} />,
    trend: { value: "8% vs last month", positive: true },
  },
  {
    label: "Products",
    value: "10",
    icon: <Package size={20} />,
  },
  {
    label: "Customers",
    value: "89",
    icon: <Users size={20} />,
    trend: { value: "5% vs last month", positive: true },
  },
];

const recentOrders = [
  {
    id: "AP-20260328-A1B2",
    customer: "Sarah Mitchell",
    total: 5998,
    status: "processing" as const,
    date: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "AP-20260327-C3D4",
    customer: "James Kofi",
    total: 3999,
    status: "shipped" as const,
    date: new Date(Date.now() - 18 * 60 * 60 * 1000),
  },
  {
    id: "AP-20260327-E5F6",
    customer: "Amara Obi",
    total: 8497,
    status: "confirmed" as const,
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: "AP-20260326-G7H8",
    customer: "David Tetteh",
    total: 2999,
    status: "delivered" as const,
    date: new Date(Date.now() - 48 * 60 * 60 * 1000),
  },
  {
    id: "AP-20260325-I9J0",
    customer: "Emily Richardson",
    total: 6497,
    status: "pending" as const,
    date: new Date(Date.now() - 72 * 60 * 60 * 1000),
  },
];

const statusColors: Record<
  string,
  "success" | "warning" | "info" | "default" | "error"
> = {
  pending: "warning",
  confirmed: "info",
  processing: "info",
  printing: "info",
  shipped: "success",
  delivered: "success",
  cancelled: "error",
  refunded: "error",
};

const topProducts = [
  { name: "Custom Printed T-Shirt", sold: 42, revenue: 83958 },
  { name: "Embroidered Hoodie", sold: 28, revenue: 111972 },
  { name: "Personalised Mug", sold: 35, revenue: 45465 },
  { name: "Custom Tote Bag", sold: 22, revenue: 32978 },
  { name: "Branded Snapback Cap", sold: 18, revenue: 30582 },
];

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Welcome back — here's what's happening with your store."
      />

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <h2 className="text-base font-semibold text-[var(--foreground)]">
                Recent Orders
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Latest 5 orders
              </p>
            </div>
            <Link
              href="/orders"
              className="text-sm text-[var(--primary)] font-medium hover:underline inline-flex items-center gap-1"
            >
              View All <ArrowUpRight size={14} />
            </Link>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-3 text-sm font-mono text-[var(--primary)] font-medium">
                      {order.id}
                    </td>
                    <td className="px-6 py-3 text-sm">{order.customer}</td>
                    <td className="px-6 py-3 text-sm font-medium">
                      {formatMoney(order.total)}
                    </td>
                    <td className="px-6 py-3">
                      <Badge variant={statusColors[order.status]}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-sm text-[var(--text-muted)]">
                      {timeAgo(order.date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <div>
              <h2 className="text-base font-semibold text-[var(--foreground)]">
                Top Products
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                By units sold
              </p>
            </div>
            <TrendingUp size={18} className="text-[var(--text-muted)]" />
          </CardHeader>
          <CardBody className="p-0">
            <ul className="divide-y divide-[var(--border)]">
              {topProducts.map((p, i) => (
                <li
                  key={p.name}
                  className="flex items-center justify-between px-6 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[var(--text-muted)] w-5">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-[var(--foreground)]">
                        {p.name}
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">
                        {p.sold} sold
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-[var(--foreground)]">
                    {formatMoney(p.revenue)}
                  </p>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
