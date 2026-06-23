import { createFileRoute } from "@tanstack/react-router";

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
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <h1>Static website deliverable</h1>
      <p>The plain GitHub Pages website is in the <code>website/</code> folder.</p>
      <p>Preview it at <a href="/website/index.html">/website/index.html</a>.</p>
    </main>
  );
}
