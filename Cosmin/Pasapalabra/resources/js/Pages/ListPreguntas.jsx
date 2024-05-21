
import { useState } from "react";
import { router, usePage } from "@inertiajs/react"
import { BsFillTrash2Fill, BsFillPencilFill } from "react-icons/bs";
import NavMenu from "@/Components/NavMenu";

export default function ListCategorias({ preguntas, categorias, auth, preguntas_pasapalabra, pasapalabra }) {

  const { flash } = usePage().props
  flash != undefined ? alert(flash[1]) : null

  const valorCategoria = (id) => {
    let valor = categorias.find(element => element.id == id)
    return valor != undefined ? valor.nombre_categoria : "Sin categoria"
  }

  const [paginaActual, setPaginaActual] = useState(1);

  // Calcular el índice de inicio y fin para los elementos de la página actual
  const startIndex = (paginaActual - 1) * 10;
  const endIndex = startIndex + 10;

  // Obtener los datos de la página actual
  const datosPaginaActual = preguntas.slice(startIndex, endIndex);

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
  console.log(pasapalabra)
  console.log(preguntas_pasapalabra)
  const mostrarPertenencia = (id) => {
    let valor = preguntas_pasapalabra.find(element => element.id_pregunta == id)
    console.log(valor)
    if (valor == undefined) {
      return alert("No pertenece a ninguna pasapalabra")
    }
    let nombre_pasapalabra = pasapalabra.find(element => element.id == valor.id_pasapalabra)
    return alert(`La pregunta pertenece al rosco: ${nombre_pasapalabra.nombre}`)
  }
  const valor = (id) => {
    let valor = preguntas_pasapalabra.find(element => element.id_pregunta == id)
    return valor != undefined ? valor : undefined
  }

  preguntas_pasapalabra.forEach(e => {

    let objeto = document.getElementById(e.id_pregunta)
    objeto != null ? objeto.style.backgroundColor = "#3a813a38" : "#a7390838"
    console.log(objeto)
  });
  return (
    <div>
      <NavMenu user={auth.user}></NavMenu>
      <section className="flex flex-col  items-center justify-center gap-5 mx-20">
        <table className="w-10/12 mx-20 my-20 text-center">
          <thead>
            <tr>
              <th>Pregunta</th>
              <th>Respuesta</th>
              <th>Categoria</th>
              <th>Posición de la letra</th>
              <th>Letra</th>
              <th>Ultima actualización</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {datosPaginaActual.map((element, i) => {
              return (
                <tr key={i} id={element.id}>
                  <td >{element.pregunta}</td>
                  <td>{element.respuesta}</td>
                  <td>{valorCategoria(element.id_categoria)}</td>
                  <td>{element.posicion_letra}</td>
                  <td>{element.letra}</td>
                  <td>{element.created_at.split("T")[0]}</td>
                  <td><button onClick={() => mostrarPertenencia(element.id)}>?</button></td>
                  <td><button onClick={() => location.href = route("pregunta.edit", element.id)}><BsFillPencilFill /></button></td>
                  <td><button onClick={() => router.delete(route("pregunta.destroy", element.id))}><BsFillTrash2Fill /></button></td>
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