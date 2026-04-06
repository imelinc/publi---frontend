import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[hsl(var(--hero-background))] text-foreground">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <section className="flex w-full items-center justify-center bg-white px-6 py-12 sm:px-10 lg:min-h-screen lg:w-3/5 lg:px-16">
          <div className="w-full max-w-[420px]">
            <div className="flex items-center justify-between gap-4">
              <Link
                href="/"
                className="inline-block text-2xl font-bold tracking-tight text-primary transition-opacity hover:opacity-80"
              >
                publi
              </Link>
              <Link
                href="/"
                className="rounded-full border border-primary-light bg-[hsl(var(--hero-background))] px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
              >
                Volver al inicio
              </Link>
            </div>

            <div className="mt-12">
              <h1 className="text-[28px] font-bold tracking-[-0.02em] text-foreground">
                Bienvenido de nuevo
              </h1>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Ingresá a tu cuenta para continuar gestionando tus redes.
              </p>
            </div>

            <form className="mt-10 space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  autoComplete="email"
                  className="w-full rounded-lg border border-primary-light bg-white px-4 py-3 text-sm text-foreground outline-none transition duration-150 placeholder:text-muted-foreground focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,149,182,0.10)]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-foreground"
                  >
                    Contraseña
                  </label>
                  <Link
                    href="#"
                    className="text-xs font-medium text-primary transition hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-primary-light bg-white px-4 py-3 text-sm text-foreground outline-none transition duration-150 placeholder:text-muted-foreground focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,149,182,0.10)]"
                />
              </div>

              <Link
                href="/dashboard"
                className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3.5 text-[15px] font-bold text-white transition duration-150 hover:bg-[#007a97]"
              >
                Ingresar
              </Link>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#e8f4f7]" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-sm text-muted-foreground">
                    o continuá con
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-[#e8f4f7] bg-white px-4 py-3.5 text-sm font-medium text-foreground transition hover:bg-[#f9f9f9]"
              >
                <GoogleIcon />
                <span>Continuar con Google</span>
              </button>
            </form>

            <p className="mt-8 text-sm text-muted-foreground">
              ¿Todavía no tenés cuenta?{" "}
              <Link
                href="/waitlist"
                className="font-bold text-primary transition hover:underline"
              >
                Solicitar acceso
              </Link>
            </p>
          </div>
        </section>

        <aside className="relative hidden overflow-hidden bg-[#0f2a33] lg:flex lg:min-h-screen lg:w-2/5 lg:items-center lg:justify-center">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-10 top-12 h-10 w-10 rotate-6 bg-primary/70" />
            <div className="absolute right-10 top-16 h-20 w-20 bg-accent/65" />
            <div className="absolute left-20 top-40 h-6 w-6 -rotate-6 bg-primary-light/70" />
            <div className="absolute right-24 top-1/3 h-12 w-12 rotate-3 bg-primary/45" />
            <div className="absolute bottom-32 left-16 h-16 w-16 bg-primary-light/45" />
            <div className="absolute bottom-16 right-20 h-8 w-8 -rotate-3 bg-accent/55" />
            <div className="absolute right-14 top-24 h-28 w-28 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-20 left-10 h-32 w-32 rounded-full bg-primary-light/10 blur-3xl" />
          </div>

          <div className="relative z-10 max-w-md px-10 text-center">
            <p className="text-[22px] italic leading-10 text-primary-light">
              &quot;publi me permitió pasar de gestionar
              <br />
              5 clientes con caos a 10 clientes
              <br />
              con claridad.&quot;
            </p>
            <p className="mt-6 text-sm text-primary-light/60">
              — Lucía M., Community Manager Freelance
            </p>
          </div>

          <div className="absolute bottom-8 right-8 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-bold text-foreground shadow-lg">
            Beta cerrada · 500+ CMs en lista
          </div>
        </aside>
      </div>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
    >
      <path
        d="M21.8 12.23c0-.71-.06-1.22-.19-1.75H12v3.44h5.64c-.11.86-.71 2.15-2.04 3.02l-.02.12 2.75 2.13.19.02c1.8-1.66 2.83-4.09 2.83-6.98Z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.76 0 5.08-.91 6.77-2.48l-3.22-2.49c-.86.6-2 1.01-3.55 1.01a6.15 6.15 0 0 1-5.82-4.25l-.11.01-2.86 2.21-.04.1A10.23 10.23 0 0 0 12 22Z"
        fill="#34A853"
      />
      <path
        d="M6.18 13.79A6.18 6.18 0 0 1 5.83 12c0-.62.13-1.22.34-1.79l-.01-.12-2.9-2.24-.1.04A10.22 10.22 0 0 0 2 12c0 1.64.39 3.19 1.08 4.56l3.1-2.77Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.96c1.96 0 3.28.84 4.03 1.55l2.94-2.87C17.07 2.9 14.76 2 12 2a10.23 10.23 0 0 0-8.84 4.89l3.01 2.32A6.18 6.18 0 0 1 12 5.96Z"
        fill="#EA4335"
      />
    </svg>
  );
}
