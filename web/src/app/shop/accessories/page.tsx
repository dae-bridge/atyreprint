import { redirect } from "next/navigation";

// This static route is redundant — the [...category] catch-all
// handles /shop/accessories by looking up the Firestore category.
// Redirect so the dynamic route takes over without a 404.
export default function AccessoriesRedirect() {
  redirect("/shop");
}
