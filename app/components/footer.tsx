import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="border-base-300 bg-base-200 border-t">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="footer footer-vertical sm:footer-horizontal items-end py-18 text-base-content">
          <aside className="items-center">
            <p>
              Pierre Barbé
              <br />
              <span className="text-base-content/60 text-sm">
                Basé à Montréal, Québec
              </span>
              <br />
              <a
                href="mailto:contact@pierrebarbe.ca"
                className="link link-hover text-sm"
              >
                contact@pierrebarbe.ca
              </a>
              <br />© {new Date().getFullYear()} – Tous droits réservés
            </p>
          </aside>

          <nav aria-label="Navigation du pied de page">
            <strong className="footer-title">Navigation</strong>
            <Link className="link link-hover" to="/services">
              Services
            </Link>
            <Link className="link link-hover" to="/blog">
              Blog
            </Link>
            <Link className="link link-hover" to="/about">
              À propos
            </Link>
            <Link className="link link-hover" to="/contact">
              Contact
            </Link>
          </nav>

          <nav aria-label="Liens légaux">
            <strong className="footer-title">Légal</strong>
            <Link className="link link-hover" to="/mentions-legales">
              Mentions&nbsp;légales
            </Link>
            <Link className="link link-hover" to="/politique-confidentialite">
              Politique&nbsp;de&nbsp;confidentialité
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
