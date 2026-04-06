import { FloatingSquares } from "@/components/publi/FloatingSquares";
import { Reveal } from "@/components/publi/Reveal";
import { cn } from "@/lib/utils";

const platformCells = [
  {
    type: "platform",
    name: "Instagram",
    iconSrc: "/icons/instagram-color.svg",
  },
  {
    type: "platform",
    name: "Facebook",
    iconSrc: "/icons/facebook-color.svg",
  },
  {
    type: "platform",
    name: "TikTok",
    iconSrc: "/icons/tiktok-color.svg",
  },
  { type: "text", title: "1 dashboard unificado" },
  {
    type: "platform",
    name: "LinkedIn",
    iconSrc: "/icons/linkedin-color.svg",
  },
  {
    type: "platform",
    name: "X",
    iconSrc: "/icons/twitter-color.svg",
  },
  {
    type: "platform",
    name: "YouTube",
    iconSrc: "/icons/yt-color.svg",
  },
  {
    type: "platform",
    name: "Threads",
    iconSrc: "/icons/threads-color.svg",
  },
  {
    type: "platform",
    name: "Pinterest",
    iconSrc: "/icons/pinterest-color.svg",
  },
  { type: "text", title: "Cuentas ilimitadas por plataforma" },
  { type: "text", title: "Más plataformas próximamente" },
] as const;

export function MultiPlatform() {
  return (
    <section
      id="recursos"
      className="relative overflow-hidden bg-[hsl(var(--hero-background))] px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <FloatingSquares
        squares={[
          {
            className:
              "left-10 top-8 h-8 w-8 rotate-6 bg-primary-light/70 md:h-12 md:w-12",
          },
          {
            className:
              "right-6 top-6 h-16 w-16 bg-accent/50 md:right-12 md:h-20 md:w-20",
          },
          {
            className:
              "left-20 bottom-16 h-6 w-6 bg-primary/45 md:left-28 md:h-10 md:w-10",
          },
          {
            className:
              "bottom-10 right-24 h-10 w-10 -rotate-6 bg-primary-light/55 md:h-14 md:w-14",
          },
        ]}
      />

      <div className="relative mx-auto max-w-7xl">
        <Reveal className="max-w-3xl">
          <h2 className="text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl">
            Soporte multi-plataforma
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Gestioná todas tus cuentas desde un único dashboard. publi soporta
            las redes que tus clientes realmente usan.
          </p>
        </Reveal>

        <div className="mt-14 grid overflow-hidden rounded-[34px] border border-[#e8f4f7] bg-white shadow-[0_24px_70px_-48px_rgba(10,31,47,0.35)] sm:grid-cols-2 lg:grid-cols-4">
          {platformCells.map((cell, index) => (
            <Reveal
              key={`${cell.type}-${index}`}
              delayMs={index * 55}
              className="h-full"
            >
              <div
                className={cn(
                  "flex min-h-[220px] h-full border-b border-r border-[#e8f4f7] p-8 transition-colors hover:bg-[#f0fafc]",
                  cell.type === "text"
                    ? "items-center justify-center text-center"
                    : "items-center justify-center",
                )}
              >
                {cell.type === "platform" ? (
                  <div className="flex flex-col items-center">
                    <div className="flex h-24 w-24 items-center justify-center">
                      <img
                        src={cell.iconSrc}
                        alt={cell.name}
                        className="h-20 w-20 object-contain"
                        width={80}
                        height={80}
                      />
                    </div>
                    <p className="mt-6 text-[13px] font-medium text-muted-foreground">
                      {cell.name}
                    </p>
                  </div>
                ) : (
                  <p className="max-w-[14ch] text-2xl font-semibold leading-tight text-foreground">
                    {cell.title}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
