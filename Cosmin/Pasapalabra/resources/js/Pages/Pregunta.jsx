import Pasapalabra from "@/Components/Pasapalabra";
import { useState } from "react";
import { router } from "@inertiajs/react"
export default function Pregunta({ categorias, auth }) {
    const [letterValue, setLetterValue] = useState("a")
    const setLetter = (letter) => {
        setLetterValue(letter)
    }
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

    function handleSubmit(e) {
        e.preventDefault()
        router.post(route("pregunta.store"), values)
    }
    return <section className="w-full h-screen grid grid-cols-2">
        <Pasapalabra letterValue={letterValue} setLetter={setLetter}></Pasapalabra>
        <div className="justify-self-center self-center border-solid border-2 border-sky-500 p-10 flex flex-col gap-10 mr-40 mb-40">
            <h1 className="text-blue-400 font-extrabold text-4xl">Inserta las preguntas para el PasapaLearning</h1>
            <form onSubmit={handleSubmit} method="POST" className="flex flex-col gap-10">
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
                        <option value="comienzo">comienzo</option>
                        <option value="contiene">contiene</option>
                        <option value="termina">termina</option>
                    </select>
                </div>
                <div className="flex flex-row items-center justify-center gap-5">
                    <label htmlFor="cat">Selecciona categoria</label>
                    <select name="id_categoria" id="id_categoria" value={values.id_categoria} onChange={handleChange}>
                        <option value="">--</option>
                        {categorias.map((element, i) => {
                            return <option key={i} value={element.id}>{element.nombre_categoria}</option>
                        })}
                    </select>
                </div>
                <button className="border-sky-500 border-solid border-2 w-max p-2 self-center hover:bg-sky-200">Insertar</button>
            </form>
        </div>
    </section>

}