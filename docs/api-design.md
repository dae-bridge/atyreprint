# API Design — AtyrePrint

> **Status:** Planning. Backend implementation TBD.

## Approach

The current plan is to use **Next.js Server Actions** for mutations and **server-side data fetching** for reads, avoiding a separate API layer initially. If a shared API is needed later (e.g., for a mobile app), we'll extract to a standalone REST or GraphQL API.

## Server Actions Pattern

```typescript
// web/src/app/actions/contact.ts
"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export const submitContactForm = async (formData: FormData) => {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  // Send email, save to DB, etc.
  return { success: true };
};
```

## Planned API Resources

### Products
| Action | Method | Description |
|---|---|---|
| List products | GET (server fetch) | Paginated, filterable product list |
| Get product | GET (server fetch) | Single product by slug |
| Create product | Server Action (admin) | Create new product |
| Update product | Server Action (admin) | Update product details |
| Delete product | Server Action (admin) | Soft-delete product |

### Categories
| Action | Method | Description |
|---|---|---|
| List categories | GET (server fetch) | All categories with product count |
| Get category | GET (server fetch) | Single category by slug |
| CRUD | Server Action (admin) | Create/update/delete categories |

### Orders
| Action | Method | Description |
|---|---|---|
| Create order | Server Action | Place new order (checkout) |
| List orders | Server Action (admin) | All orders, filterable |
| Get order | Server Action | Single order by ID |
| Update status | Server Action (admin) | Change order status |

### Customers
| Action | Method | Description |
|---|---|---|
| Register | Server Action | Create account |
| Profile | Server Action | Update profile |
| List (admin) | Server Action (admin) | All customers |

### Contact
| Action | Method | Description |
|---|---|---|
| Submit form | Server Action | Send contact inquiry |
| Newsletter signup | Server Action | Add email to mailing list |

## Validation

All inputs validated with **Zod** schemas:

- Shared schemas in `src/lib/schemas/` (if shared between web & admin)
- Or colocated in the Server Action file if specific to one form

## Error Handling

```typescript
interface ActionResponse<T = void> {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}
```

## Authentication (Future)

- Web: Optional user accounts (NextAuth.js or Clerk)
- Admin: Required auth with role-based access (admin, editor, viewer)
- Protected routes via middleware (`middleware.ts`)
