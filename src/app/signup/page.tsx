'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/contexts/AuthContexts';

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signup, loading } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await signup(name, email, password);
      router.push('/dashboard');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erro ao cadastrar');
    }
  }

  return (
    <div className="bg-black-forest dark:bg-black-forest-active min-h-screen flex items-center justify-center text-foreground">
      <form
        onSubmit={handleSubmit}
        className="bg-background p-8 rounded shadow-md w-80"
      >
        <h1 className="text-xl font-bold mb-4 text-center">Cadastro</h1>

        <input
          className="w-full border p-2 mb-3"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-4"
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-black-forest dark:bg-black-forest-active hover:bg-black-forest-hover text-white p-2 rounded mb-3 cursor-pointer"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        <p className="text-sm text-center">
          Já tem conta?{' '}
          <span
            className="text-cornsilk-hover dark:text-cornsilk cursor-pointer"
            onClick={() => router.push('/login')}
          >
            Entrar
          </span>
        </p>
      </form>
    </div>
  );
}
