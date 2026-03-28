"use client";

import { useEffect, useState } from "react";
import { Save, Globe, Phone, Clock, Link2, Menu, ChevronDown } from "lucide-react";
import { PageHeader, Card, CardHeader, CardBody, Button } from "@/components/ui";
import { Input, Textarea, ImageUpload } from "@/components/ui/FormFields";
import { getSingleton, setSingleton } from "@/lib/firestore";
import { uploadFile } from "@/lib/storage";
import type { SiteSettings, ImageAsset } from "@/types";

const TABS = [
  { id: "general", label: "General", icon: <Globe size={16} /> },
  { id: "contact", label: "Contact", icon: <Phone size={16} /> },
  { id: "social", label: "Social", icon: <Link2 size={16} /> },
  { id: "hours", label: "Hours", icon: <Clock size={16} /> },
  { id: "topbar", label: "Top Bar", icon: <Menu size={16} /> },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // General
  const [siteName, setSiteName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [ogImage, setOgImage] = useState<ImageAsset | null>(null);

  // Contact
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Social
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [youtube, setYoutube] = useState("");

  // Business hours
  const [weekdays, setWeekdays] = useState("");
  const [weekend, setWeekend] = useState("");

  // Top bar
  const [topBarMessage, setTopBarMessage] = useState("");
  const [topBarLinkLabel, setTopBarLinkLabel] = useState("");
  const [topBarLinkHref, setTopBarLinkHref] = useState("");

  // Free shipping
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(0);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await getSingleton<SiteSettings>("settings", "general");
      if (data) {
        setSiteName(data.siteName ?? "");
        setTagline(data.tagline ?? "");
        setDescription(data.description ?? "");
        setSiteUrl(data.url ?? "");
        setOgImage(data.ogImage ?? null);
        setEmail(data.contact?.email ?? "");
        setPhone(data.contact?.phone ?? "");
        setAddress(data.contact?.address ?? "");
        setFacebook(data.social?.facebook ?? "");
        setInstagram(data.social?.instagram ?? "");
        setTwitter(data.social?.twitter ?? "");
        setTiktok(data.social?.tiktok ?? "");
        setYoutube(data.social?.youtube ?? "");
        setWeekdays(data.businessHours?.weekdays ?? "");
        setWeekend(data.businessHours?.weekend ?? "");
        setTopBarMessage(data.topBarMessage ?? "");
        setTopBarLinkLabel(data.topBarLink?.label ?? "");
        setTopBarLinkHref(data.topBarLink?.href ?? "");
        setFreeShippingThreshold(data.freeShippingThreshold?.amount ?? 0);
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const settings: Record<string, unknown> = {
        siteName,
        tagline,
        description,
        url: siteUrl,
        ogImage,
        contact: { email, phone, address },
        social: { facebook, instagram, twitter, tiktok, youtube },
        businessHours: { weekdays, weekend },
        topBarMessage,
        topBarLink:
          topBarLinkLabel && topBarLinkHref
            ? { label: topBarLinkLabel, href: topBarLinkHref }
            : null,
        freeShippingThreshold: { amount: freeShippingThreshold, currency: "GBP" },
      };
      await setSingleton("settings", "general", settings);
      alert("Settings saved!");
    } catch (err) {
      console.error("Failed to save settings:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleOgImageUpload = async (file: File) => {
    const { url, storagePath } = await uploadFile(file, `settings/${Date.now()}-${file.name}`);
    setOgImage({ url, alt: "OG Image", storagePath });
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
        title="Settings"
        description="Configure site-wide settings."
      >
        <Button onClick={handleSave} loading={saving}>
          <Save size={16} /> Save Settings
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

      {/* General */}
      {activeTab === "general" && (
        <Card>
          <CardHeader>
            <h2 className="text-base font-semibold">General Information</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input label="Site Name" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
            <Input label="Tagline" value={tagline} onChange={(e) => setTagline(e.target.value)} />
            <Textarea
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
            <Input label="Site URL" value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} />
            <ImageUpload
              label="Default OG Image"
              value={ogImage?.url}
              onChange={handleOgImageUpload}
              onRemove={() => setOgImage(null)}
            />
            <Input
              label="Free Shipping Threshold (pence)"
              type="number"
              value={freeShippingThreshold}
              onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
              hint="0 = disabled. 5000 = free shipping over £50"
            />
          </CardBody>
        </Card>
      )}

      {/* Contact */}
      {activeTab === "contact" && (
        <Card>
          <CardHeader>
            <h2 className="text-base font-semibold">Contact Details</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Textarea label="Address" value={address} onChange={(e) => setAddress(e.target.value)} rows={3} />
          </CardBody>
        </Card>
      )}

      {/* Social */}
      {activeTab === "social" && (
        <Card>
          <CardHeader>
            <h2 className="text-base font-semibold">Social Media Links</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input label="Facebook" value={facebook} onChange={(e) => setFacebook(e.target.value)} placeholder="https://facebook.com/..." />
            <Input label="Instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="https://instagram.com/..." />
            <Input label="Twitter / X" value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="https://x.com/..." />
            <Input label="TikTok" value={tiktok} onChange={(e) => setTiktok(e.target.value)} placeholder="https://tiktok.com/..." />
            <Input label="YouTube" value={youtube} onChange={(e) => setYoutube(e.target.value)} placeholder="https://youtube.com/..." />
          </CardBody>
        </Card>
      )}

      {/* Hours */}
      {activeTab === "hours" && (
        <Card>
          <CardHeader>
            <h2 className="text-base font-semibold">Business Hours</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input
              label="Weekdays"
              value={weekdays}
              onChange={(e) => setWeekdays(e.target.value)}
              placeholder="e.g. Mon–Fri: 9am–5pm"
            />
            <Input
              label="Weekend"
              value={weekend}
              onChange={(e) => setWeekend(e.target.value)}
              placeholder="e.g. Sat: 10am–2pm, Sun: Closed"
            />
          </CardBody>
        </Card>
      )}

      {/* Top Bar */}
      {activeTab === "topbar" && (
        <Card>
          <CardHeader>
            <h2 className="text-base font-semibold">Top Bar Promo</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input
              label="Message"
              value={topBarMessage}
              onChange={(e) => setTopBarMessage(e.target.value)}
              placeholder="e.g. Free shipping on orders over £50!"
            />
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Link Label"
                value={topBarLinkLabel}
                onChange={(e) => setTopBarLinkLabel(e.target.value)}
                placeholder="e.g. Shop Now"
              />
              <Input
                label="Link URL"
                value={topBarLinkHref}
                onChange={(e) => setTopBarLinkHref(e.target.value)}
                placeholder="e.g. /shop"
              />
            </div>
          </CardBody>
        </Card>
      )}
    </>
  );
}
