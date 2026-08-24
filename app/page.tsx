import { DhabaPlayer } from "./components/DhabaPlayer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#120d09] text-[#f5e6c8]">
      <section className="relative min-h-screen overflow-hidden">

        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/dhaba-background.png')",
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col px-5 py-8">

          {/* Header */}
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black tracking-[0.25em]">
                DHABA
              </h1>
              <p className="mt-1 text-xs tracking-[0.35em] text-[#d5a85c]">
                90s HIGHWAY RADIO
              </p>
            </div>

            <div className="rounded-full border border-white/20 bg-black/30 px-4 py-2 text-xs backdrop-blur">
              By Abhishek
            </div>
          </header>

          {/* Main */}
          <div className="flex flex-1 flex-col items-center justify-center">
            <DhabaPlayer />
          </div>

          {/* Footer */}
          <footer className="pt-8 text-center text-xs tracking-widest text-white/30">
            MADE FOR THE ROAD • DHABA • PROPRIETOR: ABHISHEK
          </footer>

        </div>
      </section>
    </main>
  );
}
