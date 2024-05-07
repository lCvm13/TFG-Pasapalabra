import Pasapalabra from "@/Components/RoscoPasapalabra";
import { useState } from "react";
import { router } from "@inertiajs/react"
import RoscoPasapalabra from "@/Components/RoscoPasapalabra";
import NavMenu from "@/Components/NavMenu";
export default function PasapalabraForm({ categoria, auth, pasapalabra, preguntas }) {
  const [letterValue, setLetterValue] = useState("a")
  const setLetter = (letter) => {
    setLetterValue(letter)
  }
  const user = (auth) => {
    return auth.id;
  };
  const [values, setValues] = useState({
    pregunta: "",
    respuesta: "",
    letra: "",
    id_usuario: user(auth.user),
    id_categoria: "",
    posicion_letra: ""
  })

  function handleChange(e) {
    const key = e.target.id
    const value = e.target.value
    setValues(values => ({
      ...values,
      [key]: value
    }))
  }
  const preguntasLetra = preguntas.filter(pregunta => pregunta.letra == letterValue.toLocaleUpperCase())
  console.log(preguntasLetra)
  function handleSubmit(e) {
    e.preventDefault()
    router.post(route("pregunta.store"), values)
  }
  return <section className="w-full h-screen grid grid-cols-3">
    <NavMenu user={auth.user}></NavMenu>
    <RoscoPasapalabra letterValue={letterValue} setLetter={setLetter}></RoscoPasapalabra>
    <div className="justify-self-center self-center border-solid border-2 border-sky-500 p-10 flex flex-col gap-10 mr-40 mb-40">
      <h1 className="text-blue-400 font-extrabold text-4xl">Preguntas para la letra {letterValue}</h1>
      <form onSubmit={handleSubmit} method="POST" className="flex flex-col gap-10">
        <div className="flex flex-row items-center justify-center gap-5">
          <label htmlFor="cat">Selecciona una pregunta para la letra</label>
          <select name="id_categoria" id="id_categoria" value={values.id_categoria} onChange={handleChange}>
            {preguntasLetra.map((pregunta, index) => {
              return <option key={index} value={pregunta.id}>{pregunta.pregunta}</option>
            }
            )}
          </select>
        </div>
        <button className="border-sky-500 border-solid border-2 w-max p-2 self-center hover:bg-sky-200">Insertar</button>
      </form>
    </div>
  </section>

}