"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Star,
  Trash2,
  Pencil,
  MessageSquare,
  GripVertical,
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
import {
  Input,
  Textarea,
  Select,
  Toggle,
  ImageUpload,
} from "@/components/ui/FormFields";
import {
  queryDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
} from "@/lib/firestore";
import { uploadFile } from "@/lib/storage";
import type { Testimonial, ImageAsset } from "@/types";
import { COLLECTIONS } from "@/types";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formName, setFormName] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formRole, setFormRole] = useState("");
  const [formText, setFormText] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formFeatured, setFormFeatured] = useState(false);
  const [formStatus, setFormStatus] = useState("published");
  const [formSortOrder, setFormSortOrder] = useState(0);
  const [formAvatar, setFormAvatar] = useState<ImageAsset | null>(null);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const data = await queryDocuments<Testimonial>(COLLECTIONS.TESTIMONIALS, {
        sortBy: "sortOrder",
        sortDirection: "asc",
      });
      setTestimonials(data);
    } catch (err) {
      console.error("Failed to load testimonials:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormName("");
    setFormLocation("");
    setFormRole("");
    setFormText("");
    setFormRating(5);
    setFormFeatured(false);
    setFormStatus("published");
    setFormSortOrder(0);
    setFormAvatar(null);
    setEditing(null);
    setShowDialog(false);
  };

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setFormName(t.name);
    setFormLocation(t.location);
    setFormRole(t.role ?? "");
    setFormText(t.text);
    setFormRating(t.rating);
    setFormFeatured(t.featured);
    setFormStatus(t.status);
    setFormSortOrder(t.sortOrder);
    setFormAvatar(t.avatar);
    setShowDialog(true);
  };

  const handleSave = async () => {
    if (!formName.trim() || !formText.trim()) return;
    setSaving(true);
    try {
      const data = {
        name: formName,
        location: formLocation,
        role: formRole || "",
        avatar: formAvatar,
        text: formText,
        rating: formRating,
        featured: formFeatured,
        sortOrder: formSortOrder,
        status: formStatus as "draft" | "published" | "archived",
      };

      if (editing) {
        await updateDocument(COLLECTIONS.TESTIMONIALS, editing.id, data);
      } else {
        await createDocument<Testimonial>(
          COLLECTIONS.TESTIMONIALS,
          data as Omit<Testimonial, "id" | "createdAt" | "updatedAt">,
        );
      }
      resetForm();
      loadTestimonials();
    } catch (err) {
      console.error("Failed to save testimonial:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await deleteDocument(COLLECTIONS.TESTIMONIALS, id);
      loadTestimonials();
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  const handleAvatarUpload = async (file: File) => {
    const { url, storagePath } = await uploadFile(
      file,
      `testimonials/${Date.now()}-${file.name}`,
    );
    setFormAvatar({ url, alt: formName || file.name, storagePath });
  };

  const statusColors: Record<string, "success" | "warning" | "default"> = {
    published: "success",
    draft: "warning",
    archived: "default",
  };

  return (
    <>
      <PageHeader
        title="Testimonials"
        description="Manage customer testimonials."
      >
        <Button
          onClick={() => {
            resetForm();
            setShowDialog(true);
          }}
        >
          <Plus size={16} /> Add Testimonial
        </Button>
      </PageHeader>

      <div>
        <div>
          {loading ? (
            <div className="animate-pulse space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-100 rounded-xl" />
              ))}
            </div>
          ) : testimonials.length === 0 ? (
            <Card>
              <EmptyState
                icon={<MessageSquare size={24} />}
                title="No testimonials yet"
                description="Add customer testimonials to display on the site."
                action={
                  <Button onClick={() => setShowDialog(true)}>
                    <Plus size={16} /> Add Testimonial
                  </Button>
                }
              />
            </Card>
          ) : (
            <div className="space-y-3">
              {testimonials.map((t) => (
                <Card key={t.id}>
                  <CardBody>
                    <div className="flex items-start gap-4">
                      <GripVertical
                        size={14}
                        className="text-[var(--text-muted)] cursor-grab mt-1"
                      />
                      {t.avatar ? (
                        <img
                          src={t.avatar.url}
                          alt={t.avatar.alt}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-[var(--text-muted)]">
                          {t.name.charAt(0)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-[var(--foreground)]">
                            {t.name}
                          </p>
                          <Badge variant={statusColors[t.status]}>
                            {t.status}
                          </Badge>
                          {t.featured && (
                            <Badge variant="secondary">Featured</Badge>
                          )}
                        </div>
                        <p className="text-xs text-[var(--text-muted)] mb-2">
                          {t.location} {t.role && `· ${t.role}`}
                        </p>
                        <div className="flex gap-0.5 mb-2">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              size={14}
                              className={
                                s <= t.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
                          &ldquo;{t.text}&rdquo;
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEdit(t)}
                          className="p-1.5 rounded hover:bg-gray-100 text-[var(--text-muted)] hover:text-[var(--foreground)]"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(t.id)}
                          className="p-1.5 rounded hover:bg-red-50 text-[var(--text-muted)] hover:text-red-500"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Dialog form */}
      <Dialog
        open={showDialog}
        onClose={resetForm}
        title={editing ? "Edit Testimonial" : "New Testimonial"}
        description="Customer feedback displayed on the storefront."
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Name"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
            />
            <Input
              label="Location"
              value={formLocation}
              onChange={(e) => setFormLocation(e.target.value)}
              placeholder="e.g. London, UK"
            />
          </div>
          <Input
            label="Role"
            value={formRole}
            onChange={(e) => setFormRole(e.target.value)}
            placeholder="e.g. Business Owner"
          />
          <Textarea
            label="Testimonial Text"
            value={formText}
            onChange={(e) => setFormText(e.target.value)}
            rows={4}
          />
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setFormRating(s)}
                    className="focus:outline-none"
                  >
                    <Star
                      size={20}
                      className={
                        s <= formRating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>
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
          </div>
          <ImageUpload
            label="Avatar"
            value={formAvatar?.url}
            onChange={handleAvatarUpload}
            onRemove={() => setFormAvatar(null)}
          />
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Sort Order"
              type="number"
              value={formSortOrder}
              onChange={(e) => setFormSortOrder(Number(e.target.value))}
            />
            <Toggle
              label="Featured"
              description="Show prominently on homepage"
              checked={formFeatured}
              onChange={setFormFeatured}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button onClick={handleSave} loading={saving} className="flex-1">
              {editing ? "Update" : "Create"}
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
