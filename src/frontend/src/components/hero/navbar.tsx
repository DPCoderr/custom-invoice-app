import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <nav>
      <Button
        nativeButton={false}
        variant={"link"}
        render={<Link to="/">Home</Link>}
      ></Button>
      <Button
        nativeButton={false}
        variant={"link"}
        render={<Link to="/login">Login</Link>}
      ></Button>
      <Button
        nativeButton={false}
        variant={"link"}
        render={<Link to="/register">Register</Link>}
      ></Button>
      <Button
        nativeButton={false}
        variant={"link"}
        render={<Link to="/dashboard">Dashboard</Link>}
      ></Button>

      <Button
        nativeButton={false}
        variant={"default"}
        render={<Link to="/login">Login</Link>}
      ></Button>
      <Button
        nativeButton={false}
        variant={"outline"}
        render={<a href="http://localhost:5050/api/auth/login">Logout</a>}
      ></Button>
    </nav>
  );
}
