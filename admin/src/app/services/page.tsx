"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, Wrench, GripVertical, Save } from "lucide-react";
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
  ImageUpload,
} from "@/components/ui/FormFields";
import {
  queryDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
} from "@/lib/firestore";
import { uploadFile } from "@/lib/storage";
import { slugify } from "@/lib/utils";
import type { ServicePage, ImageAsset } from "@/types";
import { COLLECTIONS } from "@/types";

export default function ServicesPage() {
  const [services, setServices] = useState<ServicePage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editing, setEditing] = useState<ServicePage | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formShortDescription, setFormShortDescription] = useState("");
  const [formIcon, setFormIcon] = useState("");
  const [formImage, setFormImage] = useState<ImageAsset | null>(null);
  const [formContent, setFormContent] = useState("");
  const [formFeatures, setFormFeatures] = useState("");
  const [formSortOrder, setFormSortOrder] = useState(0);
  const [formStatus, setFormStatus] = useState("published");

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await queryDocuments<ServicePage>(COLLECTIONS.SERVICES, {
        sortBy: "sortOrder",
        sortDirection: "asc",
      });
      setServices(data);
    } catch (err) {
      console.error("Failed to load services:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormTitle("");
    setFormSlug("");
    setFormShortDescription("");
    setFormIcon("");
    setFormImage(null);
    setFormContent("");
    setFormFeatures("");
    setFormSortOrder(0);
    setFormStatus("published");
    setEditing(null);
    setShowDialog(false);
  };

  const openEdit = (s: ServicePage) => {
    setEditing(s);
    setFormTitle(s.title);
    setFormSlug(s.slug);
    setFormShortDescription(s.shortDescription);
    setFormIcon(s.icon);
    setFormImage(s.image);
    setFormContent(s.content);
    setFormFeatures(s.features.join("\n"));
    setFormSortOrder(s.sortOrder);
    setFormStatus(s.status);
    setShowDialog(true);
  };

  const handleSave = async () => {
    if (!formTitle.trim()) return;
    setSaving(true);
    try {
      const data = {
        title: formTitle,
        slug: formSlug || slugify(formTitle),
        shortDescription: formShortDescription,
        icon: formIcon,
        image: formImage,
        content: formContent,
        features: formFeatures
          .split("\n")
          .map((f) => f.trim())
          .filter(Boolean),
        sortOrder: formSortOrder,
        status: formStatus as "draft" | "published" | "archived",
        seo: {
          metaTitle: formTitle,
          metaDescription: formShortDescription,
          ogImage: formImage?.url ?? "",
        },
      };

      if (editing) {
        await updateDocument(COLLECTIONS.SERVICES, editing.id, data);
      } else {
        await createDocument<ServicePage>(
          COLLECTIONS.SERVICES,
          data as Omit<ServicePage, "id" | "createdAt" | "updatedAt">,
        );
      }
      resetForm();
      loadServices();
    } catch (err) {
      console.error("Failed to save service:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service page?")) return;
    try {
      await deleteDocument(COLLECTIONS.SERVICES, id);
      loadServices();
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  const handleImageUpload = async (file: File) => {
    const { url, storagePath } = await uploadFile(
      file,
      `services/${Date.now()}-${file.name}`,
    );
    setFormImage({ url, alt: formTitle || file.name, storagePath });
  };

  const statusColors: Record<string, "success" | "warning" | "default"> = {
    published: "success",
    draft: "warning",
    archived: "default",
  };

  return (
    <>
      <PageHeader
        title="Services"
        description="Manage service pages (printing, embroidery, etc)."
      >
        <Button
          onClick={() => {
            resetForm();
            setShowDialog(true);
          }}
        >
          <Plus size={16} /> Add Service
        </Button>
      </PageHeader>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          {loading ? (
            <div className="animate-pulse space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-100 rounded-xl" />
              ))}
            </div>
          ) : services.length === 0 ? (
            <Card>
              <EmptyState
                icon={<Wrench size={24} />}
                title="No services yet"
                description="Add service pages for your business."
                action={
                  <Button onClick={() => setShowDialog(true)}>
                    <Plus size={16} /> Add Service
                  </Button>
                }
              />
            </Card>
          ) : (
            <div className="space-y-3">
              {services.map((s) => (
                <Card key={s.id}>
                  <CardBody>
                    <div className="flex items-start gap-4">
                      <GripVertical
                        size={14}
                        className="text-[var(--text-muted)] cursor-grab mt-1"
                      />
                      {s.image ? (
                        <img
                          src={s.image.url}
                          alt={s.image.alt}
                          className="w-16 h-12 rounded object-cover"
                        />
                      ) : (
                        <div className="w-16 h-12 rounded bg-gray-100 flex items-center justify-center text-lg">
                          {s.icon || "🔧"}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-[var(--foreground)]">
                            {s.title}
                          </p>
                          <Badge variant={statusColors[s.status]}>
                            {s.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
                          {s.shortDescription}
                        </p>
                        <p className="text-xs text-[var(--text-muted)] mt-1">
                          {s.features.length} features · /{s.slug}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEdit(s)}
                          className="p-1.5 rounded hover:bg-gray-100 text-[var(--text-muted)] hover:text-[var(--foreground)]"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(s.id)}
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

      {/* Service Dialog */}
      <Dialog
        open={showDialog}
        onClose={resetForm}
        title={editing ? "Edit Service" : "New Service"}
        description="Service pages describe your offerings like printing, embroidery, etc."
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Title"
              value={formTitle}
              onChange={(e) => {
                setFormTitle(e.target.value);
                if (!editing) setFormSlug(slugify(e.target.value));
              }}
            />
            <Input
              label="Slug"
              value={formSlug}
              disabled
              onChange={() => {}}
              hint="Auto-generated from title"
            />
          </div>
          <Textarea
            label="Short Description"
            value={formShortDescription}
            onChange={(e) => setFormShortDescription(e.target.value)}
            rows={2}
          />
          <Input
            label="Icon"
            value={formIcon}
            onChange={(e) => setFormIcon(e.target.value)}
            hint="Lucide icon name"
          />
          <ImageUpload
            label="Service Image"
            value={formImage?.url}
            onChange={handleImageUpload}
            onRemove={() => setFormImage(null)}
          />
          <Textarea
            label="Content"
            value={formContent}
            onChange={(e) => setFormContent(e.target.value)}
            rows={8}
            placeholder="Rich description (supports markdown)"
          />
          <Textarea
            label="Features"
            value={formFeatures}
            onChange={(e) => setFormFeatures(e.target.value)}
            rows={4}
            placeholder="One feature per line"
          />
          <div className="grid md:grid-cols-2 gap-4">
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
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleSave}
              loading={saving}
              className="flex-1"
            >
              {editing ? "Update" : "Create"}
            </Button>
            <Button
              variant="outline"
              onClick={resetForm}
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
