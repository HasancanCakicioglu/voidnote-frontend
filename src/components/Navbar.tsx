import Link from 'next/link'
import Image from 'next/image'
import { ModeToggle } from './ModeToggle'

const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Image src="/logo.png" alt="VoidNote Logo" width={40} height={40} />
          <span className="ml-2 text-lg font-bold">VoidNote</span>
        </div>
        <nav className="flex space-x-4">
          <Link href="/pricing">
            <div className="hover:text-gray-300">Pricing</div>
          </Link>
          <Link href="/features">
            <div className="hover:text-gray-300">Features</div>
          </Link>
          <Link href="/notes">
            <div className="hover:text-gray-300">Notes</div>
          </Link>
          <Link href="/about">
            <div className="hover:text-gray-300">About</div>
          </Link>
        </nav>
        <div className="flex space-x-4">
          <Link href="/login">
            <div className="hover:text-gray-300">Login</div>
          </Link>
          <Link href="/register">
            <div className="hover:text-gray-300">Register</div>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header
