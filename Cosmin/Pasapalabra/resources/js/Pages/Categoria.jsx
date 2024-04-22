import { useEffect, useState } from "react"
import { router } from "@inertiajs/react"

export default function Categoria({categorias,auth}) {    
    const user = (auth) => {
        return auth.id;
    };
    const [values, setValues] = useState({
        nombre_categoria: "",
        id_usuario : user(auth.user)
    })

    function handleChange(e){
        const key = e.target.id
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]:value
        }))
    }
    

    function handleSubmit(e){
        e.preventDefault()
        router.post(route("categoria.store"),values)
    }

    return(<div className="h-screen flex flex-col justify-center "> 
    
    <form className="self-center justify-self-center flex flex-row items-center gap-10" method="POST" onSubmit={handleSubmit}>
        <input type="hidden" name="id_usuario" id="id_usuario" value={user(auth.user)}  />
        <label className="border-solid border-sky-500 border-2 p-2 :hover-sky-200" htmlFor="categoria">Inserta categoria</label>
        <input type="text" name="nombre_categoria" id="nombre_categoria" value={values.nombre_categoria} onChange={handleChange} placeholder="Tu categoria..." />
        <button type="submit">Insertar</button>
    </form></div>
    )
    

}