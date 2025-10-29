import { NavLink } from 'react-router'
import beevLogo from '../assets/beev.svg'

export function Header() {
  return (
    <header className="w-full h-[100px] flex items-center justify-between px-6 bg-background">
      <img src={beevLogo} alt="Beev" className="h-12 md:h-14" />
      <nav className="flex items-center gap-6">
        <NavLink 
          to="/" 
          className="text-foreground hover:text-primary transition-colors font-medium"
        >
          Home
        </NavLink>
        <NavLink 
          to="/vehicle-management" 
          className="text-foreground hover:text-primary transition-colors font-medium"
        >
         Gestion du parc
        </NavLink>
        <NavLink 
          to="/version" 
          className="text-foreground hover:text-primary transition-colors font-medium"
        >
          Version
        </NavLink>
      </nav>
    </header>
  )
}


