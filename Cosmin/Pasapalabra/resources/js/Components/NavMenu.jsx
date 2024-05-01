
import { router } from "@inertiajs/react";
export default function NavMenu({ ...props }) {
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
    router.post(route("pasapalabra.store"), { nombre: nombre, id_usuario: user(auth.user), url_to: "pasapalabra.edit" })
  }
  const navBarData = {
    Categorias: {
      Index: "categoria.index",
      Formulario: "categoria.categoriaForm"
    },
    Pasapalabra: {
      Index: "pasapalabra.index",
      Formulario: "showForm"
    },
    Preguntas: {
      Index: "pregunta.index",
      Formulario: "pregunta.form"
    }
  }
  const NavBar = ({ navBarData }) => {
    return (
      <nav>
        {Object.entries(navBarData).map(([titulo, enlaces]) => (
          <div key={titulo} className="text-sky-600 p-10">
            <h2 className="text-3xl">{titulo}</h2>
            <hr />
            <ul>
              {Object.entries(enlaces).map(([nombre, valor]) => (
                <li key={nombre}>
                  <a href={valor}>{nombre}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    );
  };


  return (
    <section>
      <div id="mySidenav" className="sidenav">
        <a href="#" className="closebtn" onClick={() => closeNav()}>&times;</a>
        {<NavBar navBarData={navBarData}></NavBar>}
      </div>
      <span className="text-4xl m-5 absolute top-0 cursor-pointer" onClick={() => openNav()}>&#9776;</span>
    </section >
  );
}