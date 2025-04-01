import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <div className="border-t-2 border-[#2e160e]">
      <div className="container mx-auto flex items-center justify-between p-4">
        <small className="text-base">Caps &copy; 2025</small>
        <div className="flex gap-4">
          <a href="#" className="scale-95 transition-transform hover:scale-100">
            <Facebook />
          </a>
          <a href="#" className="scale-95 transition-transform hover:scale-100">
            <Instagram />
          </a>
          <a href="#" className="scale-95 transition-transform hover:scale-100">
            <Twitter />
          </a>
        </div>
      </div>
    </div>
  );
}
