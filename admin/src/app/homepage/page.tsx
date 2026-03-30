"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Plus,
  Trash2,
  GripVertical,
  Save,
  Image as ImageIcon,
  Sparkles,
  BarChart3,
  Award,
  Megaphone,
} from "lucide-react";
import {
  PageHeader,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Button,
} from "@/components/ui";
import {
  Input,
  Textarea,
  Toggle,
  ImageUpload,
} from "@/components/ui/FormFields";
import { getSingleton, setSingleton } from "@/lib/firestore";
import { uploadFile, deleteFile } from "@/lib/storage";
import type {
  HomepageCMS,
  HeroSlide,
  FeatureBadge,
  PromoBanner,
  TrustStat,
  BrandLogo,
  ImageAsset,
} from "@/types";

const TABS = [
  { id: "hero", label: "Hero Slides", icon: <ImageIcon size={16} /> },
  { id: "features", label: "Feature Badges", icon: <Sparkles size={16} /> },
  { id: "promos", label: "Promo Banners", icon: <Megaphone size={16} /> },
  { id: "trust", label: "Trust Stats", icon: <BarChart3 size={16} /> },
  { id: "brands", label: "Brand Logos", icon: <Award size={16} /> },
] as const;

type TabId = (typeof TABS)[number]["id"];

const generateId = () => Math.random().toString(36).substring(2, 10);

export default function HomepageCMSPage() {
  const [activeTab, setActiveTab] = useState<TabId>("hero");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // CMS Data
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [featureBadges, setFeatureBadges] = useState<FeatureBadge[]>([]);
  const [promoBanners, setPromoBanners] = useState<PromoBanner[]>([]);
  const [trustStats, setTrustStats] = useState<TrustStat[]>([]);
  const [brandLogos, setBrandLogos] = useState<BrandLogo[]>([]);

  useEffect(() => {
    loadCMS();
  }, []);

  const loadCMS = async () => {
    try {
      setLoading(true);
      const data = await getSingleton<HomepageCMS>("cms", "homepage");
      if (data) {
        setHeroSlides(data.heroSlides ?? []);
        setFeatureBadges(data.featureBadges ?? []);
        setPromoBanners(data.promoBanners ?? []);
        setTrustStats(data.trustStats ?? []);
        setBrandLogos(data.brandLogos ?? []);
      }
    } catch (err) {
      console.error("Failed to load CMS:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setSingleton("cms", "homepage", {
        heroSlides,
        featureBadges,
        promoBanners,
        trustStats,
        brandLogos,
      });
      alert("Homepage content saved!");
    } catch (err) {
      console.error("Failed to save CMS:", err);
    } finally {
      setSaving(false);
    }
  };

  // ── Hero Slides helpers ──
  const addHeroSlide = () => {
    setHeroSlides((prev) => [
      ...prev,
      {
        id: generateId(),
        image: { url: "", alt: "" },
        overline: "",
        title: "",
        highlight: "",
        description: "",
        primaryCta: { label: "Shop Now", href: "/shop" },
        secondaryCta: { label: "Learn More", href: "/about" },
        sortOrder: prev.length,
        active: true,
      },
    ]);
  };

  const updateHeroSlide = (index: number, updates: Partial<HeroSlide>) => {
    setHeroSlides((prev) =>
      prev.map((s, i) => (i === index ? { ...s, ...updates } : s)),
    );
  };

  const removeHeroSlide = (index: number) => {
    setHeroSlides((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSlideImageUpload = async (index: number, file: File) => {
    const { url, storagePath } = await uploadFile(
      file,
      `cms/hero/${Date.now()}-${file.name}`,
    );
    updateHeroSlide(index, { image: { url, alt: file.name, storagePath } });
  };

  // ── Feature Badges helpers ──
  const addFeatureBadge = () => {
    setFeatureBadges((prev) => [
      ...prev,
      {
        id: generateId(),
        title: "",
        description: "",
        icon: "star",
        sortOrder: prev.length,
      },
    ]);
  };

  const updateFeatureBadge = (
    index: number,
    updates: Partial<FeatureBadge>,
  ) => {
    setFeatureBadges((prev) =>
      prev.map((b, i) => (i === index ? { ...b, ...updates } : b)),
    );
  };

  const removeFeatureBadge = (index: number) => {
    setFeatureBadges((prev) => prev.filter((_, i) => i !== index));
  };

  // ── Promo Banners helpers ──
  const addPromoBanner = () => {
    setPromoBanners((prev) => [
      ...prev,
      {
        id: generateId(),
        overline: "",
        title: "",
        titleLine2: "",
        description: "",
        image: { url: "", alt: "" },
        bgOverlay: "bg-primary/80",
        cta: { label: "Shop Now", href: "/shop" },
        sortOrder: prev.length,
        active: true,
      },
    ]);
  };

  const updatePromoBanner = (index: number, updates: Partial<PromoBanner>) => {
    setPromoBanners((prev) =>
      prev.map((b, i) => (i === index ? { ...b, ...updates } : b)),
    );
  };

  const removePromoBanner = (index: number) => {
    setPromoBanners((prev) => prev.filter((_, i) => i !== index));
  };

  const handleBannerImageUpload = async (index: number, file: File) => {
    const { url, storagePath } = await uploadFile(
      file,
      `cms/promos/${Date.now()}-${file.name}`,
    );
    updatePromoBanner(index, { image: { url, alt: file.name, storagePath } });
  };

  // ── Trust Stats helpers ──
  const addTrustStat = () => {
    setTrustStats((prev) => [
      ...prev,
      { id: generateId(), value: "", label: "", sortOrder: prev.length },
    ]);
  };

  const updateTrustStat = (index: number, updates: Partial<TrustStat>) => {
    setTrustStats((prev) =>
      prev.map((s, i) => (i === index ? { ...s, ...updates } : s)),
    );
  };

  const removeTrustStat = (index: number) => {
    setTrustStats((prev) => prev.filter((_, i) => i !== index));
  };

  // ── Brand Logos helpers ──
  const addBrandLogo = () => {
    setBrandLogos((prev) => [
      ...prev,
      {
        id: generateId(),
        name: "",
        logo: null,
        url: "",
        sortOrder: prev.length,
        active: true,
      },
    ]);
  };

  const updateBrandLogo = (index: number, updates: Partial<BrandLogo>) => {
    setBrandLogos((prev) =>
      prev.map((l, i) => (i === index ? { ...l, ...updates } : l)),
    );
  };

  const removeBrandLogo = (index: number) => {
    setBrandLogos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLogoUpload = async (index: number, file: File) => {
    const { url, storagePath } = await uploadFile(
      file,
      `cms/brands/${Date.now()}-${file.name}`,
    );
    updateBrandLogo(index, { logo: { url, alt: file.name, storagePath } });
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-10 bg-gray-100 rounded w-1/3" />
        <div className="h-64 bg-gray-100 rounded-xl" />
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="Homepage Content"
        description="Manage hero banners, feature badges, promotions, and more."
      >
        <Button onClick={handleSave} loading={saving}>
          <Save size={16} /> Save All Changes
        </Button>
      </PageHeader>

      {/* Tab navigation */}
      <div className="flex gap-1 mb-6 border-b border-[var(--border)] overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "border-[var(--primary)] text-[var(--primary)]"
                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--foreground)]"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* ═══ Hero Slides ═══ */}
      {activeTab === "hero" && (
        <div className="space-y-4">
          {heroSlides.map((slide, i) => (
            <Card key={slide.id}>
              <div className="px-6 py-3 border-b border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical
                    size={14}
                    className="text-[var(--text-muted)] cursor-grab"
                  />
                  <span className="text-sm font-semibold">Slide {i + 1}</span>
                  {slide.active && <Badge variant="success">Active</Badge>}
                </div>
                <div className="flex items-center gap-2">
                  <Toggle
                    label="Active"
                    checked={slide.active}
                    onChange={(val) => updateHeroSlide(i, { active: val })}
                  />
                  <button
                    onClick={() => removeHeroSlide(i)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <CardBody className="space-y-4">
                <ImageUpload
                  label="Slide Image"
                  value={slide.image.url}
                  onChange={(file) => handleSlideImageUpload(i, file)}
                  onRemove={() =>
                    updateHeroSlide(i, { image: { url: "", alt: "" } })
                  }
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Overline"
                    value={slide.overline}
                    onChange={(e) =>
                      updateHeroSlide(i, { overline: e.target.value })
                    }
                    placeholder="e.g. Premium Quality"
                  />
                  <Input
                    label="Highlight"
                    value={slide.highlight}
                    onChange={(e) =>
                      updateHeroSlide(i, { highlight: e.target.value })
                    }
                    placeholder="e.g. Custom Printing"
                  />
                </div>
                <Input
                  label="Title"
                  value={slide.title}
                  onChange={(e) =>
                    updateHeroSlide(i, { title: e.target.value })
                  }
                />
                <Textarea
                  label="Description"
                  value={slide.description}
                  onChange={(e) =>
                    updateHeroSlide(i, { description: e.target.value })
                  }
                  rows={2}
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase">
                      Primary CTA
                    </p>
                    <Input
                      label="Label"
                      value={slide.primaryCta.label}
                      onChange={(e) =>
                        updateHeroSlide(i, {
                          primaryCta: {
                            ...slide.primaryCta,
                            label: e.target.value,
                          },
                        })
                      }
                    />
                    <Input
                      label="Link"
                      value={slide.primaryCta.href}
                      onChange={(e) =>
                        updateHeroSlide(i, {
                          primaryCta: {
                            ...slide.primaryCta,
                            href: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase">
                      Secondary CTA
                    </p>
                    <Input
                      label="Label"
                      value={slide.secondaryCta.label}
                      onChange={(e) =>
                        updateHeroSlide(i, {
                          secondaryCta: {
                            ...slide.secondaryCta,
                            label: e.target.value,
                          },
                        })
                      }
                    />
                    <Input
                      label="Link"
                      value={slide.secondaryCta.href}
                      onChange={(e) =>
                        updateHeroSlide(i, {
                          secondaryCta: {
                            ...slide.secondaryCta,
                            href: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
          <Button variant="outline" onClick={addHeroSlide} className="w-full">
            <Plus size={16} /> Add Hero Slide
          </Button>
        </div>
      )}

      {/* ═══ Feature Badges ═══ */}
      {activeTab === "features" && (
        <div className="space-y-4">
          {featureBadges.map((badge, i) => (
            <Card key={badge.id}>
              <CardBody>
                <div className="flex items-start gap-4">
                  <GripVertical
                    size={14}
                    className="text-[var(--text-muted)] cursor-grab mt-3"
                  />
                  <div className="flex-1 grid md:grid-cols-3 gap-4">
                    <Input
                      label="Icon"
                      value={badge.icon}
                      onChange={(e) =>
                        updateFeatureBadge(i, { icon: e.target.value })
                      }
                      hint="Lucide icon name"
                    />
                    <Input
                      label="Title"
                      value={badge.title}
                      onChange={(e) =>
                        updateFeatureBadge(i, { title: e.target.value })
                      }
                    />
                    <Input
                      label="Description"
                      value={badge.description}
                      onChange={(e) =>
                        updateFeatureBadge(i, { description: e.target.value })
                      }
                    />
                  </div>
                  <button
                    onClick={() => removeFeatureBadge(i)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded mt-7"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </CardBody>
            </Card>
          ))}
          <Button
            variant="outline"
            onClick={addFeatureBadge}
            className="w-full"
          >
            <Plus size={16} /> Add Feature Badge
          </Button>
        </div>
      )}

      {/* ═══ Promo Banners ═══ */}
      {activeTab === "promos" && (
        <div className="space-y-4">
          {promoBanners.map((banner, i) => (
            <Card key={banner.id}>
              <div className="px-6 py-3 border-b border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical
                    size={14}
                    className="text-[var(--text-muted)] cursor-grab"
                  />
                  <span className="text-sm font-semibold">Banner {i + 1}</span>
                  {banner.active && <Badge variant="success">Active</Badge>}
                </div>
                <div className="flex items-center gap-2">
                  <Toggle
                    label="Active"
                    checked={banner.active}
                    onChange={(val) => updatePromoBanner(i, { active: val })}
                  />
                  <button
                    onClick={() => removePromoBanner(i)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <CardBody className="space-y-4">
                <ImageUpload
                  label="Banner Image"
                  value={banner.image.url}
                  onChange={(file) => handleBannerImageUpload(i, file)}
                  onRemove={() =>
                    updatePromoBanner(i, { image: { url: "", alt: "" } })
                  }
                />
                <Input
                  label="Overline"
                  value={banner.overline}
                  onChange={(e) =>
                    updatePromoBanner(i, { overline: e.target.value })
                  }
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Title Line 1"
                    value={banner.title}
                    onChange={(e) =>
                      updatePromoBanner(i, { title: e.target.value })
                    }
                  />
                  <Input
                    label="Title Line 2"
                    value={banner.titleLine2}
                    onChange={(e) =>
                      updatePromoBanner(i, { titleLine2: e.target.value })
                    }
                  />
                </div>
                <Textarea
                  label="Description"
                  value={banner.description}
                  onChange={(e) =>
                    updatePromoBanner(i, { description: e.target.value })
                  }
                  rows={2}
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="BG Overlay Class"
                    value={banner.bgOverlay}
                    onChange={(e) =>
                      updatePromoBanner(i, { bgOverlay: e.target.value })
                    }
                    hint="e.g. bg-primary/80"
                  />
                  <Input
                    label="CTA Label"
                    value={banner.cta.label}
                    onChange={(e) =>
                      updatePromoBanner(i, {
                        cta: { ...banner.cta, label: e.target.value },
                      })
                    }
                  />
                </div>
                <Input
                  label="CTA Link"
                  value={banner.cta.href}
                  onChange={(e) =>
                    updatePromoBanner(i, {
                      cta: { ...banner.cta, href: e.target.value },
                    })
                  }
                />
              </CardBody>
            </Card>
          ))}
          <Button variant="outline" onClick={addPromoBanner} className="w-full">
            <Plus size={16} /> Add Promo Banner
          </Button>
        </div>
      )}

      {/* ═══ Trust Stats ═══ */}
      {activeTab === "trust" && (
        <div className="space-y-4">
          {trustStats.map((stat, i) => (
            <Card key={stat.id}>
              <CardBody>
                <div className="flex items-start gap-4">
                  <GripVertical
                    size={14}
                    className="text-[var(--text-muted)] cursor-grab mt-3"
                  />
                  <div className="flex-1 grid md:grid-cols-2 gap-4">
                    <Input
                      label="Value"
                      value={stat.value}
                      onChange={(e) =>
                        updateTrustStat(i, { value: e.target.value })
                      }
                      placeholder="e.g. 10,000+"
                    />
                    <Input
                      label="Label"
                      value={stat.label}
                      onChange={(e) =>
                        updateTrustStat(i, { label: e.target.value })
                      }
                      placeholder="e.g. Happy Customers"
                    />
                  </div>
                  <button
                    onClick={() => removeTrustStat(i)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded mt-7"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </CardBody>
            </Card>
          ))}
          <Button variant="outline" onClick={addTrustStat} className="w-full">
            <Plus size={16} /> Add Trust Stat
          </Button>
        </div>
      )}

      {/* ═══ Brand Logos ═══ */}
      {activeTab === "brands" && (
        <div className="space-y-4">
          {brandLogos.map((logo, i) => (
            <Card key={logo.id}>
              <CardBody>
                <div className="flex items-start gap-4">
                  <GripVertical
                    size={14}
                    className="text-[var(--text-muted)] cursor-grab mt-3"
                  />
                  <div className="flex-1 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label="Brand Name"
                        value={logo.name}
                        onChange={(e) =>
                          updateBrandLogo(i, { name: e.target.value })
                        }
                      />
                      <Input
                        label="URL"
                        value={logo.url ?? ""}
                        onChange={(e) =>
                          updateBrandLogo(i, { url: e.target.value })
                        }
                        hint="Optional link"
                      />
                    </div>
                    <ImageUpload
                      label="Logo Image"
                      value={logo.logo?.url}
                      onChange={(file) => handleLogoUpload(i, file)}
                      onRemove={() => updateBrandLogo(i, { logo: null })}
                    />
                    <Toggle
                      label="Active"
                      checked={logo.active}
                      onChange={(val) => updateBrandLogo(i, { active: val })}
                    />
                  </div>
                  <button
                    onClick={() => removeBrandLogo(i)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded mt-3"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </CardBody>
            </Card>
          ))}
          <Button variant="outline" onClick={addBrandLogo} className="w-full">
            <Plus size={16} /> Add Brand Logo
          </Button>
        </div>
      )}
    </>
  );
}
