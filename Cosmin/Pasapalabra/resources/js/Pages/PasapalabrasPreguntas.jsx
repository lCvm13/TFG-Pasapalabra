import Pasapalabra from "@/Components/RoscoPasapalabra";
import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react"
import RoscoPasapalabra from "@/Components/RoscoPasapalabra";
import NavMenu from "@/Components/NavMenu";
import LetterModal from "@/Components/LetterModal";
export default function PasapalabraRosco({ categoria, auth, pasapalabra, preguntas, preguntasPasapalabra }) {
  const { flash } = usePage().props
  const [letterValue, setLetterValue] = useState("a")
  const setLetter = (letter) => {
    setLetterValue(letter)
  }
  let preguntasLetra = preguntas.length > 0 ? preguntas.filter(pregunta => pregunta.letra == letterValue.toLocaleUpperCase()) : []
  useEffect(() => {
    if (preguntas.length == 0) {
      alert("No existen preguntas para añadir al pasapalabra");
      location.href = route("pasapalabra.index");
    }
  }, [preguntas])
  const [deleteLetter, setDeleteLetter] = useState(false)
  const user = (auth) => {
    return auth.id;
  };
  const [values, setValues] = useState({
    id_pasapalabra: pasapalabra.id,
    id_usuario: user(auth.user),
    id_pregunta: ""
  })
  useEffect(() => {
    if (flash.message != undefined && flash.message != null) {
      alert(flash.message);
      // Reset id_pregunta here
      setValues(prevValues => ({
        ...prevValues,
        id_pregunta: ""
      }));
      // Reset flash.message to undefined
      flash.message = undefined;
    }
  }, [flash]);

  useEffect(() => {
    const letras = document.getElementsByClassName("letter")
    for (let i = 0; i < letras.length; i++) {
      letras[i].style.backgroundColor = "darkred"
    }
    if (preguntasPasapalabra != undefined) {
      preguntasPasapalabra.forEach(element => {
        let pregunta_colorear = preguntas.find(e => e.id == element.id_pregunta);
        if (pregunta_colorear) {
          let letterElement = document.getElementById(pregunta_colorear.letra.toLowerCase());
          if (letterElement) {
            letterElement.style.backgroundColor = "green";
          }
        }
      });
    }
  }, [preguntasPasapalabra]); // Add dependencies to ensure this runs on update

  function handleChange(e) {
    const key = e.target.id
    const value = e.target.value
    setValues(values => ({
      ...values,
      [key]: value
    }))
  }
  function handleSubmit(e) {
    e.preventDefault()
    const pregunta = preguntas.find(e => e.id == values.id_pregunta)
    if (pregunta == undefined) {
      return alert('No has insertado una pregunta')
    }

    if (document.getElementById(pregunta.letra.toLowerCase()).style.backgroundColor == "green" && !pasapalabra.infinito) {
      alert("Ya has insertado esta pregunta para esta letra")
      return
    }
    router.post(route("preguntas_pasapalabras.store"), values);
  }
  const destroyLetter = (e) => {
    e.preventDefault();
    router.delete(route("preguntas_pasapalabras.destroy", { id_pasapalabra: values.id_pasapalabra, preguntas_pasapalabra: values.id_pregunta }), {
      onBefore: () => confirm('¿Estás seguro que quieres borrar esta pregunta del rosco?'),
    })
  }

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let letters = [];

  preguntasPasapalabra.forEach(element => {
    let preguntaActual = preguntas.find(item => item.id == element.id_pregunta)
    letters.push(preguntaActual)
  });

  return preguntas.length > 0 ? (<>
    <div className="fondos bg-pasapalabraImage ">
      <RoscoPasapalabra letterValue={letterValue} setLetter={setLetter}></RoscoPasapalabra>
      <section className="w-full h-screen grid grid-cols-2">
        <NavMenu user={auth.user}></NavMenu>
        <div className={!deleteLetter ? "justify-self-center self-center border-solid border-8 border-royal-blue p-20 flex flex-col gap-10 mr-40 mb-40 bg-white" : "justify-self-center self-center border-solid border-8 border-red-600 p-20 flex flex-col gap-10 mr-40 mb-40 bg-white"}>
          <div className="flex flex-cols gap-10 self-center">
            <button onClick={handleOpen} className={`justify-self-center self-center px-4 py-2 ${deleteLetter ? 'bg-red-700  hover:bg-red-400' : 'bg-royal-blue  hover:bg-blue-700'} text-white rounded`}>Ver listado de preguntas</button>
            <button onClick={deleteLetter ? () => setDeleteLetter(false) : () => setDeleteLetter(true)} className={`justify-self-center self-center px-4 py-2 text-white rounded ${deleteLetter ? 'bg-royal-blue hover:bg-blue-700' : 'bg-red-700 hover:bg-red-400'}`}>{deleteLetter ? 'Añadir preguntas' : 'Borrar preguntas'} </button>
          </div>

          <h1 className="text-blue-400 font-extrabold text-4xl">Preguntas {deleteLetter ? <span className="text-red-600">a borrar</span> : null} para la letra {letterValue.toLocaleUpperCase()}</h1>
          <form onSubmit={deleteLetter ? destroyLetter : handleSubmit} method="POST" className="flex flex-col gap-10">
            <div className="flex flex-row items-center justify-center gap-5">
              <label htmlFor="cat">Selecciona una pregunta por su letra</label>
              <select name="id_pregunta" id="id_pregunta" value={values.id_pregunta} onChange={handleChange}>
                {!deleteLetter && preguntasLetra.length == 0 ? <option value="">No hay preguntas para esta letra</option> : <option value="">Selecciona una pregunta</option>}
                {!deleteLetter ? preguntasLetra.map((pregunta, index) => {
                  return <option key={index} value={pregunta.id}>{pregunta.pregunta}</option>
                }
                ) : preguntasLetra != undefined ? preguntasPasapalabra.map((borrar, index) => {
                  let preguntasBorrar = preguntasLetra.find(pregunta => pregunta.id == borrar.id_pregunta && pregunta.letra == letterValue.toLocaleUpperCase())
                  return preguntasBorrar != undefined ? <option key={index} value={preguntasBorrar.id}>{preguntasBorrar.pregunta}</option> : null
                }) : null}
              </select>
            </div>
            <button className={`${deleteLetter ? 'border-red-700 hover:bg-red-400' : 'border-sky-500 hover:bg-sky-200'} border-solid border-2 w-max p-2 self-center`}> {deleteLetter ? 'Borrar' : 'Insertar'}</button>
          </form>
          <LetterModal open={open} handleClose={handleClose} letters={letters.length == 0 ? null : letters} />
        </div>
      </section>
    </div>
  </>) : null
}