export type UserDto = {
  firstName: String;
  lastName: String;
  email: string;
  roles: string[];
};

export async function getUser(): Promise<UserDto> {
  const res = await fetch("http://localhost:5050/auth/me", {
    credentials: "include"
  })
  const data = await res.json();
  return data;
}