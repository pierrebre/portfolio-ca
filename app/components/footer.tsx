export default function Footer() {
  return (
    <footer className="border-base-300 bg-base-200 border-t">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="footer footer-vertical sm:footer-horizontal text-base-content py-18 items-end">
          <aside className="items-center">
            <p>
              Pierre Barbé
              <br />
              Copyright {new Date().getFullYear()} All rights reserved
            </p>
          </aside>
          <nav>
            <h4 className="footer-title">Company</h4>
            <a className="link link-hover" href="/#" >About us</a>
            <a className="link link-hover" href="/#">Contact</a>
          </nav>
          <nav>
            <h4 className="footer-title">Legal</h4>
            <a className="link link-hover" href="/#">Terms of use</a>
            <a className="link link-hover" href="/#">Privacy policy</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
