

export default function NavBar() {
  return (
    <nav className="nav-bar">
        <a href="#home" className="name-text">Alfaroqomar Alaa</a>
        <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#work">Work</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
        <span className="nav-status"><i /> Available</span>
    </nav>
  );
}