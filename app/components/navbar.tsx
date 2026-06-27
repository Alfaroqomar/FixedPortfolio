

export default function NavBar() {
  return (
    <nav className="nav-bar bg-item w-full px-16 py-4.5 flex items-center justify-between align-middle fixed border-b z-1000">
        <div className="name-text text-item text-xl font-bold text-black dark:text-white">
            Alfaroqomar Alaa
        </div>
        <ul className="flex space-x-8 button-cuts">
            <li>
                <a href="#" className="nav-text text-item text-black dark:text-white hover:underline">
                    Home
                </a>
            </li>
            <li>
                <a href="#" className="nav-text text-item text-black dark:text-white hover:underline">
                    About
                </a>
            </li>
        </ul>
    </nav>
  );
}