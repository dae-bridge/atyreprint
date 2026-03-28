"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Package, Search, Filter } from "lucide-react";
import { PageHeader, Card, Badge, Button, EmptyState } from "@/components/ui";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { queryDocuments } from "@/lib/firestore";
import { formatMoney, truncate } from "@/lib/utils";
import type { Product } from "@/types";
import { COLLECTIONS } from "@/types";

const statusColors: Record<string, "success" | "warning" | "default"> = {
  published: "success",
  draft: "warning",
  archived: "default",
};

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await queryDocuments<Product>(COLLECTIONS.PRODUCTS, {
        filters: [{ field: "isDeleted", operator: "==", value: false }],
        sortBy: "createdAt",
        sortDirection: "desc",
      });
      setProducts(data);
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = products.filter((p) => {
    const matchesSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns: Column<Product>[] = [
    {
      key: "product",
      label: "Product",
      render: (p) => (
        <div className="flex items-center gap-3">
          {p.images[0] ? (
            <img
              src={p.images[0].url}
              alt={p.images[0].alt}
              className="w-10 h-10 rounded-lg object-cover border border-[var(--border)]"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <Package size={16} className="text-gray-400" />
            </div>
          )}
          <div>
            <p className="font-medium text-[var(--foreground)]">
              {truncate(p.name, 40)}
            </p>
            <p className="text-xs text-[var(--text-muted)]">{p.sku}</p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (p) => (
        <span className="text-sm">
          {p.categoryPath?.[p.categoryPath.length - 1] ?? "—"}
        </span>
      ),
    },
    {
      key: "price",
      label: "Price",
      render: (p) => (
        <div>
          <span className="font-medium">{formatMoney(p.price.amount)}</span>
          {p.compareAtPrice && (
            <span className="text-xs text-[var(--text-muted)] line-through ml-2">
              {formatMoney(p.compareAtPrice.amount)}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "stock",
      label: "Stock",
      render: (p) => (
        <Badge variant={p.inStock ? "success" : "error"}>
          {p.inStock ? "In Stock" : "Out of Stock"}
        </Badge>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (p) => (
        <Badge variant={statusColors[p.status] ?? "default"}>
          {p.status}
        </Badge>
      ),
    },
    {
      key: "rating",
      label: "Rating",
      render: (p) => (
        <span className="text-sm">
          ⭐ {p.rating.toFixed(1)} ({p.reviewCount})
        </span>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Products" description="Manage your product catalog.">
        <Button onClick={() => router.push("/products/new")}>
          <Plus size={16} /> Add Product
        </Button>
      </PageHeader>

      {/* Filters bar */}
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
          <div className="relative flex-1 w-full">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            />
            <input
              type="text"
              placeholder="Search products..."
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
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </Card>

      <Card>
        {!loading && filtered.length === 0 && products.length === 0 ? (
          <EmptyState
            icon={<Package size={24} />}
            title="No products yet"
            description="Add your first product to get started."
            action={
              <Button onClick={() => router.push("/products/new")}>
                <Plus size={16} /> Add Product
              </Button>
            }
          />
        ) : (
          <DataTable
            columns={columns}
            data={filtered}
            loading={loading}
            emptyMessage="No products match your filters."
            onRowClick={(p) => router.push(`/products/${p.id}`)}
          />
        )}
      </Card>
    </>
  );
}
