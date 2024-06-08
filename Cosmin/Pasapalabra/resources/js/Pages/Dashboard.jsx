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
        )
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
                                    onClick={() => handleButtonClick('Texto del Botón 2')}
                                >
                                    Preguntas
                                </button>
                                <button
                                    className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleButtonClick('Texto del Botón 3')}
                                >
                                    Pasapalabras
                                </button>
                                <button
                                    className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleButtonClick('Texto del Botón 1')}
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
