import { Anton, Instrument_Serif, Poppins } from "next/font/google";

// Shared by the root layout and global-not-found.tsx, which renders outside the layout.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});
const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400" });

/** The font CSS variables for the <html> element. */
export const fontVariables = `${poppins.variable} ${instrumentSerif.variable} ${anton.variable}`;
