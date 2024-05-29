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
  const [deleteLetter, setDeleteLetter] = useState(false)

  const destroyLetter = () => {
    router.delete(route("preguntapasapalabra.destroy", id), {
      onBefore: () => confirm('¿Estás seguro que quieres borrar este pregunta?. Si esta pregunta esta asignada a un rosco se borrara de éste también.'),
    })
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
  console.log(preguntasPasapalabra)
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

  const generateSelect = () => {
    return deleteLetter ? preguntasPasapalabra : preguntasLetra
  }
  return <>
    <RoscoPasapalabra letterValue={letterValue} setLetter={setLetter}></RoscoPasapalabra>
    <section className="w-full h-screen grid grid-cols-2">
      <NavMenu user={auth.user}></NavMenu>
      <div className="justify-self-center self-center border-solid border-2 border-sky-500 p-10 flex flex-col gap-10 mr-40 mb-40">
        <div className="flex flex-cols gap-10 self-center">
          <button onClick={handleOpen} className="justify-self-center self-center px-4 py-2 bg-royal-blue text-white rounded hover:bg-blue-700">Ver listado de preguntas</button>
          <button onClick={deleteLetter ? () => setDeleteLetter(false) : () => setDeleteLetter(true)} className="justify-self-center self-center px-4 py-2 bg-royal-blue text-white rounded hover:bg-blue-700">{deleteLetter ? 'Añadir preguntas' : 'Borrar preguntas'} </button>
        </div>

        <h1 className="text-blue-400 font-extrabold text-4xl">Preguntas {deleteLetter ? "a borrar" : null} para la letra {letterValue.toLocaleUpperCase()}</h1>
        <form onSubmit={deleteLetter ? destroyLetter : handleSubmit} method="POST" className="flex flex-col gap-10">
          <div className="flex flex-row items-center justify-center gap-5">
            <label htmlFor="cat">Selecciona una pregunta por su letra</label>
            <select name="id_pregunta" id="id_pregunta" value={values.id_pregunta} onChange={handleChange}>

              {preguntasLetra.length == 0 ? <option value="">No hay preguntas para esta letra</option> : <option value="">Selecciona una pregunta</option>}
              {preguntasLetra.map((pregunta, index) => {
                if (deleteLetter) {
                  let preguntaBorrar = preguntasPasapalabra.filter(e => e.id_pregunta == pregunta.id)
                  console.log(preguntaBorrar)
                  let preguntaBorrarPregunta = preguntaBorrar.length > 0 ? preguntasLetra.filter(pregunta => pregunta.id == preguntaBorrar[0].id_pregunta) : null
                  if (preguntaBorrarPregunta != null) {
                    preguntaBorrarPregunta.map((preguntaABorrar, index) => {
                      return <option key={index} value={preguntaABorrar.id}>{preguntaABorrar.pregunta}</option>
                    })
                  } else {
                    return <option key={index} value="">No hay preguntas a borrar por esta letra</option>
                  }
                }
                return <option key={index} value={pregunta.id}>{pregunta.pregunta}</option>
              }
              )}
            </select>
          </div>
          <button className="border-sky-500 border-solid border-2 w-max p-2 self-center hover:bg-sky-200"> {deleteLetter ? 'Borrar' : 'Insertar'}</button>
        </form>
        <LetterModal open={open} handleClose={handleClose} letters={letters} />

      </div>
    </section>
  </>
}