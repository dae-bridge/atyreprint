# Security — AtyrePrint

This document outlines the security measures to be implemented across both the **web** (storefront) and **admin** (dashboard) applications. These are planned for Phase 2+ and should be referenced during development.

---

## 1. Rate Limiting

### API / Server Action Rate Limits

- Use **middleware-based rate limiting** on all Server Actions and API routes.
- Recommended: `upstash/ratelimit` with Redis, or a simple in-memory `Map` + sliding window for development.
- Apply tiered limits:

  | Endpoint Type          | Limit             | Window |
  |------------------------|--------------------|--------|
  | Public read (products) | 60 req             | 1 min  |
  | Auth (login/register)  | 5 req              | 1 min  |
  | Mutations (cart, order) | 20 req            | 1 min  |
  | Admin actions          | 30 req             | 1 min  |
  | Contact form           | 3 req              | 5 min  |
  | Newsletter signup      | 3 req              | 10 min |

### IP-Based Throttling

- Track requests per IP using `x-forwarded-for` or `x-real-ip` headers.
- Return `429 Too Many Requests` with `Retry-After` header when limit exceeded.
- Log rate limit violations for monitoring.

---

## 2. Bot Protection

### Honeypot Fields

- Add a hidden form field (e.g. `<input name="website" style="display:none" />`) to all public forms:
  - Contact form
  - Newsletter signup
  - Personalisation request form
- If the honeypot field is filled, silently reject the submission (return 200 but don't process).
- Never reveal to the bot that it was detected.

### User-Agent and Header Analysis

- Block requests with empty or known-bot User-Agent strings on sensitive endpoints.
- Optionally integrate `isbot` npm package for detection.
- Log suspicious patterns for review.

### CAPTCHA (Future)

- Consider Cloudflare Turnstile or hCaptcha on:
  - Login / registration
  - Contact form
  - Bulk order enquiries
- Avoid Google reCAPTCHA due to privacy concerns with GDPR (UK audience).

---

## 3. Crawler & Scraping Defence

### robots.txt

- Serve a proper `robots.txt` from `web/public/`:

  ```
  User-agent: *
  Disallow: /admin
  Disallow: /api/
  Disallow: /account/
  Disallow: /cart
  Disallow: /checkout

  User-agent: GPTBot
  Disallow: /

  User-agent: CCBot
  Disallow: /

  Sitemap: https://atyreprint.com/sitemap.xml
  ```

- Block AI crawlers by default unless business value exists.

### Headless Browser Detection

- Use headers and JavaScript challenges to detect headless browsers.
- Monitor for abnormal request patterns (rapid sequential product page access).

---

## 4. Next.js Middleware

### Security Headers Middleware

Apply the following headers via `middleware.ts`:

```typescript
// Security headers to set on every response
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};
```

### CSRF Protection

- Server Actions in Next.js have built-in CSRF protection (origin checking).
- For any custom API routes, validate the `Origin` header matches the allowed domains.

### Admin Route Protection

- All `/admin` routes must verify Firebase Auth token in middleware.
- Redirect unauthenticated users to login page.
- Implement role-based access control (RBAC) — at minimum: `admin`, `editor`, `viewer`.

---

## 5. Authentication & Authorisation

### Firebase Auth

- Use Firebase Authentication with email/password as primary method.
- Enforce strong password policy: min 8 chars, mixed case, numbers.
- Implement email verification before allowing purchases.
- Session tokens stored in `httpOnly` cookies (not localStorage).

### Session Management

- Set session cookie with: `httpOnly`, `secure`, `sameSite: 'strict'`, short expiry (1 hour) with refresh.
- Invalidate sessions on password change.
- Implement idle timeout (30 min for admin).

---

## 6. Input Validation & Sanitisation

### Server-Side Validation

- **Every** Server Action and API route must validate input with Zod schemas.
- Never trust client-side validation alone.
- Validate and sanitise all user inputs before Firestore writes.

### XSS Prevention

- React escapes output by default — never use `dangerouslySetInnerHTML` without sanitisation.
- If HTML content is needed (e.g. CMS), use `DOMPurify` or `sanitize-html`.
- Sanitise file names on upload.

### SQL/NoSQL Injection

- Firestore is not vulnerable to SQL injection, but always:
  - Validate document IDs are alphanumeric.
  - Limit query sizes.
  - Use Firestore Security Rules to enforce schema.

---

## 7. Firebase Security Rules

### Firestore Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products — public read, admin write
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    // Orders — owner read, admin read/write
    match /orders/{orderId} {
      allow read: if request.auth != null &&
        (request.auth.uid == resource.data.userId || request.auth.token.admin == true);
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.token.admin == true;
    }
    // Users — owner read/update, admin read
    match /users/{userId} {
      allow read, update: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

### Storage Rules

- Restrict upload size (max 5MB for product images).
- Only allow image MIME types (`image/jpeg`, `image/png`, `image/webp`).
- Admin-only write access to product image paths.

---

## 8. Content Security Policy (CSP)

Implement a strict CSP header:

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.firebaseio.com https://*.googleapis.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: https://*.googleusercontent.com https://firebasestorage.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://*.firebaseio.com https://*.googleapis.com wss://*.firebaseio.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
```

> **Note:** This is an initial CSP. Tighten `unsafe-inline` and `unsafe-eval` once nonces are implemented for scripts.

---

## 9. Dependency Security

- Run `npm audit` regularly on both `web/` and `admin/`.
- Use Dependabot or Renovate for automated version updates.
- Pin major versions of critical dependencies.
- Review `npm audit` output before every deployment.

---

## 10. Monitoring & Logging

### Security Events to Log

- Failed login attempts (with IP, timestamp).
- Rate limit violations.
- Admin actions (product create/update/delete, order status changes).
- Suspicious form submissions (honeypot triggers).
- Firebase Auth errors.

### Alerting

- Set up Firebase Alerts for unusual auth activity.
- Monitor for spikes in 4xx/5xx responses.
- Consider Sentry or LogRocket for frontend error monitoring.

---

## 11. GDPR & Data Privacy

Since the primary audience is UK-based:

- Display a cookie consent banner (use `cookie-consent` or similar).
- Provide a clear Privacy Policy page.
- Allow users to request data export and deletion.
- Minimise data collection — only store what is needed for orders.
- Encrypt sensitive data at rest (Firebase handles this for Firestore/Storage).

---

## 12. Deployment Security

- Never commit `.env.local` or secrets to Git (already in `.gitignore`).
- Use environment variables in the hosting platform (Vercel/Firebase Hosting).
- Enable HTTPS only (redirect HTTP → HTTPS).
- Set `X-Robots-Tag: noindex` on admin app responses.
- Use separate Firebase projects for staging and production (future).

---

## Implementation Priority

| Priority | Security Measure                    | Phase   |
|----------|-------------------------------------|---------|
| P0       | Security headers middleware         | Phase 1 |
| P0       | Firestore security rules            | Phase 1 |
| P0       | Input validation (Zod schemas)      | Phase 1 |
| P0       | Honeypot fields on forms            | Phase 1 |
| P1       | Rate limiting                       | Phase 2 |
| P1       | Admin auth + RBAC                   | Phase 2 |
| P1       | Session management (httpOnly)       | Phase 2 |
| P1       | CSP header                          | Phase 2 |
| P2       | CAPTCHA integration                 | Phase 2 |
| P2       | Bot/crawler detection               | Phase 2 |
| P2       | GDPR cookie consent                 | Phase 2 |
| P3       | Security monitoring & alerting      | Phase 3 |
| P3       | Dependency audit automation         | Phase 3 |
