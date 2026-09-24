import { Link } from "react-router";

const NAV = [
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projets" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "À propos" },
  { to: "/contact", label: "Contact" },
];

const LEGAL = [
  { to: "/mentions-legales", label: "Mentions légales" },
  { to: "/politique-confidentialite", label: "Politique de confidentialité" },
];

export default function Footer() {
  return (
    <footer className="border-base-content/10 bg-base-200 border-t">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-3 sm:px-6 lg:px-8">
        <div>
          <p className="font-bold">
            Pierre Barbé<span className="text-primary">.</span>
          </p>
          <p className="text-base-content/70 mt-2 text-sm">
            Développeur web freelance · Montréal, Québec
          </p>
          <p className="mt-3 flex flex-col items-start text-sm">
            <a href="mailto:contact@pierrebarbe.ca" className="link link-hover inline-block py-1">
              contact@pierrebarbe.ca
            </a>
            <a href="tel:+14385436986" className="link link-hover inline-block py-1">
              438 543-6986
            </a>
          </p>
        </div>

        <nav aria-label="Navigation du pied de page">
          <p className="text-base-content/70 text-sm font-semibold">Navigation</p>
          <ul className="mt-3 space-y-1 text-sm">
            {NAV.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="link link-hover inline-block py-1">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Liens légaux">
          <p className="text-base-content/70 text-sm font-semibold">Légal</p>
          <ul className="mt-3 space-y-1 text-sm">
            {LEGAL.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="link link-hover inline-block py-1">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-base-content/70 mt-6 text-sm">
            © {new Date().getFullYear()} Pierre Barbé
          </p>
        </nav>
      </div>
    </footer>
  );
}
