"use client";

import { ChangeEvent, useMemo, useRef, useState } from "react";

type Platform = "Instagram" | "Facebook" | "TikTok" | "LinkedIn" | "X" | "YouTube" | "Threads";
type PublishMode = "now" | "schedule";

interface ClientOption {
  id: string;
  name: string;
  initials: string;
}

const clients: ClientOption[] = [
  { id: "1", name: "Neon Inc.", initials: "NI" },
  { id: "2", name: "Casa Nube", initials: "CN" },
  { id: "3", name: "Studio Lucia", initials: "SL" },
];

const platformOptions: Array<{ name: Platform; iconSrc: string }> = [
  { name: "Instagram", iconSrc: "/icons/instagram-color.svg" },
  { name: "Facebook", iconSrc: "/icons/facebook-color.svg" },
  { name: "TikTok", iconSrc: "/icons/tiktok-color.svg" },
  { name: "LinkedIn", iconSrc: "/icons/linkedin-color.svg" },
  { name: "X", iconSrc: "/icons/twitter-color.svg" },
  { name: "YouTube", iconSrc: "/icons/yt-color.svg" },
  { name: "Threads", iconSrc: "/icons/threads-color.svg" },
];

const previewTabs: Platform[] = ["Instagram", "Facebook", "TikTok"];

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      className="fixed top-6 right-6 z-[100] pointer-events-none"
      style={{
        transform: visible ? "translateX(0)" : "translateX(calc(100% + 32px))",
        opacity: visible ? 1 : 0,
        transition: "transform 300ms ease, opacity 300ms ease",
      }}
    >
      <div className="rounded-lg px-5 py-3 text-sm font-semibold text-white shadow-xl" style={{ backgroundColor: "#0095b6" }}>
        {message}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NuevaPublicacionPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedClientId, setSelectedClientId] = useState<string>(clients[0]?.id ?? "");
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(["Instagram"]);
  const [content, setContent] = useState<string>("");
  const [publishMode, setPublishMode] = useState<PublishMode>("now");
  const [scheduledDate, setScheduledDate] = useState<string>("");
  const [scheduledTime, setScheduledTime] = useState<string>("");
  const [previewTab, setPreviewTab] = useState<Platform>("Instagram");
  const [imagePreview, setImagePreview] = useState<string>("");

  // Validation errors
  const [errorPlatforms, setErrorPlatforms] = useState<string>("");
  const [errorContent, setErrorContent] = useState<string>("");

  // Toast
  const [toastVisible, setToastVisible] = useState(false);

  const selectedClient = useMemo(
    () => clients.find((client) => client.id === selectedClientId) ?? clients[0],
    [selectedClientId],
  );

  function showToast() {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  }

  function togglePlatform(platform: Platform) {
    setErrorPlatforms("");
    setSelectedPlatforms((current) => {
      if (current.includes(platform)) {
        const next = current.filter((item) => item !== platform);
        return next.length > 0 ? next : current;
      }
      return [...current, platform];
    });
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function validate(): boolean {
    let valid = true;
    if (selectedPlatforms.length === 0) {
      setErrorPlatforms("Seleccioná al menos una red social.");
      valid = false;
    } else {
      setErrorPlatforms("");
    }
    if (!content.trim()) {
      setErrorContent("El contenido del post no puede estar vacío.");
      valid = false;
    } else {
      setErrorContent("");
    }
    return valid;
  }

  function handleSubmit(mode: "schedule" | "draft") {
    if (!validate()) return;
    showToast();
    // Reset form
    setContent("");
    setSelectedPlatforms(["Instagram"]);
    setImagePreview("");
    setPublishMode("now");
    setScheduledDate("");
    setScheduledTime("");
    setPreviewTab("Instagram");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <main className="min-h-screen bg-[#f5f0e8] p-6 md:p-8">
      <Toast message="Publicación programada exitosamente" visible={toastVisible} />

      <div className="mx-auto max-w-7xl space-y-8">
        <section>
          <h1 className="text-3xl font-bold tracking-[-0.03em] text-foreground">
            Nueva Publicación
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Escribí, elegí redes y previsualizá antes de publicar.
          </p>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <section className="space-y-6 rounded-xl border border-[#e8f4f7] bg-white p-6">
            {/* Client selector */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Cliente</label>
              <div className="relative">
                <select
                  value={selectedClientId}
                  onChange={(event) => setSelectedClientId(event.target.value)}
                  className="w-full appearance-none rounded-lg border border-[#e8f4f7] bg-white py-3 pl-14 pr-4 text-sm text-foreground outline-none"
                >
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>{client.name}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-light text-xs font-bold text-primary">
                    {selectedClient.initials}
                  </span>
                </div>
              </div>
            </div>

            {/* Platforms */}
            <div>
              <p className="mb-3 text-sm font-medium text-foreground">Redes sociales</p>
              <div className="flex flex-wrap gap-3">
                {platformOptions.map((platform) => {
                  const selected = selectedPlatforms.includes(platform.name);
                  return (
                    <button
                      key={platform.name}
                      type="button"
                      onClick={() => togglePlatform(platform.name)}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                        selected ? "border-primary bg-primary text-white" : "border-[#e8f4f7] bg-[#f5f0e8] text-foreground"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={platform.iconSrc}
                        alt={platform.name}
                        width={16}
                        height={16}
                        className="h-4 w-4 object-contain"
                        style={{ filter: selected ? "brightness(0) invert(1)" : "none" }}
                      />
                      {platform.name}
                    </button>
                  );
                })}
              </div>
              {errorPlatforms && (
                <p className="mt-2 text-xs font-medium" style={{ color: "#dc2626" }}>{errorPlatforms}</p>
              )}
            </div>

            {/* Content */}
            <div>
              <label htmlFor="post-content" className="mb-2 block text-sm font-medium text-foreground">
                Contenido del post
              </label>
              <textarea
                id="post-content"
                value={content}
                onChange={(event) => { setContent(event.target.value); if (event.target.value.trim()) setErrorContent(""); }}
                placeholder="Escribí el contenido de tu publicación..."
                className="min-h-[220px] w-full rounded-[10px] border border-[#e8f4f7] px-4 py-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary"
                style={{ borderColor: errorContent ? "#dc2626" : undefined }}
              />
              {errorContent && (
                <p className="mt-1 text-xs font-medium" style={{ color: "#dc2626" }}>{errorContent}</p>
              )}
              <div className="mt-2 text-right text-xs text-muted-foreground">{content.length} / 2200</div>
            </div>

            {/* Image */}
            <div>
              <p className="mb-2 text-sm font-medium text-foreground">Adjuntar imagen</p>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex min-h-[180px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-primary-light bg-[#fbfdfe] px-6 py-8 text-center"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="h-28 w-28 rounded-xl object-cover" />
                ) : (
                  <>
                    <ImagePlaceholderIcon className="h-10 w-10 text-primary" />
                    <p className="mt-4 text-sm font-medium text-foreground">
                      Arrastrá una imagen o hacé click para seleccionar
                    </p>
                  </>
                )}
              </button>
            </div>

            {/* Schedule */}
            <div>
              <p className="mb-3 text-sm font-medium text-foreground">Programación</p>
              <div className="flex rounded-full bg-[#f5f0e8] p-1 ring-1 ring-[#e8f4f7]">
                <button
                  type="button"
                  onClick={() => setPublishMode("now")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${publishMode === "now" ? "bg-primary text-white" : "text-muted-foreground"}`}
                >
                  Publicar ahora
                </button>
                <button
                  type="button"
                  onClick={() => setPublishMode("schedule")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${publishMode === "schedule" ? "bg-primary text-white" : "text-muted-foreground"}`}
                >
                  Programar
                </button>
              </div>
              {publishMode === "schedule" && (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(event) => setScheduledDate(event.target.value)}
                    className="rounded-lg border border-[#e8f4f7] bg-white px-4 py-3 text-sm text-foreground outline-none"
                  />
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(event) => setScheduledTime(event.target.value)}
                    className="rounded-lg border border-[#e8f4f7] bg-white px-4 py-3 text-sm text-foreground outline-none"
                  />
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => handleSubmit("draft")}
                className="w-full rounded-xl border border-[#e8f4f7] bg-white px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-[#f5f0e8]"
              >
                Guardar borrador
              </button>
              <button
                type="button"
                onClick={() => handleSubmit("schedule")}
                className="w-full rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:opacity-90"
              >
                Programar publicación
              </button>
            </div>
          </section>

          {/* Preview */}
          <aside className="rounded-xl border border-[#e8f4f7] bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Vista previa</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {previewTabs.filter((tab) => selectedPlatforms.includes(tab)).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setPreviewTab(tab)}
                  className={`rounded-full px-3 py-1.5 text-sm font-semibold ${previewTab === tab ? "bg-primary text-white" : "bg-[#f5f0e8] text-muted-foreground"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <div className="w-full max-w-[320px] rounded-[28px] border border-[#e8f4f7] bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary-light" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Tu cuenta</p>
                    <p className="text-xs text-muted-foreground">• Ahora</p>
                  </div>
                </div>
                <div className="mt-4 overflow-hidden rounded-[22px] bg-primary-light/70">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview del post" className="h-64 w-full object-cover" />
                  ) : (
                    <div className="flex h-64 items-center justify-center">
                      <ImagePlaceholderIcon className="h-12 w-12 text-primary" />
                    </div>
                  )}
                </div>
                <p className="mt-4 text-sm leading-7 text-foreground">
                  {content || "Escribí el contenido de tu publicación..."}
                </p>
                <div className="mt-4 flex items-center gap-4 text-muted-foreground">
                  <HeartIcon className="h-5 w-5" />
                  <CommentIcon className="h-5 w-5" />
                  <SendIcon className="h-5 w-5" />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="4.5" y="4.5" width="15" height="15" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16.4" cy="7.6" r="1" fill="currentColor" />
    </svg>
  );
}
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M13.2 20v-6h2.1l.4-2.4h-2.5V10c0-.7.2-1.2 1.3-1.2H16V6.6c-.3 0-1-.1-1.8-.1-1.8 0-3.1 1.1-3.1 3.3v1.8H9V14h2.1v6h2.1Z" fill="currentColor" />
    </svg>
  );
}
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M13.7 4c.4 1.4 1.3 2.5 2.8 3.1.7.4 1.5.6 2.3.7v2.8a6.9 6.9 0 0 1-3.8-1.1v5.2a5 5 0 1 1-5-5c.3 0 .7 0 1 .1v2.9a2.3 2.3 0 1 0 1.7 2.2V4h3Z" fill="currentColor" />
    </svg>
  );
}
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="3" fill="currentColor" />
      <circle cx="9" cy="9" r="1.3" fill="white" />
      <path d="M8 11h2v5H8zm3.2 0h1.9v.8h.1c.3-.5 1-.9 1.9-.9 2 0 2.4 1.3 2.4 3v3.1h-2v-2.7c0-.7 0-1.6-1-1.6s-1.1.8-1.1 1.5V17h-2V11Z" fill="white" />
    </svg>
  );
}
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M6 4h4.3l4 5.2L18.7 4H20l-5 5.8L20.3 20H16l-4.2-5.6L7 20H5.7l5.4-6.2L6 4Zm2.3 1.6H7.4l8.4 12.8h.9L8.3 5.6Z" fill="currentColor" />
    </svg>
  );
}
function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="3.5" y="6" width="17" height="12" rx="4" fill="currentColor" />
      <path d="m10 9.2 5 2.8-5 2.8V9.2Z" fill="white" />
    </svg>
  );
}
function ThreadsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M14.7 11c-.2-1.8-1.4-2.9-3.3-2.9-2 0-3.5 1.4-3.5 3.5 0 1.8 1.2 3.1 2.9 3.1 1.3 0 2.2-.6 2.6-1.5.4.2.8.5 1 .8.2.2.3.5.3.9 0 1.1-1.2 2.1-3.2 2.1-2.5 0-4.3-1.8-4.3-4.5 0-3 2.1-5 5-5 2.7 0 4.4 1.6 4.7 4.2 1 .3 1.7 1 1.7 2.1 0 2-1.8 3.7-4.3 3.7h-.2v-1.6h.1c1.5 0 2.6-.8 2.6-1.8 0-.6-.3-1.1-1-1.4-.2 1.6-1.4 2.7-3.1 2.7-2 0-3.4-1.5-3.4-3.5 0-2.2 1.6-3.6 3.7-3.6 2 0 3.4 1.2 3.7 3.2Z" fill="currentColor" />
    </svg>
  );
}
function ImagePlaceholderIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="9" cy="10" r="1.8" fill="currentColor" />
      <path d="m6.5 16 3.5-3.5 2.5 2.5 2-2 3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 19s-6.5-4.1-8.1-7.7C2.5 8.1 4.6 5.5 7.5 5.5c1.8 0 3.1 1 4.5 2.7 1.4-1.7 2.7-2.7 4.5-2.7 2.9 0 5 2.6 3.6 5.8C18.5 14.9 12 19 12 19Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
function CommentIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 6.5h14v10H9l-4 3v-13Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
function SendIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m20 4-8 16-2.5-6L4 11l16-7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
