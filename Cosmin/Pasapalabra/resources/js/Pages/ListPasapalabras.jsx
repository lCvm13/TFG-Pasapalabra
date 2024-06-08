import Pasapalabra from "@/Components/RoscoPasapalabra";
import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react"
import { BsPlayCircleFill, BsFillTrash2Fill, BsFillPencilFill, BsPlusCircleFill } from "react-icons/bs";
import NavMenu from "@/Components/NavMenu";
import Swal from "sweetalert2";

export default function ListPasapalabra({ pasapalabras, auth, categorias, preguntas_pasapalabra }) {
  const { flash } = usePage().props
  if (flash.message != undefined) {
    alert(flash.message)
    flash.message = undefined
    window.location.reload();
  }
  const destroy = (id) => {
    router.delete(`/pasapalabra/${id}`, {
      onBefore: () => confirm('¿Estás seguro que quieres borrar este rosco de pasapalabra?'),
    })
  }
  const valorCategoria = (id) => {
    let valor = categorias.find(element => element.id == id)
    return valor.nombre_categoria
  }

  const [paginaActual, setPaginaActual] = useState(1);

  // Calcular el índice de inicio y fin para los elementos de la página actual
  const startIndex = (paginaActual - 1) * 10;
  const endIndex = startIndex + 10;
  const [nombreAsc, setNombreAsc] = useState(false);
  const [sortedPasapalabras, setSortedPasapalabras] = useState(pasapalabras);

  useEffect(() => {
    const sortedData = [...sortedPasapalabras].sort((a, b) => {
      if (a.updated_at < b.updated_at) {
        return 1;
      }
      if (a.updated_at > b.updated_at) {
        return -1;
      }
      return 0;
    });
    setSortedPasapalabras(sortedData);
  }, []);

  const orderByName = () => {
    const sortedData = [...sortedPasapalabras].sort((a, b) => {
      if (nombreAsc) {
        return a.nombre.localeCompare(b.nombre);
      } else {
        return b.nombre.localeCompare(a.nombre);
      }
    });
    setNombreAsc(!nombreAsc);
    setSortedPasapalabras(sortedData);
  };
  // --------------------------------------------------------- //
  const [dateAsc, setDateAsc] = useState(false);
  const orderByDate = () => {
    const sortedData = [...sortedPasapalabras].sort((a, b) => {
      if (dateAsc) {
        return new Date(a.updated_at) - new Date(b.updated_at);
      } else {
        return new Date(b.updated_at) - new Date(a.updated_at);
      }
    });
    setDateAsc(!dateAsc);
    setSortedPasapalabras(sortedData);
  };
  // ----------------------------------------------
  const [catAsc, setCatAsc] = useState(false);
  const orderByCat = () => {
    const sortedData = [...sortedPasapalabras].sort((a, b) => {
      const catA = categorias.find(e => e.id === a.id_categoria);
      const catB = categorias.find(e => e.id === b.id_categoria);

      // Check if either catA or catB is undefined and handle accordingly
      if (!catA && !catB) return 0;
      if (!catA) return catAsc ? 1 : -1;
      if (!catB) return catAsc ? -1 : 1;

      if (catAsc) {
        return catA.nombre_categoria.localeCompare(catB.nombre_categoria);
      } else {
        return catB.nombre_categoria.localeCompare(catA.nombre_categoria);
      }
    });

    setCatAsc(!catAsc);
    setSortedPasapalabras(sortedData);
  };




  // Obtener los datos de la página actual
  const datosPaginaActual = sortedPasapalabras.slice(startIndex, endIndex);

  // Función para cambiar a la página anterior
  const irPaginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  // Función para cambiar a la página siguiente
  const irPaginaSiguiente = () => {
    const totalPages = Math.ceil(sortedPasapalabras.length / 10);
    if (paginaActual < totalPages) {
      setPaginaActual(paginaActual + 1);
    }
  };
  const showForm = () => {
    Swal.fire({
      title: "Inserta el nombre del Pasapalabra nuevo",
      input: 'text',
      preConfirm: () => {
        handleSubmit(Swal.getInput()?.value)
      }
    })
  }
  function handleSubmit(nombre) {
    router.post(route("pasapalabra.store"), { nombre: nombre, id_usuario: auth.user.id, url_to: "pasapalabra.edit" })
  }

  const createPartida = (id_pasapalabra) => {
    let preguntas = preguntas_pasapalabra.filter(element => element.id_pasapalabra == id_pasapalabra)
    if (preguntas.length == 0) {
      Swal.fire({
        title: "No hay preguntas para esta partida",
        icon: "error"
      })
    } else {
      Swal.fire({
        title: "Inserta el nombre de la nueva partida",
        input: 'text',
        preConfirm: () => {
          handleCreatePartida(Swal.getInput()?.value, id_pasapalabra)
        }
      })
    }
  }
  function handleCreatePartida(nombre, id_pasapalabra) {
    router.post(route("partida.store"), { nombre: nombre, id_usuario: auth.user.id, id_pasapalabra: id_pasapalabra })
  }
  return (
    <div className="min-h-svh min-w-svw bg-pasapalabraImage fondos before:opacity-50">
      <NavMenu user={auth.user}></NavMenu>
      <section className="flex flex-col items-center justify-center gap-5">
        <table className="w-10/12 mx-20 my-20 text-center">
          <thead>
            <tr>
              <th className="cursor-pointer" onClick={orderByName}>Nombre Pasapalabra</th>
              <th className="cursor-pointer" onClick={orderByDate}>Última modificación</th>
              <th className="cursor-pointer" onClick={orderByCat}>Categoria Pasapalabra</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {datosPaginaActual.map((element, i) => {
              return (
                <tr key={i - 1} className="">
                  <td key={i}>{element.nombre}</td>
                  <td>{element.updated_at.split("T")[0]}</td>
                  <td key={i + 1}>{element.id_categoria == undefined ? "No tiene categoria" : valorCategoria(element.id_categoria)}</td>
                  <td key={i + 2}><button onClick={() => createPartida(element.id)}><BsPlayCircleFill /></button></td>
                  <td key={i + 5}><button onClick={() => location.href = route(`preguntas_pasapalabras.create`, { id_pasapalabra: element.id })}><BsPlusCircleFill /></button></td>
                  <td key={i + 3}><button onClick={() => location.href = route("pasapalabra.edit", element.id)}><BsFillPencilFill /></button></td>
                  <td key={i + 4}><button onClick={() => destroy(element.id)}><BsFillTrash2Fill /></button></td>
                </tr>)
            })}
          </tbody>
        </table>
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={irPaginaAnterior} disabled={paginaActual === 1}>Anterior</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={irPaginaSiguiente} disabled={paginaActual === Math.ceil(sortedPasapalabras.length / 10)}>Siguiente</button>
        </div>
        <button className="border-solid bg-white cursor-pointer border-sky-500 border-2 p-2 hover:bg-sky-200" onClick={() => showForm()}>Crear pasapalabra</button>
      </section>
    </div>
  );

}