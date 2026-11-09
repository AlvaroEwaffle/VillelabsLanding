import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import ConversionClickTracker from "@/components/ConversionClickTracker";
import Rastreo from "@/components/productos/Rastreo";
import PixelMeta from "@/components/productos/PixelMeta";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://villelab.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Villelab | Agentes de IA para el trabajo de tu equipo",
    template: "%s | Villelab",
  },
  description:
    "Instalamos y operamos agentes de IA que hacen el trabajo repetitivo de tu equipo: correo, propuestas, seguimientos y reportes. Con frenos: lo que compromete plata, alcance o fechas pasa por una persona.",
  // 9-nov-2026: palabras del comprador pyme (antes: keywords en inglés de la época de agencia web).
  keywords: [
    "cómo conseguir clientes para mi pyme",
    "clientes nuevos sin envíos masivos",
    "CRM en Google Sheets",
    "primer CRM para pymes",
    "ordenar ventas por WhatsApp",
    "asistente de WhatsApp para pymes",
    "chatbot de WhatsApp para negocios",
    "seguimiento de clientes",
    "agentes de IA para pymes",
    "automatizar atención de clientes",
    "ERP simple en Google Sheets",
    "Álvaro Villena",
    "Villelab",
  ],
  authors: [{ name: "Alvaro Villena", url: siteUrl }],
  creator: "Alvaro Villena",
  publisher: "Villelab",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: siteUrl,
    siteName: "Villelab",
    title: "Villelab | Agentes de IA para el trabajo de tu equipo",
    description:
      "Instalamos y operamos agentes de IA que hacen el trabajo repetitivo de tu equipo: correo, propuestas, seguimientos y reportes. Con frenos: lo que compromete plata, alcance o fechas pasa por una persona.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Villelab - Agentes de IA para el trabajo de tu equipo",
      },
      { url: "/icono.png", width: 512, height: 512, alt: "Villelab" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Villelab | Agentes de IA para el trabajo de tu equipo",
    description:
      "Instalamos y operamos agentes de IA que hacen el trabajo repetitivo de tu equipo: correo, propuestas, seguimientos y reportes. Con frenos: lo que compromete plata, alcance o fechas pasa por una persona.",
    creator: "@alvarovillena",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/icono.png", type: "image/png", sizes: "any" },
      { url: "/icono.png", type: "image/png", sizes: "32x32" },
      { url: "/icono.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/icono.png", type: "image/png", sizes: "180x180" }],
    shortcut: "/icono.png",
  },
  other: {
    "msapplication-TileColor": "#0f172a",
    "msapplication-TileImage": "/icono.png",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Villelab",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Language detection — runs before React hydration to minimize FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=new URLSearchParams(window.location.search);var q=p.get('lang');if(q==='es'||q==='en'){localStorage.setItem('villelabs_lang',q);document.documentElement.lang=q;return}var l=localStorage.getItem('villelabs_lang');document.documentElement.lang=(l==='es'||l==='en')?l:'es'}catch(e){document.documentElement.lang='es'}})();`,
          }}
        />
        {/* Capture Google Ads click id (gclid) for conversion attribution — 90 day window */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=new URLSearchParams(window.location.search);var maxAge=7776000;function s(k,v){if(!v)return;localStorage.setItem(k,v);localStorage.setItem(k+'_ts',String(Date.now()));document.cookie=k+'='+encodeURIComponent(v)+'; max-age='+maxAge+'; path=/; SameSite=Lax'}s('gclid',p.get('gclid'));s('gbraid',p.get('gbraid'));s('wbraid',p.get('wbraid'))}catch(e){}})();`,
          }}
        />
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            // Solo en villelab.com: localhost y previews no deben ensuciar GA4 (8-nov-2026, las pruebas locales aparecían como visitas).
            __html: `if(/(^|\\.)villelab\\.com$/.test(location.hostname))(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M7MHWVJ8');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M7MHWVJ8"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <ConversionClickTracker />
        <Rastreo />
        <PixelMeta />
        {children}
      </body>
    </html>
  );
}
