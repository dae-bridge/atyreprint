"use client";

import { useEffect, useState } from "react";
import {
  MessageSquare,
  Search,
  Eye,
  Trash2,
  Mail,
  CheckCircle2,
} from "lucide-react";
import {
  PageHeader,
  Card,
  CardBody,
  Badge,
  Button,
  EmptyState,
} from "@/components/ui";
import {
  queryDocuments,
  updateDocument,
  deleteDocument,
} from "@/lib/firestore";
import { timeAgo } from "@/lib/utils";
import type { ContactMessage, ContactMessageStatus } from "@/types";
import { COLLECTIONS } from "@/types";

const statusConfig: Record<
  ContactMessageStatus,
  { label: string; variant: "info" | "warning" | "success" }
> = {
  new: { label: "New", variant: "warning" },
  read: { label: "Read", variant: "info" },
  replied: { label: "Replied", variant: "success" },
};

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await queryDocuments<ContactMessage>(
        COLLECTIONS.CONTACT_MESSAGES,
        {
          sortBy: "createdAt",
          sortDirection: "desc",
        },
      );
      setMessages(data);
    } catch (err) {
      console.error("Failed to load messages:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: ContactMessageStatus) => {
    await updateDocument(COLLECTIONS.CONTACT_MESSAGES, id, { status });
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m)),
    );
    if (selected?.id === id) {
      setSelected((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message permanently?")) return;
    await deleteDocument(COLLECTIONS.CONTACT_MESSAGES, id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const viewMessage = (msg: ContactMessage) => {
    setSelected(msg);
    if (msg.status === "new") {
      updateStatus(msg.id, "read");
    }
  };

  const filtered = messages.filter((m) => {
    const matchSearch =
      !search ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || m.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const newCount = messages.filter((m) => m.status === "new").length;

  return (
    <div>
      <PageHeader
        title="Contact Messages"
        description={`${messages.length} total messages${newCount > 0 ? ` · ${newCount} new` : ""}`}
      />

      {/* Filters */}
      <Card className="mb-6">
        <CardBody>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                type="text"
                placeholder="Search by name, email, or subject..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
            </select>
          </div>
        </CardBody>
      </Card>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-2">
          <Card>
            {loading ? (
              <CardBody>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-100 rounded w-1/2" />
                    </div>
                  ))}
                </div>
              </CardBody>
            ) : filtered.length === 0 ? (
              <EmptyState
                icon={<MessageSquare size={24} />}
                title="No messages"
                description="Contact form submissions will appear here."
              />
            ) : (
              <div className="divide-y divide-border max-h-[calc(100vh-280px)] overflow-y-auto">
                {filtered.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => viewMessage(msg)}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                      selected?.id === msg.id
                        ? "bg-primary/5 border-l-2 border-primary"
                        : ""
                    } ${msg.status === "new" ? "bg-blue-50/50" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          {msg.status === "new" && (
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                          )}
                          <p className="text-sm font-semibold text-foreground truncate">
                            {msg.name}
                          </p>
                        </div>
                        <p className="text-xs text-text-secondary truncate mt-0.5">
                          {msg.subject || "No subject"}
                        </p>
                        <p className="text-xs text-text-muted truncate mt-0.5">
                          {msg.message.substring(0, 80)}...
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <span className="text-[10px] text-text-muted whitespace-nowrap">
                          {timeAgo(msg.createdAt)}
                        </span>
                        <Badge variant={statusConfig[msg.status].variant}>
                          {statusConfig[msg.status].label}
                        </Badge>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-3">
          <Card>
            {selected ? (
              <div>
                <div className="px-6 py-4 border-b border-border">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">
                        {selected.name}
                      </h3>
                      <a
                        href={`mailto:${selected.email}`}
                        className="text-sm text-primary hover:underline flex items-center gap-1 mt-0.5"
                      >
                        <Mail size={14} />
                        {selected.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      {selected.status !== "replied" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateStatus(selected.id, "replied")}
                        >
                          <CheckCircle2 size={14} />
                          Mark Replied
                        </Button>
                      )}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(selected.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <Badge variant={statusConfig[selected.status].variant}>
                      {statusConfig[selected.status].label}
                    </Badge>
                    <span className="text-xs text-text-muted">
                      {selected.subject || "No subject"} ·{" "}
                      {timeAgo(selected.createdAt)}
                    </span>
                  </div>
                </div>
                <CardBody>
                  <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                    {selected.message}
                  </p>
                  <div className="mt-6 pt-4 border-t border-border">
                    <a
                      href={`mailto:${selected.email}?subject=Re: ${selected.subject || "Your inquiry"}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-light transition-colors"
                    >
                      <Mail size={16} />
                      Reply via Email
                    </a>
                  </div>
                </CardBody>
              </div>
            ) : (
              <div className="py-16 text-center">
                <Eye size={32} className="mx-auto text-text-muted mb-3" />
                <p className="text-text-secondary text-sm">
                  Select a message to view its contents
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
