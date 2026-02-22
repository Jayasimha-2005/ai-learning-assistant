/**
 * Navbar Component
 * Displays the application title and navigation
 */

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              🎓 AI Learning Assistant
            </div>
          </Link>

          {/* Navigation Links - Will be added in future phases */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="hover:text-blue-200 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="#" 
              className="hover:text-blue-200 transition-colors"
            >
              Documents
            </Link>
            <Link 
              href="#" 
              className="hover:text-blue-200 transition-colors"
            >
              Flashcards
            </Link>
            <Link 
              href="#" 
              className="hover:text-blue-200 transition-colors"
            >
              Quiz
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
