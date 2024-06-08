
import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react"
import { BsPlayCircleFill, BsFillTrash2Fill, BsFillPencilFill } from "react-icons/bs";
import NavMenu from "@/Components/NavMenu";
import Swal from "sweetalert2";
import PreguntaModal from "@/Components/PreguntasPartidaModal";

export default function ListCategorias({ partidas, preguntas, categorias, preguntas_partida, auth }) {
  const { flash } = usePage().props
  if (flash.message != undefined) {
    alert(flash.message)
    flash.message = undefined
    window.location.reload();
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preguntasSeleccionadas, setPreguntasSeleccionadas] = useState([]);
  const destroy = (id) => {
    router.delete(`/partida/${id}`, {
      onBefore: () => confirm('¿Estás seguro que quieres borrar la partida?'),
    })
  }
  const [paginaActual, setPaginaActual] = useState(1);

  // Calcular el índice de inicio y fin para los elementos de la página actual
  const startIndex = (paginaActual - 1) * 10;
  const endIndex = startIndex + 10;
  const [nombreAsc, setNombreAsc] = useState(false);
  const [sortedPartidas, setsortedPartidas] = useState(partidas);

  useEffect(() => {
    const sortedData = [...sortedPartidas].sort((a, b) => {
      if (a.updated_at < b.updated_at) {
        return 1;
      }
      if (a.updated_at > b.updated_at) {
        return -1;
      }
      return 0;
    });
    setsortedPartidas(sortedData);
  }, []);

  const orderByName = () => {
    const sortedData = [...sortedPartidas].sort((a, b) => {
      if (nombreAsc) {
        return a.nombre.localeCompare(b.nombre);
      } else {
        return b.nombre.localeCompare(a.nombre);
      }
    });
    setNombreAsc(!nombreAsc);
    setsortedPartidas(sortedData);
  };

  // ---------------------------------------------------------------------------- //
  const [dateAsc, setDateAsc] = useState(false);
  const orderByDate = () => {
    const sortedData = [...sortedPartidas].sort((a, b) => {
      if (dateAsc) {
        return new Date(a.updated_at) - new Date(b.updated_at);
      } else {
        return new Date(b.updated_at) - new Date(a.updated_at);
      }
    });
    setDateAsc(!dateAsc);
    setsortedPartidas(sortedData);
  };

  // Obtener los datos de la página actual
  const datosPaginaActual = sortedPartidas.slice(startIndex, endIndex);

  // Función para cambiar a la página anterior
  const irPaginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  // Función para cambiar a la página siguiente
  const irPaginaSiguiente = () => {
    const totalPages = Math.ceil(partidas.length / 10);
    if (paginaActual < totalPages) {
      setPaginaActual(paginaActual + 1);
    }
  };
  const showInfo = (id) => {
    const preguntas_Buscar = preguntas_partida.filter(e => e.id_partida == id);
    if (preguntas_Buscar.length === 0) {
      Swal.fire({
        title: "No has jugado este rosco aún",
        icon: "error"
      });
      return;
    }
    let arrayPreguntas = [];
    preguntas_Buscar.forEach(element => {
      let busqueda = preguntas.find(e => e.id == element.id_pregunta);
      if (busqueda) {
        let categoriaBuscar = categorias.find(e => e.id == busqueda.id_categoria);
        arrayPreguntas.push({
          ...busqueda,
          categoriaNombre: categoriaBuscar ? categoriaBuscar.nombre : 'Desconocida',
          respuestaUsuario: element.respuesta_usuario
        });
      }
    });

    if (arrayPreguntas.length > 0) {
      setPreguntasSeleccionadas(arrayPreguntas);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPreguntasSeleccionadas([]);
  };
  return (
    <div className="min-h-svh min-w-svw bg-partidasImage fondos before:opacity-50" >
      <img src="/storage/images/fondo3.jpg" alt="fondo" className="absolute top-0 w-full h-screen opacity-30 pos -z-10" />
      <div className="z-1">
        <NavMenu user={auth.user} color={"white"}></NavMenu>
        <section className="flex flex-col  items-center justify-center gap-5 mx-20 z-10">
          <table className="w-10/12 mx-20 my-20 text-center">
            <thead>
              <tr>
                <th className="cursor-pointer" onClick={orderByName}>Nombre Partida</th>
                <th className="cursor-pointer" onClick={orderByDate}>Ultima actualización</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {datosPaginaActual.map((element, i) => {
                return (
                  <tr key={i - 1} className="">
                    <td >{element.nombre}</td>
                    <td>{element.updated_at.split("T")[0]}</td>
                    <td key={i + 2}><button onClick={() => location.href = route('partida.edit', { partida: element.id, id_pasapalabra: element.id_pasapalabra })}><BsPlayCircleFill /></button></td>
                    <td><button onClick={() => showInfo(element.id)}>?</button></td>
                    <td ><button onClick={() =>
                      destroy(element.id)}><BsFillTrash2Fill /></button></td>
                  </tr>)
              })}
            </tbody>
          </table>
          <div>
            <button className="bg-royal-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={irPaginaAnterior} disabled={paginaActual === 1}>Anterior</button>
            <button className="bg-royal-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={irPaginaSiguiente} disabled={paginaActual === Math.ceil(partidas.length / 10)}>Siguiente</button>
          </div>
          <PreguntaModal
            isOpen={isModalOpen}
            onClose={closeModal}
            preguntas={preguntasSeleccionadas}
            categorias={categorias}
          />
        </section>

      </div>
    </div>
  );

}