
import { router } from "@inertiajs/react";
import Swal from 'sweetalert2'
export default function NavMenu({ user }) {
  const closeNav = () => {
    document.getElementById("mySidenav").style = "width:0";
  }
  const openNav = () => {
    document.getElementById("mySidenav").style = "width:250px";
  }
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
    router.post(route("pasapalabra.store"), { nombre: nombre, id_usuario: user.id, url_to: "pasapalabra.edit" })
  }
  const navBarData = {
    Categorias: {
      Index: "categoria.index",
      Formulario: "categoria.create"
    },
    Pasapalabra: {
      Index: "pasapalabra.index",
      Formulario: "showForm"
    },
    Preguntas: {
      Index: "pregunta.index",
      Formulario: "pregunta.create"
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
                  <a href={valor != "showForm" ? route(valor) : "#"} onClick={valor != "showForm" ? null : () => showForm()}>{nombre}</a>
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
      <span className="text-4xl m-5 absolute top-0 cursor-pointer" onClick={() => openNav()}>&#9776;</span>
    </aside >
  );
}