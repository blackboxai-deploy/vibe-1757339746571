'use client';

import Link from 'next/link';
import { MovementsTable } from '@/components/MovementsTable';
import { useStock } from '@/contexts/StockContext';

export default function PlanillaPage() {
  const { movimientos } = useStock();

  const totalEntradas = movimientos.filter(m => m.tipo === 'entrada').length;
  const totalSalidas = movimientos.filter(m => m.tipo === 'salida').length;
  
  // Calcular cantidad total de entradas y salidas
  const cantidadEntradas = movimientos
    .filter(m => m.tipo === 'entrada')
    .reduce((sum, m) => sum + m.cantidad, 0);
  
  const cantidadSalidas = movimientos
    .filter(m => m.tipo === 'salida')
    .reduce((sum, m) => sum + m.cantidad, 0);

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Historial de Movimientos</h1>
          <p className="text-gray-600">Registro completo de todas las operaciones</p>
        </div>
        <Link 
          href="/"
          className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors"
        >
          ← Volver
        </Link>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{movimientos.length}</div>
          <div className="text-sm text-gray-600">Total Movimientos</div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{totalEntradas}</div>
          <div className="text-sm text-gray-600">Entradas</div>
          <div className="text-xs text-gray-500 mt-1">{cantidadEntradas} unidades</div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{totalSalidas}</div>
          <div className="text-sm text-gray-600">Salidas</div>
          <div className="text-xs text-gray-500 mt-1">{cantidadSalidas} unidades</div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{cantidadEntradas - cantidadSalidas}</div>
          <div className="text-sm text-gray-600">Balance Neto</div>
          <div className="text-xs text-gray-500 mt-1">unidades</div>
        </div>
      </div>

      {/* Tabla de movimientos */}
      <MovementsTable />
    </div>
  );
}