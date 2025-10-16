import { Link } from "react-router";
import type { ServiceProps } from "data/services";

interface ServiceCardProps extends ServiceProps {
  linkTo?: string;
}

export default function ServiceCard({
  icon: Icon,
  name,
  description,
  linkTo,
}: ServiceCardProps) {
  const CardContent = () => (
    <>
      <div className="p-8">
        <div className="bg-primary/10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl p-4 transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-full w-full object-contain" aria-hidden="true" />
        </div>
        <h3 className="font-urbanist text-base-content text-2xl font-semibold mb-4">
          {name}
        </h3>
        <p className="font-urbanist text-base-content/80 text-base leading-relaxed">
          {description}
        </p>
      </div>
      <div className="from-primary absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </>
  );

  if (linkTo) {
    return (
      <Link
        to={linkTo}
        aria-label={`En savoir plus sur ${name}`}
        className="group border-base-content/10 bg-base-100 relative overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/20 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <CardContent />
      </Link>
    );
  }

  return (
    <div className="group border-base-content/10 bg-base-100 relative overflow-hidden rounded-2xl border shadow-sm transition-all duration-300">
      <CardContent />
    </div>
  );
}
