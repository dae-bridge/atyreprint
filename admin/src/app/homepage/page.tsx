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
  ChevronRight,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  PageHeader,
  Card,
  CardBody,
  Button,
} from "@/components/ui";
import {
  Input,
  Textarea,
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

      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        {/* ─── Left Navigation Panel ─── */}
        <div className="space-y-2">
          {TABS.map((tab) => {
            const counts: Record<string, number> = {
              hero: heroSlides.length,
              features: featureBadges.length,
              promos: promoBanners.length,
              trust: trustStats.length,
              brands: brandLogos.length,
            };
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
                    : "bg-white border border-border text-text-secondary hover:bg-gray-50 hover:text-foreground"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    activeTab === tab.id
                      ? "bg-primary/15"
                      : "bg-gray-100"
                  }`}
                >
                  {tab.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{tab.label}</p>
                  <p className="text-xs opacity-60">
                    {counts[tab.id]} item{counts[tab.id] !== 1 ? "s" : ""}
                  </p>
                </div>
                <ChevronRight
                  size={14}
                  className={activeTab === tab.id ? "text-primary" : "text-text-muted"}
                />
              </button>
            );
          })}
        </div>

        {/* ─── Right Content Area ─── */}
        <div>
          {/* ═══ Hero Slides ═══ */}
          {activeTab === "hero" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Hero Slides</h2>
                  <p className="text-sm text-text-muted">Full-width banner slides on the homepage hero section</p>
                </div>
                <Button variant="outline" onClick={addHeroSlide}>
                  <Plus size={14} /> Add Slide
                </Button>
              </div>

              {heroSlides.length === 0 ? (
                <Card>
                  <CardBody className="py-12 text-center">
                    <ImageIcon size={32} className="mx-auto text-text-muted mb-3" />
                    <p className="text-sm text-text-muted">No hero slides yet. Add your first banner slide.</p>
                    <Button variant="outline" onClick={addHeroSlide} className="mt-4">
                      <Plus size={14} /> Add Slide
                    </Button>
                  </CardBody>
                </Card>
              ) : (
                heroSlides.map((slide, i) => (
                  <Card key={slide.id} className="overflow-hidden">
                    {/* Slide header with preview thumbnail */}
                    <div className="flex items-center gap-4 px-5 py-3 bg-gray-50/80 border-b border-border">
                      <GripVertical size={14} className="text-text-muted cursor-grab" />
                      {slide.image.url ? (
                        <img
                          src={slide.image.url}
                          alt=""
                          className="w-16 h-10 rounded object-cover border border-border"
                        />
                      ) : (
                        <div className="w-16 h-10 rounded bg-gray-200 flex items-center justify-center">
                          <ImageIcon size={14} className="text-text-muted" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {slide.title || `Slide ${i + 1}`}
                        </p>
                        <p className="text-xs text-text-muted truncate">{slide.overline || "No overline"}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateHeroSlide(i, { active: !slide.active })}
                          className={`p-1.5 rounded-lg transition-colors ${
                            slide.active ? "text-success hover:bg-success/10" : "text-text-muted hover:bg-gray-100"
                          }`}
                          title={slide.active ? "Active" : "Inactive"}
                        >
                          {slide.active ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                        <button
                          onClick={() => removeHeroSlide(i)}
                          className="p-1.5 rounded-lg text-text-muted hover:text-red-500 hover:bg-red-50 transition-colors"
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
                        onRemove={() => updateHeroSlide(i, { image: { url: "", alt: "" } })}
                      />
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input
                          label="Overline"
                          value={slide.overline}
                          onChange={(e) => updateHeroSlide(i, { overline: e.target.value })}
                          placeholder="e.g. Premium Quality"
                        />
                        <Input
                          label="Highlight"
                          value={slide.highlight}
                          onChange={(e) => updateHeroSlide(i, { highlight: e.target.value })}
                          placeholder="e.g. Custom Printing"
                        />
                      </div>
                      <Input
                        label="Title"
                        value={slide.title}
                        onChange={(e) => updateHeroSlide(i, { title: e.target.value })}
                      />
                      <Textarea
                        label="Description"
                        value={slide.description}
                        onChange={(e) => updateHeroSlide(i, { description: e.target.value })}
                        rows={2}
                      />
                      <div className="grid md:grid-cols-2 gap-6 pt-2">
                        <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Primary CTA</p>
                          <Input label="Label" value={slide.primaryCta.label} onChange={(e) => updateHeroSlide(i, { primaryCta: { ...slide.primaryCta, label: e.target.value } })} />
                          <Input label="Link" value={slide.primaryCta.href} onChange={(e) => updateHeroSlide(i, { primaryCta: { ...slide.primaryCta, href: e.target.value } })} />
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Secondary CTA</p>
                          <Input label="Label" value={slide.secondaryCta.label} onChange={(e) => updateHeroSlide(i, { secondaryCta: { ...slide.secondaryCta, label: e.target.value } })} />
                          <Input label="Link" value={slide.secondaryCta.href} onChange={(e) => updateHeroSlide(i, { secondaryCta: { ...slide.secondaryCta, href: e.target.value } })} />
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))
              )}
            </div>
          )}

          {/* ═══ Feature Badges ═══ */}
          {activeTab === "features" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Feature Badges</h2>
                  <p className="text-sm text-text-muted">Small icons with text shown below the hero section</p>
                </div>
                <Button variant="outline" onClick={addFeatureBadge}>
                  <Plus size={14} /> Add Badge
                </Button>
              </div>

              {featureBadges.length === 0 ? (
                <Card>
                  <CardBody className="py-12 text-center">
                    <Sparkles size={32} className="mx-auto text-text-muted mb-3" />
                    <p className="text-sm text-text-muted">No feature badges yet.</p>
                    <Button variant="outline" onClick={addFeatureBadge} className="mt-4">
                      <Plus size={14} /> Add Badge
                    </Button>
                  </CardBody>
                </Card>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {featureBadges.map((badge, i) => (
                    <Card key={badge.id}>
                      <CardBody>
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-lg">
                            {badge.icon || "⭐"}
                          </div>
                          <button
                            onClick={() => removeFeatureBadge(i)}
                            className="p-1.5 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div className="space-y-3">
                          <Input
                            label="Icon"
                            value={badge.icon}
                            onChange={(e) => updateFeatureBadge(i, { icon: e.target.value })}
                            hint="Lucide icon name"
                            placeholder="e.g. star, truck, shield"
                          />
                          <Input
                            label="Title"
                            value={badge.title}
                            onChange={(e) => updateFeatureBadge(i, { title: e.target.value })}
                            placeholder="e.g. Free Shipping"
                          />
                          <Input
                            label="Description"
                            value={badge.description}
                            onChange={(e) => updateFeatureBadge(i, { description: e.target.value })}
                            placeholder="e.g. On orders over £50"
                          />
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══ Promo Banners ═══ */}
          {activeTab === "promos" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Promo Banners</h2>
                  <p className="text-sm text-text-muted">Promotional banners placed throughout the homepage</p>
                </div>
                <Button variant="outline" onClick={addPromoBanner}>
                  <Plus size={14} /> Add Banner
                </Button>
              </div>

              {promoBanners.length === 0 ? (
                <Card>
                  <CardBody className="py-12 text-center">
                    <Megaphone size={32} className="mx-auto text-text-muted mb-3" />
                    <p className="text-sm text-text-muted">No promo banners yet.</p>
                    <Button variant="outline" onClick={addPromoBanner} className="mt-4">
                      <Plus size={14} /> Add Banner
                    </Button>
                  </CardBody>
                </Card>
              ) : (
                promoBanners.map((banner, i) => (
                  <Card key={banner.id} className="overflow-hidden">
                    <div className="flex items-center gap-4 px-5 py-3 bg-gray-50/80 border-b border-border">
                      <GripVertical size={14} className="text-text-muted cursor-grab" />
                      {banner.image.url ? (
                        <img src={banner.image.url} alt="" className="w-16 h-10 rounded object-cover border border-border" />
                      ) : (
                        <div className="w-16 h-10 rounded bg-gray-200 flex items-center justify-center">
                          <Megaphone size={14} className="text-text-muted" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{banner.title || `Banner ${i + 1}`}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updatePromoBanner(i, { active: !banner.active })}
                          className={`p-1.5 rounded-lg transition-colors ${
                            banner.active ? "text-success hover:bg-success/10" : "text-text-muted hover:bg-gray-100"
                          }`}
                        >
                          {banner.active ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                        <button
                          onClick={() => removePromoBanner(i)}
                          className="p-1.5 rounded-lg text-text-muted hover:text-red-500 hover:bg-red-50 transition-colors"
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
                        onRemove={() => updatePromoBanner(i, { image: { url: "", alt: "" } })}
                      />
                      <Input label="Overline" value={banner.overline} onChange={(e) => updatePromoBanner(i, { overline: e.target.value })} />
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input label="Title Line 1" value={banner.title} onChange={(e) => updatePromoBanner(i, { title: e.target.value })} />
                        <Input label="Title Line 2" value={banner.titleLine2} onChange={(e) => updatePromoBanner(i, { titleLine2: e.target.value })} />
                      </div>
                      <Textarea label="Description" value={banner.description} onChange={(e) => updatePromoBanner(i, { description: e.target.value })} rows={2} />
                      <div className="grid md:grid-cols-3 gap-4">
                        <Input label="BG Overlay Class" value={banner.bgOverlay} onChange={(e) => updatePromoBanner(i, { bgOverlay: e.target.value })} hint="e.g. bg-primary/80" />
                        <Input label="CTA Label" value={banner.cta.label} onChange={(e) => updatePromoBanner(i, { cta: { ...banner.cta, label: e.target.value } })} />
                        <Input label="CTA Link" value={banner.cta.href} onChange={(e) => updatePromoBanner(i, { cta: { ...banner.cta, href: e.target.value } })} />
                      </div>
                    </CardBody>
                  </Card>
                ))
              )}
            </div>
          )}

          {/* ═══ Trust Stats ═══ */}
          {activeTab === "trust" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Trust Stats</h2>
                  <p className="text-sm text-text-muted">Numbers and labels that build customer confidence</p>
                </div>
                <Button variant="outline" onClick={addTrustStat}>
                  <Plus size={14} /> Add Stat
                </Button>
              </div>

              {trustStats.length === 0 ? (
                <Card>
                  <CardBody className="py-12 text-center">
                    <BarChart3 size={32} className="mx-auto text-text-muted mb-3" />
                    <p className="text-sm text-text-muted">No trust stats yet.</p>
                    <Button variant="outline" onClick={addTrustStat} className="mt-4">
                      <Plus size={14} /> Add Stat
                    </Button>
                  </CardBody>
                </Card>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {trustStats.map((stat, i) => (
                    <Card key={stat.id}>
                      <CardBody>
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                            <BarChart3 size={18} className="text-blue-600" />
                          </div>
                          <button
                            onClick={() => removeTrustStat(i)}
                            className="p-1.5 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div className="space-y-3">
                          <Input
                            label="Value"
                            value={stat.value}
                            onChange={(e) => updateTrustStat(i, { value: e.target.value })}
                            placeholder="e.g. 10,000+"
                          />
                          <Input
                            label="Label"
                            value={stat.label}
                            onChange={(e) => updateTrustStat(i, { label: e.target.value })}
                            placeholder="e.g. Happy Customers"
                          />
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══ Brand Logos ═══ */}
          {activeTab === "brands" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Brand Logos</h2>
                  <p className="text-sm text-text-muted">Trusted brand logos displayed on the homepage</p>
                </div>
                <Button variant="outline" onClick={addBrandLogo}>
                  <Plus size={14} /> Add Logo
                </Button>
              </div>

              {brandLogos.length === 0 ? (
                <Card>
                  <CardBody className="py-12 text-center">
                    <Award size={32} className="mx-auto text-text-muted mb-3" />
                    <p className="text-sm text-text-muted">No brand logos yet.</p>
                    <Button variant="outline" onClick={addBrandLogo} className="mt-4">
                      <Plus size={14} /> Add Logo
                    </Button>
                  </CardBody>
                </Card>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {brandLogos.map((logo, i) => (
                    <Card key={logo.id}>
                      <CardBody>
                        <div className="flex items-start justify-between mb-4">
                          {logo.logo?.url ? (
                            <img src={logo.logo.url} alt={logo.name} className="h-10 max-w-[120px] object-contain" />
                          ) : (
                            <div className="w-24 h-10 rounded bg-gray-100 flex items-center justify-center text-xs text-text-muted">
                              No logo
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateBrandLogo(i, { active: !logo.active })}
                              className={`p-1.5 rounded-lg transition-colors ${
                                logo.active ? "text-success hover:bg-success/10" : "text-text-muted hover:bg-gray-100"
                              }`}
                            >
                              {logo.active ? <Eye size={14} /> : <EyeOff size={14} />}
                            </button>
                            <button
                              onClick={() => removeBrandLogo(i)}
                              className="p-1.5 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Input label="Brand Name" value={logo.name} onChange={(e) => updateBrandLogo(i, { name: e.target.value })} />
                          <Input label="URL" value={logo.url ?? ""} onChange={(e) => updateBrandLogo(i, { url: e.target.value })} hint="Optional link" />
                          <ImageUpload
                            label="Logo Image"
                            value={logo.logo?.url}
                            onChange={(file) => handleLogoUpload(i, file)}
                            onRemove={() => updateBrandLogo(i, { logo: null })}
                          />
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
