import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import {
  Truck,
  PiggyBank,
  BadgePercent,
  Headphones,
  type LucideIcon,
} from "lucide-react";
import type { FeatureBadge } from "@/types";

const iconMap: Record<string, LucideIcon> = {
  Truck,
  PiggyBank,
  BadgePercent,
  Headphones,
};

interface FeatureBadgesProps {
  featureBadges?: FeatureBadge[];
}

export const FeatureBadges = ({ featureBadges }: FeatureBadgesProps) => {
  const badges =
    featureBadges && featureBadges.length > 0
      ? featureBadges
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((b) => ({
            title: b.title,
            description: b.description,
            icon: b.icon,
          }))
      : siteConfig.featureBadges;

  return (
    <section className="bg-[#f8f9fa] pt-6 md:pt-12">
      <Container className="py-4 md:py-5">
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {badges.map((badge) => {
            const Icon = iconMap[badge.icon];
            return (
              <div
                key={badge.title}
                className="flex items-center gap-3 px-3 py-2"
              >
                {Icon && (
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-primary md:w-5 md:h-5" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm md:text-base font-bold text-foreground truncate">
                    {badge.title}
                  </p>
                  <p className="text-xs text-text-muted truncate">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
