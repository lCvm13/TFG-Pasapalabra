
import Pasapalabra from "@/Components/RoscoPasapalabra";
import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react"
import NavMenu from "@/Components/NavMenu";
export default function Juego({ preguntas, pasapalabra, partida, auth, preguntas_partida }) {
  const { flash } = usePage().props
  if (flash.message != undefined) {
    alert(flash.message)
    flash.message = undefined
    window.location.reload();
  }
  const [letterValue, setLetterValue] = useState("a")
  const [respuestaUsuario, setRespuestaUsuario] = useState('');
  const [progreso, setProgreso] = useState(0);
  const [resUsuario, setResUsuario] = useState([])
  const [historyUsuario, setHistoryUsuario] = useState([])
  let arrayPreguntasUser = []
  useEffect(() => {
    let progresoActual = 0
    preguntas_partida.forEach(element => {
      if (progresoActual === preguntas.length - 1) {
        const deseaRepetir = confirm('¿Quieres repetir la partida?');
        if (deseaRepetir) {
          progresoActual = 0;
          setProgreso(0);
          let letras = document.getElementsByClassName('letter')
          for (let i = 0; i < letras.length; i++) {
            letras[i].style.backgroundColor = "#176bcb"
          }
          router.post(route('partida.store'), {
            nombre: `${partida.nombre}_${`${partida.id}`}`,
            id_pasapalabra: partida.id_pasapalabra,
            id_usuario: auth.user.id,
          });
        }
        return
      }
      if (element.respuesta_usuario.trim() == "") {

      } else if (element.respuesta_usuario.toLowerCase() === preguntas[progresoActual].respuesta.toLowerCase()) {
        document.getElementById(preguntas[progresoActual].letra.toLowerCase()).style.backgroundColor = "green";
      } else {
        document.getElementById(preguntas[progresoActual].letra.toLowerCase()).style.backgroundColor = "red";
      }
      arrayPreguntasUser.push({ letra: preguntas[progresoActual].letra, respuesta: element.respuesta_usuario })
      progresoActual++

    });
    setHistoryUsuario(arrayPreguntasUser)
    setProgreso(progresoActual)
    setRespuestaUsuario('');
  }, [])


  const setLetter = (letter) => {
    let pregunta = preguntas?.find(element => element.letra == letter.toLocaleUpperCase())
    let respuestaU = resUsuario?.find(element => element.letra == letter.toLocaleUpperCase())
    let respuestaHistory = historyUsuario?.find(element => element.letra == letter.toLocaleUpperCase())
    const tuRespuesta = respuestaU?.respuesta != undefined ? respuestaU.respuesta : respuestaHistory?.respuesta
    if (tuRespuesta == undefined) {
      alert("No has contestado la pregunta")
    } else {
      alert(`La respuesta correcta es : ${pregunta?.respuesta} \nTu respuesta fue : ${tuRespuesta == "" ? "Pasapalabra" : tuRespuesta}`)
    }

    setLetterValue(letter)
  }

  const handleInputChange = (event) => {
    setRespuestaUsuario(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    setResUsuario(resUsuario.concat({ letra: preguntas[progreso].letra, respuesta: respuestaUsuario }))
    if (respuestaUsuario.trim() == "") {

    } else if (respuestaUsuario.toLowerCase() === preguntas[progreso].respuesta.toLowerCase()) {
      document.getElementById(preguntas[progreso].letra.toLowerCase()).style.backgroundColor = "green";
      // router.patch((`/partida/${partida.id}`), { sin_contestar: partida.sin_contestar - 1, num_aciertos: partida.num_aciertos + 1 })
    } else {
      document.getElementById(preguntas[progreso].letra.toLowerCase()).style.backgroundColor = "red";
      // router.patch((`/partida/${partida.id}`), { sin_contestar: partida.sin_contestar - 1, num_fallados: partida.num_fallados + 1 })
    }
    router.post(route('preguntas_partidas.store', {
      respuesta_usuario: respuestaUsuario,
      id_partida: partida.id,
      id_pregunta: preguntas[progreso].id,  // Corrección del campo
      id_usuario: auth.user.id
    }));
    if (progreso === preguntas.length - 1) {
      const deseaRepetir = confirm('¿Quieres repetir la partida?');
      if (deseaRepetir) {
        setHistoryUsuario(null)
        setProgreso(0);
        let letras = document.getElementsByClassName('letter')
        for (let i = 0; i < letras.length; i++) {
          letras[i].style.backgroundColor = "#176bcb"
        }

        router.post(route('partida.store'), {
          nombre: `${partida.nombre.split("_")[0]}_${`${partida.id}`}`,
          id_pasapalabra: partida.id_pasapalabra,
          id_usuario: auth.user.id,
        })
      }
      return;
    }
    setProgreso(progreso + 1);
    setRespuestaUsuario('');
  }
  const handlePasapalabra = () => {
    // Saltar la pregunta actual incrementando el progreso
    setResUsuario(resUsuario.concat({ letra: preguntas[progreso].letra, respuesta: "" }))
    router.post(route('preguntas_partidas.store', {
      respuesta_usuario: "",
      id_partida: partida.id,
      id_pregunta: preguntas[progreso].id,  // Corrección del campo
      id_usuario: auth.user.id
    }));
    if (progreso === preguntas.length - 1) {
      const deseaRepetir = confirm('¿Quieres repetir la partida?');
      if (deseaRepetir) {
        setProgreso(0);
        setResUsuario("")
        let letras = document.getElementsByClassName('letter');
        for (let i = 0; i < letras.length; i++) {
          letras[i].style.backgroundColor = "#176bcb";
        }
        let fecha = new Date().toISOString().split('T');
        router.post(route('partida.store'), {
          nombre: `${partida.nombre}_${`${partida.nombre.replace(/_\d{4}-\d{2}-\d{2}$/g, '')}_${fecha[0]}${fecha[1].slice(fecha[1].length - 1, fecha[1].length)}`}`,
          id_pasapalabra: partida.id_pasapalabra,
          id_usuario: auth.user.id,
        });
      }
      return;
    }

    setProgreso(progreso + 1);
    setRespuestaUsuario('');
  }
  return <div className="min-h-svh min-w-svw bg-partidasImage fondos before:opacity-50" >
    <NavMenu user={auth.user} color={"white"}></NavMenu>
    <section className="w-full h-screen grid grid-cols-2 ">
      <Pasapalabra letterValue={letterValue} setLetter={setLetter}></Pasapalabra>
      <div className="flex flex-col max-w-md w-full mx-20 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 self-center gap-5">
        <h1 className="text-2xl font-bold mb-4">Pregunta</h1>
        <h2 className="text-xl mb-4">{preguntas[progreso].pregunta}</h2>
        <p className="mb-2"><span className="font-bold">Letra:</span> {preguntas[progreso].letra}</p>
        <p className="mb-4"><span className="font-bold">Posición:</span> {preguntas[progreso].posicion_letra}</p>
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