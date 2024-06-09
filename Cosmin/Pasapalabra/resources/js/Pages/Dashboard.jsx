import NavMenu from '@/Components/NavMenu';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ auth }) {
    const asset = (path) => {
        return `/storage/images/${path}`;
    }
    const user = (auth) => {
        return auth.name;
    };
    const textos = {
        inicio: (
            <>
                <div className='w-full flex justify-center'>
                    <span className='text-center'>Bienvenid@ <strong>{auth.user.name.charAt(0).toUpperCase() + auth.user.name.slice(1).toLowerCase()}</strong> a PasapaLearning.</span>
                </div>
                <br />
                Arriba verás varios botones que harán que cambie este texto, por lo que podrás obtener la información que desees sobre esta aplicación.
                <br />
                Si quieres empezar a usar la aplicación, arriba a la izquierda verás un menú de navegación si pinchas en las tres rayas, que te redirigirán a donde desees. Si quieres volver al menú principal, pincha sobre el siguiente enlace {"-->"}
                <a className='text-royal-blue' href={route('index')}>Inicio</a>.
            </>
        ),
        categoria: (
            <>
                <div className='w-full flex justify-center'>
                    <span className='text-center'><strong>Categorias</strong></span>
                </div>
                <br />
                Las categorias son los filtros que podrás colocar sobre las preguntas o roscos de pasapalabra. Esto significa que si colocas una categoria a una pregunta, solamente la podrás insertar en los roscos que tengan la misma categoria o no tengan una.
                <br />
                Las categorias se pueden crear desde su propio formulario o directamente desde los formularios de preguntas y roscos de pasapalabra.
                <br />
                Las categorias deben tener nombres únicos, no debes crear categorias con el mismo nombre.
                <br />
                Podrás modificar el nombre de la categoria cuando desees, teniendo en cuenta el anterior punto.
                <br />
                Podrás borrar cualquier categoría siempre que desees, aunque si algun rosco o pregunta tiene esa categoría, tendrás que confirmar que quieres eliminar dicha categoria de los roscos y preguntas
            </>
        ),
        preguntas: (<>
            <div className='w-full flex justify-center'>
                <span className='text-center'><strong>Preguntas</strong></span>
            </div>
            <br />
            Las preguntas son aquellas que se mostrarán en el juego de pasapalabra.
            <br />
            Podrás crearlas desde el formulario de preguntas, en el que se mostrarán todos los campos que necesitan rellenarse para poder usarse.
            <br />
            Podrás modificar todos los campos de las preguntas cuando desees, teniendo en cuenta que no se podrá editar si la pregunta forma parte de un rosco de pasapalabra.
            <br />
            Podrás borrar cualquier pregunta siempre que desees, aunque si algun rosco tiene esa pregunta, tendrás que confirmar que quieres eliminar dicha pregunta de los roscos también.
            <br />
            En el listado de preguntas podrás comprobar a qué pasapalabra forma parte dicha pregunta, además de que será visualmente fácil de ver al ser de color distinto al resto de preguntas.
        </>),
        pasapalabra: (<>
            <div className='w-full flex justify-center'>
                <span className='text-center'><strong>Roscos</strong></span>
            </div>
            <br />
            Los roscos de pasapalabra son aquellos que se usarán para jugar a Pasapalabra.
            <br />
            Los roscos de pasapalabra tienen que tener nombre único y se le podrán asignar preguntas a dicho rosco.
            <br />
            El rosco tiene una propiedad llamada infinito que te permitirá al usuario poder insertar varias preguntas por cada letra del rosco de pasapalabra. Esto hará que cada vez que repita el rosco, se elija de manera aleatoria una pregunta por letra, pudiendo repetir roscos variados infinitamente.
            <br />
            A los roscos de pasapalabra se le tendrán que asignar preguntas para poder jugarse, la pregunta no puede repetirse en el rosco.
            <br />
            Si a un rosco se le ha asignado una categoria, a la hora de insertar preguntas en el rosco, solo aparecerán las preguntas que tengan dicha categoria.
        </>),
        partida: (<>
            <div className='w-full flex justify-center'>
                <span className='text-center'><strong>Partidas</strong></span>
            </div>
            <br />
            Las partidas son las simulaciones del juego Pasapalabra usando los roscos creados por los usuarios
            <br />
            El usuario podrá responder las preguntas del rosco o pasar palabra como el juego original del pasapalabra, además podrá hacer click en las letras del rosco tras contestar para ver la respuesta correcta y la respuesta del usuario.
            < br />
            Tras terminar el rosco, de momento, se le pedirá confirmación de si quiere repetir la partida, para poder realizar el rosco las veces que necesite
            < br />
            Al repetir el rosco, se creará una partida nueva con el mismo nombre, pero con diferente acabado, de manera que en el listado se podrá comprobar el progreso del usuario en dicha partida. Sus preguntas contestadas, sus respuestas y los demás datos de la partida.
        </>)
    }
    const [text, setText] = useState(textos.inicio);

    const handleButtonClick = (newText) => {
        setText(newText);
    };

    return (

        <AuthenticatedLayout
            user={auth.user}
        // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Bienvenid@ {user(auth.user)}</h2>}
        >
            <NavMenu user={auth.user}></NavMenu>
            <Head title="Dashboard" />

            <div className="py-12 ">
                <div className=" sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden">
                        <div className="App h-svh">
                            <header className="App-header bg-gray-800 p-5 flex justify-center gap-4">
                                <button
                                    className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleButtonClick(textos.inicio)}
                                >
                                    Introducción
                                </button>
                                <button
                                    className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleButtonClick(textos.categoria)}
                                >
                                    Categorias
                                </button>
                                <button
                                    className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleButtonClick(textos.preguntas)}
                                >
                                    Preguntas
                                </button>
                                <button
                                    className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleButtonClick(textos.pasapalabra)}
                                >
                                    Pasapalabras
                                </button>
                                <button
                                    className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleButtonClick(textos.partida)}
                                >
                                    Partidas
                                </button>
                            </header>
                            <div className="text-container mt-5 text-2xl text-gray-800 p-10">
                                <p>{text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
