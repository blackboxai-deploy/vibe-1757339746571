'use client';

import { useState, useEffect } from 'react';
import { useStock } from '@/contexts/StockContext';
import { Esencia } from '@/types';

interface SearchBarProps {
  onEsenciaSelect: (esencia: Esencia) => void;
  selectedEsencia: Esencia | null;
}

export function SearchBar({ onEsenciaSelect, selectedEsencia }: SearchBarProps) {
  const [termino, setTermino] = useState('');
  const [resultados, setResultados] = useState<Esencia[]>([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const { buscarEsencias } = useStock();

  useEffect(() => {
    if (termino.trim()) {
      const esenciasEncontradas = buscarEsencias(termino);
      setResultados(esenciasEncontradas);
      setMostrarResultados(true);
    } else {
      setResultados([]);
      setMostrarResultados(false);
    }
  }, [termino, buscarEsencias]);

  const handleEsenciaClick = (esencia: Esencia) => {
    setTermino(esencia.nombre);
    setMostrarResultados(false);
    onEsenciaSelect(esencia);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermino(e.target.value);
    if (!e.target.value.trim() && selectedEsencia) {
      onEsenciaSelect(null as any);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Buscar esencia..."
        value={termino}
        onChange={handleInputChange}
        className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none transition-all"
        autoComplete="off"
      />

      {mostrarResultados && resultados.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-10 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          {resultados.map((esencia) => (
            <button
              key={esencia.id}
              onClick={() => handleEsenciaClick(esencia)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors border-b border-gray-50 last:border-0"
            >
              <div className="font-medium text-gray-900">{esencia.nombre}</div>
              <div className="text-sm text-gray-500">
                {esencia.proveedores.length} proveedor{esencia.proveedores.length !== 1 ? 'es' : ''}
              </div>
            </button>
          ))}
        </div>
      )}

      {mostrarResultados && resultados.length === 0 && termino.trim() && (
        <div className="absolute top-full left-0 right-0 z-10 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-4">
          <div className="text-sm text-gray-500 text-center">
            No se encontraron esencias
          </div>
        </div>
      )}

      {selectedEsencia && (
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-green-800">{selectedEsencia.nombre}</span>
          </div>
        </div>
      )}
    </div>
  );
}