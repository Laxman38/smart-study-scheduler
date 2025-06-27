import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup () {
    const [form,setForm] = useState({ name: '', email: '', password: ''});
    const [error,setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value})
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, password } = form;

        if( !name || !email || !password) {
            setError('All fields are required');
            return;
        }

        localStorage.setItem('user', JSON.stringify({name, email}));
        localStorage.setItem('isLoggedIn', 'true');

        navigate('/');
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <form
             onSubmit={handleSubmit}
             className="bg-white p-8 rounded-xl shadow-lg w-96"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <input
                 type="text"
                 name="name"
                 placeholder="Full Name"
                 value={form.name}
                 onChange={handleChange}
                 className="w-full mb-4 px-4 py-2 border rounded"
                />

                <input
                 type="email"
                 name="email"
                 placeholder="Email"
                 value={form.email}
                 onChange={handleChange}
                 className="w-full mb-4 px-4 py-2 border rounded"
                />

                <input
                 type="password"
                 name="password"
                 placeholder="Password"
                 onChange={handleChange}
                 className="w-full mb-4 px-4 py-2 border rounded"
                />

                <button
                 type="submit"
                 className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Create Account
                </button>
            </form>
        </div>
    );
};

export default Signup;