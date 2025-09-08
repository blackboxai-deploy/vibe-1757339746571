'use client';

import { useState, useEffect } from 'react';
import { Esencia, Proveedor } from '@/types';

interface ProviderSelectorProps {
  esencia: Esencia | null;
  onProviderSelect: (proveedor: Proveedor) => void;
  selectedProvider: Proveedor | null;
}

export function ProviderSelector({ esencia, onProviderSelect, selectedProvider }: ProviderSelectorProps) {
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState<string>('');

  useEffect(() => {
    setProveedorSeleccionado('');
    onProviderSelect(null as any);
  }, [esencia, onProviderSelect]);

  const handleProviderChange = (proveedor: Proveedor) => {
    setProveedorSeleccionado(proveedor.nombre);
    onProviderSelect(proveedor);
  };

  if (!esencia) {
    return (
      <div className="space-y-2">
        <div className="text-sm text-gray-500 mb-2">Seleccionar Proveedor</div>
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-center text-gray-400">
          Primero selecciona una esencia
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="text-sm text-gray-700 font-medium">Proveedor</div>
      <div className="grid gap-2">
        {esencia.proveedores.map((proveedor) => (
          <button
            key={proveedor.nombre}
            onClick={() => handleProviderChange(proveedor)}
            className={`p-4 rounded-xl border text-left transition-all ${
              proveedorSeleccionado === proveedor.nombre
                ? 'border-purple-300 bg-purple-50 ring-2 ring-purple-200'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="font-medium text-gray-900">{proveedor.nombre}</div>
              <div className={`px-2 py-1 rounded-lg text-sm font-medium ${
                proveedor.stockActual <= 10 
                  ? 'bg-red-100 text-red-700' 
                  : proveedor.stockActual <= 50 
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-green-100 text-green-700'
              }`}>
                {proveedor.stockActual}
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedProvider && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium text-blue-900">{selectedProvider.nombre}</div>
              <div className="text-sm text-blue-700">Stock disponible</div>
            </div>
            <div className="text-2xl font-bold text-blue-800">
              {selectedProvider.stockActual}
            </div>
          </div>
          
          {selectedProvider.stockActual <= 10 && (
            <div className="mt-3 p-2 bg-yellow-100 border border-yellow-300 rounded-lg">
              <div className="text-sm text-yellow-800 font-medium">
                ⚠️ Stock bajo
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}