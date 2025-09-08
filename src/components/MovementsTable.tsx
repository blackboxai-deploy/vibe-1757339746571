'use client';

import { useState, useMemo } from 'react';
import { useStock } from '@/contexts/StockContext';

export function MovementsTable() {
  const { movimientos } = useStock();
  const [filtroEsencia, setFiltroEsencia] = useState<string>('');
  const [filtroTipo, setFiltroTipo] = useState<string>('');

  // Aplicar filtros
  const movimientosFiltrados = useMemo(() => {
    return movimientos.filter(movimiento => {
      const cumpleFiltroEsencia = !filtroEsencia || 
        movimiento.esenciaNombre.toLowerCase().includes(filtroEsencia.toLowerCase());
      const cumpleFiltroTipo = !filtroTipo || movimiento.tipo === filtroTipo;
      
      return cumpleFiltroEsencia && cumpleFiltroTipo;
    });
  }, [movimientos, filtroEsencia, filtroTipo]);

  const formatearFecha = (fecha: Date) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const limpiarFiltros = () => {
    setFiltroEsencia('');
    setFiltroTipo('');
  };

  if (movimientos.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
        <div className="text-4xl mb-4">📊</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Sin movimientos
        </h3>
        <p className="text-gray-500">
          Los movimientos aparecerán aquí cuando agregues o descuentes stock.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por esencia</label>
            <input
              type="text"
              placeholder="Buscar esencia..."
              value={filtroEsencia}
              onChange={(e) => setFiltroEsencia(e.target.value)}
              className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none transition-all"
            />
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de movimiento</label>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none transition-all"
            >
              <option value="">Todos</option>
              <option value="entrada">Entradas</option>
              <option value="salida">Salidas</option>
            </select>
          </div>
          
          <button 
            onClick={limpiarFiltros}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            Limpiar
          </button>
        </div>
        
        <div className="mt-3 text-sm text-gray-500">
          Mostrando {movimientosFiltrados.length} de {movimientos.length} movimientos
        </div>
      </div>

      {/* Lista de movimientos */}
      <div className="space-y-3">
        {movimientosFiltrados.map((movimiento) => (
          <div key={movimiento.id} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  movimiento.tipo === 'entrada' ? 'bg-green-400' : 'bg-red-400'
                }`}></div>
                <div>
                  <div className="font-medium text-gray-900">{movimiento.esenciaNombre}</div>
                  <div className="text-sm text-gray-500">{movimiento.proveedor}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-lg font-semibold ${
                  movimiento.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {movimiento.tipo === 'entrada' ? '+' : '-'}{movimiento.cantidad}
                </div>
                <div className="text-xs text-gray-500">
                  {formatearFecha(movimiento.fecha)}
                </div>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Stock anterior:</span>
                <span className="ml-2 font-medium">{movimiento.stockAnterior}</span>
              </div>
              <div>
                <span className="text-gray-500">Stock nuevo:</span>
                <span className="ml-2 font-medium">{movimiento.stockNuevo}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {movimientosFiltrados.length === 0 && movimientos.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
          <div className="text-2xl mb-2">🔍</div>
          <p className="text-gray-500">No se encontraron movimientos con estos filtros.</p>
        </div>
      )}
    </div>
  );
}