import { Navbar } from "@/components";
import Loader from "@/components/Loader/Loader";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Navbar />
      <h1>Home Screen</h1>
    </>
  );
}
