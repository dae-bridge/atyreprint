"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Trash2,
  Save,
  Plus,
  X,
  Paintbrush,
  Package,
  DollarSign,
  ImageIcon,
  Layers,
  Palette,
  ListChecks,
  Globe,
  Settings,
} from "lucide-react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { PageHeader, Card, CardBody, Badge, Button } from "@/components/ui";
import {
  Input,
  Textarea,
  Select,
  Toggle,
  ImageUpload,
} from "@/components/ui/FormFields";
import { InfoTooltip } from "@/components/ui/InfoTooltip";
import {
  getDocument,
  createDocument,
  updateDocument,
  softDeleteDocument,
} from "@/lib/firestore";
import { uploadFile, deleteFile } from "@/lib/storage";
import { slugify } from "@/lib/utils";
import type {
  Product,
  PublishStatus,
  ProductColor,
  ProductVariant,
  ProductAdditionalInfo,
  ImageAsset,
} from "@/types";
import { COLLECTIONS } from "@/types";

// ─── Form Types ──────────────────────────────────────────────────────────

interface ProductFormData {
  name: string;
  sku: string;
  slug: string;
  description: string;
  longDescription: string;
  priceAmount: number;
  compareAtPriceAmount: number | null;
  categoryId: string;
  categoryPath: string;
  tags: string;
  inStock: boolean;
  stockQuantity: number | null;
  badge: string;
  buttonLabel: string;
  featured: boolean;
  customisable: boolean;
  sortOrder: number;
  status: PublishStatus;
  colors: ProductColor[];
  variants: ProductVariant[];
  additionalInfo: ProductAdditionalInfo[];
  features: string;
  seoMetaTitle: string;
  seoMetaDescription: string;
  seoOgImage: string;
}

const defaultValues: ProductFormData = {
  name: "",
  sku: "",
  slug: "",
  description: "",
  longDescription: "",
  priceAmount: 0,
  compareAtPriceAmount: null,
  categoryId: "",
  categoryPath: "",
  tags: "",
  inStock: true,
  stockQuantity: null,
  badge: "",
  buttonLabel: "Add to Cart",
  featured: false,
  customisable: false,
  sortOrder: 0,
  status: "draft",
  colors: [],
  variants: [],
  additionalInfo: [],
  features: "",
  seoMetaTitle: "",
  seoMetaDescription: "",
  seoOgImage: "",
};

// ─── Section Header ──────────────────────────────────────────────────────

const SectionHeader = ({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ElementType;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) => (
  <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-gray-50/50">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon size={16} className="text-primary" />
      </div>
      <div>
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        {description && (
          <p className="text-xs text-text-muted mt-0.5">{description}</p>
        )}
      </div>
    </div>
    {action}
  </div>
);

// ─── Main Component ──────────────────────────────────────────────────────

export default function ProductFormPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string | undefined;
  const isEditing = !!productId && productId !== "new";

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [images, setImages] = useState<ImageAsset[]>([]);
  const [bannerImage, setBannerImage] = useState<ImageAsset | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({ defaultValues });

  const {
    fields: colorFields,
    append: appendColor,
    remove: removeColor,
  } = useFieldArray({ control, name: "colors" });

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({ control, name: "variants" });

  const {
    fields: infoFields,
    append: appendInfo,
    remove: removeInfo,
  } = useFieldArray({ control, name: "additionalInfo" });

  const name = watch("name");

  // Auto-slug from name (only on create)
  useEffect(() => {
    if (!isEditing && name) {
      setValue("slug", slugify(name));
    }
  }, [name, isEditing, setValue]);

  // Load existing product
  useEffect(() => {
    if (isEditing) {
      loadProduct();
    }
  }, [isEditing, productId]);

  const loadProduct = async () => {
    if (!productId) return;
    const product = await getDocument<Product>(COLLECTIONS.PRODUCTS, productId);
    if (!product) {
      router.push("/products");
      return;
    }
    setImages(product.images);
    setBannerImage(product.bannerImage);
    reset({
      name: product.name,
      sku: product.sku,
      slug: product.slug,
      description: product.description,
      longDescription: product.longDescription,
      priceAmount: product.price.amount,
      compareAtPriceAmount: product.compareAtPrice?.amount ?? null,
      categoryId: product.categoryId,
      categoryPath: product.categoryPath.join(" > "),
      tags: product.tags.join(", "),
      inStock: product.inStock,
      stockQuantity: product.stockQuantity,
      badge: product.badge ?? "",
      buttonLabel: product.buttonLabel,
      featured: product.featured,
      customisable: product.customisable ?? false,
      sortOrder: product.sortOrder,
      status: product.status,
      colors: product.colors,
      variants: product.variants,
      additionalInfo: product.additionalInfo,
      features: product.features.join("\n"),
      seoMetaTitle: product.seo.metaTitle,
      seoMetaDescription: product.seo.metaDescription,
      seoOgImage: product.seo.ogImage,
    });
  };

  const handleImageUpload = useCallback(async (file: File) => {
    const { url, storagePath } = await uploadFile(
      file,
      `products/${Date.now()}-${file.name}`,
    );
    setImages((prev) => [...prev, { url, alt: file.name, storagePath }]);
  }, []);

  const handleRemoveImage = useCallback(
    async (index: number) => {
      const img = images[index];
      if (img.storagePath) await deleteFile(img.storagePath);
      setImages((prev) => prev.filter((_, i) => i !== index));
    },
    [images],
  );

  const handleBannerUpload = useCallback(async (file: File) => {
    const { url, storagePath } = await uploadFile(
      file,
      `products/banners/${Date.now()}-${file.name}`,
    );
    setBannerImage({ url, alt: file.name, storagePath });
  }, []);

  const onSubmit = async (data: ProductFormData) => {
    setSaving(true);
    try {
      const productData = {
        name: data.name,
        sku: data.sku,
        slug: data.slug,
        description: data.description,
        longDescription: data.longDescription,
        price: { amount: Math.round(data.priceAmount), currency: "GBP" },
        compareAtPrice: data.compareAtPriceAmount
          ? { amount: Math.round(data.compareAtPriceAmount), currency: "GBP" }
          : null,
        images,
        bannerImage,
        categoryId: data.categoryId,
        categoryPath: data.categoryPath
          .split(">")
          .map((s) => s.trim())
          .filter(Boolean),
        tags: data.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        colors: data.colors,
        variants: data.variants,
        additionalInfo: data.additionalInfo,
        features: data.features
          .split("\n")
          .map((f) => f.trim())
          .filter(Boolean),
        inStock: data.inStock,
        stockQuantity: data.stockQuantity,
        badge: data.badge || null,
        buttonLabel: data.buttonLabel || "Add to Cart",
        featured: data.featured,
        customisable: data.customisable,
        sortOrder: data.sortOrder,
        rating: 0,
        reviewCount: 0,
        status: data.status,
        seo: {
          metaTitle: data.seoMetaTitle || data.name,
          metaDescription: data.seoMetaDescription || data.description,
          ogImage: data.seoOgImage || images[0]?.url || "",
        },
        isDeleted: false,
        deletedAt: null,
      };

      if (isEditing && productId) {
        await updateDocument(COLLECTIONS.PRODUCTS, productId, productData);
      } else {
        await createDocument<Product>(
          COLLECTIONS.PRODUCTS,
          productData as Omit<Product, "id" | "createdAt" | "updatedAt">,
        );
      }
      router.push("/products");
    } catch (err) {
      console.error("Failed to save product:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!productId || !confirm("Are you sure you want to delete this product?"))
      return;
    setDeleting(true);
    try {
      await softDeleteDocument(COLLECTIONS.PRODUCTS, productId);
      router.push("/products");
    } catch (err) {
      console.error("Failed to delete product:", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      {/* ─── Header ─── */}
      <PageHeader
        title={isEditing ? "Edit Product" : "New Product"}
        description={
          isEditing
            ? "Update product details and save changes."
            : "Fill in the details to add a new product to your catalog."
        }
      >
        <Button variant="ghost" onClick={() => router.push("/products")}>
          <ArrowLeft size={16} /> Back
        </Button>
        {isEditing && (
          <Button variant="danger" onClick={handleDelete} loading={deleting}>
            <Trash2 size={16} /> Delete
          </Button>
        )}
        <Button onClick={handleSubmit(onSubmit)} loading={saving}>
          <Save size={16} /> {isEditing ? "Update" : "Create"}
        </Button>
      </PageHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* ═══════════════════════════════════════════════
              LEFT COLUMN — Main content (2/3 width)
             ═══════════════════════════════════════════════ */}
          <div className="lg:col-span-2 space-y-6">
            {/* ─── Basic Information ─── */}
            <Card>
              <SectionHeader
                icon={Package}
                title="Basic Information"
                description="Product name, description, and identifiers"
              />
              <CardBody className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Product Name"
                    tooltip="The display name customers will see on the storefront. Example: 'Classic Cotton T-Shirt'"
                    {...register("name", { required: "Name is required" })}
                    error={errors.name?.message}
                    placeholder="e.g. Classic Cotton T-Shirt"
                  />
                  <Input
                    label="SKU"
                    tooltip="Stock Keeping Unit — a unique identifier for inventory tracking. Example: 'TEE-BLK-001'"
                    {...register("sku", { required: "SKU is required" })}
                    error={errors.sku?.message}
                    placeholder="e.g. TEE-BLK-001"
                  />
                </div>
                <Input
                  label="URL Slug"
                  tooltip="The URL-friendly version of the name. Auto-generated from the product name. Example: 'classic-cotton-t-shirt' → atyreprint.com/shop/classic-cotton-t-shirt"
                  {...register("slug")}
                  disabled
                  hint="Auto-generated from product name"
                />
                <Textarea
                  label="Short Description"
                  tooltip="A brief summary shown on product cards and search results. Keep it under 160 characters for best results."
                  {...register("description")}
                  rows={2}
                  placeholder="Brief product summary for cards and previews..."
                />
                <Textarea
                  label="Detailed Description"
                  tooltip="The full product description shown on the product detail page. Supports line breaks. Be descriptive about material, fit, and use cases."
                  {...register("longDescription")}
                  rows={5}
                  placeholder="Full product details — material, fit, care instructions..."
                />
              </CardBody>
            </Card>

            {/* ─── Pricing ─── */}
            <Card>
              <SectionHeader
                icon={DollarSign}
                title="Pricing"
                description="All prices in pence (e.g. 1999 = £19.99)"
              />
              <CardBody>
                <div className="grid sm:grid-cols-3 gap-4">
                  <Input
                    label="Price"
                    tooltip="The selling price in pence. Example: enter 1999 for £19.99. This avoids decimal rounding issues."
                    type="number"
                    {...register("priceAmount", {
                      required: "Price is required",
                      valueAsNumber: true,
                    })}
                    error={errors.priceAmount?.message}
                    placeholder="1999"
                  />
                  <Input
                    label="Compare-at Price"
                    tooltip="The original/RRP price before discount. If set, the product shows a 'Sale' strikethrough. Leave empty if not on sale. Example: 2499 (shows as £24.99 crossed out)"
                    type="number"
                    {...register("compareAtPriceAmount", {
                      valueAsNumber: true,
                    })}
                    placeholder="2499"
                  />
                  <Select
                    label="Badge"
                    tooltip="A small label shown on the product card top corner. Use 'Sale' if compare-at price is set, or 'New' for recent additions."
                    options={[
                      { value: "", label: "None" },
                      { value: "New", label: "New" },
                      { value: "Popular", label: "Popular" },
                      { value: "Hot", label: "Hot" },
                      { value: "Sale", label: "Sale" },
                    ]}
                    {...register("badge")}
                  />
                </div>
              </CardBody>
            </Card>

            {/* ─── Product Images ─── */}
            <Card>
              <SectionHeader
                icon={ImageIcon}
                title="Product Images"
                description="Upload gallery images and a banner"
              />
              <CardBody className="space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-medium text-foreground">
                      Gallery Images
                    </span>
                    <InfoTooltip
                      text="Upload multiple images of the product from different angles. The first image becomes the primary/thumbnail. Recommended: square images, at least 800×800px."
                      position="right"
                    />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {images.map((img, i) => (
                      <div
                        key={i}
                        className="relative group aspect-square rounded-lg overflow-hidden border border-border bg-gray-50"
                      >
                        <img
                          src={img.url}
                          alt={img.alt}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(i)}
                          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 text-red-500 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                        >
                          <X size={12} />
                        </button>
                        {i === 0 && (
                          <span className="absolute bottom-1 left-1 text-[10px] bg-primary text-white px-1.5 py-0.5 rounded-full font-medium">
                            Primary
                          </span>
                        )}
                      </div>
                    ))}
                    <ImageUpload onChange={handleImageUpload} />
                  </div>
                </div>
                <div className="border-t border-border pt-5">
                  <ImageUpload
                    label="Banner Image"
                    value={bannerImage?.url}
                    onChange={handleBannerUpload}
                    onRemove={() => setBannerImage(null)}
                  />
                  <p className="text-xs text-text-muted mt-1.5">
                    Wide banner for the product detail page hero. Recommended:
                    1200×400px.
                  </p>
                </div>
              </CardBody>
            </Card>

            {/* ─── Colors ─── */}
            <Card>
              <SectionHeader
                icon={Palette}
                title="Available Colors"
                description="Color options customers can choose from"
                action={
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      appendColor({ name: "", hex: "#000000", imageIndex: 0 })
                    }
                  >
                    <Plus size={14} /> Add Color
                  </Button>
                }
              />
              <CardBody>
                {colorFields.length === 0 ? (
                  <p className="text-sm text-text-muted py-2">
                    No colors added yet. Add colors if this product comes in
                    multiple color options.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {colorFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-lg border border-gray-100"
                      >
                        <div
                          className="w-8 h-8 rounded-full border-2 border-white shadow-sm flex-shrink-0"
                          style={{
                            backgroundColor: watch(`colors.${index}.hex`),
                          }}
                        />
                        <Input
                          {...register(`colors.${index}.name`)}
                          placeholder="Color name"
                          className="flex-1 !py-1.5"
                        />
                        <input
                          type="color"
                          {...register(`colors.${index}.hex`)}
                          className="h-8 w-10 rounded border border-border cursor-pointer"
                        />
                        <Input
                          {...register(`colors.${index}.imageIndex`, {
                            valueAsNumber: true,
                          })}
                          type="number"
                          placeholder="#"
                          className="w-16 !py-1.5"
                          tooltip="Which gallery image index (0-based) to show when this color is selected"
                        />
                        <button
                          type="button"
                          onClick={() => removeColor(index)}
                          className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>

            {/* ─── Variants ─── */}
            <Card>
              <SectionHeader
                icon={Layers}
                title="Variants"
                description="Size, capacity, or other variant options"
                action={
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendVariant({ label: "", options: [] })}
                  >
                    <Plus size={14} /> Add Variant
                  </Button>
                }
              />
              <CardBody>
                {variantFields.length === 0 ? (
                  <p className="text-sm text-text-muted py-2">
                    No variants yet. Add variants like Size (XS, S, M, L, XL) or
                    Capacity (250ml, 500ml).
                  </p>
                ) : (
                  <div className="space-y-3">
                    {variantFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-lg border border-gray-100"
                      >
                        <Input
                          {...register(`variants.${index}.label`)}
                          placeholder="e.g. Size"
                          className="w-36 !py-1.5"
                        />
                        <Input
                          {...register(`variants.${index}.options`)}
                          placeholder="XS, S, M, L, XL"
                          hint="Comma separated"
                          className="flex-1 !py-1.5"
                        />
                        <button
                          type="button"
                          onClick={() => removeVariant(index)}
                          className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>

            {/* ─── Additional Info ─── */}
            <Card>
              <SectionHeader
                icon={ListChecks}
                title="Additional Information"
                description="Specs, material details, or any extra facts"
                action={
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendInfo({ label: "", value: "" })}
                  >
                    <Plus size={14} /> Add Field
                  </Button>
                }
              />
              <CardBody>
                {infoFields.length === 0 ? (
                  <p className="text-sm text-text-muted py-2">
                    No additional info. Add key-value pairs like &quot;Material:
                    100% Cotton&quot; or &quot;Weight: 180gsm&quot;.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {infoFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-lg border border-gray-100"
                      >
                        <Input
                          {...register(`additionalInfo.${index}.label`)}
                          placeholder="Label (e.g. Material)"
                          className="flex-1 !py-1.5"
                        />
                        <Input
                          {...register(`additionalInfo.${index}.value`)}
                          placeholder="Value (e.g. 100% Cotton)"
                          className="flex-1 !py-1.5"
                        />
                        <button
                          type="button"
                          onClick={() => removeInfo(index)}
                          className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>

            {/* ─── Features ─── */}
            <Card>
              <SectionHeader
                icon={ListChecks}
                title="Product Features"
                description="Bullet-point highlights for the product page"
              />
              <CardBody>
                <Textarea
                  {...register("features")}
                  rows={4}
                  tooltip="Each line becomes a bullet point on the product page. Example: 'Premium 100% organic cotton' on one line, 'Machine washable at 30°C' on the next."
                  placeholder={
                    "Premium 100% organic cotton\nMachine washable at 30°C\nAvailable in 8 colours\nUnisex fit"
                  }
                  hint="One feature per line"
                />
              </CardBody>
            </Card>

            {/* ─── SEO ─── */}
            <Card>
              <SectionHeader
                icon={Globe}
                title="SEO & Meta"
                description="Search engine optimization settings"
              />
              <CardBody className="space-y-4">
                <Input
                  label="Meta Title"
                  tooltip="The title shown in Google search results and browser tabs. Keep under 60 characters. If empty, defaults to the product name."
                  {...register("seoMetaTitle")}
                  placeholder="Defaults to product name"
                />
                <Textarea
                  label="Meta Description"
                  tooltip="The description shown below the title in Google results. Keep between 120–160 characters for best results."
                  {...register("seoMetaDescription")}
                  rows={2}
                  placeholder="Brief SEO description (120-160 characters)..."
                />
                <Input
                  label="OG Image URL"
                  tooltip="The image shown when the product is shared on social media (Facebook, Twitter, etc.). If empty, falls back to the first gallery image."
                  {...register("seoOgImage")}
                  placeholder="Defaults to first product image"
                />
              </CardBody>
            </Card>
          </div>

          {/* ═══════════════════════════════════════════════
              RIGHT COLUMN — Sidebar (1/3 width)
             ═══════════════════════════════════════════════ */}
          <div className="space-y-6">
            {/* ─── Publishing ─── */}
            <Card>
              <SectionHeader icon={Settings} title="Publishing" />
              <CardBody className="space-y-4">
                <Select
                  label="Status"
                  tooltip="Draft = only visible in admin. Published = live on storefront. Archived = hidden but not deleted."
                  options={[
                    { value: "draft", label: "📝 Draft" },
                    { value: "published", label: "🟢 Published" },
                    { value: "archived", label: "📦 Archived" },
                  ]}
                  {...register("status")}
                />
                <Input
                  label="Sort Order"
                  tooltip="Controls the display order on category pages. Lower numbers appear first. Example: 0 = top of the list."
                  type="number"
                  {...register("sortOrder", { valueAsNumber: true })}
                />
                <Controller
                  control={control}
                  name="featured"
                  render={({ field }) => (
                    <Toggle
                      label="Featured Product"
                      description="Show on homepage featured section"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </CardBody>
            </Card>

            {/* ─── Product Designer ─── */}
            <Card>
              <div className="px-6 py-4 border-b border-[var(--border)] bg-gradient-to-r from-purple-50 to-blue-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Paintbrush size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-foreground">
                      Product Designer
                    </h2>
                    <p className="text-xs text-text-muted mt-0.5">
                      Enable customer customisation
                    </p>
                  </div>
                </div>
              </div>
              <CardBody className="space-y-3">
                <Controller
                  control={control}
                  name="customisable"
                  render={({ field }) => (
                    <Toggle
                      label="Allow Customisation"
                      description="Customers can personalise this product using the designer tool"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <p className="text-xs text-text-muted leading-relaxed">
                  When enabled, customers will see a &quot;Customise&quot;
                  button on the product page that opens the product designer
                  where they can add their own text, logos, and artwork.
                </p>
              </CardBody>
            </Card>

            {/* ─── Organization ─── */}
            <Card>
              <SectionHeader icon={Layers} title="Organization" />
              <CardBody className="space-y-4">
                <Input
                  label="Category ID"
                  tooltip="The Firestore document ID of the category this product belongs to. You can find this in the Categories page."
                  {...register("categoryId")}
                  placeholder="e.g. hoodies"
                />
                <Input
                  label="Category Path"
                  tooltip="Breadcrumb path for navigation. Use ' > ' to separate levels. Example: 'Clothing > Hoodies' shows as Clothing → Hoodies on the storefront."
                  {...register("categoryPath")}
                  placeholder="e.g. Clothing > Hoodies"
                />
                <Input
                  label="Tags"
                  tooltip="Comma-separated keywords for filtering and search. Example: 'summer, casual, cotton, unisex'. Tags help customers find products."
                  {...register("tags")}
                  placeholder="e.g. summer, casual, cotton"
                />
              </CardBody>
            </Card>

            {/* ─── Inventory ─── */}
            <Card>
              <SectionHeader icon={Package} title="Inventory" />
              <CardBody className="space-y-4">
                <Controller
                  control={control}
                  name="inStock"
                  render={({ field }) => (
                    <Toggle
                      label="In Stock"
                      description="Uncheck to mark as out of stock"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <Input
                  label="Stock Quantity"
                  tooltip="Track exact stock count. Leave empty (or 0) for unlimited stock — useful for print-on-demand products."
                  type="number"
                  {...register("stockQuantity", { valueAsNumber: true })}
                  placeholder="Unlimited"
                />
              </CardBody>
            </Card>

            {/* ─── Display ─── */}
            <Card>
              <SectionHeader icon={Settings} title="Display Options" />
              <CardBody className="space-y-4">
                <Input
                  label="Button Label"
                  tooltip="The text on the main call-to-action button. Use 'Add to Cart' for standard products or 'Customise & Order' for customisable ones."
                  {...register("buttonLabel")}
                  placeholder="Add to Cart"
                />
              </CardBody>
            </Card>
          </div>
        </div>
      </form>
    </>
  );
}
