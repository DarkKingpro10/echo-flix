import { Poppins } from "next/font/google";

const PoppinsFont = Poppins({
	variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  fallback: ["system-ui", "sans-serif"],
});
export { PoppinsFont };