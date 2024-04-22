import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <section className='w-full h-full' >
                <Head title="Register" />
                <div className='card mb-3 '>
                    <div className='flex flex-row gap-20 items-center'>
                        <div className='h-full w-full'>
                            <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" alt="Trendy Pants and Shoes"
                                className="w-500 h-500 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5" />
                        </div>
                        <div className='col-lg-8 w-full flex flex-col'>
                            <div className='card-body py-5 px-md-5'>
                                <form className='grid' onSubmit={submit}>
                                    <div className="form-outline mb-4">
                                        <InputLabel htmlFor="name" value="Nombre" />
                                        <TextInput
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-full"
                                            autoComplete="name"
                                            isFocused={true}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                        />

                                        <InputError message={errors.name} className="mt-2" />
                                    </div>
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
                                    <div className="mt-4">
                                        <InputLabel htmlFor="password_confirmation" value="Confirmar contraseña" />

                                        <TextInput
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            required
                                        />

                                        <InputError message={errors.password_confirmation} className="mt-2" />
                                    </div>
                                    <div className="row mb-4 my-4 flex flex-col gap-3">
                                        <div className="col self-center">
                                            {(
                                                <Link
                                                    href={route('login')}
                                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    ¿Ya tienes una cuenta?
                                                </Link>
                                            )}
                                        </div>
                                        <PrimaryButton disabled={processing}>
                                            Registrarse
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
