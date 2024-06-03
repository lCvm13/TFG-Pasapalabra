// LetterModal.js
import React, { useState } from 'react';


const LetterModal = ({ open, handleClose, letters }) => {
  const [selectedLetter, setSelectedLetter] = useState(letters != null ? letters[0].letra : null);

  const handleChange = (event) => {
    setSelectedLetter(event.target.value);
  };

  const currentLetter = letters != null ? letters.find((item) => item.letra === selectedLetter) : null;

  if (!open) return null;

  return letters != null ? (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Listado de preguntas</h2>
        <select
          value={selectedLetter}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded mb-4"
        >
          {letters.map((item, i) => (
            <option key={i} value={item.letra}>
              {item.letra}
            </option>
          ))}
        </select>
        <p className="mb-4">Pregunta: {currentLetter.pregunta}</p>
        <button
          onClick={handleClose}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Cerrar
        </button>
      </div>
    </div>
  ) : null
};

export default LetterModal;