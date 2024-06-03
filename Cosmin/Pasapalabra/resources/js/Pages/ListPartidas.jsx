
import { useState } from "react";
import { router } from "@inertiajs/react"
import { BsPlayCircleFill, BsFillTrash2Fill, BsFillPencilFill } from "react-icons/bs";
import NavMenu from "@/Components/NavMenu";

export default function ListCategorias({ partidas, auth }) {

  // const destroy = (id) => {
  //   router.delete(`/partida/${id}`, {
  //     onBefore: () => confirm('¿Estás seguro que quieres borrar la categoria?'),
  //   })
  // }
  const [paginaActual, setPaginaActual] = useState(1);

  // Calcular el índice de inicio y fin para los elementos de la página actual
  const startIndex = (paginaActual - 1) * 10;
  const endIndex = startIndex + 10;

  // Obtener los datos de la página actual
  const datosPaginaActual = partidas.slice(startIndex, endIndex);

  // Función para cambiar a la página anterior
  const irPaginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  // Función para cambiar a la página siguiente
  const irPaginaSiguiente = () => {
    const totalPages = Math.ceil(categorias.length / 10);
    if (paginaActual < totalPages) {
      setPaginaActual(paginaActual + 1);
    }
  };

  return (
    <>
      <img src="/storage/images/fondo3.jpg" alt="fondo" className="absolute top-0 w-full h-screen opacity-30 pos -z-10" />
      <div className="z-1">
        <NavMenu user={auth.user}></NavMenu>
        <section className="flex flex-col  items-center justify-center gap-5 mx-20 z-10">
          <table className="w-10/12 mx-20 my-20 text-center">
            <thead>
              <tr>
                <th>Nombre Partida</th>
                <th>Ultima actualización</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {datosPaginaActual.map((element, i) => {
                return (
                  <tr key={i - 1} className="">
                    <td >{element.nombre}</td>
                    <td>{element.updated_at.split("T")[0]}</td>
                    <td><button onClick={() => null}>?</button></td>
                    <td ><button onClick={() =>
                      destroy(element.id)}><BsFillTrash2Fill /></button></td>
                  </tr>)
              })}
            </tbody>
          </table>
          <div>
            <button className="bg-royal-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={irPaginaAnterior} disabled={paginaActual === 1}>Anterior</button>
            <button className="bg-royal-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={irPaginaSiguiente} disabled={paginaActual === Math.ceil(partidas.length / 10)}>Siguiente</button>
          </div>
        </section>

      </div>
    </>
  );

}