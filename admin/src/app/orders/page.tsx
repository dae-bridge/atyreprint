"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Search, Filter } from "lucide-react";
import { PageHeader, Card, Badge, EmptyState } from "@/components/ui";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { queryDocuments } from "@/lib/firestore";
import { formatMoney, formatDate } from "@/lib/utils";
import type { Order, OrderStatus } from "@/types";
import { COLLECTIONS } from "@/types";

const statusColors: Record<OrderStatus, "success" | "warning" | "info" | "default" | "error"> = {
  pending: "warning",
  confirmed: "info",
  processing: "info",
  printing: "info",
  shipped: "success",
  delivered: "success",
  cancelled: "error",
  refunded: "error",
};

const paymentColors: Record<string, "success" | "warning" | "error" | "default"> = {
  paid: "success",
  pending: "warning",
  failed: "error",
  refunded: "default",
};

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await queryDocuments<Order>(COLLECTIONS.ORDERS, {
        sortBy: "createdAt",
        sortDirection: "desc",
        pageSize: 50,
      });
      setOrders(data);
    } catch (err) {
      console.error("Failed to load orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = orders.filter((o) => {
    const matchesSearch =
      search === "" ||
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns: Column<Order>[] = [
    {
      key: "orderNumber",
      label: "Order",
      render: (o) => (
        <span className="font-mono font-medium text-[var(--primary)]">
          {o.orderNumber}
        </span>
      ),
    },
    {
      key: "customer",
      label: "Customer",
      render: (o) => (
        <div>
          <p className="font-medium">{o.customerName}</p>
          <p className="text-xs text-[var(--text-muted)]">{o.customerEmail}</p>
        </div>
      ),
    },
    {
      key: "items",
      label: "Items",
      render: (o) => (
        <span className="text-sm">{o.items.length} item{o.items.length !== 1 ? "s" : ""}</span>
      ),
    },
    {
      key: "total",
      label: "Total",
      render: (o) => (
        <span className="font-medium">{formatMoney(o.total.amount)}</span>
      ),
    },
    {
      key: "payment",
      label: "Payment",
      render: (o) => (
        <Badge variant={paymentColors[o.paymentStatus]}>
          {o.paymentStatus}
        </Badge>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (o) => (
        <Badge variant={statusColors[o.status]}>
          {o.status}
        </Badge>
      ),
    },
    {
      key: "date",
      label: "Date",
      render: (o) => (
        <span className="text-sm text-[var(--text-muted)]">
          {formatDate(o.createdAt)}
        </span>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Orders" description="View and manage customer orders." />

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
          <div className="relative flex-1 w-full">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            />
            <input
              type="text"
              placeholder="Search by order #, name, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-[var(--text-muted)]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-[var(--border)] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="printing">Printing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </div>
      </Card>

      <Card>
        {!loading && filtered.length === 0 && orders.length === 0 ? (
          <EmptyState
            icon={<ShoppingCart size={24} />}
            title="No orders yet"
            description="Orders from customers will appear here."
          />
        ) : (
          <DataTable
            columns={columns}
            data={filtered}
            loading={loading}
            emptyMessage="No orders match your filters."
            onRowClick={(o) => router.push(`/orders/${o.id}`)}
          />
        )}
      </Card>
    </>
  );
}
