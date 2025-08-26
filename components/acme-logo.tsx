import { Earth } from "lucide-react";
import { luckiestGuy } from "@/components/fonts";

export default function AcmeLogo() {
  return (
    <div
      className={`${luckiestGuy.className} flex flex-row items-center leading-none text-white`}
    >
      <Earth className="h-12 w-12 rotate-45" />
      <p className="text-[44px] tracking-wider ml-3">Acme</p>
    </div>
  );
}
