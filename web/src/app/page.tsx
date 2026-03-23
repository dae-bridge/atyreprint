import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[80vh] bg-primary text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-secondary font-medium tracking-wider uppercase mb-4">
            Premium Print-on-Demand & Embroidery
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl font-bold leading-tight mb-6">
            Custom Clothing & Gifts that Speak for You
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
            {siteConfig.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-secondary text-primary-dark font-semibold rounded-lg hover:bg-secondary-light transition-colors"
            >
              Shop Now
            </a>
            <a
              href="/personalise-it"
              className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors"
            >
              Personalise It
            </a>
          </div>
        </div>
      </section>

      {/* Categories Section - Placeholder */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-secondary font-medium tracking-wider uppercase mb-2">
            Categories
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-foreground mb-12">
            Browse Top Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {siteConfig.products.map((product) => (
              <div
                key={product}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-primary text-2xl font-bold">
                    {product[0]}
                  </span>
                </div>
                <p className="font-medium text-foreground">{product}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-secondary font-medium tracking-wider uppercase mb-2">
            What We Do
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-foreground mb-12">
            Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {siteConfig.services.map((service) => (
              <div
                key={service.title}
                className="bg-surface rounded-xl p-8 text-center"
              >
                <div className="w-20 h-20 bg-primary rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">
                    {service.title[0]}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-text-secondary">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-16 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <p className="text-3xl font-bold text-secondary">5+</p>
              <p className="text-white/80 mt-1">Years Experience</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-secondary">3</p>
              <p className="text-white/80 mt-1">Continents Served</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-secondary">10+</p>
              <p className="text-white/80 mt-1">Product Types</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-secondary">100%</p>
              <p className="text-white/80 mt-1">Quality Guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-foreground mb-4">
            Let&apos;s Create Something Special
          </h2>
          <p className="text-text-secondary text-lg mb-8">
            Got an idea? Let&apos;s make it real. Whether it&apos;s for business
            branding, personal gifts, or bulk orders — we&apos;re ready.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
