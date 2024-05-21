import Pasapalabra from "@/Components/RoscoPasapalabra";
import { useEffect, useState } from "react";
import { router } from "@inertiajs/react"
import RoscoPasapalabra from "@/Components/RoscoPasapalabra";
import NavMenu from "@/Components/NavMenu";
import LetterModal from "@/Components/LetterModal";
export default function PasapalabraForm({ categoria, auth, pasapalabra, preguntas, preguntasPasapalabra }) {
  const [letterValue, setLetterValue] = useState("a")
  const setLetter = (letter) => {
    setLetterValue(letter)
  }
  const user = (auth) => {
    return auth.id;
  };
  const [values, setValues] = useState({
    id_pasapalabra: pasapalabra.id,
    id_usuario: user(auth.user),
    id_pregunta: ""
  })
  const letras = document.getElementsByClassName("letter")
  for (let i = 0; i < letras.length; i++) {
    letras[i].style = "background-color:darkred"
  }
  useEffect(() => {
    preguntasPasapalabra.forEach(element => {
      let pregunta_colorear = preguntas.find(e => e.id == element.id_pregunta)
      document.getElementById(pregunta_colorear.letra.toLowerCase()).style.backgroundColor = "green"
    });
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
  function handleSubmit(e) {
    e.preventDefault()

    const pregunta = preguntas.find(e => e.id == values.id_pregunta)
    if (document.getElementById(pregunta.letra.toLowerCase()).style.backgroundColor == "green" && !pasapalabra.infinito) {
      alert("Ya has insertado esta pregunta para esta letra")
      return
    }
    router.post(route("preguntas_pasapalabras.store"), values)
  }

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let letters = [];

  preguntasPasapalabra.forEach(element => {
    let preguntaActual = preguntas.find(item => item.id == element.id_pregunta)
    letters.push(preguntaActual)
  });
  console.log(letters)

  return <section className="w-full h-screen grid grid-cols-3">
    <NavMenu user={auth.user}></NavMenu>
    <RoscoPasapalabra letterValue={letterValue} setLetter={setLetter}></RoscoPasapalabra>
    <div className="justify-self-center self-center border-solid border-2 border-sky-500 p-10 flex flex-col gap-10 mr-40 mb-40">
      <h1 className="text-blue-400 font-extrabold text-4xl">Preguntas para la letra {letterValue}</h1>
      <form onSubmit={handleSubmit} method="POST" className="flex flex-col gap-10">
        <div className="flex flex-row items-center justify-center gap-5">
          <label htmlFor="cat">Selecciona una pregunta para la letra</label>
          <select name="id_pregunta" id="id_pregunta" value={values.id_pregunta} onChange={handleChange}>
            {preguntasLetra.length == 0 ? <option value="">No hay preguntas para esta letra</option> : <option value="">Selecciona una pregunta</option>}
            {preguntasLetra.map((pregunta, index) => {
              return <option key={index} value={pregunta.id}>{pregunta.pregunta}</option>
            }
            )}
          </select>
        </div>
        <button className="border-sky-500 border-solid border-2 w-max p-2 self-center hover:bg-sky-200">Insertar</button>
      </form>

      <button onClick={handleOpen} className="justify-self-center self-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Ver listado de preguntas</button>
      <LetterModal open={open} handleClose={handleClose} letters={letters} />

    </div>
  </section>

}