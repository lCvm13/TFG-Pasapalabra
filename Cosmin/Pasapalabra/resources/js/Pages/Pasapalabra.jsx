import Pasapalabra from "@/Components/RoscoPasapalabra";
import { useState } from "react";
import { router, usePage } from "@inertiajs/react"
import RoscoPasapalabra from "@/Components/RoscoPasapalabra";
import NavMenu from "@/Components/NavMenu";
export default function PasapalabraForm({ categorias, auth, pasapalabra }) {
  const { flash } = usePage().props
  if (flash.message != undefined) {
    alert(flash.message)
    flash.message = undefined
  }
  const [letterValue, setLetterValue] = useState("a")
  const setLetter = (letter) => {
    setLetterValue(letter)
  }
  const user = (auth) => {
    return auth.id;
  };
  const [nueva, setNueva] = useState(false)
  const [categoria, setCategoria] = useState({
    nombre_categoria: "",
    id_usuario: user(auth.user),
    url_to: [`pasapalabra.edit`, pasapalabra.id]
  })
  function handleCat(e) {
    const key = e.target.id
    const value = e.target.value
    setCategoria(categoria => ({
      ...categoria,
      [key]: value
    }))
  }
  const getCat = () => {
    let categoriaBuscar = categorias.find(e => e.nombre_categoria == categoria.nombre_categoria)
    if (categoriaBuscar == undefined) return
    return categoriaBuscar.id
  }
  console.log(pasapalabra)
  const [values, setValues] = useState({
    nombre: pasapalabra.nombre,
    id_categoria: pasapalabra.id_categoria == null ? getCat() : pasapalabra.id_categoria,
    infinito: pasapalabra.infinito,
  })

  function handleChange(e) {
    const key = e.target.id
    const value = key == "infinito" ? e.target.checked : e.target.value
    setValues(values => ({
      ...values,
      [key]: value
    }))
  }
  console.log(values)
  function handleSubmit(e) {
    e.preventDefault()
    router.post(route("pregunta.store"), values)
  }
  function handleUpdate(e) {
    e.preventDefault()
    router.patch((`/pasapalabra/${pasapalabra.id}`), values)
  }
  return <section className="w-full h-screen grid grid-cols-3">
    <NavMenu user={auth.user}></NavMenu>
    <RoscoPasapalabra letterValue={letterValue} setLetter={setLetter}></RoscoPasapalabra>
    <div className="justify-self-center self-center border-solid border-2 border-sky-500 p-10 flex flex-col gap-10 mr-40 mb-40">
      <h1 className="text-blue-400 font-extrabold text-4xl">Rosco {pasapalabra.nombre}</h1>
      <form onSubmit={handleUpdate} method="POST" className="flex flex-col gap-10">
        <div className="flex flex-row gap-5 items-center">
          <label className="text-xl" htmlFor="nombre_pasapalabra">Nombre del pasapalabra</label>
          <input type="text" name="nombre" id="nombre" placeholder="¿.....?" value={values.nombre} onChange={handleChange} className="h-full" />
          <span className="text-sky-400 text-sm">El nombre debe ser único</span>
        </div>
        <div className="flex flex-row items-center justify-center gap-5">
          <label htmlFor="cat">Selecciona categoria</label>
          {nueva ?
            <div className="flex flex-row items-center justify-center gap-5">
              <input type="text" name="nombre_categoria" id="nombre_categoria" value={categoria.nombre_categoria} onChange={handleCat}></input>
              <span className="text-white w-max p-2 self-center bg-sky-200 cursor-pointer" onClick={() => router.post(route("categoria.store"), categoria)}>Crear</span></div>
            :
            <select name="id_categoria" id="id_categoria" value={pasapalabra.id_categoria == undefined ? values.id_categoria = getCat() : values.id_categoria} onChange={handleChange}>
              <option value="">--</option>
              {categorias.map((element, i) => {
                return <option key={i} value={element.id}>{element.nombre_categoria}</option>
              })}
            </select>
          }
          <span className="text-sky-400 text-sm">Es opcional</span>
        </div>
        <div className="flex flex-row items-center justify-center gap-5">
          <label htmlFor="cat">¿Categoria nueva?</label>
          <input type="checkbox" id="nueva" name="nueva" value={nueva} onChange={() => setNueva(!nueva)} />
        </div>
        <div className="flex flex-row items-center justify-center gap-5">
          <label htmlFor="cat">Infinito</label>
          <input type="checkbox" id="infinito" name="infinito" checked={values.infinito} value={values.infinito} onChange={handleChange} />
        </div>
        <button className="border-sky-500 border-solid border-2 w-max p-2 self-center hover:bg-sky-200">Modificar</button>
      </form>
    </div>
  </section>

}