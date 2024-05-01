
import { useState } from "react";
import { router } from "@inertiajs/react"
import { BsPlayCircleFill, BsFillTrash2Fill, BsFillPencilFill } from "react-icons/bs";

export default function ListCategorias({ categorias, auth }) {
  const [letterValue, setLetterValue] = useState("a")
  const setLetter = (letter) => {
    setLetterValue(letter)
  }
  console.log(categorias)
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

  const destroy = (id) => {
    if (confirm('Are you sure?')) {
      router.delete(route("pasapalabra.destroy", id))
    }

  }


  return (
    <section className="flex flex-col items-center justify-center gap-5">
      <table className="w-screen mx-20 my-20 text-center">
        <thead>
          <tr>
            <th>Nombre Categoria</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((element, i) => {
            return (
              <tr key={i - 1} className="">
                <td key={i}>{element.nombre}</td>
                <td key={i + 1}>{element.categoria == undefined ? "No tiene categoria" : element.categoria}</td>
                <td key={i + 2}><button onClick={() => null}><BsPlayCircleFill /></button></td>
                <td key={i + 3}><button onClick={() => location.href = route("categoria.edit", element.nombre)}><BsFillPencilFill /></button></td>
                <td key={i + 4}><button onClick={() => router.delete(route("categoria.destroy", element.id))}><BsFillTrash2Fill /></button></td>
              </tr>)
          })}
        </tbody>
      </table>
      <button className="border-solid border-sky-500 border-2 p-2 :hover-sky-200" onClick={() => location.href = route("categoria.categoriaForm")}>Crear</button>
    </section>


  );

}