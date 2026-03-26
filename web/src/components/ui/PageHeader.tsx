interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
}

export const PageHeader = ({ title, subtitle, badge }: PageHeaderProps) => {
  return (
    <section className="bg-primary text-white py-16 md:py-20">
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {badge && (
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3">
            {badge}
          </span>
        )}
        <h1 className="font-jost text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/80 text-lg max-w-2xl mx-auto">{subtitle}</p>
        )}
      </div>
    </section>
  );
};
