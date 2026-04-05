import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { getSiteSettings } from "@/lib/settings";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | AtyrePrint",
  description:
    "Get in touch with AtyrePrint for custom printing, embroidery and design enquiries. Email, call, or send us a message — we reply within 24 hours.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: settings.contact.phone,
      href: `tel:${settings.contact.phone.replace(/\s/g, "")}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: settings.contact.email,
      href: `mailto:${settings.contact.email}`,
    },
    {
      icon: MapPin,
      label: "Address",
      value: settings.contact.address,
      href: undefined,
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: `Weekdays: ${settings.businessHours.weekdays} · Weekend: ${settings.businessHours.weekend}`,
      href: undefined,
    },
  ];
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Have a question or ready to start a project? We'd love to hear from you."
        badge="Get in Touch"
      />

      <section className="py-16 md:py-20">
        <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact info */}
            <div className="lg:col-span-2">
              <h2 className="font-jost text-2xl font-bold text-foreground mb-6">
                Reach Out to Us
              </h2>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Whether you need a quick quote, have a complex project, or just
                want to say hello — drop us a line. We typically respond within
                24 hours.
              </p>

              <div className="space-y-6">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  const Wrapper = item.href ? "a" : "div";
                  const wrapperProps = item.href ? { href: item.href } : {};

                  return (
                    <Wrapper
                      key={item.label}
                      {...wrapperProps}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-text-muted">{item.label}</p>
                        <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </Wrapper>
                  );
                })}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-border-light p-6 md:p-8">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  Send Us a Message
                </h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
