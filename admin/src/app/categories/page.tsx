"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Plus,
  FolderTree,
  GripVertical,
  Pencil,
  Trash2,
  ChevronRight,
  ChevronDown,
  Image as ImageIcon,
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
  Input,
  Textarea,
  Select,
  Toggle,
  ImageUpload,
} from "@/components/ui/FormFields";
import { Dialog } from "@/components/ui/Dialog";
import { InfoTooltip } from "@/components/ui/InfoTooltip";
import {
  queryDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
} from "@/lib/firestore";
import { uploadFile } from "@/lib/storage";
import { compressImage } from "@/lib/imageUtils";
import { slugify } from "@/lib/utils";
import type { Category, ImageAsset } from "@/types";
import { COLLECTIONS } from "@/types";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Category | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [saving, setSaving] = useState(false);
  const [expandedParents, setExpandedParents] = useState<Set<string>>(
    new Set(),
  );

  // Form state
  const [formName, setFormName] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formImage, setFormImage] = useState<ImageAsset | null>(null);
  const [formIcon, setFormIcon] = useState("");
  const [formParentId, setFormParentId] = useState<string>("");
  const [formNewParent, setFormNewParent] = useState("");
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
      // Auto-expand all parents on first load
      const parentIds = new Set<string>();
      data.forEach((c) => {
        if (!c.parentId) parentIds.add(c.id);
      });
      setExpandedParents(parentIds);
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
    setFormNewParent("");
    setFormFeatured(false);
    setFormStatus("published");
    setFormSortOrder(0);
    setEditing(null);
    setShowDialog(false);
  };

  const openEdit = (cat: Category) => {
    setEditing(cat);
    setFormName(cat.name);
    setFormSlug(cat.slug);
    setFormDescription(cat.description);
    setFormImage(cat.image);
    setFormIcon(cat.icon ?? "");
    setFormParentId(cat.parentId ?? "");
    setFormNewParent("");
    setFormFeatured(cat.featured);
    setFormStatus(cat.status);
    setFormSortOrder(cat.sortOrder);
    setShowDialog(true);
  };

  const openNew = () => {
    resetForm();
    setShowDialog(true);
  };

  const handleSave = async () => {
    if (!formName.trim()) return;
    setSaving(true);
    try {
      let parentId = formParentId;

      // If the user entered a new parent name, create it first
      if (formNewParent.trim() && !formParentId) {
        const newParentData = {
          name: formNewParent.trim(),
          slug: slugify(formNewParent.trim()),
          description: "",
          image: null,
          icon: undefined,
          parentId: null,
          parentSlug: null,
          ancestorSlugs: [] as string[],
          depth: 0,
          sortOrder: categories.length,
          productCount: 0,
          featured: false,
          status: "published" as const,
          seo: {
            metaTitle: formNewParent.trim(),
            metaDescription: "",
            ogImage: "",
          },
        };
        parentId = await createDocument<Category>(
          COLLECTIONS.CATEGORIES,
          newParentData as Omit<Category, "id" | "createdAt" | "updatedAt">,
        );
      }

      const parent = parentId
        ? categories.find((c) => c.id === parentId) ?? null
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
        parentId: parentId || null,
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
    const compressed = await compressImage(file);
    const { url, storagePath } = await uploadFile(
      compressed,
      `categories/${Date.now()}-${compressed.name}`,
    );
    setFormImage({ url, alt: formName || compressed.name, storagePath });
  };

  // Grouped data: root parents and their children
  const rootCategories = useMemo(
    () => categories.filter((c) => !c.parentId),
    [categories],
  );
  const childrenOf = (parentId: string) =>
    categories.filter((c) => c.parentId === parentId);

  // Existing parent names for the "select or create" combobox
  const existingParents = useMemo(
    () =>
      rootCategories.map((c) => ({
        value: c.id,
        label: c.name,
      })),
    [rootCategories],
  );

  const toggleParent = (id: string) => {
    setExpandedParents((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const statusColors: Record<string, "success" | "warning" | "default"> = {
    published: "success",
    draft: "warning",
    archived: "default",
  };

  return (
    <>
      <PageHeader
        title="Categories"
        description="Organize your products into categories and subcategories."
      >
        <Button onClick={openNew}>
          <Plus size={16} /> Add Category
        </Button>
      </PageHeader>

      {/* Category list grouped by parent */}
      {loading ? (
        <div className="animate-pulse space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-xl" />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <Card>
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
        </Card>
      ) : (
        <div className="space-y-4">
          {rootCategories.map((parent) => {
            const children = childrenOf(parent.id);
            const isExpanded = expandedParents.has(parent.id);

            return (
              <Card key={parent.id}>
                {/* Parent category header */}
                <div
                  className="flex items-center gap-3 px-6 py-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
                  onClick={() => toggleParent(parent.id)}
                >
                  <div className="text-text-muted">
                    {children.length > 0 ? (
                      isExpanded ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )
                    ) : (
                      <div className="w-4" />
                    )}
                  </div>

                  {parent.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={parent.image.url}
                      alt={parent.image.alt}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-sm">
                      {parent.icon || "📁"}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      {parent.name}
                    </p>
                    <p className="text-xs text-text-muted">
                      {parent.productCount} products
                      {children.length > 0 &&
                        ` · ${children.length} subcategor${children.length === 1 ? "y" : "ies"}`}
                    </p>
                  </div>

                  <Badge variant={statusColors[parent.status] ?? "default"}>
                    {parent.status}
                  </Badge>
                  {parent.featured && (
                    <Badge variant="secondary">Featured</Badge>
                  )}

                  <div
                    className="flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => openEdit(parent)}
                      className="p-1.5 rounded hover:bg-gray-100 text-text-muted hover:text-foreground transition-colors"
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(parent.id)}
                      className="p-1.5 rounded hover:bg-red-50 text-text-muted hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Child categories */}
                {isExpanded && children.length > 0 && (
                  <div className="border-t border-border">
                    {children.map((child) => (
                      <div
                        key={child.id}
                        className="flex items-center gap-3 px-6 py-3 pl-14 hover:bg-gray-50/50 transition-colors border-b border-border last:border-b-0"
                      >
                        <GripVertical
                          size={14}
                          className="text-text-muted cursor-grab"
                        />
                        {child.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={child.image.url}
                            alt={child.image.alt}
                            className="w-8 h-8 rounded object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-xs">
                            {child.icon || "📂"}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">
                            {child.name}
                          </p>
                          <p className="text-xs text-text-muted">
                            {child.productCount} products
                          </p>
                        </div>
                        <Badge
                          variant={statusColors[child.status] ?? "default"}
                        >
                          {child.status}
                        </Badge>
                        {child.featured && (
                          <Badge variant="secondary">Featured</Badge>
                        )}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openEdit(child)}
                            className="p-1.5 rounded hover:bg-gray-100 text-text-muted hover:text-foreground transition-colors"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(child.id)}
                            className="p-1.5 rounded hover:bg-red-50 text-text-muted hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            );
          })}

          {/* Orphan categories (no parent, but parentId is set to a missing parent) */}
          {categories
            .filter(
              (c) =>
                c.parentId &&
                !categories.find((p) => p.id === c.parentId),
            )
            .length > 0 && (
            <Card>
              <div className="px-6 py-3 border-b border-border">
                <p className="text-xs font-medium text-text-muted uppercase tracking-wide">
                  Uncategorised
                </p>
              </div>
              {categories
                .filter(
                  (c) =>
                    c.parentId &&
                    !categories.find((p) => p.id === c.parentId),
                )
                .map((cat) => (
                  <div
                    key={cat.id}
                    className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50/50 transition-colors border-b border-border last:border-b-0"
                  >
                    <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-xs">
                      {cat.icon || "📁"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {cat.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEdit(cat)}
                        className="p-1.5 rounded hover:bg-gray-100 text-text-muted hover:text-foreground transition-colors"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="p-1.5 rounded hover:bg-red-50 text-text-muted hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
            </Card>
          )}
        </div>
      )}

      {/* ── Add / Edit Category Dialog ── */}
      <Dialog
        open={showDialog}
        onClose={resetForm}
        title={editing ? "Edit Category" : "New Category"}
        description={
          editing
            ? "Update this category's details."
            : "Add a new product category to your store."
        }
        size="lg"
      >
        <div className="space-y-5">
          {/* Name */}
          <Input
            label="Category Name"
            tooltip="The public-facing name shown to customers on the storefront."
            value={formName}
            onChange={(e) => {
              setFormName(e.target.value);
              if (!editing) setFormSlug(slugify(e.target.value));
            }}
            placeholder="e.g. T-Shirts"
            required
          />

          {/* Slug (auto-generated, disabled) */}
          <Input
            label="Slug"
            tooltip="URL-friendly identifier auto-generated from the name. Used in the category page URL."
            value={formSlug}
            disabled
            onChange={() => {}}
          />

          {/* Description */}
          <Textarea
            label="Description"
            tooltip="A short description of the category. Displayed on the category page and used for SEO."
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            rows={3}
            placeholder="Describe what products this category contains..."
          />

          {/* Parent Category — Select existing or create new */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
              Parent Category
              <InfoTooltip
                text="Assign a parent to create a subcategory hierarchy. Select an existing parent or type a new name to create one on the fly."
                position="right"
              />
            </div>
            <select
              value={formParentId}
              onChange={(e) => {
                setFormParentId(e.target.value);
                if (e.target.value) setFormNewParent("");
              }}
              className="w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white border-border"
            >
              <option value="">None (Root category)</option>
              {existingParents
                .filter((p) => p.value !== editing?.id)
                .map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
            </select>
            {!formParentId && (
              <Input
                placeholder="Or type a new parent name to create it..."
                value={formNewParent}
                onChange={(e) => setFormNewParent(e.target.value)}
                hint={
                  formNewParent.trim()
                    ? `A new parent "${formNewParent.trim()}" will be created automatically.`
                    : undefined
                }
              />
            )}
          </div>

          {/* Icon */}
          <Input
            label="Icon"
            tooltip="An emoji or Lucide icon name used as a visual identifier in navigation and listings."
            value={formIcon}
            onChange={(e) => setFormIcon(e.target.value)}
            placeholder="e.g. 👕 or shirt"
            hint="Emoji or icon name"
          />

          {/* Image */}
          <ImageUpload
            label="Category Image"
            tooltip="A representative image for this category. Displayed on category cards and banners."
            value={formImage?.url}
            onChange={handleImageUpload}
            onRemove={() => setFormImage(null)}
          />

          {/* Two-column row */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Sort Order"
              tooltip="Controls the display order. Lower numbers appear first."
              type="number"
              value={formSortOrder}
              onChange={(e) => setFormSortOrder(Number(e.target.value))}
            />
            <Select
              label="Status"
              tooltip="Draft categories are hidden from the storefront. Archived categories are also hidden but preserved for records."
              value={formStatus}
              onChange={(e) => setFormStatus(e.target.value)}
              options={[
                { value: "draft", label: "Draft" },
                { value: "published", label: "Published" },
                { value: "archived", label: "Archived" },
              ]}
            />
          </div>

          {/* Featured toggle */}
          <Toggle
            label="Featured"
            description="Show this category on the homepage"
            checked={formFeatured}
            onChange={setFormFeatured}
          />

          {/* Actions */}
          <div className="flex gap-3 pt-2 border-t border-border">
            <Button
              onClick={handleSave}
              loading={saving}
              className="flex-1"
            >
              {editing ? "Update Category" : "Create Category"}
            </Button>
            <Button variant="outline" onClick={resetForm} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
