"use client";

import { useEffect, useState } from "react";
import { Mail, Search, Download, Trash2, UserCheck, UserX } from "lucide-react";
import {
  PageHeader,
  Card,
  CardBody,
  Badge,
  Button,
  EmptyState,
  StatCard,
} from "@/components/ui";
import { DataTable, type Column } from "@/components/ui/DataTable";
import {
  queryDocuments,
  deleteDocument,
  updateDocument,
} from "@/lib/firestore";
import { timeAgo } from "@/lib/utils";
import type { NewsletterSubscriber } from "@/types";
import { COLLECTIONS } from "@/types";

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = async () => {
    try {
      setLoading(true);
      const data = await queryDocuments<NewsletterSubscriber>(
        COLLECTIONS.NEWSLETTER,
        {
          sortBy: "createdAt",
          sortDirection: "desc",
        },
      );
      setSubscribers(data);
    } catch (err) {
      console.error("Failed to load subscribers:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (sub: NewsletterSubscriber) => {
    const newActive = !sub.active;
    await updateDocument(COLLECTIONS.NEWSLETTER, sub.id, { active: newActive });
    setSubscribers((prev) =>
      prev.map((s) => (s.id === sub.id ? { ...s, active: newActive } : s)),
    );
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this subscriber permanently?")) return;
    await deleteDocument(COLLECTIONS.NEWSLETTER, id);
    setSubscribers((prev) => prev.filter((s) => s.id !== id));
  };

  const handleExport = () => {
    const active = subscribers.filter((s) => s.active);
    const csv = [
      "Email,Subscribed,Source",
      ...active.map(
        (s) => `${s.email},${timeAgo(s.createdAt)},${s.source || "unknown"}`,
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = subscribers.filter(
    (s) => !search || s.email.toLowerCase().includes(search.toLowerCase()),
  );

  const activeCount = subscribers.filter((s) => s.active).length;

  const columns: Column<NewsletterSubscriber>[] = [
    {
      key: "email",
      label: "Email",
      render: (sub) => (
        <div className="flex items-center gap-2">
          <Mail size={14} className="text-text-muted" />
          <span className="text-sm font-medium">{sub.email}</span>
        </div>
      ),
    },
    {
      key: "active",
      label: "Status",
      render: (sub) => (
        <Badge variant={sub.active ? "success" : "error"}>
          {sub.active ? "Active" : "Unsubscribed"}
        </Badge>
      ),
    },
    {
      key: "source",
      label: "Source",
      render: (sub) => (
        <span className="text-xs text-text-secondary capitalize">
          {sub.source || "unknown"}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Subscribed",
      render: (sub) => (
        <span className="text-xs text-text-muted">
          {timeAgo(sub.createdAt)}
        </span>
      ),
    },
    {
      key: "actions",
      label: "",
      render: (sub) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => toggleActive(sub)}
            className="p-1.5 rounded-md hover:bg-gray-100 text-text-muted transition-colors"
            title={sub.active ? "Unsubscribe" : "Resubscribe"}
          >
            {sub.active ? <UserX size={15} /> : <UserCheck size={15} />}
          </button>
          <button
            onClick={() => handleDelete(sub.id)}
            className="p-1.5 rounded-md hover:bg-red-50 text-text-muted hover:text-error transition-colors"
            title="Delete"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Newsletter" description="Manage email subscribers">
        <Button
          variant="outline"
          onClick={handleExport}
          disabled={activeCount === 0}
        >
          <Download size={16} />
          Export CSV
        </Button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard
          label="Total Subscribers"
          value={subscribers.length}
          icon={<Mail size={20} />}
        />
        <StatCard
          label="Active"
          value={activeCount}
          icon={<UserCheck size={20} />}
        />
        <StatCard
          label="Unsubscribed"
          value={subscribers.length - activeCount}
          icon={<UserX size={20} />}
        />
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardBody>
          <div className="relative max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            />
            <input
              type="text"
              placeholder="Search by email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </CardBody>
      </Card>

      {/* Table */}
      <Card>
        {loading ? (
          <CardBody>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse h-10 bg-gray-100 rounded"
                />
              ))}
            </div>
          </CardBody>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<Mail size={24} />}
            title="No subscribers"
            description="Newsletter signups from the website will appear here."
          />
        ) : (
          <DataTable columns={columns} data={filtered} />
        )}
      </Card>
    </div>
  );
}
