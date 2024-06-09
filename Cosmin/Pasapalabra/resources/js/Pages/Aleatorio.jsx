import Pasapalabra from "@/Components/RoscoPasapalabra";
import { useState } from "react";
import { router, usePage } from "@inertiajs/react"
import NavMenu from "@/Components/NavMenu";
export default function Aleatorio({ preguntas, categorias, auth }) {
  const { flash } = usePage().props
  if (flash.message != undefined) {
    alert(flash.message)
    flash.message = undefined
    window.location.reload();
  }
  const [letterValue, setLetterValue] = useState("a")
  const [resUsuario, setResUsuario] = useState([])

  const setLetter = (letter) => {
    let pregunta = preguntas.preguntas.find(element => element.letra == letter.toLocaleUpperCase())
    let respuestaU = resUsuario.find(element => element.letra == letter.toLocaleUpperCase())
    if (respuestaU?.respuesta == undefined) {
      alert("Aun no has contestado a la pregunta")
    } else {
      alert(`La respuesta correcta es : ${pregunta.respuesta} \nTu respuesta fue : ${respuestaU.respuesta == "" ? "Pasapalabra" : respuestaU.respuesta}`)
    }

    setLetterValue(letter)
  }
  const [respuestaUsuario, setRespuestaUsuario] = useState('');
  const [progreso, setProgreso] = useState(0);
  const handleInputChange = (event) => {
    setRespuestaUsuario(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setResUsuario(resUsuario.concat({ letra: preguntas.preguntas[progreso].letra, respuesta: respuestaUsuario }))
    if (respuestaUsuario.trim() == "") {

    } else
      if (respuestaUsuario.toLowerCase() === preguntas.preguntas[progreso].respuesta.toLowerCase()) {
        document.getElementById(preguntas.preguntas[progreso].letra.toLowerCase()).style.backgroundColor = "green";
      } else {
        document.getElementById(preguntas.preguntas[progreso].letra.toLowerCase()).style.backgroundColor = "red";
      }
    setProgreso(progreso + 1);
    setRespuestaUsuario('');
  }
  const handlePasapalabra = () => {
    // Saltar la pregunta actual incrementando el progreso
    setProgreso(progreso + 1);
    setRespuestaUsuario('');
  }
  return <div className="min-h-svh min-w-svw bg-partidasImage fondos before:opacity-50" >
    <NavMenu user={auth.user} color={"white"}></NavMenu>
    <section className="w-full h-screen grid grid-cols-2 ">
      <Pasapalabra letterValue={letterValue} setLetter={setLetter}></Pasapalabra>
      <div className="flex flex-col max-w-md w-full mx-20 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 self-center gap-5">
        <h1 className="text-2xl font-bold mb-4">Pregunta</h1>
        <h2 className="text-xl mb-4">{preguntas.preguntas[progreso].pregunta}</h2>
        <p className="mb-2"><span className="font-bold">Letra:</span> {preguntas.preguntas[progreso].letra}</p>
        <p className="mb-4"><span className="font-bold">Posición:</span> {preguntas.preguntas[progreso].posicion}</p>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Respuesta:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={respuestaUsuario}
              onChange={handleInputChange}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Contestar
          </button>
        </form>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handlePasapalabra}
        >
          Pasapalabra
        </button>

      </div>
    </section>
  </div>
}