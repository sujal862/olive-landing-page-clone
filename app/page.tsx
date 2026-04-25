import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mt-4 md:mt-8 mb-10 md:mb-24 px-4 md:px-8 mx-auto 2xl:max-w-[1440px]">
        <div
          className="relative border border-neutral-200 rounded-[24px] overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, #F5FAF6 0%, #F5FAF6 100%)",
          }}
        >
          <div className="relative w-full pt-2 pb-12 px-3 md:px-6">
            <Navbar />
            <Hero />
          </div>
        </div>
      </div>
    </main>
  );
}
