'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/contexts/AuthContexts';

export default function ProfilePage() {
  const router = useRouter();

  const { user, logout, loading } = useAuth();

  async function handleLogout() {
    await logout();
    router.push('/login');
  }

  async function handleDeleteAccount() {
    const confirmed = window.confirm(
      'Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.',
    );

    if (!confirmed) return;

    try {
      //await deleteAccount();
      router.push('/signup');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erro ao excluir conta');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-50">
      <div className="bg-black-forest-active p-8 rounded shadow-md w-80">
        <h1 className="text-xl text-cornsilk  font-bold mb-6 text-center">
          Meu Perfil
        </h1>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Nome</label>

          <div className="w-full border border-cornsilk p-2 rounded">
            {user?.name}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1">Email</label>

          <div className="w-full border border-cornsilk p-2 rounded">
            {user?.email}
          </div>
        </div>

        <button
          onClick={handleLogout}
          disabled={loading}
          className="w-full bg-black-forest hover:bg-black-forest-hover text-black font-semibold p-2 rounded mb-3 transition"
        >
          Sair
        </button>

        {/* <button
          onClick={handleDeleteAccount}
          disabled={loading}
          className="w-full bg-copperwood text-white p-2 rounded hover:bg-copperwood-hover transition"
        >
          Excluir conta
        </button> */}
      </div>
    </div>
  );
}
