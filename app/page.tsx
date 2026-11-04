"use client";

import { useState, type MouseEvent } from "react";
import NavBar from "./components/navbar";
import Intro from "./components/intro";
import ProjectsGrid from "./components/ProjectsGrid";

const emailAddress = "alfaroqomaralaa@gmail.com";

export default function Home() {
  const [copied, setCopied] = useState(false);

  async function copyEmail(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy email address to clipboard.", error);
    }
  }

  return (
    <div className="site-shell">
      <NavBar />
      <main>
        <Intro />
        <ProjectsGrid />
        <section id="contact" className="contact-section">
          <div className="contact-copy">
            <p className="eyebrow">Contact</p>
            <h2>Open to work.</h2>
            <p className="contact-lede">Open to positions or contract work, local or global. Interested? shoot me an email!</p>
            <a className={`contact-link${copied ? " copied" : ""}`} href={`mailto:${emailAddress}`} onClick={copyEmail}>
              {emailAddress}
              <span className="contact-icon" aria-hidden="true">
                <i className="fa-regular fa-copy" />
                <i className="fa-solid fa-hand-pointer" />
                <i className="fa-solid fa-check" />
              </span>
            </a>
            <div className="contact-meta"><span>Arizona, US</span><span>Available for work</span></div>
          </div>
        </section>
      </main>
    </div>
  );
}
