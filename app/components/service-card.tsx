import type { ServiceProps } from "data/services";

export default function ServiceCard({ icon, name, description }: ServiceProps) {
  return (
    <div className="group border-base-content/10 bg-base-100 relative overflow-hidden rounded-2xl border shadow-xs transition-all duration-300 hover:shadow-lg">
      <div className="p-8">
        <div className="bg-primary/10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl p-4">
          <img src={icon} alt={name} className="h-full w-full object-contain" />
        </div>
        <h3 className="font-urbanist text-base-content text-2xl font-semibold">
          {name}
        </h3>
        <p className="font-urbanist text-base-content/80 mt-4 text-base">
          {description}
        </p>
      </div>
      <div className="from-primary absolute bottom-0 left-0 h-1 w-full bg-linear-to-r to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}
