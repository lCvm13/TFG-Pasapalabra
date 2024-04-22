import Pasapalabra from "@/Components/Pasapalabra";
import {useState } from "react";
export default function Pregunta({  }) {
    const [letterValue , setLetterValue] = useState("a")
    
    const setLetter = (letter)=> {
        setLetterValue(letter)
    }

    return <section className="w-full h-screen grid grid-cols-2">
        <Pasapalabra letterValue={letterValue} setLetter={setLetter}></Pasapalabra>
        <div className="justify-self-center self-center border-solid border-2 border-sky-500 p-10 flex flex-col gap-10 mr-40 mb-40">
            <h1 className="text-blue-400 font-extrabold text-4xl">Inserta las preguntas para el PasapaLearning</h1>
            
            <form action={route('pregunta.store')} method="POST" className="flex flex-col gap-10">
                @csrf
               <div className="flex flex-row gap-5 items-center">
                <label className="text-xl" htmlFor="pregunta">Pregunta</label>
                <input type="text" name="pregunta" id="pregunta" placeholder="¿.....?" className="h-full"/>
                <span className="text-sky-400 text-sm">La pregunta debe ser única</span>
               </div>
               <div className="flex flex-row gap-5 items-center">
                <label htmlFor="respuesta">Respuesta</label>
                <input type="text" name="respuesta" id="respuesta" placeholder="......." />
               </div>
               <div className="flex gap-10 flex-row items-center">
                <label htmlFor="letra">Letra</label>
                <input className="w-max" type="text" disabled name="letra" id="letra" value={letterValue.toLocaleUpperCase()} onChange={setLetter} />
                <label htmlFor="pos">Posicion letra</label>
                <select name="lugar" id="lugar">
                    <option value="">--</option>
                    <option value="comienzo">comienzo</option>
                    <option value="contiene">contiene</option>
                    <option value="termina">termina</option>
                </select>
               </div>
               <button className="border-sky-500 border-solid border-2 w-max p-2 self-center hover:bg-sky-200">Insertar</button>
            </form>
        </div>
    </section>

}