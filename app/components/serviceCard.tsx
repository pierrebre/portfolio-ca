interface ServiceCardsProps {
  readonly icon: string;
  readonly name: string;
  readonly description: string;
}

export default function ServiceCard({
  icon,
  name,
  description,
}: ServiceCardsProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <img src={icon} alt={name} className="card-icon" />
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
}
