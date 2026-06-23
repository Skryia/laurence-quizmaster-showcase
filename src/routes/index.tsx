import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Laurence Quizmaster — Professional Quiz Host" },
      { name: "description", content: "Unforgettable quiz nights for pubs, parties, weddings and corporate events." },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/site/index.html");
  }, []);
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#fbf7ef", fontFamily: "system-ui" }}>
      <p>Loading demo site… <a href="/site/index.html">Open directly</a></p>
    </div>
  );
}
