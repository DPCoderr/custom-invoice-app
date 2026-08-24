import { Button } from "#/components/ui/button";
import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <nav
      aria-label="Main navigation"
      className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200"
    >
      <Link to="/" className="text-lg font-semibold text-black">
        Invoice Generator
      </Link>
      <div className="flex items-center gap-3">
        <Button
          nativeButton={false}
          variant="ghost"
          render={<Link to="/login">Log in</Link>}
        />
        <Button
          nativeButton={false}
          render={<Link to="/signup">Create account</Link>}
        />
      </div>
    </nav>
  );
}
