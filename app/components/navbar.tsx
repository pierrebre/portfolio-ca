import { useState } from "react";
import { Link } from "react-router";
import ThemeToggle from "./theme-toggle";
import ServiceDropdown from "./service-dropdown";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="sticky top-0 z-50 mx-4 flex justify-center py-4">
      <div className="navbar bg-base-100/90 outline-base-content/5 max-w-xs rounded-full py-0 shadow-2xl outline backdrop-blur-sm md:max-w-4xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-ghost lg:hidden"
              aria-label="Menu de navigation"
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              onClick={() => setMenuOpen((v) => !v)}
              onBlur={(e) => {
                if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
                  setMenuOpen(false);
                }
              }}
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
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content menu-md rounded-box bg-base-100 z-1 mt-3 w-52 gap-2 p-2 shadow-sm"
              role="menu"
            >
              <li role="none">
                <Link to="/services" role="menuitem" onClick={closeMenu}>
                  Services
                </Link>
              </li>
              <li role="none">
                <Link to="/projects" role="menuitem" onClick={closeMenu}>
                  Projets
                </Link>
              </li>
              <li role="none">
                <Link to="/blog" role="menuitem" onClick={closeMenu}>
                  Blog
                </Link>
              </li>
              <li role="none">
                <Link to="/about" role="menuitem" onClick={closeMenu}>
                  À propos
                </Link>
              </li>
              <li role="none">
                <Link to="/contact" role="menuitem" onClick={closeMenu}>
                  Contact
                </Link>
              </li>
              <li role="none" className="mt-1">
                <Link
                  to="/contact"
                  role="menuitem"
                  className="btn btn-primary btn-sm w-full"
                  onClick={closeMenu}
                >
                  Réserve ton audit gratuit
                </Link>
              </li>
            </ul>
          </div>

          <Link
            to="/"
            className="btn btn-ghost font-urbanist from-primary to-primary/70 ml-1 rounded-full bg-gradient-to-r bg-clip-text text-lg font-bold text-transparent"
          >
            Pierre Barbé
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <nav className="flex items-center" aria-label="Navigation principale">
            <ServiceDropdown />
            <Link
              className="btn btn-ghost font-urbanist hover:bg-primary/10 hover:text-primary rounded-full text-sm font-semibold"
              to="/projects"
            >
              Projets
            </Link>
            <Link
              className="btn btn-ghost font-urbanist hover:bg-primary/10 hover:text-primary rounded-full text-sm font-semibold"
              to="/blog"
            >
              Blog
            </Link>
            <Link
              className="btn btn-ghost font-urbanist hover:bg-primary/10 hover:text-primary rounded-full text-sm font-semibold"
              to="/about"
            >
              À propos
            </Link>
            <Link
              className="btn btn-ghost font-urbanist hover:bg-primary/10 hover:text-primary rounded-full text-sm font-semibold"
              to="/contact"
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="navbar-end h-10 gap-2">
          <Link
            to="/contact"
            className="btn btn-primary font-urbanist btn-sm rounded-full hidden lg:flex"
          >
            Réserve ton audit gratuit
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
