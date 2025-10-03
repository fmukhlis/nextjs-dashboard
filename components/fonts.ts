import { Roboto, Luckiest_Guy, Roboto_Slab } from "next/font/google";

// Primary font
export const roboto = Roboto({ subsets: ["latin"] });

// Secondary font
export const robotoSlab = Roboto_Slab({ subsets: ["latin"], weight: ["900"] });

// Tertiary font
export const luckiestGuy = Luckiest_Guy({ subsets: ["latin"], weight: "400" });
