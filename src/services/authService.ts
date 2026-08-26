import api from "../api/api";

export async function login(email: string, password: string) {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
}

export async function logout() {
  await api.post("/auth/logout");
}

export async function register(name: string, email: string, password: string) {
  const { data } = await api.post("/auth/register", {
    name,
    email,
    password,
  });

  return data;
}

export async function me() {
  const { data } = await api.get("/auth/me");
  return data;
}
