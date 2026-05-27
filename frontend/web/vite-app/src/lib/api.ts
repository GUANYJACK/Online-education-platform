const API_BASE =
  import.meta.env.VITE_API_BASE ??
  "https://online-education-platform-backend-kappa.vercel.app/api";

export interface AuthUser {
  id: number;
  name: string;
  role: string;
}

export async function apiLogin(
  email: string,
  password: string,
): Promise<{ token: string; user: AuthUser }> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Login failed");
  return data;
}

export async function apiRegister(
  name: string,
  email: string,
  password: string,
): Promise<{ userId: string }> {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Registration failed");
  return { userId: data.userId };
}

export async function apiSelectRole(
  userId: string,
  role: string,
): Promise<void> {
  const res = await fetch(`${API_BASE}/auth/select-role`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, role }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Role selection failed");
}
