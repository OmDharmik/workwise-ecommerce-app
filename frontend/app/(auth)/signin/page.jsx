'use client';
import axios from 'axios';
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
        router.push('/');
      }
    } catch (error) {}
  };
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <div className="max-h-fit flex flex-col justify-center item-center w-96">
        <h1 className="heading text-center">Sign In</h1>
        <form onSubmit={onSubmit}>
          <div className="mt-5 flex flex-col gap-3">
            <div className="mb-4 mt-5">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="input"
                placeholder="Email"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="input "
                placeholder="Password"
              />
            </div>
            <button type="submit" className="button hover:bg-blue-600">
              Sign In
            </button>
            <Link href={'/signup'} className="text-right mr-5 hover:underline">
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
