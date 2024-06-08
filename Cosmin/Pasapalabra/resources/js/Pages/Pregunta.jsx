import Pasapalabra from "@/Components/RoscoPasapalabra";
import { useState } from "react";
import { router, usePage } from "@inertiajs/react"
import NavMenu from "@/Components/NavMenu";
export default function Pregunta({ pregunta, categorias, auth }) {
    const { flash } = usePage().props
    if (flash.message != undefined) {
        alert(flash.message)
        flash.message = undefined
    }
    const [letterValue, setLetterValue] = useState(pregunta != undefined ? pregunta.letra : "a")
    const setLetter = (letter) => {
        setLetterValue(letter)
    }
    const user = (auth) => {
        return auth.id;
    };
    const [categoria, setCategoria] = useState({
        nombre_categoria: "",
        id_usuario: user(auth.user),
        url_to: "pregunta.create"
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
    const [nueva, setNueva] = useState(false)
    const [values, setValues] = useState({
        pregunta: pregunta != undefined ? pregunta.pregunta : "",
        respuesta: pregunta != undefined ? pregunta.respuesta : "",
        letra: pregunta != undefined ? pregunta.letra : "",
        id_usuario: user(auth.user),
        id_categoria: pregunta != undefined ? pregunta.id_categoria ?? getCat() : getCat(),
        posicion_letra: pregunta != undefined ? pregunta.posicion_letra.toLocaleLowerCase() : ""
    })
    function handleChange(e) {
        const key = e.target.id
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        router.post(route("pregunta.store"), values)
    }

    function handleEdit(e) {
        e.preventDefault()
        router.patch((`/pregunta/${pregunta.id}`), values)
    }
    return <div className="min-h-svh min-w-svw bg-preguntasImage fondos before:opacity-50">
        <NavMenu user={auth.user} />
        <section className="w-full h-screen grid grid-cols-2">
            <Pasapalabra letterValue={letterValue} setLetter={setLetter}></Pasapalabra>
            <div className="bg-white justify-self-center self-center border-solid border-2 border-sky-500 p-10 flex flex-col gap-10 mr-40 mb-40">
                <h1 className="text-blue-400 font-extrabold text-4xl">Inserta las preguntas para el PasapaLearning</h1>
                <form onSubmit={pregunta == undefined ? handleSubmit : handleEdit} method="POST" className="flex flex-col gap-10">
                    <div className="flex flex-row gap-5 items-center">
                        <label className="text-xl" htmlFor="pregunta">Pregunta</label>
                        <input type="text" name="pregunta" id="pregunta" placeholder="¿.....?" value={values.pregunta} onChange={handleChange} className="h-full" />
                        <span className="text-sky-400 text-sm">La pregunta debe ser única</span>
                    </div>
                    <div className="flex flex-row gap-5 items-center">
                        <label htmlFor="respuesta">Respuesta</label>
                        <input type="text" name="respuesta" id="respuesta" placeholder="......." value={values.respuesta} onChange={handleChange} />
                    </div>
                    <div className="flex gap-10 flex-row items-center">
                        <label htmlFor="letra">Letra</label>
                        <input className="w-max" type="text" disabled name="letra" id="letra" value={values.letra = letterValue.toLocaleUpperCase()} onChange={handleChange} />
                        <label htmlFor="pos">Posicion letra</label>
                        <select name="posicion_letra" id="posicion_letra" value={values.posicion_letra} onChange={handleChange}>
                            <option value="">--</option>
                            <option value="empieza">empieza</option>
                            <option value="contiene">contiene</option>
                            <option value="termina">termina</option>
                        </select>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-5">
                        <label htmlFor="cat">Selecciona categoria</label>
                        {nueva ?
                            <div className="flex flex-row items-center justify-center gap-5">
                                <input type="text" name="nombre_categoria" id="nombre_categoria" value={categoria.nombre_categoria} onChange={handleCat}></input>
                                <span className="text-white w-max p-2 self-center bg-sky-200 cursor-pointer" onClick={() => router.post(route("categoria.store"), categoria)}>Crear</span></div>
                            :
                            <select name="id_categoria" id="id_categoria" value={pregunta == undefined ? values.id_categoria = getCat() : values.id_categoria} onChange={handleChange}>
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
                    <button className="border-sky-500 border-solid border-2 w-max p-2 self-center hover:bg-sky-200">{pregunta != undefined ? "Modificar" : "Insertar"}</button>
                </form>
            </div>
        </section>
    </div>
}