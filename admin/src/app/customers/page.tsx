"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Search,
  Eye,
  X,
  Package,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import {
  PageHeader,
  Card,
  CardBody,
  Badge,
  Button,
  EmptyState,
} from "@/components/ui";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { queryDocuments, updateDocument } from "@/lib/firestore";
import { formatMoney, formatDate, timeAgo } from "@/lib/utils";
import type { Customer } from "@/types";
import { COLLECTIONS } from "@/types";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Customer | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await queryDocuments<Customer>(COLLECTIONS.CUSTOMERS, {
        sortBy: "createdAt",
        sortDirection: "desc",
      });
      setCustomers(data);
    } catch (err) {
      console.error("Failed to load customers:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleBlock = async (c: Customer) => {
    const newStatus = c.status === "blocked" ? "active" : "blocked";
    if (
      newStatus === "blocked" &&
      !confirm(`Block ${c.displayName || c.email}?`)
    )
      return;
    try {
      await updateDocument(COLLECTIONS.CUSTOMERS, c.id, { status: newStatus });
      loadCustomers();
      if (selected?.id === c.id) setSelected({ ...c, status: newStatus });
    } catch (err) {
      console.error("Failed to update:", err);
    }
  };

  const filtered = customers.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      c.displayName?.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone?.toLowerCase().includes(q);
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const columns: Column<Customer>[] = [
    {
      key: "customer",
      label: "Customer",
      render: (c) => (
        <div className="flex items-center gap-3">
          {c.avatar ? (
            <img
              src={c.avatar}
              alt={c.displayName || ""}
              className="w-9 h-9 rounded-full object-cover"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-xs font-medium">
              {(c.displayName || c.email).charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <p className="font-medium text-[var(--text-primary)] truncate">
              {c.displayName || "—"}
            </p>
            <p className="text-xs text-[var(--text-muted)] truncate">
              {c.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "orders",
      label: "Orders",
      render: (c) => <span className="font-medium">{c.orderCount}</span>,
    },
    {
      key: "spent",
      label: "Total Spent",
      render: (c) => (
        <span className="font-medium">
          {formatMoney(c.totalSpent?.amount ?? 0)}
        </span>
      ),
    },
    {
      key: "newsletter",
      label: "Newsletter",
      render: (c) => (
        <Badge variant={c.newsletterSubscribed ? "success" : "default"}>
          {c.newsletterSubscribed ? "Subscribed" : "No"}
        </Badge>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (c) => (
        <Badge variant={c.status === "active" ? "success" : "error"}>
          {c.status}
        </Badge>
      ),
    },
    {
      key: "joined",
      label: "Joined",
      render: (c) => (
        <span className="text-sm text-[var(--text-muted)]">
          {timeAgo(c.createdAt)}
        </span>
      ),
    },
    {
      key: "actions",
      label: "",
      className: "w-12",
      render: (c) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelected(c);
          }}
          className="p-1.5 rounded hover:bg-gray-100 text-[var(--text-muted)]"
        >
          <Eye size={14} />
        </button>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Customers"
        description="View customer accounts and order history."
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className={selected ? "lg:col-span-2" : "lg:col-span-3"}>
          <Card>
            <div className="px-6 py-4 border-b border-[var(--border)] flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, email..."
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-[var(--border)] text-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-[var(--border)] rounded-lg text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
            {!loading && filtered.length === 0 ? (
              <EmptyState
                icon={<Users size={24} />}
                title="No customers found"
                description="Customers will appear here once they sign up."
              />
            ) : (
              <DataTable
                columns={columns}
                data={filtered}
                loading={loading}
                emptyMessage="No customers found."
                onRowClick={(c) => setSelected(c)}
              />
            )}
          </Card>
        </div>

        {selected && (
          <Card>
            <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
              <h2 className="text-base font-semibold">Customer Details</h2>
              <button
                onClick={() => setSelected(null)}
                className="p-1 rounded hover:bg-gray-100 text-[var(--text-muted)]"
              >
                <X size={16} />
              </button>
            </div>
            <CardBody className="space-y-5">
              {/* Avatar & Name */}
              <div className="flex items-center gap-3">
                {selected.avatar ? (
                  <img
                    src={selected.avatar}
                    alt=""
                    className="w-14 h-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-lg font-medium">
                    {(selected.displayName || selected.email)
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">
                    {selected.displayName || "No name"}
                  </p>
                  <Badge
                    variant={selected.status === "active" ? "success" : "error"}
                  >
                    {selected.status}
                  </Badge>
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  Contact
                </h3>
                <div className="space-y-1.5 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-[var(--text-muted)]" />
                    <span>{selected.email}</span>
                  </div>
                  {selected.phone && (
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-[var(--text-muted)]" />
                      <span>{selected.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Addresses */}
              {(selected.defaultShippingAddress ||
                selected.defaultBillingAddress) && (
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Addresses
                  </h3>
                  {selected.defaultShippingAddress && (
                    <div className="flex items-start gap-2 text-sm bg-gray-50 rounded-lg p-3">
                      <MapPin
                        size={14}
                        className="text-[var(--text-muted)] mt-0.5 shrink-0"
                      />
                      <div>
                        <p className="text-xs font-medium text-[var(--text-muted)] mb-1">
                          Shipping
                        </p>
                        <p>{selected.defaultShippingAddress.line1}</p>
                        {selected.defaultShippingAddress.line2 && (
                          <p>{selected.defaultShippingAddress.line2}</p>
                        )}
                        <p>
                          {selected.defaultShippingAddress.city},{" "}
                          {selected.defaultShippingAddress.county}{" "}
                          {selected.defaultShippingAddress.postcode}
                        </p>
                        <p className="text-[var(--text-muted)]">
                          {selected.defaultShippingAddress.country}
                        </p>
                      </div>
                    </div>
                  )}
                  {selected.defaultBillingAddress && (
                    <div className="flex items-start gap-2 text-sm bg-gray-50 rounded-lg p-3">
                      <MapPin
                        size={14}
                        className="text-[var(--text-muted)] mt-0.5 shrink-0"
                      />
                      <div>
                        <p className="text-xs font-medium text-[var(--text-muted)] mb-1">
                          Billing
                        </p>
                        <p>{selected.defaultBillingAddress.line1}</p>
                        {selected.defaultBillingAddress.line2 && (
                          <p>{selected.defaultBillingAddress.line2}</p>
                        )}
                        <p>
                          {selected.defaultBillingAddress.city},{" "}
                          {selected.defaultBillingAddress.county}{" "}
                          {selected.defaultBillingAddress.postcode}
                        </p>
                        <p className="text-[var(--text-muted)]">
                          {selected.defaultBillingAddress.country}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Stats */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  Order Stats
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xl font-bold text-[var(--primary)]">
                      {selected.orderCount}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">Orders</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xl font-bold text-[var(--primary)]">
                      {formatMoney(selected.totalSpent?.amount ?? 0)}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      Total Spent
                    </p>
                  </div>
                </div>
                {selected.lastOrderAt && (
                  <p className="text-xs text-[var(--text-muted)]">
                    Last order: {timeAgo(selected.lastOrderAt)}
                  </p>
                )}
              </div>

              {/* Tags */}
              {selected.tags && selected.tags.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Meta */}
              <div className="space-y-1 text-xs text-[var(--text-muted)] pt-2 border-t border-[var(--border)]">
                <p>
                  Newsletter:{" "}
                  {selected.newsletterSubscribed
                    ? "Subscribed"
                    : "Not subscribed"}
                </p>
                <p>Joined: {formatDate(selected.createdAt)}</p>
              </div>

              {/* Actions */}
              <div className="pt-2">
                <Button
                  variant={
                    selected.status === "blocked" ? "primary" : "outline"
                  }
                  onClick={() => toggleBlock(selected)}
                  className="w-full"
                >
                  {selected.status === "blocked"
                    ? "Unblock Customer"
                    : "Block Customer"}
                </Button>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </>
  );
}
