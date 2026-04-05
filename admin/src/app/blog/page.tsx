"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, FileText, Search, Eye, Pencil, Trash2 } from "lucide-react";
import { PageHeader, Card, Badge, Button, EmptyState } from "@/components/ui";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { queryDocuments, softDeleteDocument } from "@/lib/firestore";
import { formatDate, truncate } from "@/lib/utils";
import type { BlogPost } from "@/types";
import { COLLECTIONS } from "@/types";

const statusColors: Record<string, "success" | "warning" | "default"> = {
  published: "success",
  draft: "warning",
  archived: "default",
};

export default function BlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await queryDocuments<BlogPost>(COLLECTIONS.BLOG_POSTS, {
        filters: [{ field: "isDeleted", operator: "==", value: false }],
        sortBy: "createdAt",
        sortDirection: "desc",
      });
      setPosts(data);
    } catch (err) {
      console.error("Failed to load posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Move this post to trash?")) return;
    try {
      await softDeleteDocument(COLLECTIONS.BLOG_POSTS, id);
      loadPosts();
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  const filtered = posts.filter(
    (p) =>
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase()),
  );

  const columns: Column<BlogPost>[] = [
    {
      key: "post",
      label: "Post",
      render: (p) => (
        <div className="flex items-center gap-3">
          {p.coverImage?.url ? (
            <img
              src={p.coverImage.url}
              alt={p.coverImage.alt}
              className="w-12 h-8 rounded object-cover border border-[var(--border)]"
            />
          ) : (
            <div className="w-12 h-8 rounded bg-gray-100 flex items-center justify-center">
              <FileText size={14} className="text-gray-400" />
            </div>
          )}
          <div>
            <p className="font-medium text-[var(--foreground)]">
              {truncate(p.title, 50)}
            </p>
            <p className="text-xs text-[var(--text-muted)]">by {p.author}</p>
          </div>
        </div>
      ),
    },
    {
      key: "tags",
      label: "Tags",
      render: (p) => (
        <div className="flex gap-1 flex-wrap">
          {p.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="default">
              {tag}
            </Badge>
          ))}
          {p.tags.length > 3 && (
            <span className="text-xs text-[var(--text-muted)]">
              +{p.tags.length - 3}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (p) => <Badge variant={statusColors[p.status]}>{p.status}</Badge>,
    },
    {
      key: "date",
      label: "Date",
      render: (p) => (
        <span className="text-sm text-[var(--text-muted)]">
          {p.publishedAt ? formatDate(p.publishedAt) : "Not published"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "",
      className: "w-20",
      render: (p) => (
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/blog/${p.id}`);
            }}
            className="p-1.5 rounded hover:bg-gray-100 text-[var(--text-muted)] hover:text-[var(--foreground)]"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(p.id);
            }}
            className="p-1.5 rounded hover:bg-red-50 text-[var(--text-muted)] hover:text-red-500"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Blog Posts" description="Manage blog articles.">
        <Button onClick={() => router.push("/blog/new")}>
          <Plus size={16} /> New Post
        </Button>
      </PageHeader>

      <Card className="mb-6">
        <div className="p-4">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            />
            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
            />
          </div>
        </div>
      </Card>

      <Card>
        {!loading && filtered.length === 0 && posts.length === 0 ? (
          <EmptyState
            icon={<FileText size={24} />}
            title="No blog posts yet"
            description="Write your first blog post."
            action={
              <Button onClick={() => router.push("/blog/new")}>
                <Plus size={16} /> New Post
              </Button>
            }
          />
        ) : (
          <DataTable
            columns={columns}
            data={filtered}
            loading={loading}
            emptyMessage="No posts match your search."
            onRowClick={(p) => router.push(`/blog/${p.id}`)}
          />
        )}
      </Card>
    </>
  );
}
