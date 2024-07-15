import Link from 'next/link'
import Image from 'next/image'
import { ModeToggle } from './ModeToggle'

const Navbar = () => {
  return (
    <header className="py-4">
      <div className=" px-5 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="VoidNote Logo" width={40} height={40} />
          <span className="ml-2 text-lg font-bold">VoidNote</span>
        </Link>
        <nav className="flex space-x-8">
          <Link href="/pricing">
            <div className="hover:text-gray-300">Pricing</div>
          </Link>
          <Link href="/features">
            <div className="hover:text-gray-300">Features</div>
          </Link>
          <Link href="/dashboard">
            <div className="hover:text-gray-300">Notes</div>
          </Link>
          <Link href="/about">
            <div className="hover:text-gray-300">About</div>
          </Link>
        </nav>
        <div className="flex space-x-8 items-center">
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

export default Navbar
