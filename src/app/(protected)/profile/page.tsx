"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/src/contexts/AuthContexts";

export default function ProfilePage() {
  const router = useRouter();

  const { user, logout, loading } = useAuth();

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  async function handleDeleteAccount() {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.",
    );

    if (!confirmed) return;

    try {
      //await deleteAccount();
      router.push("/signup");
    } catch (err: any) {
      alert(err.response?.data?.message || "Erro ao excluir conta");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h1 className="text-xl font-bold mb-6 text-center text-black">
          Meu Perfil
        </h1>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Nome
          </label>

          <div className="w-full border p-2 rounded bg-gray-50 text-black">
            {user?.name}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email
          </label>

          <div className="w-full border p-2 rounded bg-gray-50 text-black">
            {user?.email}
          </div>
        </div>

        <button
          onClick={handleLogout}
          disabled={loading}
          className="w-full bg-black text-white p-2 rounded mb-3 hover:bg-gray-800 transition"
        >
          Deslogar
        </button>

        <button
          //onClick={handleDeleteAccount}
          disabled={loading}
          className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
        >
          Excluir conta
        </button>
      </div>
    </div>
  );
}
