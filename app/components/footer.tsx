export default function Footer() {
  return (
    <footer className="border-base-300 bg-base-200 border-t">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="footer footer-vertical sm:footer-horizontal items-end py-18 text-base-content">
          <aside className="items-center">
            <p>
              Pierre Barbé
              <br />© {new Date().getFullYear()} – Tous droits réservés
            </p>
          </aside>

          <nav>
            <strong className="footer-title">Navigation</strong>
            <p className="link link-hover">Blog</p>
            <a className="link link-hover" href="/contact">
              Contact
            </a>
          </nav>

          <nav>
            <strong className="footer-title">Légal</strong>
            <a className="link link-hover" href="/terms">
              Conditions&nbsp;d’utilisation
            </a>
            <a className="link link-hover" href="/privacy">
              Politique&nbsp;de&nbsp;confidentialité
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
