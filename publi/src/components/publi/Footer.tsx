"use client"

const productLinks = [
  { label: "Funcionalidades", href: "#" },
  { label: "Precios", href: "#" },
  { label: "Roadmap", href: "#" },
  { label: "Novedades", href: "#" },
]

const resourceLinks = [
  { label: "Documentación", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Soporte", href: "#" },
  { label: "Estado del servicio", href: "#" },
]

const projectLinks = [
  { label: "Sobre nosotros", href: "#" },
  { label: "Equipo", href: "#" },
  { label: "Términos de uso", href: "#" },
  { label: "Política de privacidad", href: "#" },
]

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div className="flex flex-col gap-4">
      <span
        className="text-[13px] font-semibold uppercase tracking-widest text-white"
      >
        {title}
      </span>
      <ul className="flex flex-col gap-3">
        {links.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="text-[13px] transition-colors duration-150 hover:text-white"
              style={{ color: "rgba(204, 238, 245, 0.7)" }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer
      className="pt-14 pb-8"
      style={{
        backgroundColor: "#0a1f26",
        borderTop: "1px solid rgba(0, 149, 182, 0.2)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <span
              className="font-bold leading-none"
              style={{ color: "#0095b6", fontSize: "22px" }}
            >
              publi
            </span>
            <p
              className="text-[13px] leading-relaxed"
              style={{ color: "rgba(204, 238, 245, 0.7)" }}
            >
              La plataforma para Community Managers que quieren crecer sin caos.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-150"
                style={{ backgroundColor: "rgba(204, 238, 245, 0.1)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "rgba(0, 149, 182, 0.3)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "rgba(204, 238, 245, 0.1)")
                }
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    stroke="#cceef5"
                    strokeWidth="1.8"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    stroke="#cceef5"
                    strokeWidth="1.8"
                  />
                  <circle cx="17.5" cy="6.5" r="1" fill="#cceef5" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-150"
                style={{ backgroundColor: "rgba(204, 238, 245, 0.1)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "rgba(0, 149, 182, 0.3)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "rgba(204, 238, 245, 0.1)")
                }
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="3"
                    stroke="#cceef5"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M7 10v7M7 7v.5"
                    stroke="#cceef5"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11 17v-4c0-1.657 1.343-3 3-3s3 1.343 3 3v4"
                    stroke="#cceef5"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11 10v7"
                    stroke="#cceef5"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          <FooterColumn title="Producto" links={productLinks} />
          <FooterColumn title="Recursos" links={resourceLinks} />
          <FooterColumn title="Proyecto" links={projectLinks} />
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6"
          style={{ borderTop: "1px solid rgba(204, 238, 245, 0.1)" }}
        >
          <p
            className="text-[12px]"
            style={{ color: "rgba(204, 238, 245, 0.4)" }}
          >
            © 2026 publi. Todos los derechos reservados.
          </p>
          <p
            className="text-[12px]"
            style={{ color: "rgba(204, 238, 245, 0.4)" }}
          >
            Hecho con amor en Buenos Aires 🇦🇷
          </p>
        </div>
      </div>
    </footer>
  )
}
