
import { useState } from "react";
import { router } from "@inertiajs/react"
import { BsPlayCircleFill, BsFillTrash2Fill, BsFillPencilFill } from "react-icons/bs";
import NavMenu from "@/Components/NavMenu";

export default function ListCategorias({ categorias, auth }) {

  const destroy = (id) => {
    router.delete(`/categoria/${id}`, {
      onBefore: () => confirm('¿Estás seguro que quieres borrar la categoria?'),
    })
  }
  const [paginaActual, setPaginaActual] = useState(1);

  // Calcular el índice de inicio y fin para los elementos de la página actual
  const startIndex = (paginaActual - 1) * 10;
  const endIndex = startIndex + 10;

  // Obtener los datos de la página actual
  const datosPaginaActual = categorias.slice(startIndex, endIndex);

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
    <div>
      <NavMenu user={auth.user}></NavMenu>
      <section className="flex flex-col  items-center justify-center gap-5 mx-20">
        <table className="w-10/12 mx-20 my-20 text-center">
          <thead>
            <tr>
              <th>Nombre Categoria</th>
              <th>Ultima actualización</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {datosPaginaActual.map((element, i) => {
              return (
                <tr key={i - 1} className="">
                  <td key={i}>{element.nombre_categoria}</td>
                  <td key={i + 1}>{element.updated_at.split("T")[0]}</td>
                  <td key={i + 3}><button onClick={() => location.href = route("categoria.edit", element.id)}><BsFillPencilFill /></button></td>
                  <td key={i + 4}><button onClick={() =>
                    destroy(element.id)}><BsFillTrash2Fill /></button></td>
                </tr>)
            })}
          </tbody>
        </table>
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={irPaginaAnterior} disabled={paginaActual === 1}>Anterior</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={irPaginaSiguiente} disabled={paginaActual === Math.ceil(categorias.length / 10)}>Siguiente</button>
        </div>
        <button className="border-solid border-sky-500 border-2 p-2 :hover-sky-200" onClick={() => location.href = route("categoria.create")}>Crear categoria</button>
      </section>
    </div>

  );

}