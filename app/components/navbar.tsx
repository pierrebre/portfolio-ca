import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import ThemeToggle from "./theme-toggle";
import ServiceDropdown from "./service-dropdown";
import AuditButton from "./audit-button";
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
    <header className="sticky top-0 z-50 mx-4 flex justify-center py-4">
      <div className="navbar bg-base-100/90 outline-base-content/5 max-w-xs rounded-full py-0 shadow-2xl outline backdrop-blur-sm md:max-w-4xl">
        <div className="navbar-start">
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>

            <nav
              id="mobile-menu"
              aria-label="Navigation principale"
              hidden={!menuOpen}
              className="absolute left-0 top-full z-50 mt-3"
            >
              <ul className="menu menu-md rounded-box bg-base-100 w-52 gap-2 p-2 shadow-sm">
                {NAV_LINKS.map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} onClick={() => setMenuOpen(false)}>
                      {label}
                    </Link>
                  </li>
                ))}
                <li className="mt-1">
                  <AuditButton
                    className="btn btn-primary btn-sm w-full"
                    onClick={() => setMenuOpen(false)}
                  />
                </li>
              </ul>
            </nav>
          </div>

          <Link
            to="/"
            className="btn btn-ghost from-primary to-primary/70 ml-1 rounded-full bg-gradient-to-r bg-clip-text text-lg font-bold text-transparent"
          >
            Pierre Barbé
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <nav className="flex items-center" aria-label="Navigation principale">
            <ServiceDropdown />
            {NAV_LINKS.slice(1).map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="btn btn-ghost hover:bg-primary/10 hover:text-primary rounded-full text-sm font-semibold"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="navbar-end h-10 gap-2">
          <AuditButton className="btn btn-primary btn-sm rounded-full hidden lg:flex" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
