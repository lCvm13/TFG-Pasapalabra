
import { useState } from "react";
import { router } from "@inertiajs/react"
import { BsPlayCircleFill, BsFillTrash2Fill, BsFillPencilFill } from "react-icons/bs";
import NavMenu from "@/Components/NavMenu";

export default function ListCategorias({ preguntas, categorias, auth }) {
  const [letterValue, setLetterValue] = useState("a")
  const setLetter = (letter) => {
    setLetterValue(letter)
  }

  console.log(preguntas)
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
    <div>
      <NavMenu user={auth.user}></NavMenu>
      <section className="flex flex-col  items-center justify-center gap-5 mx-20">
        <table className="w-10/12 mx-20 my-20 text-center">
          <thead>
            <tr>
              <th>Pregunta</th>
              <th>Respuesta</th>
              <th>Posición de la letra</th>
              <th>Letra</th>
              <th>Ultima actualización</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {preguntas.map((element, i) => {
              return (
                <tr key={i - 1} className="">
                  <td key={i}>{element.pregunta}</td>
                  <td key={i}>{element.respuesta}</td>
                  <td key={i}>{element.posicion_letra}</td>
                  <td key={i}>{element.letra}</td>
                  <td key={i + 1}>{element.created_at.split("T")[0]}</td>
                  <td key={i + 3}><button onClick={() => location.href = route("categoria.edit", element.nombre)}><BsFillPencilFill /></button></td>
                  <td key={i + 4}><button onClick={() => router.delete(route("categoria.destroy", element.id))}><BsFillTrash2Fill /></button></td>
                </tr>)
            })}
          </tbody>
        </table>
        <button className="border-solid border-sky-500 border-2 p-2 :hover-sky-200" onClick={() => location.href = route("pregunta.create")}>Crear Pregunta</button>
      </section>
    </div>

  );

}