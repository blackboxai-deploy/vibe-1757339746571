'use client';

import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { ProviderSelector } from '@/components/ProviderSelector';
import { StockController } from '@/components/StockController';
import { useStock } from '@/contexts/StockContext';
import { Esencia, Proveedor } from '@/types';

export default function HomePage() {
  const [esenciaSeleccionada, setEsenciaSeleccionada] = useState<Esencia | null>(null);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState<Proveedor | null>(null);
  const { esencias, movimientos } = useStock();

  // Calcular estadísticas rápidas
  const totalStock = esencias.reduce((total, esencia) => 
    total + esencia.proveedores.reduce((subtotal, proveedor) => 
      subtotal + proveedor.stockActual, 0), 0
  );
  
  const esenciasConStockBajo = esencias.filter(esencia => 
    esencia.proveedores.some(p => p.stockActual <= 10)
  );

  const movimientosHoy = movimientos.filter(mov => {
    const hoy = new Date();
    const fechaMov = new Date(mov.fecha);
    return fechaMov.toDateString() === hoy.toDateString();
  });

  return (
    <div className="space-y-6">
      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{esencias.length}</div>
          <div className="text-sm text-gray-600">Esencias</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{totalStock}</div>
          <div className="text-sm text-gray-600">Stock Total</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">{esenciasConStockBajo.length}</div>
          <div className="text-sm text-gray-600">Stock Bajo</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{movimientosHoy.length}</div>
          <div className="text-sm text-gray-600">Movimientos Hoy</div>
        </div>
      </div>

      {/* Panel Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Columna Izquierda - Selección */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Buscar Esencia
            </h2>
            <SearchBar
              onEsenciaSelect={setEsenciaSeleccionada}
              selectedEsencia={esenciaSeleccionada}
            />
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Seleccionar Proveedor
            </h2>
            <ProviderSelector
              esencia={esenciaSeleccionada}
              onProviderSelect={setProveedorSeleccionado}
              selectedProvider={proveedorSeleccionado}
            />
          </div>
        </div>

        {/* Columna Derecha - Control */}
        <div>
          <StockController
            esencia={esenciaSeleccionada}
            proveedor={proveedorSeleccionado}
          />
        </div>
      </div>

      {/* Resumen de esencias con stock bajo */}
      {esenciasConStockBajo.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-4">
            ⚠️ Esencias con Stock Bajo
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {esenciasConStockBajo.map(esencia => (
              <div key={esencia.id} className="bg-white border border-yellow-200 rounded-lg p-3">
                <div className="font-medium text-gray-900 mb-1">{esencia.nombre}</div>
                <div className="space-y-1">
                  {esencia.proveedores.filter(p => p.stockActual <= 10).map(proveedor => (
                    <div key={proveedor.nombre} className="flex justify-between text-sm">
                      <span className="text-gray-600">{proveedor.nombre}</span>
                      <span className="text-red-600 font-medium">{proveedor.stockActual}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}