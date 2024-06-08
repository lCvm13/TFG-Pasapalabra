import React, { useState } from 'react';

const PreguntaModal = ({ isOpen, onClose, preguntas, categorias }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen || !preguntas || preguntas.length === 0) return null;

  const currentPregunta = preguntas[currentIndex];

  const handleNext = () => {
    if (currentIndex < preguntas.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-semibold mb-4">{"P: " + currentPregunta.pregunta}</h2>
        <p className="mb-4">{"R: " + currentPregunta.respuesta}</p>
        <p className="mb-4">{"R_U: " + currentPregunta.respuestaUsuario}</p>
        <p className="mb-4"><strong>Categoría:</strong> {categorias.find(e => e.id == currentPregunta.id_categoria) ?? "No tiene categoria"}</p>
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrev}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            disabled={currentIndex === 0}
          >
            Anterior
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            disabled={currentIndex === preguntas.length - 1}
          >
            Siguiente
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default PreguntaModal;
