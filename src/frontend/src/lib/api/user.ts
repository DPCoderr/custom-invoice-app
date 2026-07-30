export type UserDto = {
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
};

export async function getUser(): Promise<UserDto | null> {
  try {
    const res = await fetch("http://localhost:5050/api/auth/me", {
      credentials: "include",
    });

    if (res.status === 401) return null;
    if (!res.ok) throw new Error("Failed to fetch user");

    const data = await res.json();
    return data;
  } catch (error) {
    console.warn("Fetch didn't work", error);
    return null;
  }
}
