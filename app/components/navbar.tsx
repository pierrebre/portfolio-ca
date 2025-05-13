import ThemeToggle from "./theme-toggle";

export default function NavBar() {
  return (
    <div className="sticky top-0 z-50 mx-4 flex justify-center py-4">
      <div className="navbar bg-base-100/90 outline-base-content/5 max-w-xs rounded-full py-0 shadow-2xl outline backdrop-blur-sm md:max-w-4xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
            >
              {/*               <li>
                <a href="/projects">Projects</a>
              </li> */}

              <li>
                <a href="/contact">Contact</a>
              </li>
              <li className="flex flex-row">
                <p>Blog</p>
                <span className="badge badge-info -mt-0.5 -ml-0.5">Soon</span>
              </li>
            </ul>
          </div>

          <a
            href="/"
            className="btn btn-ghost font-urbanist from-primary to-primary/70 ml-1 rounded-full bg-gradient-to-r bg-clip-text text-lg font-bold text-transparent"
          >
            Pierre Barbé
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <nav>
            {/*  <a
              className="btn btn-ghost font-urbanist hover:bg-primary/10 hover:text-primary rounded-full text-sm font-semibold"
              href="/projects"
            >
              Projects
            </a> */}

            <a
              className="btn btn-ghost font-urbanist hover:bg-primary/10 hover:text-primary rounded-full text-sm font-semibold"
              href="/contact"
            >
              Contact
            </a>
            <p className="btn btn-ghost font-urbanist hover:bg-primary/10 hover:text-primary rounded-full text-sm font-semibold">
              Blog
              <span className="badge badge-info -mt-3 -ml-0.5">Soon</span>
            </p>
          </nav>
        </div>
        <div className="navbar-end h-10">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
