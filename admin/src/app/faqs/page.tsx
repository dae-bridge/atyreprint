"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Pencil,
  HelpCircle,
  GripVertical,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import {
  PageHeader,
  Card,
  CardBody,
  Badge,
  Button,
  EmptyState,
} from "@/components/ui";
import { Dialog } from "@/components/ui/Dialog";
import { Input, Textarea, Select } from "@/components/ui/FormFields";
import {
  queryDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  getAllDocuments,
} from "@/lib/firestore";
import { slugify } from "@/lib/utils";
import type { FAQCategory, FAQItem } from "@/types";
import { COLLECTIONS } from "@/types";

export default function FAQPage() {
  const [categories, setCategories] = useState<FAQCategory[]>([]);
  const [items, setItems] = useState<Record<string, FAQItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [expandedCat, setExpandedCat] = useState<string | null>(null);

  // Category form
  const [showCatDialog, setShowCatDialog] = useState(false);
  const [editingCat, setEditingCat] = useState<FAQCategory | null>(null);
  const [catName, setCatName] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [catSortOrder, setCatSortOrder] = useState(0);
  const [savingCat, setSavingCat] = useState(false);

  // Item form
  const [showItemDialog, setShowItemDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<FAQItem | null>(null);
  const [itemCatId, setItemCatId] = useState("");
  const [itemQuestion, setItemQuestion] = useState("");
  const [itemAnswer, setItemAnswer] = useState("");
  const [itemSortOrder, setItemSortOrder] = useState(0);
  const [itemStatus, setItemStatus] = useState("published");
  const [savingItem, setSavingItem] = useState(false);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      setLoading(true);
      const cats = await queryDocuments<FAQCategory>(
        COLLECTIONS.FAQ_CATEGORIES,
        {
          sortBy: "sortOrder",
          sortDirection: "asc",
        },
      );
      setCategories(cats);

      // Load items for each category
      const itemsByCategory: Record<string, FAQItem[]> = {};
      for (const cat of cats) {
        const catItems = await queryDocuments<FAQItem>(
          `${COLLECTIONS.FAQ_CATEGORIES}/${cat.id}/items`,
          { sortBy: "sortOrder", sortDirection: "asc" },
        );
        itemsByCategory[cat.id] = catItems;
      }
      setItems(itemsByCategory);
    } catch (err) {
      console.error("Failed to load FAQs:", err);
    } finally {
      setLoading(false);
    }
  };

  // ── Category CRUD ──
  const resetCatForm = () => {
    setCatName("");
    setCatSlug("");
    setCatSortOrder(0);
    setEditingCat(null);
    setShowCatDialog(false);
  };

  const openEditCat = (cat: FAQCategory) => {
    setEditingCat(cat);
    setCatName(cat.name);
    setCatSlug(cat.slug);
    setCatSortOrder(cat.sortOrder);
    setShowCatDialog(true);
    setShowItemDialog(false);
  };

  const handleSaveCat = async () => {
    if (!catName.trim()) return;
    setSavingCat(true);
    try {
      const data = {
        name: catName,
        slug: catSlug || slugify(catName),
        sortOrder: catSortOrder,
      };
      if (editingCat) {
        await updateDocument(COLLECTIONS.FAQ_CATEGORIES, editingCat.id, data);
      } else {
        await createDocument<FAQCategory>(
          COLLECTIONS.FAQ_CATEGORIES,
          data as Omit<FAQCategory, "id" | "createdAt" | "updatedAt">,
        );
      }
      resetCatForm();
      loadAll();
    } catch (err) {
      console.error("Failed to save category:", err);
    } finally {
      setSavingCat(false);
    }
  };

  const handleDeleteCat = async (id: string) => {
    if (!confirm("Delete this category and all its items?")) return;
    try {
      // Delete items first
      const catItems = items[id] ?? [];
      for (const item of catItems) {
        await deleteDocument(
          `${COLLECTIONS.FAQ_CATEGORIES}/${id}/items`,
          item.id,
        );
      }
      await deleteDocument(COLLECTIONS.FAQ_CATEGORIES, id);
      loadAll();
    } catch (err) {
      console.error("Failed to delete category:", err);
    }
  };

  // ── Item CRUD ──
  const resetItemForm = () => {
    setItemQuestion("");
    setItemAnswer("");
    setItemSortOrder(0);
    setItemStatus("published");
    setItemCatId("");
    setEditingItem(null);
    setShowItemDialog(false);
  };

  const openNewItem = (catId: string) => {
    resetItemForm();
    setItemCatId(catId);
    setShowItemDialog(true);
    setShowCatDialog(false);
  };

  const openEditItem = (item: FAQItem) => {
    setEditingItem(item);
    setItemCatId(item.categoryId);
    setItemQuestion(item.question);
    setItemAnswer(item.answer);
    setItemSortOrder(item.sortOrder);
    setItemStatus(item.status);
    setShowItemDialog(true);
    setShowCatDialog(false);
  };

  const handleSaveItem = async () => {
    if (!itemQuestion.trim() || !itemAnswer.trim() || !itemCatId) return;
    setSavingItem(true);
    try {
      const data = {
        categoryId: itemCatId,
        question: itemQuestion,
        answer: itemAnswer,
        sortOrder: itemSortOrder,
        status: itemStatus as "draft" | "published" | "archived",
      };
      const collPath = `${COLLECTIONS.FAQ_CATEGORIES}/${itemCatId}/items`;
      if (editingItem) {
        await updateDocument(collPath, editingItem.id, data);
      } else {
        await createDocument<FAQItem>(
          collPath,
          data as Omit<FAQItem, "id" | "createdAt" | "updatedAt">,
        );
      }
      resetItemForm();
      loadAll();
    } catch (err) {
      console.error("Failed to save FAQ item:", err);
    } finally {
      setSavingItem(false);
    }
  };

  const handleDeleteItem = async (catId: string, itemId: string) => {
    if (!confirm("Delete this FAQ?")) return;
    try {
      await deleteDocument(
        `${COLLECTIONS.FAQ_CATEGORIES}/${catId}/items`,
        itemId,
      );
      loadAll();
    } catch (err) {
      console.error("Failed to delete FAQ item:", err);
    }
  };

  const statusColors: Record<string, "success" | "warning" | "default"> = {
    published: "success",
    draft: "warning",
    archived: "default",
  };

  return (
    <>
      <PageHeader title="FAQs" description="Manage frequently asked questions.">
        <Button
          variant="outline"
          onClick={() => {
            resetItemForm();
            resetCatForm();
            setShowCatDialog(true);
          }}
        >
          <Plus size={16} /> Add Category
        </Button>
      </PageHeader>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* FAQ tree */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="animate-pulse space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-100 rounded-xl" />
              ))}
            </div>
          ) : categories.length === 0 ? (
            <Card>
              <EmptyState
                icon={<HelpCircle size={24} />}
                title="No FAQ categories yet"
                description="Create a category to start adding FAQs."
                action={
                  <Button onClick={() => setShowCatDialog(true)}>
                    <Plus size={16} /> Add Category
                  </Button>
                }
              />
            </Card>
          ) : (
            <div className="space-y-3">
              {categories.map((cat) => {
                const catItems = items[cat.id] ?? [];
                const isExpanded = expandedCat === cat.id;

                return (
                  <Card key={cat.id}>
                    {/* Category header */}
                    <div
                      className="flex items-center gap-3 px-6 py-4 cursor-pointer"
                      onClick={() => setExpandedCat(isExpanded ? null : cat.id)}
                    >
                      {isExpanded ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-[var(--foreground)]">
                          {cat.name}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">
                          {catItems.length} question
                          {catItems.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <div
                        className="flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => openNewItem(cat.id)}
                          className="p-1.5 rounded hover:bg-gray-100 text-[var(--primary)]"
                          title="Add question"
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          onClick={() => openEditCat(cat)}
                          className="p-1.5 rounded hover:bg-gray-100 text-[var(--text-muted)]"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteCat(cat.id)}
                          className="p-1.5 rounded hover:bg-red-50 text-[var(--text-muted)] hover:text-red-500"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Items */}
                    {isExpanded && (
                      <div className="border-t border-[var(--border)]">
                        {catItems.length === 0 ? (
                          <p className="px-6 py-4 text-sm text-[var(--text-muted)]">
                            No questions in this category.
                          </p>
                        ) : (
                          catItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-start gap-3 px-6 py-3 border-b border-[var(--border)] last:border-b-0 hover:bg-gray-50/50"
                            >
                              <GripVertical
                                size={14}
                                className="text-[var(--text-muted)] cursor-grab mt-0.5"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[var(--foreground)]">
                                  {item.question}
                                </p>
                                <p className="text-xs text-[var(--text-muted)] mt-0.5 line-clamp-2">
                                  {item.answer}
                                </p>
                              </div>
                              <Badge variant={statusColors[item.status]}>
                                {item.status}
                              </Badge>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => openEditItem(item)}
                                  className="p-1 rounded hover:bg-gray-100 text-[var(--text-muted)]"
                                >
                                  <Pencil size={12} />
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteItem(cat.id, item.id)
                                  }
                                  className="p-1 rounded hover:bg-red-50 text-[var(--text-muted)] hover:text-red-500"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Category Dialog */}
      <Dialog
        open={showCatDialog}
        onClose={resetCatForm}
        title={editingCat ? "Edit Category" : "New Category"}
        description="FAQ categories group related questions together."
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="Name"
            value={catName}
            onChange={(e) => {
              setCatName(e.target.value);
              if (!editingCat) setCatSlug(slugify(e.target.value));
            }}
          />
          <Input
            label="Slug"
            value={catSlug}
            disabled
            onChange={() => {}}
            hint="Auto-generated from name"
          />
          <Input
            label="Sort Order"
            type="number"
            value={catSortOrder}
            onChange={(e) => setCatSortOrder(Number(e.target.value))}
          />
          <div className="flex gap-3">
            <Button
              onClick={handleSaveCat}
              loading={savingCat}
              className="flex-1"
            >
              {editingCat ? "Update" : "Create"}
            </Button>
            <Button variant="outline" onClick={resetCatForm} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </Dialog>

      {/* Item Dialog */}
      <Dialog
        open={showItemDialog}
        onClose={resetItemForm}
        title={editingItem ? "Edit Question" : "New Question"}
        description="Add a question and answer to this FAQ category."
        size="md"
      >
        <div className="space-y-4">
          <Select
            label="Category"
            value={itemCatId}
            onChange={(e) => setItemCatId(e.target.value)}
            options={categories.map((c) => ({
              value: c.id,
              label: c.name,
            }))}
          />
          <Input
            label="Question"
            value={itemQuestion}
            onChange={(e) => setItemQuestion(e.target.value)}
          />
          <Textarea
            label="Answer"
            value={itemAnswer}
            onChange={(e) => setItemAnswer(e.target.value)}
            rows={4}
            placeholder="Supports markdown"
          />
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Sort Order"
              type="number"
              value={itemSortOrder}
              onChange={(e) => setItemSortOrder(Number(e.target.value))}
            />
            <Select
              label="Status"
              value={itemStatus}
              onChange={(e) => setItemStatus(e.target.value)}
              options={[
                { value: "draft", label: "Draft" },
                { value: "published", label: "Published" },
                { value: "archived", label: "Archived" },
              ]}
            />
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleSaveItem}
              loading={savingItem}
              className="flex-1"
            >
              {editingItem ? "Update" : "Create"}
            </Button>
            <Button
              variant="outline"
              onClick={resetItemForm}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
