
import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react"
import { BsFillTrash2Fill, BsFillPencilFill } from "react-icons/bs";
import NavMenu from "@/Components/NavMenu";
import Swal from "sweetalert2";
export default function ListCategorias({ categorias, auth }) {
  const { flash } = usePage().props
  if (flash.message != undefined) {
    alert(flash.message)
    flash.message = undefined
    window.location.reload();
  }
  const user = (auth) => {
    return auth.id;
  };
  const [values, setValues] = useState({
    nombre_categoria: "",
    id_usuario: user(auth.user),
    url_to: null,
    id: null
  })
  const [nombreAsc, setNombreAsc] = useState(false);
  const [sortedCategorias, setSortedCategorias] = useState(categorias);
  useEffect(() => {
    const sortedData = [...sortedCategorias].sort((a, b) => {
      if (a.updated_at < b.updated_at) {
        return 1;
      }
      if (a.updated_at > b.updated_at) {
        return -1;
      }
      return 0;
    });
    setSortedCategorias(sortedData);
  }, []);

  const orderByName = () => {
    const sortedData = [...sortedCategorias].sort((a, b) => {
      if (nombreAsc) {
        return a.nombre_categoria.localeCompare(b.nombre_categoria);
      } else {
        return b.nombre_categoria.localeCompare(a.nombre_categoria);
      }
    });
    setNombreAsc(!nombreAsc);
    setSortedCategorias(sortedData);
  };
  // --------------------------------------------------------- //
  const [dateAsc, setDateAsc] = useState(false);
  const orderByDate = () => {
    const sortedData = [...sortedCategorias].sort((a, b) => {
      if (dateAsc) {
        return new Date(a.updated_at) - new Date(b.updated_at);
      } else {
        return new Date(b.updated_at) - new Date(a.updated_at);
      }
    });
    setDateAsc(!dateAsc);
    setSortedCategorias(sortedData);
  };
  const [isValuesUpdated, setIsValuesUpdated] = useState(false);

  useEffect(() => {
    if (isValuesUpdated) {
      showForm(true);
      setIsValuesUpdated(false);
    }
  }, [values, isValuesUpdated]);

  const handleClick = (element) => {
    setValues(prevValues => ({
      ...prevValues,
      nombre_categoria: element.nombre_categoria,
      id: element.id
    }));
    setIsValuesUpdated(true);
  };
  const destroy = (id) => {
    router.delete(`/categoria/${id}`, {
      onBefore: () => confirm('¿Estás seguro que quieres borrar la categoria?'),
    })
  }
  const [paginaActual, setPaginaActual] = useState(1);

  // Calcular el índice de inicio y fin para los elementos de la página actual
  const startIndex = (paginaActual - 1) * 10;
  const endIndex = startIndex + 10;

  // Obtener los datos de la página actual
  const datosPaginaActual = sortedCategorias.slice(startIndex, endIndex);

  // Función para cambiar a la página anterior
  const irPaginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  // Función para cambiar a la página siguiente
  const irPaginaSiguiente = () => {
    const totalPages = Math.ceil(sortedCategorias.length / 10);
    if (paginaActual < totalPages) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const showForm = (edit) => {
    sortedCategorias
    !edit ?
      Swal.fire({
        title: "Inserta el nombre de la nueva categoria",
        input: 'text',
        preConfirm: () => {
          handleSubmitSwal(Swal.getInput()?.value)
        }
      }) :
      Swal.fire({
        title: `Edita el nombre de ${values.nombre_categoria}`,
        input: 'text',
        inputValue: values.nombre_categoria,
        preConfirm: () => {
          handleEditSwal(Swal.getInput()?.value)
        }
      })
  }

  function handleEditSwal(newName) {
    router.patch((`/categoria/${values.id}`), { nombre_categoria: newName, id_usuario: values.id_usuario, url_to: null })
  }
  function handleSubmitSwal(nombre) {
    router.post(route("categoria.store"), { nombre_categoria: nombre, id_usuario: auth.user.id, url_to: null })
  }
  return (
    <div className="min-h-svh min-w-svw bg-categoriasImage fondos before:opacity-50" >
      <div className="z-1">
        <NavMenu user={auth.user} color={"white"}></NavMenu>
        <section className="flex flex-col items-center justify-center gap-5 mx-20 z-10">
          <table className="w-10/12 mx-20 mt-28 text-center">
            <thead>
              <tr>
                <th className="cursor-pointer" onClick={orderByName}>Nombre Categoria</th>
                <th className="cursor-pointer" onClick={orderByDate}>Ultima actualización</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {datosPaginaActual.map((element, i) => {
                return (
                  <tr key={i - 1} className="">
                    <td>{element.nombre_categoria}</td>
                    <td>{element.updated_at.split("T")[0]}</td>
                    <td><button onClick={() => {
                      handleClick(element)
                    }}><BsFillPencilFill /></button></td>
                    <td key={i + 4}><button onClick={() =>
                      destroy(element.id)}><BsFillTrash2Fill /></button></td>
                  </tr>)
              })}
            </tbody>
          </table>
          <div>
            <button className="bg-royal-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={irPaginaAnterior} disabled={paginaActual === 1}>Anterior</button>
            <button className="bg-royal-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={irPaginaSiguiente} disabled={paginaActual === Math.ceil(sortedCategorias.length / 10)}>Siguiente</button>
          </div>
          <button className="border-solid bg-white cursor-pointer border-sky-500 border-2 p-2 hover:bg-sky-200" onClick={() => showForm(false)}>Crear categoria</button>
        </section>

      </div>
    </div>
  );

}