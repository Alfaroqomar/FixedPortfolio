import NavBar from "./components/navbar";
import Intro from "./components/intro";
import ProjectsGrid from "./components/ProjectsGrid";

export default function Home() {
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
            <a className="contact-link" href="mailto:alfaroqomaralaa@gmail.com">alfaroqomaralaa@gmail.com <span>↗</span></a>
            <div className="contact-meta"><span>Arizona, US</span><span>Available for work</span></div>
          </div>
        </section>
      </main>
    </div>
  );
}
