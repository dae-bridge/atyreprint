"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { PageHeader, Card, CardBody, Button } from "@/components/ui";
import {
  Input,
  Textarea,
  Select,
  Toggle,
  ImageUpload,
} from "@/components/ui/FormFields";
import {
  getDocument,
  createDocument,
  updateDocument,
  softDeleteDocument,
} from "@/lib/firestore";
import { uploadFile } from "@/lib/storage";
import { slugify } from "@/lib/utils";
import type { BlogPost, ImageAsset, PublishStatus } from "@/types";
import { COLLECTIONS } from "@/types";
import { Timestamp } from "firebase/firestore";

interface BlogFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string;
  featured: boolean;
  status: PublishStatus;
  seoMetaTitle: string;
  seoMetaDescription: string;
  seoOgImage: string;
}

const defaultValues: BlogFormData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  author: "",
  tags: "",
  featured: false,
  status: "draft",
  seoMetaTitle: "",
  seoMetaDescription: "",
  seoOgImage: "",
};

export default function BlogFormPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params?.id as string | undefined;
  const isEditing = !!postId && postId !== "new";

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [coverImage, setCoverImage] = useState<ImageAsset | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BlogFormData>({ defaultValues });

  const title = watch("title");

  useEffect(() => {
    if (!isEditing && title) {
      setValue("slug", slugify(title));
    }
  }, [title, isEditing, setValue]);

  useEffect(() => {
    if (isEditing) loadPost();
  }, [isEditing, postId]);

  const loadPost = async () => {
    if (!postId) return;
    const post = await getDocument<BlogPost>(COLLECTIONS.BLOG_POSTS, postId);
    if (!post) {
      router.push("/blog");
      return;
    }
    setCoverImage(post.coverImage ?? null);
    reset({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      tags: post.tags.join(", "),
      featured: post.featured,
      status: post.status,
      seoMetaTitle: post.seo.metaTitle,
      seoMetaDescription: post.seo.metaDescription,
      seoOgImage: post.seo.ogImage,
    });
  };

  const handleCoverUpload = async (file: File) => {
    const { url, storagePath } = await uploadFile(
      file,
      `blog/${Date.now()}-${file.name}`,
    );
    setCoverImage({ url, alt: file.name, storagePath });
  };

  const onSubmit = async (data: BlogFormData) => {
    setSaving(true);
    try {
      const postData = {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: coverImage ?? { url: "", alt: "" },
        author: data.author,
        tags: data.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        featured: data.featured,
        publishedAt: data.status === "published" ? Timestamp.now() : null,
        status: data.status,
        seo: {
          metaTitle: data.seoMetaTitle || data.title,
          metaDescription: data.seoMetaDescription || data.excerpt,
          ogImage: data.seoOgImage || coverImage?.url || "",
        },
        isDeleted: false,
        deletedAt: null,
      };

      if (isEditing && postId) {
        await updateDocument(COLLECTIONS.BLOG_POSTS, postId, postData);
      } else {
        await createDocument<BlogPost>(
          COLLECTIONS.BLOG_POSTS,
          postData as Omit<BlogPost, "id" | "createdAt" | "updatedAt">,
        );
      }
      router.push("/blog");
    } catch (err) {
      console.error("Failed to save post:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!postId || !confirm("Move this post to trash?")) return;
    setDeleting(true);
    try {
      await softDeleteDocument(COLLECTIONS.BLOG_POSTS, postId);
      router.push("/blog");
    } catch (err) {
      console.error("Failed to delete:", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <PageHeader
        title={isEditing ? "Edit Blog Post" : "New Blog Post"}
        description={
          isEditing ? "Update your blog post." : "Write a new article."
        }
      >
        <Button variant="ghost" onClick={() => router.push("/blog")}>
          <ArrowLeft size={16} /> Back
        </Button>
        {isEditing && (
          <Button variant="danger" onClick={handleDelete} loading={deleting}>
            <Trash2 size={16} /> Delete
          </Button>
        )}
        <Button onClick={handleSubmit(onSubmit)} loading={saving}>
          <Save size={16} /> {isEditing ? "Update" : "Publish"}
        </Button>
      </PageHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <div className="px-6 py-4 border-b border-[var(--border)]">
            <h2 className="text-base font-semibold">Post Details</h2>
          </div>
          <CardBody className="space-y-4">
            <Input
              label="Title"
              {...register("title", { required: "Title is required" })}
              error={errors.title?.message}
            />
            <Input
              label="Slug"
              {...register("slug")}
              disabled
              hint="Auto-generated from title"
            />
            <Input
              label="Author"
              {...register("author", { required: "Author is required" })}
              error={errors.author?.message}
            />
            <Textarea
              label="Excerpt"
              {...register("excerpt")}
              rows={2}
              hint="Short summary for cards"
            />
            <Input label="Tags" {...register("tags")} hint="Comma separated" />
          </CardBody>
        </Card>

        <Card>
          <div className="px-6 py-4 border-b border-[var(--border)]">
            <h2 className="text-base font-semibold">Cover Image</h2>
          </div>
          <CardBody>
            <ImageUpload
              value={coverImage?.url}
              onChange={handleCoverUpload}
              onRemove={() => setCoverImage(null)}
            />
          </CardBody>
        </Card>

        <Card>
          <div className="px-6 py-4 border-b border-[var(--border)]">
            <h2 className="text-base font-semibold">Content</h2>
          </div>
          <CardBody>
            <Textarea
              label="Body"
              {...register("content")}
              rows={16}
              hint="Supports Markdown"
            />
          </CardBody>
        </Card>

        <Card>
          <div className="px-6 py-4 border-b border-[var(--border)]">
            <h2 className="text-base font-semibold">Publishing</h2>
          </div>
          <CardBody className="space-y-4">
            <Select
              label="Status"
              options={[
                { value: "draft", label: "Draft" },
                { value: "published", label: "Published" },
                { value: "archived", label: "Archived" },
              ]}
              {...register("status")}
            />
            <Controller
              control={control}
              name="featured"
              render={({ field }) => (
                <Toggle
                  label="Featured Post"
                  description="Show prominently on homepage"
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </CardBody>
        </Card>

        <Card>
          <div className="px-6 py-4 border-b border-[var(--border)]">
            <h2 className="text-base font-semibold">SEO</h2>
          </div>
          <CardBody className="space-y-4">
            <Input label="Meta Title" {...register("seoMetaTitle")} />
            <Textarea
              label="Meta Description"
              {...register("seoMetaDescription")}
              rows={2}
            />
            <Input label="OG Image URL" {...register("seoOgImage")} />
          </CardBody>
        </Card>
      </form>
    </>
  );
}
