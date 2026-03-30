"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Ticket, Trash2, Pencil, Copy } from "lucide-react";
import { PageHeader, Card, Badge, Button, EmptyState } from "@/components/ui";
import { Input, Select, Toggle } from "@/components/ui/FormFields";
import { Dialog } from "@/components/ui/Dialog";
import { DataTable, type Column } from "@/components/ui/DataTable";
import {
  queryDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
} from "@/lib/firestore";
import { formatMoney, formatDate } from "@/lib/utils";
import type { Coupon, DiscountType } from "@/types";
import { COLLECTIONS } from "@/types";
import { Timestamp } from "firebase/firestore";

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editing, setEditing] = useState<Coupon | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formCode, setFormCode] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formDiscountType, setFormDiscountType] =
    useState<DiscountType>("percentage");
  const [formDiscountValue, setFormDiscountValue] = useState(0);
  const [formMinOrder, setFormMinOrder] = useState(0);
  const [formMaxUses, setFormMaxUses] = useState(0);
  const [formValidFrom, setFormValidFrom] = useState("");
  const [formValidUntil, setFormValidUntil] = useState("");
  const [formActive, setFormActive] = useState(true);

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    try {
      setLoading(true);
      const data = await queryDocuments<Coupon>(COLLECTIONS.COUPONS, {
        sortBy: "createdAt",
        sortDirection: "desc",
      });
      setCoupons(data);
    } catch (err) {
      console.error("Failed to load coupons:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormCode("");
    setFormDescription("");
    setFormDiscountType("percentage");
    setFormDiscountValue(0);
    setFormMinOrder(0);
    setFormMaxUses(0);
    setFormValidFrom("");
    setFormValidUntil("");
    setFormActive(true);
    setEditing(null);
    setShowDialog(false);
  };

  const openEdit = (c: Coupon) => {
    setEditing(c);
    setFormCode(c.code);
    setFormDescription(c.description);
    setFormDiscountType(c.discountType);
    setFormDiscountValue(c.discountValue);
    setFormMinOrder(c.minimumOrderValue?.amount ?? 0);
    setFormMaxUses(c.maxUses ?? 0);
    setFormValidFrom(
      c.validFrom?.toDate?.()?.toISOString().split("T")[0] ?? "",
    );
    setFormValidUntil(
      c.validUntil?.toDate?.()?.toISOString().split("T")[0] ?? "",
    );
    setFormActive(c.active);
    setShowDialog(true);
  };

  const handleSave = async () => {
    if (!formCode.trim()) return;
    setSaving(true);
    try {
      const data = {
        code: formCode.toUpperCase().trim(),
        description: formDescription,
        discountType: formDiscountType,
        discountValue: formDiscountValue,
        minimumOrderValue:
          formMinOrder > 0 ? { amount: formMinOrder, currency: "GBP" } : null,
        maxUses: formMaxUses > 0 ? formMaxUses : 0,
        usedCount: editing?.usedCount ?? 0,
        validFrom: formValidFrom
          ? Timestamp.fromDate(new Date(formValidFrom))
          : Timestamp.now(),
        validUntil: formValidUntil
          ? Timestamp.fromDate(new Date(formValidUntil))
          : Timestamp.fromDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)),
        applicableCategories: [],
        applicableProducts: [],
        active: formActive,
      };

      if (editing) {
        await updateDocument(COLLECTIONS.COUPONS, editing.id, data);
      } else {
        await createDocument<Coupon>(
          COLLECTIONS.COUPONS,
          data as Omit<Coupon, "id" | "createdAt" | "updatedAt">,
        );
      }
      resetForm();
      loadCoupons();
    } catch (err) {
      console.error("Failed to save coupon:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this coupon?")) return;
    try {
      await deleteDocument(COLLECTIONS.COUPONS, id);
      loadCoupons();
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  const columns: Column<Coupon>[] = [
    {
      key: "code",
      label: "Code",
      render: (c) => (
        <div className="flex items-center gap-2">
          <span className="font-mono font-semibold text-[var(--primary)]">
            {c.code}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(c.code);
            }}
            className="p-1 rounded hover:bg-gray-100 text-[var(--text-muted)]"
            title="Copy code"
          >
            <Copy size={12} />
          </button>
        </div>
      ),
    },
    {
      key: "discount",
      label: "Discount",
      render: (c) => (
        <span className="font-medium">
          {c.discountType === "percentage"
            ? `${c.discountValue}%`
            : formatMoney(c.discountValue)}
        </span>
      ),
    },
    {
      key: "usage",
      label: "Usage",
      render: (c) => (
        <span className="text-sm">
          {c.usedCount}/{c.maxUses ?? "∞"}
        </span>
      ),
    },
    {
      key: "valid",
      label: "Valid Until",
      render: (c) => (
        <span className="text-sm text-[var(--text-muted)]">
          {formatDate(c.validUntil)}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (c) => (
        <Badge variant={c.active ? "success" : "default"}>
          {c.active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "",
      className: "w-20",
      render: (c) => (
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openEdit(c);
            }}
            className="p-1.5 rounded hover:bg-gray-100 text-[var(--text-muted)]"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(c.id);
            }}
            className="p-1.5 rounded hover:bg-red-50 text-[var(--text-muted)] hover:text-red-500"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Coupons" description="Manage discount codes.">
        <Button
          onClick={() => {
            resetForm();
            setShowDialog(true);
          }}
        >
          <Plus size={16} /> Add Coupon
        </Button>
      </PageHeader>

      <Card>
        {!loading && coupons.length === 0 ? (
          <EmptyState
            icon={<Ticket size={24} />}
            title="No coupons yet"
            description="Create discount codes for your customers."
            action={
              <Button onClick={() => setShowDialog(true)}>
                <Plus size={16} /> Add Coupon
              </Button>
            }
          />
        ) : (
          <DataTable
            columns={columns}
            data={coupons}
            loading={loading}
            emptyMessage="No coupons found."
          />
        )}
      </Card>

      {/* ─── Coupon Dialog ─── */}
      <Dialog
        open={showDialog}
        onClose={resetForm}
        title={editing ? "Edit Coupon" : "New Coupon"}
        description={
          editing
            ? "Update the coupon details below."
            : "Create a new discount code for your customers."
        }
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Code"
              value={formCode}
              onChange={(e) => setFormCode(e.target.value.toUpperCase())}
              placeholder="e.g. SUMMER20"
            />
            <Select
              label="Discount Type"
              value={formDiscountType}
              onChange={(e) =>
                setFormDiscountType(e.target.value as DiscountType)
              }
              options={[
                { value: "percentage", label: "Percentage (%)" },
                { value: "fixed", label: "Fixed Amount (pence)" },
              ]}
            />
          </div>
          <Input
            label="Description"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            placeholder="e.g. Summer sale — 20% off everything"
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label={
                formDiscountType === "percentage"
                  ? "Discount (%)"
                  : "Discount (pence)"
              }
              type="number"
              value={formDiscountValue}
              onChange={(e) => setFormDiscountValue(Number(e.target.value))}
            />
            <Input
              label="Min Order (pence)"
              type="number"
              value={formMinOrder}
              onChange={(e) => setFormMinOrder(Number(e.target.value))}
              hint="0 = no minimum"
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <Input
              label="Max Uses"
              type="number"
              value={formMaxUses}
              onChange={(e) => setFormMaxUses(Number(e.target.value))}
              hint="0 = unlimited"
            />
            <Input
              label="Valid From"
              type="date"
              value={formValidFrom}
              onChange={(e) => setFormValidFrom(e.target.value)}
            />
            <Input
              label="Valid Until"
              type="date"
              value={formValidUntil}
              onChange={(e) => setFormValidUntil(e.target.value)}
            />
          </div>
          <Toggle
            label="Active"
            description="Only active coupons can be applied at checkout"
            checked={formActive}
            onChange={setFormActive}
          />
          <div className="flex gap-3 pt-3 border-t border-border mt-2">
            <Button onClick={handleSave} loading={saving} className="flex-1">
              {editing ? "Update Coupon" : "Create Coupon"}
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
