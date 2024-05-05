
import { useState } from "react";
import { router } from "@inertiajs/react"
import { BsPlayCircleFill, BsFillTrash2Fill, BsFillPencilFill } from "react-icons/bs";
import NavMenu from "@/Components/NavMenu";

export default function ListCategorias({ categorias, auth }) {

  const destroy = (id) => {
    router.delete(`/categoria/${id}`, {
      onBefore: () => confirm('Are you sure you want to delete this user?'),
    })
  }


  return (
    <div>
      <NavMenu></NavMenu>
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
            {categorias.map((element, i) => {
              return (
                <tr key={i - 1} className="">
                  <td key={i}>{element.nombre_categoria}</td>
                  <td key={i + 1}>{element.created_at.split("T")[0]}</td>
                  <td key={i + 3}><button onClick={() => location.href = route("categoria.edit", element.id)}><BsFillPencilFill /></button></td>
                  <td key={i + 4}><button onClick={() =>

                    destroy(element.id)}><BsFillTrash2Fill /></button></td>
                </tr>)
            })}
          </tbody>
        </table>
        <button className="border-solid border-sky-500 border-2 p-2 :hover-sky-200" onClick={() => location.href = route("categoria.create")}>Crear categoria</button>
      </section>
    </div>

  );

}