import { useState, useRef } from "react";
import { Link } from "react-router";
import { ChevronDown } from "lucide-react";
import { services, serviceUrl } from "data/services";
import { useDismiss } from "~/hooks/use-dismiss";

// Bouton de divulgation (aria-expanded + aria-controls) et simple liste de
// liens : le rôle ARIA "menu" impose une navigation aux flèches qu'on n'offre pas.
export default function ServiceDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useDismiss(isOpen, setIsOpen, dropdownRef, buttonRef);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger : lien Services + bouton chevron */}
      <div className="inline-flex items-center">
        <Link
          to="/services"
          className="btn btn-ghost hover:bg-primary/10 hover:text-primary rounded-full rounded-r-none pr-1 text-sm font-semibold"
        >
          Services
        </Link>
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="services-dropdown"
          aria-label="Afficher la liste des services"
          className="btn btn-ghost hover:bg-primary/10 hover:text-primary rounded-full rounded-l-none pl-1 min-w-0 min-h-[44px] w-[44px]"
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>
      </div>

      {isOpen && (
        <ul
          id="services-dropdown"
          className="absolute top-full left-0 mt-2 w-72 bg-base-100 rounded-2xl shadow-xl border border-base-content/10 py-2 z-50"
        >
          {services.map((service) => (
            <li key={service.key}>
              <Link
                to={serviceUrl(service.key)}
                className="block px-4 py-3 text-sm font-semibold text-base-content hover:bg-primary/5 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {service.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
