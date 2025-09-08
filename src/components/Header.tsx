'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">TR</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Tía Robertina</h1>
              <p className="text-sm text-gray-500">Control de Esencias</p>
            </div>
          </div>
          
          <nav className="flex space-x-1">
            <Link href="/" className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              pathname === '/' 
                ? 'bg-purple-100 text-purple-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}>
              Stock
            </Link>
            <Link href="/planilla" className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              pathname === '/planilla' 
                ? 'bg-purple-100 text-purple-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}>
              Historial
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}