"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, FolderTree, GripVertical, Pencil, Trash2, ChevronRight } from "lucide-react";
import { PageHeader, Card, CardBody, Badge, Button, EmptyState } from "@/components/ui";
import { Input, Textarea, Select, Toggle, ImageUpload } from "@/components/ui/FormFields";
import { queryDocuments, createDocument, updateDocument, deleteDocument } from "@/lib/firestore";
import { uploadFile } from "@/lib/storage";
import { slugify } from "@/lib/utils";
import type { Category, ImageAsset } from "@/types";
import { COLLECTIONS } from "@/types";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Category | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formName, setFormName] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formImage, setFormImage] = useState<ImageAsset | null>(null);
  const [formIcon, setFormIcon] = useState("");
  const [formParentId, setFormParentId] = useState<string>("");
  const [formFeatured, setFormFeatured] = useState(false);
  const [formStatus, setFormStatus] = useState<string>("published");
  const [formSortOrder, setFormSortOrder] = useState(0);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await queryDocuments<Category>(COLLECTIONS.CATEGORIES, {
        sortBy: "sortOrder",
        sortDirection: "asc",
      });
      setCategories(data);
    } catch (err) {
      console.error("Failed to load categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormName("");
    setFormSlug("");
    setFormDescription("");
    setFormImage(null);
    setFormIcon("");
    setFormParentId("");
    setFormFeatured(false);
    setFormStatus("published");
    setFormSortOrder(0);
    setEditing(null);
    setShowForm(false);
  };

  const openEdit = (cat: Category) => {
    setEditing(cat);
    setFormName(cat.name);
    setFormSlug(cat.slug);
    setFormDescription(cat.description);
    setFormImage(cat.image);
    setFormIcon(cat.icon ?? "");
    setFormParentId(cat.parentId ?? "");
    setFormFeatured(cat.featured);
    setFormStatus(cat.status);
    setFormSortOrder(cat.sortOrder);
    setShowForm(true);
  };

  const openNew = () => {
    resetForm();
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!formName.trim()) return;
    setSaving(true);
    try {
      const parent = formParentId
        ? categories.find((c) => c.id === formParentId)
        : null;
      const ancestorSlugs = parent
        ? [...parent.ancestorSlugs, parent.slug]
        : [];

      const catData = {
        name: formName,
        slug: formSlug || slugify(formName),
        description: formDescription,
        image: formImage,
        icon: formIcon || undefined,
        parentId: formParentId || null,
        parentSlug: parent?.slug ?? null,
        ancestorSlugs,
        depth: ancestorSlugs.length,
        sortOrder: formSortOrder,
        productCount: editing?.productCount ?? 0,
        featured: formFeatured,
        status: formStatus as "draft" | "published" | "archived",
        seo: {
          metaTitle: formName,
          metaDescription: formDescription,
          ogImage: formImage?.url ?? "",
        },
      };

      if (editing) {
        await updateDocument(COLLECTIONS.CATEGORIES, editing.id, catData);
      } else {
        await createDocument<Category>(
          COLLECTIONS.CATEGORIES,
          catData as Omit<Category, "id" | "createdAt" | "updatedAt">,
        );
      }
      resetForm();
      loadCategories();
    } catch (err) {
      console.error("Failed to save category:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category? This cannot be undone.")) return;
    try {
      await deleteDocument(COLLECTIONS.CATEGORIES, id);
      loadCategories();
    } catch (err) {
      console.error("Failed to delete category:", err);
    }
  };

  const handleImageUpload = async (file: File) => {
    const { url, storagePath } = await uploadFile(file, `categories/${Date.now()}-${file.name}`);
    setFormImage({ url, alt: formName || file.name, storagePath });
  };

  // Build tree structure
  const rootCategories = categories.filter((c) => !c.parentId);
  const childrenOf = (parentId: string) =>
    categories.filter((c) => c.parentId === parentId);

  const statusColors: Record<string, "success" | "warning" | "default"> = {
    published: "success",
    draft: "warning",
    archived: "default",
  };

  const renderCategory = (cat: Category, level: number = 0) => {
    const children = childrenOf(cat.id);
    return (
      <div key={cat.id}>
        <div
          className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50/50 transition-colors border-b border-[var(--border)]"
          style={{ paddingLeft: `${24 + level * 24}px` }}
        >
          <GripVertical size={14} className="text-[var(--text-muted)] cursor-grab" />
          {children.length > 0 && (
            <ChevronRight size={14} className="text-[var(--text-muted)]" />
          )}
          {cat.image ? (
            <img
              src={cat.image.url}
              alt={cat.image.alt}
              className="w-8 h-8 rounded object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-xs">
              {cat.icon || "📁"}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[var(--foreground)]">{cat.name}</p>
            <p className="text-xs text-[var(--text-muted)]">{cat.productCount} products</p>
          </div>
          <Badge variant={statusColors[cat.status] ?? "default"}>
            {cat.status}
          </Badge>
          {cat.featured && <Badge variant="secondary">Featured</Badge>}
          <div className="flex items-center gap-1">
            <button
              onClick={() => openEdit(cat)}
              className="p-1.5 rounded hover:bg-gray-100 text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => handleDelete(cat.id)}
              className="p-1.5 rounded hover:bg-red-50 text-[var(--text-muted)] hover:text-red-500 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
        {children.map((child) => renderCategory(child, level + 1))}
      </div>
    );
  };

  return (
    <>
      <PageHeader title="Categories" description="Organize your products into categories.">
        <Button onClick={openNew}>
          <Plus size={16} /> Add Category
        </Button>
      </PageHeader>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Category tree */}
        <div className="lg:col-span-2">
          <Card>
            {loading ? (
              <div className="animate-pulse space-y-3 p-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-100 rounded-lg" />
                ))}
              </div>
            ) : categories.length === 0 ? (
              <EmptyState
                icon={<FolderTree size={24} />}
                title="No categories yet"
                description="Create your first category to organize products."
                action={
                  <Button onClick={openNew}>
                    <Plus size={16} /> Add Category
                  </Button>
                }
              />
            ) : (
              <div>{rootCategories.map((cat) => renderCategory(cat))}</div>
            )}
          </Card>
        </div>

        {/* Form panel */}
        {showForm && (
          <Card>
            <div className="px-6 py-4 border-b border-[var(--border)]">
              <h2 className="text-base font-semibold">
                {editing ? "Edit Category" : "New Category"}
              </h2>
            </div>
            <CardBody className="space-y-4">
              <Input
                label="Name"
                value={formName}
                onChange={(e) => {
                  setFormName(e.target.value);
                  if (!editing) setFormSlug(slugify(e.target.value));
                }}
              />
              <Input label="Slug" value={formSlug} onChange={(e) => setFormSlug(e.target.value)} />
              <Textarea
                label="Description"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                rows={3}
              />
              <Select
                label="Parent Category"
                value={formParentId}
                onChange={(e) => setFormParentId(e.target.value)}
                options={[
                  { value: "", label: "None (Root)" },
                  ...categories
                    .filter((c) => c.id !== editing?.id)
                    .map((c) => ({ value: c.id, label: c.name })),
                ]}
              />
              <Input label="Icon" value={formIcon} onChange={(e) => setFormIcon(e.target.value)} hint="Emoji or icon name" />
              <ImageUpload
                label="Category Image"
                value={formImage?.url}
                onChange={handleImageUpload}
                onRemove={() => setFormImage(null)}
              />
              <Input
                label="Sort Order"
                type="number"
                value={formSortOrder}
                onChange={(e) => setFormSortOrder(Number(e.target.value))}
              />
              <Select
                label="Status"
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value)}
                options={[
                  { value: "draft", label: "Draft" },
                  { value: "published", label: "Published" },
                  { value: "archived", label: "Archived" },
                ]}
              />
              <Toggle
                label="Featured"
                description="Show on homepage"
                checked={formFeatured}
                onChange={setFormFeatured}
              />
              <div className="flex gap-3 pt-2">
                <Button onClick={handleSave} loading={saving} className="flex-1">
                  {editing ? "Update" : "Create"}
                </Button>
                <Button variant="outline" onClick={resetForm} className="flex-1">
                  Cancel
                </Button>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </>
  );
}
