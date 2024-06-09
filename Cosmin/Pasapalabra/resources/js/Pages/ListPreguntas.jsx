
import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react"
import { BsFillTrash2Fill, BsFillPencilFill } from "react-icons/bs";
import NavMenu from "@/Components/NavMenu";

export default function ListCategorias({ preguntas, categorias, auth, preguntas_pasapalabra, pasapalabra }) {

  const { flash } = usePage().props
  if (flash.message != undefined) {
    alert(flash.message)
    flash.message = undefined
    window.location.reload();
  }

  const valorCategoria = (id) => {
    let valor = categorias.find(element => element.id == id)
    return valor != undefined ? valor.nombre_categoria : "Sin categoria"
  }

  const [paginaActual, setPaginaActual] = useState(1);

  // Calcular el índice de inicio y fin para los elementos de la página actual
  const startIndex = (paginaActual - 1) * 10;
  const endIndex = startIndex + 10;
  const [preguntaAsc, setPreguntaAsc] = useState(false);
  const [sortedPreguntas, setSortedPreguntas] = useState(preguntas);

  useEffect(() => {
    const sortedData = [...sortedPreguntas].sort((a, b) => {
      return a.letra.localeCompare(b.letra);

    });
    setSortedPreguntas(sortedData);
  }, []);

  const orderByPregunta = () => {
    const sortedData = [...sortedPreguntas].sort((a, b) => {
      if (preguntaAsc) {
        return a.pregunta.localeCompare(b.pregunta);
      } else {
        return b.pregunta.localeCompare(a.pregunta);
      }
    });
    setPreguntaAsc(!preguntaAsc);
    setSortedPreguntas(sortedData);
  };

  // ---------------------------------------------------------------------------- //
  const [dateAsc, setDateAsc] = useState(false);
  const orderByDate = () => {
    const sortedData = [...sortedPreguntas].sort((a, b) => {
      if (dateAsc) {
        return new Date(a.updated_at) - new Date(b.updated_at);
      } else {
        return new Date(b.updated_at) - new Date(a.updated_at);
      }
    });
    setDateAsc(!dateAsc);
    setSortedPreguntas(sortedData);
  };
  // ---------------------------------------------------------------------------- //
  const [respuestaAsc, setRepuestaAsc] = useState(false);
  const orderByRespuesta = () => {
    const sortedData = [...sortedPreguntas].sort((a, b) => {
      if (respuestaAsc) {
        return a.respuesta.localeCompare(b.respuesta);
      } else {
        return b.respuesta.localeCompare(a.respuesta);
      }
    });
    setRepuestaAsc(!respuestaAsc);
    setSortedPreguntas(sortedData);
  };
  // ---------------------------------------------------------------------------- //
  const [letraAsc, setLetraAsc] = useState(false);
  const orderByLetra = () => {
    const sortedData = [...sortedPreguntas].sort((a, b) => {
      if (letraAsc) {
        return a.letra.localeCompare(b.letra);
      } else {
        return b.letra.localeCompare(a.letra);
      }
    });
    setLetraAsc(!letraAsc);
    setSortedPreguntas(sortedData);
  };
  // ---------------------------------------------------------------------------- //
  const [catAsc, setCatAsc] = useState(false);
  const orderByCat = () => {
    const sortedData = [...sortedPreguntas].sort((a, b) => {
      const catA = categorias.find(e => e.id === a.id_categoria);
      const catB = categorias.find(e => e.id === b.id_categoria);

      // Check if either catA or catB is undefined and handle accordingly
      if (!catA && !catB) return 0;
      if (!catA) return catAsc ? 1 : -1;
      if (!catB) return catAsc ? -1 : 1;

      if (catAsc) {
        return catA.nombre_categoria.localeCompare(catB.nombre_categoria);
      } else {
        return catB.nombre_categoria.localeCompare(catA.nombre_categoria);
      }
    });

    setCatAsc(!catAsc);
    setSortedPreguntas(sortedData);
  };

  //---------------------------------------------------------------------------------//
  const [posicionLetraAsc, setPosicionLetraAsc] = useState(false);
  const orderByLetraPos = () => {
    const sortedData = [...sortedPreguntas].sort((a, b) => {
      if (posicionLetraAsc) {
        return a.posicion_letra.localeCompare(b.posicion_letra);
      } else {
        return b.posicion_letra.localeCompare(a.posicion_letra);
      }
    });
    setPosicionLetraAsc(!posicionLetraAsc);
    setSortedPreguntas(sortedData);
  };

  // Obtener los datos de la página actual
  const datosPaginaActual = sortedPreguntas.slice(startIndex, endIndex)

  // Función para cambiar a la página anterior
  const irPaginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };
  // Función para cambiar a la página siguiente
  const irPaginaSiguiente = () => {
    const totalPages = Math.ceil(preguntas.length / 10);
    if (paginaActual < totalPages) {
      setPaginaActual(paginaActual + 1);
    }
  };
  const mostrarPertenencia = (id) => {
    let valor = preguntas_pasapalabra.filter(element => element.id_pregunta == id)
    console.log(valor);
    if (valor.length == 0) {
      return alert("No pertenece a ningun pasapalabra")
    }
    let string = ""
    if (valor.length == 1) {
      string = "La pregunta pertenece al rosco "
      valor.map(element => {
        let nombre_pasapalabra = pasapalabra.find(e => e.id == element.id_pasapalabra)
        string += nombre_pasapalabra.nombre
      })
    } else {
      string = "La pregunta pertenece los roscos "
      valor.map(element => {
        let nombre_pasapalabra = pasapalabra.find(e => e.id == element.id_pasapalabra)
        string += nombre_pasapalabra.nombre + ", "
      })
    }
    return alert(string.slice(0, string.length - 2))
  }
  const valor = (id) => {
    let valor = preguntas_pasapalabra.find(element => element.id_pregunta == id)
    return valor != undefined ? valor : undefined
  }

  const retorno = (id) => {
    let valor = preguntas_pasapalabra.find(element => element.id_pregunta == id)
    return valor != undefined ? "bg-green-300" : ""
  }
  const destroy = (id) => {
    router.delete(route("pregunta.destroy", id), {
      onBefore: () => confirm('¿Estás seguro que quieres borrar esta pregunta?. Si esta pregunta esta asignada a un rosco se borrara de éste también.'),
    })
  }

  return (
    <div className="min-h-svh min-w-svw bg-preguntasImage fondos before:opacity-50">
      <NavMenu user={auth.user}></NavMenu>
      <section className="flex flex-col  items-center justify-center gap-5">
        <table className="w-10/12  my-20 text-center">
          <thead>
            <tr>
              <th className="cursor-pointer" onClick={orderByPregunta}>Pregunta</th>
              <th className="cursor-pointer" onClick={orderByRespuesta}>Respuesta</th>
              <th className="cursor-pointer" onClick={orderByCat}>Categoria</th>
              <th className="cursor-pointer" onClick={orderByLetra}>Letra</th>
              <th className="cursor-pointer" onClick={orderByLetraPos}>Posición de la letra</th>
              <th className="cursor-pointer" onClick={orderByDate}>Ultima actualización</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {datosPaginaActual.map((element, i) => {
              return (
                <tr key={i}>
                  <td className={retorno(element.id)}>{element.pregunta}</td>
                  <td className={retorno(element.id)}>{element.respuesta}</td>
                  <td className={retorno(element.id)}>{valorCategoria(element.id_categoria)}</td>
                  <td className={retorno(element.id)}>{element.letra}</td>
                  <td className={retorno(element.id)}>{element.posicion_letra}</td>
                  <td className={retorno(element.id)}>{element.updated_at.split("T")[0]}</td>
                  <td className={retorno(element.id)}><button onClick={() => mostrarPertenencia(element.id)}>?</button></td>
                  <td className={retorno(element.id)}><button onClick={() => valor(element.id) != undefined ? alert("No puedes editar la pregunta hasta que no la quites del pasapalabras a la que esta asignada.") : location.href = route("pregunta.edit", element.id)}><BsFillPencilFill /></button></td>
                  <td className={retorno(element.id)}><button onClick={() => destroy(element.id)}><BsFillTrash2Fill /></button></td>
                </tr>)
            })}
          </tbody>
        </table>
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={irPaginaAnterior} disabled={paginaActual === 1}>Anterior</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={irPaginaSiguiente} disabled={paginaActual === Math.ceil(preguntas.length / 10)}>Siguiente</button>
        </div>
        <button className="border-solid border-sky-500 border-2 p-2 :hover-sky-200" onClick={() => location.href = route("pregunta.create")}>Crear Pregunta</button>

      </section>
    </div >
  );

}