"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Truck,
  CreditCard,
  MapPin,
  Clock,
  Package,
  User,
} from "lucide-react";
import {
  PageHeader,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Button,
} from "@/components/ui";
import { Input, Textarea, Select } from "@/components/ui/FormFields";
import { getDocument, updateDocument } from "@/lib/firestore";
import { formatMoney, formatDate, timeAgo } from "@/lib/utils";
import type { Order, OrderStatus } from "@/types";
import { COLLECTIONS } from "@/types";
import { serverTimestamp, Timestamp } from "firebase/firestore";

const statusColors: Record<
  OrderStatus,
  "success" | "warning" | "info" | "default" | "error"
> = {
  pending: "warning",
  confirmed: "info",
  processing: "info",
  printing: "info",
  shipped: "success",
  delivered: "success",
  cancelled: "error",
  refunded: "error",
};

const allStatuses: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "printing",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
];

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState<string>("");
  const [statusNote, setStatusNote] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingUrl, setTrackingUrl] = useState("");
  const [internalNote, setInternalNote] = useState("");

  useEffect(() => {
    if (orderId) loadOrder();
  }, [orderId]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      const data = await getDocument<Order>(COLLECTIONS.ORDERS, orderId);
      if (!data) {
        router.push("/orders");
        return;
      }
      setOrder(data);
      setNewStatus(data.status);
      setTrackingNumber(data.trackingNumber ?? "");
      setTrackingUrl(data.trackingUrl ?? "");
      setInternalNote(data.internalNote ?? "");
    } catch (err) {
      console.error("Failed to load order:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!order || newStatus === order.status) return;
    setUpdating(true);
    try {
      const statusEvent = {
        status: newStatus,
        timestamp: Timestamp.now(),
        note: statusNote || undefined,
        updatedBy: "admin",
      };

      await updateDocument(COLLECTIONS.ORDERS, order.id, {
        status: newStatus,
        statusHistory: [...order.statusHistory, statusEvent],
        trackingNumber: trackingNumber || null,
        trackingUrl: trackingUrl || null,
        internalNote: internalNote || undefined,
      });
      setStatusNote("");
      loadOrder();
    } catch (err) {
      console.error("Failed to update order:", err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-10 bg-gray-100 rounded w-1/3" />
        <div className="h-64 bg-gray-100 rounded-xl" />
      </div>
    );
  }

  if (!order) return null;

  return (
    <>
      <PageHeader
        title={`Order ${order.orderNumber}`}
        description={`Placed ${formatDate(order.createdAt)}`}
      >
        <Button variant="ghost" onClick={() => router.push("/orders")}>
          <ArrowLeft size={16} /> Back to Orders
        </Button>
      </PageHeader>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Package size={18} />
                <h2 className="text-base font-semibold">Order Items</h2>
              </div>
              <Badge variant={statusColors[order.status]}>{order.status}</Badge>
            </CardHeader>
            <div className="divide-y divide-[var(--border)]">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4">
                  {item.productImage ? (
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-14 h-14 rounded-lg object-cover border border-[var(--border)]"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Package size={18} className="text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[var(--foreground)]">
                      {item.productName}
                    </p>
                    <div className="flex gap-3 text-xs text-[var(--text-muted)] mt-0.5">
                      <span>SKU: {item.sku}</span>
                      {item.selectedColor && (
                        <span>Color: {item.selectedColor}</span>
                      )}
                      {item.selectedSize && (
                        <span>Size: {item.selectedSize}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {formatMoney(item.unitPrice.amount)} × {item.quantity}
                    </p>
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      {formatMoney(item.totalPrice.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Totals */}
            <div className="border-t border-[var(--border)] px-6 py-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatMoney(order.subtotal.amount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>{formatMoney(order.shippingCost.amount)}</span>
              </div>
              {order.discount.amount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>
                    Discount {order.couponCode && `(${order.couponCode})`}
                  </span>
                  <span>-{formatMoney(order.discount.amount)}</span>
                </div>
              )}
              {order.tax.amount > 0 && (
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>{formatMoney(order.tax.amount)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold pt-2 border-t border-[var(--border)]">
                <span>Total</span>
                <span>{formatMoney(order.total.amount)}</span>
              </div>
            </div>
          </Card>

          {/* Status Timeline */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <h2 className="text-base font-semibold">Status Timeline</h2>
              </div>
            </CardHeader>
            <CardBody>
              {order.statusHistory.length === 0 ? (
                <p className="text-sm text-[var(--text-muted)]">
                  No status updates yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {[...order.statusHistory].reverse().map((event, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-3 h-3 rounded-full ${i === 0 ? "bg-[var(--primary)]" : "bg-gray-300"}`}
                        />
                        {i < order.statusHistory.length - 1 && (
                          <div className="w-px h-full bg-gray-200 mt-1" />
                        )}
                      </div>
                      <div className="pb-4">
                        <div className="flex items-center gap-2">
                          <Badge variant={statusColors[event.status]}>
                            {event.status}
                          </Badge>
                          <span className="text-xs text-[var(--text-muted)]">
                            {formatDate(event.timestamp)}
                          </span>
                        </div>
                        {event.note && (
                          <p className="text-sm text-[var(--text-secondary)] mt-1">
                            {event.note}
                          </p>
                        )}
                        {event.updatedBy && (
                          <p className="text-xs text-[var(--text-muted)] mt-0.5">
                            by {event.updatedBy}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Update Status */}
          <Card>
            <CardHeader>
              <h2 className="text-base font-semibold">Update Status</h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <Select
                label="New Status"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                options={allStatuses.map((s) => ({
                  value: s,
                  label: s.charAt(0).toUpperCase() + s.slice(1),
                }))}
              />
              <Textarea
                label="Note"
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                rows={2}
                placeholder="Add a note about this change..."
              />
              <Button
                onClick={handleUpdateStatus}
                loading={updating}
                disabled={newStatus === order.status}
                className="w-full"
              >
                Update Status
              </Button>
            </CardBody>
          </Card>

          {/* Customer */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User size={18} />
                <h2 className="text-base font-semibold">Customer</h2>
              </div>
            </CardHeader>
            <CardBody className="space-y-2">
              <p className="font-medium">{order.customerName}</p>
              <p className="text-sm text-[var(--text-secondary)]">
                {order.customerEmail}
              </p>
              {order.customerPhone && (
                <p className="text-sm text-[var(--text-secondary)]">
                  {order.customerPhone}
                </p>
              )}
            </CardBody>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <h2 className="text-base font-semibold">Shipping Address</h2>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {order.shippingAddress.line1}
                {order.shippingAddress.line2 && (
                  <>
                    <br />
                    {order.shippingAddress.line2}
                  </>
                )}
                <br />
                {order.shippingAddress.city}
                {order.shippingAddress.county &&
                  `, ${order.shippingAddress.county}`}
                <br />
                {order.shippingAddress.postcode}
                <br />
                {order.shippingAddress.country}
              </p>
            </CardBody>
          </Card>

          {/* Payment */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard size={18} />
                <h2 className="text-base font-semibold">Payment</h2>
              </div>
            </CardHeader>
            <CardBody className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-secondary)]">Status</span>
                <Badge
                  variant={
                    order.paymentStatus === "paid" ? "success" : "warning"
                  }
                >
                  {order.paymentStatus}
                </Badge>
              </div>
              {order.paymentMethod && (
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Method</span>
                  <span>{order.paymentMethod}</span>
                </div>
              )}
            </CardBody>
          </Card>

          {/* Tracking */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Truck size={18} />
                <h2 className="text-base font-semibold">Tracking</h2>
              </div>
            </CardHeader>
            <CardBody className="space-y-3">
              <Input
                label="Tracking Number"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
              <Input
                label="Tracking URL"
                value={trackingUrl}
                onChange={(e) => setTrackingUrl(e.target.value)}
              />
            </CardBody>
          </Card>

          {/* Internal Note */}
          <Card>
            <CardHeader>
              <h2 className="text-base font-semibold">Internal Note</h2>
            </CardHeader>
            <CardBody>
              <Textarea
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
                rows={3}
                placeholder="Private notes about this order..."
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
