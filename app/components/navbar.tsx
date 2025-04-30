const NavBar = () => {
  return (
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

        <nav>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-md rounded-box bg-base-100 z-1 mt-3 w-52 gap-2 p-2 shadow-sm"
          >
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
      </div>

      <a
        href="/"
        className="btn btn-ghost font-urbanist from-primary to-primary/70 ml-1 rounded-full bg-gradient-to-r bg-clip-text text-lg font-bold text-transparent"
      >
        Blink
      </a>
    </div>
  );
};

export default NavBar;
