import { useState } from "react";
import Link from "next/link";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Dummy validation
        if (!email || !password) {
            setError("Email dan password wajib diisi.");
            return;
        }
        // Redirect or handle login logic here
        setError("");
        alert("Login berhasil!");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-500 to-indigo-700">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
                <h1 className="mb-6 text-2xl font-bold text-center text-slate-900">Masuk ke LembarPintar</h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-slate-700">Email</label>
                        <input
                            type="email"
                            className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-slate-700">Password</label>
                        <input
                            type="password"
                            className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-500 px-4 py-2 text-white font-semibold shadow hover:brightness-110"
                    >
                        Masuk
                    </button>
                </form>
                <div className="mt-6 text-center text-sm text-slate-600">
                    Belum punya akun?{' '}
                    <Link href="/auth/register" className="text-blue-600 hover:underline">
                        Daftar Gratis
                    </Link>
                </div>
            </div>
        </div>
    );
}
