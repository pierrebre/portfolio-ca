import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import ThemeToggle from "./theme-toggle";
import ServiceDropdown from "./service-dropdown";
import { Menu } from "lucide-react";
import AuditButton from "./audit-button";
import { FREE_AUDIT } from "data/pricing";
import { useDismiss } from "~/hooks/use-dismiss";

const NAV_LINKS = [
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projets" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "À propos" },
  { to: "/contact", label: "Contact" },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();

  useDismiss(menuOpen, setMenuOpen, menuRef, buttonRef);

  // Referme le menu à chaque changement de page (lien, retour arrière…)
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    // Barre pleine largeur : l'appel à l'action reste visible sur mobile.
    <header className="bg-base-100/90 border-base-content/10 sticky top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-1 px-4 sm:gap-2 sm:px-6 lg:px-8">
        <Link to="/" className="mr-auto text-lg font-bold tracking-tight">
          Pierre Barbé<span className="text-primary">.</span>
        </Link>

        <nav className="hidden items-center lg:flex" aria-label="Navigation principale">
          <ServiceDropdown />
          {NAV_LINKS.slice(1).map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="btn btn-ghost btn-sm hover:bg-primary/10 hover:text-primary font-semibold"
            >
              {label}
            </Link>
          ))}
        </nav>

        <AuditButton className="btn btn-primary btn-sm rounded-full lg:ml-3" source="navigation">
          {FREE_AUDIT.short}
        </AuditButton>
        <ThemeToggle />

        {/* Menu mobile : bouton de divulgation piloté par l'état */}
        <div className="relative lg:hidden" ref={menuRef}>
          <button
            ref={buttonRef}
            type="button"
            className="btn btn-circle btn-ghost"
            aria-label="Menu de navigation"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>

          <nav
            id="mobile-menu"
            aria-label="Navigation principale"
            hidden={!menuOpen}
            className="absolute right-0 top-full z-50 mt-3"
          >
            <ul className="menu menu-md rounded-box bg-base-100 border-base-content/10 w-56 gap-1 border p-2 shadow-lg">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} onClick={() => setMenuOpen(false)}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
