'use client';

import { useState } from 'react';
import { useStock } from '@/contexts/StockContext';
import { Esencia, Proveedor } from '@/types';

interface StockControllerProps {
  esencia: Esencia | null;
  proveedor: Proveedor | null;
}

export function StockController({ esencia, proveedor }: StockControllerProps) {
  const [cantidad, setCantidad] = useState<string>('');
  const [mensaje, setMensaje] = useState<{ tipo: 'success' | 'error', texto: string } | null>(null);
  const [procesando, setProcesando] = useState(false);
  
  const { agregarStock, descontarStock } = useStock();

  const limpiarMensaje = () => {
    setTimeout(() => setMensaje(null), 3000);
  };

  const handleOperacion = async (tipo: 'agregar' | 'descontar') => {
    if (!esencia || !proveedor) {
      setMensaje({ tipo: 'error', texto: 'Selecciona esencia y proveedor' });
      limpiarMensaje();
      return;
    }

    const cantidadNum = parseInt(cantidad);
    if (isNaN(cantidadNum) || cantidadNum <= 0) {
      setMensaje({ tipo: 'error', texto: 'Cantidad inválida' });
      limpiarMensaje();
      return;
    }

    if (tipo === 'descontar' && cantidadNum > proveedor.stockActual) {
      setMensaje({ 
        tipo: 'error', 
        texto: `Stock insuficiente. Disponible: ${proveedor.stockActual}` 
      });
      limpiarMensaje();
      return;
    }

    setProcesando(true);
    
    try {
      let resultado: boolean;
      
      if (tipo === 'agregar') {
        resultado = agregarStock(esencia.id, proveedor.nombre, cantidadNum);
      } else {
        resultado = descontarStock(esencia.id, proveedor.nombre, cantidadNum);
      }

      if (resultado) {
        const stockNuevo = tipo === 'agregar' 
          ? proveedor.stockActual + cantidadNum 
          : proveedor.stockActual - cantidadNum;
          
        setMensaje({ 
          tipo: 'success', 
          texto: `${tipo === 'agregar' ? 'Agregado' : 'Descontado'} ${cantidadNum} unidades` 
        });
        setCantidad('');
      } else {
        setMensaje({ tipo: 'error', texto: 'Error en la operación' });
      }
    } catch (error) {
      setMensaje({ tipo: 'error', texto: 'Error inesperado' });
    } finally {
      setProcesando(false);
      limpiarMensaje();
    }
  };

  const puedeOperar = esencia && proveedor && !procesando;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900">Control de Stock</h2>
        </div>

        {mensaje && (
          <div className={`p-3 rounded-lg text-sm font-medium ${
            mensaje.tipo === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {mensaje.texto}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cantidad</label>
            <input
              type="number"
              min="1"
              placeholder="0"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              disabled={!puedeOperar}
              className="w-full h-12 px-4 text-center text-lg font-medium bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleOperacion('agregar')}
              disabled={!puedeOperar || !cantidad.trim()}
              className="h-12 bg-green-500 hover:bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium rounded-xl transition-colors"
            >
              {procesando ? 'Procesando...' : '+ Agregar'}
            </button>

            <button
              onClick={() => handleOperacion('descontar')}
              disabled={!puedeOperar || !cantidad.trim()}
              className="h-12 bg-red-500 hover:bg-red-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium rounded-xl transition-colors"
            >
              {procesando ? 'Procesando...' : '- Descontar'}
            </button>
          </div>
        </div>

        {!esencia && (
          <div className="text-center text-gray-400 text-sm py-4">
            Selecciona una esencia para comenzar
          </div>
        )}

        {esencia && !proveedor && (
          <div className="text-center text-gray-400 text-sm py-4">
            Selecciona un proveedor para continuar
          </div>
        )}

        {puedeOperar && (
          <div className="text-center text-xs text-gray-400 pt-4 border-t">
            {esencia?.nombre} • {proveedor?.nombre} • Stock: {proveedor?.stockActual}
          </div>
        )}
      </div>
    </div>
  );
}