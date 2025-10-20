import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { getAllServices } from "~/utils/service-links";

interface ServiceDropdownProps {
  className?: string;
}

export default function ServiceDropdown({
  className = "",
}: ServiceDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const services = getAllServices();

  // Ferme le dropdown avec ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Ferme le dropdown au clic extérieur
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Bouton trigger */}
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="btn btn-ghost font-urbanist hover:bg-primary/10 hover:text-primary rounded-full text-sm font-semibold inline-flex items-center gap-1"
      >
        <a
          href="/services"
          className="hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          Services
        </a>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          role="menu"
          aria-label="Menu des services"
          className="absolute top-full left-0 mt-2 w-72 bg-base-100 rounded-2xl shadow-xl border border-base-content/10 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {services.map((service) => (
            <a
              key={service.name}
              href={service.url}
              role="menuitem"
              className="block px-4 py-3 hover:bg-primary/5 transition-colors group"
              onClick={() => setIsOpen(false)}
            >
              <div className="font-urbanist text-sm font-semibold text-base-content group-hover:text-primary transition-colors">
                {service.name}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
