

export default function NavBar() {
  return (
    <nav className="nav-bar">
        <a href="#home" className="name-text">Alfaroqomar Alaa</a>
        <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#work">Work</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    <div className="nav-socials" aria-label="Social links">
      <a href="https://www.linkedin.com/in/alfaroqomar-alaa-aldeen/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
        <i className="fa-brands fa-linkedin-in" aria-hidden="true" />
      </a>
      <a href="https://github.com/Alfaroqomar" target="_blank" rel="noreferrer" aria-label="GitHub">
        <i className="fa-brands fa-github" aria-hidden="true" />
      </a>
      <a href="https://alfaroqomar.itch.io" target="_blank" rel="noreferrer" aria-label="itch.io">
        <i className="fa-brands fa-itch-io" aria-hidden="true" />
      </a>
    </div>
        <span className="nav-status"><i /> Available</span>
    </nav>
  );
}