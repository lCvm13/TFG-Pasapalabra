import Pasapalabra from "@/Components/RoscoPasapalabra";
import { useState } from "react";
import { router } from "@inertiajs/react"
import { BsPlayCircleFill, BsFillTrash2Fill, BsFillPencilFill } from "react-icons/bs";

export default function ListPasapalabra({ pasapalabras, auth, categorias }) {
  const [letterValue, setLetterValue] = useState("a")
  const setLetter = (letter) => {
    setLetterValue(letter)
  }
  console.log(pasapalabras)
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
    router.delete(`/categoria/${id}`, {
      onBefore: () => confirm('Are you sure you want to delete this user?'),
    })
  }
  const edit = (id) => {
    router.edit(`/categoria/${id}`, {
      onBefore: () => confirm('Are you sure you want to delete this user?'),
    })
  }

  return (
    <section className="flex flex-row items-center justify-center gap-5">
      <table className="w-screen mx-20 my-20 text-center">
        <thead>
          <tr>
            <th>Nombre Pasapalabra</th>
            <th>Categoria Pasapalabra</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pasapalabras.map((element, i) => {
            return (
              <tr key={i - 1} className="">
                <td key={i}>{element.nombre}</td>
                <td key={i + 1}>{element.categoria == undefined ? "No tiene categoria" : element.categoria}</td>
                <td key={i + 2}><button onClick={() => null}><BsPlayCircleFill /></button></td>
                <td key={i + 3}><button onClick={() => edit(element.nombre)}><BsFillPencilFill /></button></td>
                <td key={i + 4}><button onClick={() => destroy(element.id)}><BsFillTrash2Fill /></button></td>
              </tr>)
          })}
        </tbody>
      </table>

    </section>
  );

}