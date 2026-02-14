import Navbar from "components/navbar";
import type { Route } from "./+types/home";
import { ArrowRight } from "lucide-react";
import { Button } from "components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="home">
      <Navbar />

      <section className="hero">
        <div className="announce">
          <div className="dot">
            <div className="pulse"></div>
          </div>

          <p>Introducing Roomify 2.0</p>
        </div>

        <h1>Build beautiful spaces at the speed of thought with Roomify</h1>
        <p className="subtitle">
          Roomify is an AI-first design environment that helps you visualize,
          render and ship architectural projects faster than ever.
        </p>

        <div className="actions">
          <a href="#upload" className="cta">
            Start Building <ArrowRight className="icon" />
          </a>

          <Button variant="outline" size="lg" className="demo">
            Watch Demo
          </Button>
        </div>
      </section>
    </div>
  );
}
