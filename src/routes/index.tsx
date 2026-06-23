import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import htmlRaw from "../../public/site/index.html?raw";
import cssRaw from "../../public/site/css/style.css?raw";
import jsRaw from "../../public/site/js/main.js?raw";
import galleryData from "../assets/quiz/gallery.json";
import heroImg from "../assets/quiz/hero.jpg";
import aboutImg from "../assets/quiz/about.jpg";
import g1 from "../assets/quiz/gallery-1.jpg";
import g2 from "../assets/quiz/gallery-2.jpg";
import g3 from "../assets/quiz/gallery-3.jpg";
import g4 from "../assets/quiz/gallery-4.jpg";
import g5 from "../assets/quiz/gallery-5.jpg";
import g6 from "../assets/quiz/gallery-6.jpg";

const imageMap: Record<string, string> = {
  "images/hero.jpg": heroImg,
  "images/about.jpg": aboutImg,
  "images/gallery-1.jpg": g1,
  "images/gallery-2.jpg": g2,
  "images/gallery-3.jpg": g3,
  "images/gallery-4.jpg": g4,
  "images/gallery-5.jpg": g5,
  "images/gallery-6.jpg": g6,
};

function rewriteAssets(input: string): string {
  let out = input;
  for (const [k, v] of Object.entries(imageMap)) {
    out = out.split(k).join(v);
  }
  return out;
}

const bodyMatch = htmlRaw.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
const bodyInner = (bodyMatch ? bodyMatch[1] : "")
  .replace(/<script[\s\S]*?<\/script>/gi, "");
const bodyHtml = rewriteAssets(bodyInner);

const galleryDataResolved = (galleryData as Array<{ src: string; category: string; alt?: string }>).map(
  (it) => ({ ...it, src: imageMap[it.src] ?? it.src }),
);

const patchedJs = rewriteAssets(jsRaw).replace(
  /\$\.getJSON\('data\/gallery\.json'\)\.done\(function\(items\)\{([\s\S]*?)\}\);/,
  `(function(items){$1})(window.__GALLERY__);`,
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Laurence Quizmaster — Professional Quiz Host" },
      { name: "description", content: "Unforgettable quiz nights for pubs, parties, weddings and corporate events." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:wght@500;700;900&family=Inter:wght@400;500;600;700&display=swap" },
      { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" },
    ],
  }),
  component: Index,
});

function Index() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    (window as unknown as { __GALLERY__: unknown }).__GALLERY__ = galleryDataResolved;
    const loadJq = () =>
      new Promise<void>((resolve) => {
        if ((window as unknown as { jQuery?: unknown }).jQuery) return resolve();
        const s = document.createElement("script");
        s.src = "https://code.jquery.com/jquery-3.7.1.min.js";
        s.onload = () => resolve();
        document.body.appendChild(s);
      });
    loadJq().then(() => {
      const s = document.createElement("script");
      s.textContent = patchedJs;
      document.body.appendChild(s);
    });
  }, []);
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssRaw }} />
      <div ref={ref} dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  );
}
