import { Button } from "#/components/ui/button";
import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <nav className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200">
      {/* Logo */}
      <Link to="/" className="text-lg font-semibold text-black">
        Logo
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6">
        <Button
          nativeButton={false}
          variant={"link"}
          className="text-gray-700 hover:text-black"
          render={<Link to="/">Home</Link>}
        />
        <Button
          nativeButton={false}
          variant={"link"}
          className="text-gray-700 hover:text-black"
          render={<Link to="/login">About</Link>}
        />
        <Button
          nativeButton={false}
          variant={"link"}
          className="text-gray-700 hover:text-black"
          render={<Link to="/contact">Contact</Link>}
        />

        <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200">
          <Button
            nativeButton={false}
            variant={"default"}
            className="bg-black text-white hover:bg-gray-800"
            render={<Link to="/login">Login</Link>}
          />
          <Button
            nativeButton={false}
            variant={"outline"}
            className="border-gray-300 text-black hover:bg-gray-100"
            render={<Link to="/signup">Sign Up</Link>}
          />
        </div>
      </div>
    </nav>
  );
}
