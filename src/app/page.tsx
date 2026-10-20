import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work/work";

export default function Home() {
  return (
    <main id="top" className="flex-1">
      <Hero />
      <Work />
    </main>
  );
}
