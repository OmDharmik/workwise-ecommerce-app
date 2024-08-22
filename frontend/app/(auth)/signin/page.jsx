'use client';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
const { useState } = require('react');
const { useRouter } = require('next/navigation');

const SignIn = () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/user/login`, form);
      if (response.data.status === true) {
        localStorage.setItem('token', response.data.token);
        console.log(form.role);
        if (response.data.role === 'seller') {
          router.push('/seller/home');
        } else {
          router.push('/buyer/home');
        }
      }
    } catch (error) {}
  };
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="grid grid-cols-2">
        <div className="flex flex-col justify-center min-h-screen items-center bg-gray-50">
          <div className="flex flex-col justify-center items-center w-full">
            <h1 className="heading text-center">Sign In</h1>
            <form onSubmit={onSubmit} className="flex w-full justify-center">
              <div className="mt-10 flex flex-col gap-7 w-8/12">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="input"
                  placeholder="Email"
                />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="input "
                  placeholder="Password"
                />
                <button type="submit" className="button hover:bg-blue-600">
                  Sign In
                </button>
                <Link
                  href={'/signup'}
                  className="text-right mr-2 hover:underline hover:text-blue-600 font-bold"
                >
                  Create Account
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className="">
          <div className="relative h-full w-full">
            <Image
              src="/login-image.jpg"
              alt="signin"
              layout="fill"
              className="object-contain"
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
