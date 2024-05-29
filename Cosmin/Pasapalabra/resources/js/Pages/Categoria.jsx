import { useEffect, useState } from "react"
import { router } from "@inertiajs/react"
import NavMenu from "@/Components/NavMenu";

export default function Categoria({ categoria, auth, errors, }) {
    const user = (auth) => {
        return auth.id;
    };

    const [values, setValues] = useState({
        nombre_categoria: categoria != undefined ? categoria.nombre_categoria : "",
        id_usuario: user(auth.user),
        url_to: null
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
        router.post(route("categoria.store"), values)
    }
    if (errors.nombre_categoria) {
        alert(errors.nombre_categoria)
    }

    function handleUpdate(e) {
        e.preventDefault()
        router.patch((`/categoria/${categoria.id}`), values)
    }
    return (
        <div className="h-screen flex flex-col justify-center ">
            <NavMenu user={auth.user}></NavMenu>
            <h2 className="text-center text-lg font-bold text-gray-700 mb-6 text-2xl text-sky-700 ">Crea tu nueva categoria</h2>
            <form className="self-center justify-self-center flex flex-row items-center gap-10" method="POST" onSubmit={categoria == undefined ? handleSubmit : handleUpdate}>
                <label className="border-solid border-sky-500 border-2 p-2 :hover-sky-200 block font-semibold text-gray-600 mb-1" htmlFor="categoria">Nombre</label>
                <input type="text" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" name="nombre_categoria" id="nombre_categoria" value={values.nombre_categoria} onChange={handleChange} placeholder="Tu categoria..." />
                <button className="bg-sky-300 p-2 hover:bg-sky-600 text-black font-extrabold" type="submit">{categoria == undefined ? "Insertar" : "Modificar"}</button>
            </form>
        </div>
    )


}