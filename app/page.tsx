"use client";

import { useState, type MouseEvent } from "react";
import { useEffect } from "react";
import packageJson from "../package.json";
import NavBar from "./components/navbar";
import Intro from "./components/intro";
import ProjectsGrid from "./components/ProjectsGrid";

const emailAddress = "alfaroqomaralaa@gmail.com";

export default function Home() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    console.debug(`[build ${packageJson.version}]`);
  }, []);

  async function copyEmail(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(emailAddress);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = emailAddress;
        textArea.setAttribute("readonly", "");
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();

        const copiedWithFallback = document.execCommand("copy");
        textArea.remove();

        if (!copiedWithFallback) {
          throw new Error("Clipboard access is unavailable.");
        }
      }

      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch (error) {
      console.error("Failed to copy email address to clipboard.", error);
      window.location.href = event.currentTarget.href;
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
