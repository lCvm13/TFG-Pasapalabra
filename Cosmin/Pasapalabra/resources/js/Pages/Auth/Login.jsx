import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <section className='w-full h-full' >
                <Head title="Log in" />
                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                <div className='card mb-3 '>
                    <div className='flex flex-row gap-20 items-center'>
                        <div className='h-full w-full'>
                            <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" alt="Trendy Pants and Shoes"
                                className="w-500 h-500 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5" />
                        </div>
                        <div className='col-lg-8 w-full flex flex-col'>
                            <div className='card-body py-5 px-md-5'>
                                <form className='grid' onSubmit={submit}>
                                    <div className='form-outline mb-4'>
                                        <InputLabel htmlFor="email" value="Email" className='form-label' />

                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) => setData('email', e.target.value)}
                                        />

                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <InputLabel htmlFor="password" value="Contraseña" className='form-label' />

                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            autoComplete="current-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                        />

                                        <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    <div className="row mb-4 my-4 flex flex-col gap-3">


                                        <div className='col d-flex self-center'>

                                            <div className='form-check mx-3'>
                                                <label className="form-check-label">
                                                    <Checkbox
                                                        name="remember"
                                                        checked={data.remember}
                                                        onChange={(e) => setData('remember', e.target.checked)}
                                                    />
                                                    <span className="ms-2 text-sm text-gray-600">Recordarme</span>
                                                </label>
                                            </div>

                                        </div>

                                        <div className="col self-center">
                                            {(
                                                <Link
                                                    href={route('register')}
                                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    ¿No tienes una cuenta?
                                                </Link>
                                            )}
                                        </div>
                                        <PrimaryButton disabled={processing}>
                                            Iniciar sesión
                                        </PrimaryButton>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
