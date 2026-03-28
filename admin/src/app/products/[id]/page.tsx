"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Trash2, Save, Eye } from "lucide-react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { PageHeader, Card, CardBody, Badge, Button } from "@/components/ui";
import { Input, Textarea, Select, Toggle, ImageUpload } from "@/components/ui/FormFields";
import { getDocument, createDocument, updateDocument, softDeleteDocument } from "@/lib/firestore";
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

  // Auto-slug from name
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
    const { url, storagePath } = await uploadFile(file, `products/${Date.now()}-${file.name}`);
    setImages((prev) => [
      ...prev,
      { url, alt: file.name, storagePath },
    ]);
  }, []);

  const handleRemoveImage = useCallback(async (index: number) => {
    const img = images[index];
    if (img.storagePath) {
      await deleteFile(img.storagePath);
    }
    setImages((prev) => prev.filter((_, i) => i !== index));
  }, [images]);

  const handleBannerUpload = useCallback(async (file: File) => {
    const { url, storagePath } = await uploadFile(file, `products/banners/${Date.now()}-${file.name}`);
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
        categoryPath: data.categoryPath.split(">").map((s) => s.trim()).filter(Boolean),
        tags: data.tags.split(",").map((t) => t.trim()).filter(Boolean),
        colors: data.colors,
        variants: data.variants,
        additionalInfo: data.additionalInfo,
        features: data.features.split("\n").map((f) => f.trim()).filter(Boolean),
        inStock: data.inStock,
        stockQuantity: data.stockQuantity,
        badge: data.badge || null,
        buttonLabel: data.buttonLabel || "Add to Cart",
        featured: data.featured,
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
    if (!productId || !confirm("Are you sure you want to delete this product?")) return;
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
      <PageHeader
        title={isEditing ? "Edit Product" : "New Product"}
        description={isEditing ? "Update product details." : "Add a new product to your catalog."}
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <Card>
          <div className="px-6 py-4 border-b border-[var(--border)]">
            <h2 className="text-base font-semibold">Basic Information</h2>
          </div>
          <CardBody className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Product Name" {...register("name", { required: "Name is required" })} error={errors.name?.message} />
              <Input label="SKU" {...register("sku", { required: "SKU is required" })} error={errors.sku?.message} />
            </div>
            <Input label="URL Slug" {...register("slug")} hint="Auto-generated from name" />
            <Textarea label="Short Description" {...register("description")} rows={3} />
            <Textarea label="Long Description" {...register("longDescription")} rows={6} />
          </CardBody>
        </Card>

        {/* Pricing */}
        <Card>
          <div className="px-6 py-4 border-b border-[var(--border)]">
            <h2 className="text-base font-semibold">Pricing</h2>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">Prices in pence (1999 = £19.99)</p>
          </div>
          <CardBody className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Input label="Price (pence)" type="number" {...register("priceAmount", { required: "Price is required", valueAsNumber: true })} error={errors.priceAmount?.message} />
              <Input label="Compare-at Price (pence)" type="number" {...register("compareAtPriceAmount", { valueAsNumber: true })} hint="Original price for sale badge" />
              <Select
                label="Badge"
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

        {/* Images */}
        <Card>
          <div className="px-6 py-4 border-b border-[var(--border)]">
            <h2 className="text-base font-semibold">Images</h2>
          </div>
          <CardBody>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((img, i) => (
                <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border border-[var(--border)]">
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(i)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <ImageUpload onChange={handleImageUpload} />
            </div>
            <div className="mt-4">
              <ImageUpload
                label="Banner Image"
                value={bannerImage?.url}
                onChange={handleBannerUpload}
                onRemove={() => setBannerImage(null)}
              />
            </div>
          </CardBody>
        </Card>

        {/* Taxonomy & Inventory */}
        <Card>
          <div className="px-6 py-4 border-b border-[var(--border)]">
            <h2 className="text-base font-semibold">Organization</h2>
          </div>
          <CardBody className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Category ID" {...register("categoryId")} />
              <Input
                label="Category Path"
                {...register("categoryPath")}
                hint="e.g. Clothing > Hoodies"
              />
            </div>
            <Input label="Tags" {...register("tags")} hint="Comma separated" />
            <div className="grid md:grid-cols-2 gap-4">
              <Controller
                control={control}
                name="inStock"
                render={({ field }) => (
                  <Toggle
                    label="In Stock"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <Input label="Stock Quantity" type="number" {...register("stockQuantity", { valueAsNumber: true })} hint="Leave empty for unlimited" />
            </div>
          </CardBody>
        </Card>

        {/* Colors */}
        <Card>
          <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
            <h2 className="text-base font-semibold">Colors</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendColor({ name: "", hex: "#000000", imageIndex: 0 })}
            >
              Add Color
            </Button>
          </div>
          <CardBody className="space-y-3">
            {colorFields.map((field, index) => (
              <div key={field.id} className="flex items-end gap-3">
                <Input label="Name" {...register(`colors.${index}.name`)} className="flex-1" />
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium">Hex</label>
                  <input type="color" {...register(`colors.${index}.hex`)} className="h-10 w-12 rounded border border-[var(--border)]" />
                </div>
                <Input label="Image #" type="number" {...register(`colors.${index}.imageIndex`, { valueAsNumber: true })} className="w-20" />
                <button type="button" onClick={() => removeColor(index)} className="text-red-500 text-sm pb-2">Remove</button>
              </div>
            ))}
            {colorFields.length === 0 && <p className="text-sm text-[var(--text-muted)]">No colors added.</p>}
          </CardBody>
        </Card>

        {/* Variants */}
        <Card>
          <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
            <h2 className="text-base font-semibold">Variants</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendVariant({ label: "", options: [] })}
            >
              Add Variant
            </Button>
          </div>
          <CardBody className="space-y-3">
            {variantFields.map((field, index) => (
              <div key={field.id} className="flex items-end gap-3">
                <Input label="Label" {...register(`variants.${index}.label`)} placeholder="e.g. Size" className="w-40" />
                <Input
                  label="Options"
                  {...register(`variants.${index}.options`)}
                  placeholder="XS, S, M, L, XL"
                  hint="Comma separated"
                  className="flex-1"
                />
                <button type="button" onClick={() => removeVariant(index)} className="text-red-500 text-sm pb-2">Remove</button>
              </div>
            ))}
            {variantFields.length === 0 && <p className="text-sm text-[var(--text-muted)]">No variants added.</p>}
          </CardBody>
        </Card>

        {/* Additional Info */}
        <Card>
          <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
            <h2 className="text-base font-semibold">Additional Info</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendInfo({ label: "", value: "" })}
            >
              Add Field
            </Button>
          </div>
          <CardBody className="space-y-3">
            {infoFields.map((field, index) => (
              <div key={field.id} className="flex items-end gap-3">
                <Input label="Label" {...register(`additionalInfo.${index}.label`)} className="flex-1" />
                <Input label="Value" {...register(`additionalInfo.${index}.value`)} className="flex-1" />
                <button type="button" onClick={() => removeInfo(index)} className="text-red-500 text-sm pb-2">Remove</button>
              </div>
            ))}
            {infoFields.length === 0 && <p className="text-sm text-[var(--text-muted)]">No info fields added.</p>}
          </CardBody>
        </Card>

        {/* Features */}
        <Card>
          <div className="px-6 py-4 border-b border-[var(--border)]">
            <h2 className="text-base font-semibold">Features</h2>
          </div>
          <CardBody>
            <Textarea label="Product Features" {...register("features")} rows={4} hint="One feature per line" />
          </CardBody>
        </Card>

        {/* Display & Publishing */}
        <Card>
          <div className="px-6 py-4 border-b border-[var(--border)]">
            <h2 className="text-base font-semibold">Display & Publishing</h2>
          </div>
          <CardBody className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Input label="Button Label" {...register("buttonLabel")} />
              <Input label="Sort Order" type="number" {...register("sortOrder", { valueAsNumber: true })} />
              <Select
                label="Status"
                options={[
                  { value: "draft", label: "Draft" },
                  { value: "published", label: "Published" },
                  { value: "archived", label: "Archived" },
                ]}
                {...register("status")}
              />
            </div>
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

        {/* SEO */}
        <Card>
          <div className="px-6 py-4 border-b border-[var(--border)]">
            <h2 className="text-base font-semibold">SEO</h2>
          </div>
          <CardBody className="space-y-4">
            <Input label="Meta Title" {...register("seoMetaTitle")} hint="Defaults to product name" />
            <Textarea label="Meta Description" {...register("seoMetaDescription")} rows={2} />
            <Input label="OG Image URL" {...register("seoOgImage")} hint="Defaults to first product image" />
          </CardBody>
        </Card>
      </form>
    </>
  );
}
