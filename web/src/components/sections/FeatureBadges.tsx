import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import {
  Truck,
  ShieldCheck,
  Zap,
  Headphones,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Truck,
  ShieldCheck,
  Zap,
  Headphones,
};

export const FeatureBadges = () => {
  return (
    <section className="border-b border-border bg-white">
      <Container className="py-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {siteConfig.featureBadges.map((badge) => {
            const Icon = iconMap[badge.icon];
            return (
              <div
                key={badge.title}
                className="flex items-center gap-3 px-3 py-2"
              >
                {Icon && (
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-primary" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {badge.title}
                  </p>
                  <p className="text-xs text-text-muted">{badge.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
