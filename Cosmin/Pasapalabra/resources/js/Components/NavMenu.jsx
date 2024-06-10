
import { router } from "@inertiajs/react";
import Swal from 'sweetalert2'
export default function NavMenu({ user, color }) {
  const closeNav = () => {
    document.getElementById("mySidenav").style = "width:0";
  }
  const openNav = () => {
    document.getElementById("mySidenav").style = "width:250px";
  }
  const showForm = (titulo) => {
    if (titulo == "Pasapalabra") {
      Swal.fire({
        title: "Inserta el nombre del Pasapalabra nuevo",
        input: 'text',
        preConfirm: () => {
          handleSubmit(Swal.getInput()?.value)
        }
      })
    } else {
      Swal.fire({
        title: "Inserta el nombre de la categoria nueva",
        input: 'text',
        preConfirm: () => {
          handleSubmitSwal(Swal.getInput()?.value)
        }
      })
    }

  }
  function handleSubmit(nombre) {
    router.post(route("pasapalabra.store"), { nombre: nombre, id_usuario: user?.id, url_to: "pasapalabra.edit" })
  }
  function handleSubmitSwal(nombre) {
    router.post(route("categoria.store"), { nombre_categoria: nombre, id_usuario: user.id, url_to: null })
  }
  const navBarData = {
    Inicio: {
      Home: "index",
      Introduccion: "dashboard"
    },
    Categorias: {
      Listado: "categoria.index",
      Formulario: "showForm"
    },
    Pasapalabra: {
      Listado: "pasapalabra.index",
      Formulario: "showForm"
    },
    Preguntas: {
      Listado: "pregunta.index",
      Formulario: "pregunta.create"
    },
    Partidas: {
      Listado: "partida.index"
    }
  }


  const NavBar = ({ navBarData }) => {
    return (
      <nav>
        {Object.entries(navBarData).map(([titulo, enlaces]) => (
          <div key={titulo + 1} className="text-blue-900 p-10 font-extrabold">
            <h2 className="text-3xl">{titulo}</h2>
            <hr />
            <ul>
              {Object.entries(enlaces).map(([nombre, valor]) => (
                <li key={nombre}>
                  <a href={valor != "showForm" ? route(valor) : "#"} onClick={valor != "showForm" ? null : () => showForm(titulo)}>{nombre}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    );
  };


  return (
    <aside>
      <div id="mySidenav" className="sidenav">
        <a href="#" className="closebtn" onClick={() => closeNav()}>&times;</a>
        {<NavBar navBarData={navBarData}></NavBar>}
      </div>
      <span className="text-4xl m-5 absolute top-0 cursor-pointer" style={{ color: color != undefined ? color : 'black' }} onClick={() => openNav()}>&#9776;</span>
    </aside >
  );
}