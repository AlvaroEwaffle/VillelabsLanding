import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://villelabs.cl";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Villelabs | Revenue Systems, Not Just Websites",
    template: "%s | Villelabs",
  },
  description:
    "We build digital systems that convert visitors into clients. Landing pages, strategic websites, and custom platforms for businesses ready to grow.",
  keywords: [
    "web design agency",
    "revenue systems",
    "landing pages",
    "custom platforms",
    "conversion optimization",
    "strategic websites",
    "sales funnels",
    "process automation",
    "AI chatbots",
    "web development Chile",
    "agencia chatbot IA Chile",
    "automatizacion de procesos empresa Chile",
    "desarrollo plataforma SaaS Santiago",
    "agencia diseno web Chile",
    "desarrollo MVP Chile",
    "Villelabs",
    "Alvaro Villena",
    "digital strategy",
    "business growth",
    "Agile PM LATAM",
    "AI consulting Chile",
    "product management LATAM",
    "villelab",
  ],
  authors: [{ name: "Alvaro Villena", url: siteUrl }],
  creator: "Alvaro Villena",
  publisher: "Villelabs",
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
    siteName: "Villelabs",
    title: "Villelabs | Revenue Systems, Not Just Websites",
    description:
      "We build digital systems that convert visitors into clients. Landing pages, strategic websites, and custom platforms for businesses ready to grow.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Villelabs - Revenue Systems, Not Just Websites",
      },
      { url: "/icono.png", width: 512, height: 512, alt: "Villelabs" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Villelabs | Revenue Systems, Not Just Websites",
    description:
      "We build digital systems that convert visitors into clients. Custom platforms, strategic websites, and landing pages.",
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
    "apple-mobile-web-app-title": "Villelabs",
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
            __html: `(function(){try{var l=localStorage.getItem('villelabs_lang');if(l==='es'||l==='en'){document.documentElement.lang=l}else if(navigator.language&&navigator.language.toLowerCase().startsWith('en')){document.documentElement.lang='en'}}catch(e){}})();`,
          }}
        />
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
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
        {children}
      </body>
    </html>
  );
}
