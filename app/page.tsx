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
            <h2>Have a project<br /><em>in mind?</em></h2>
            <p className="contact-lede">I’m always interested in thoughtful products, playful experiments, and teams who care about the details.</p>
            <a className="contact-link" href="mailto:alfaroqomaralaa@gmail.com">alfaroqomaralaa@gmail.com <span>↗</span></a>
            <div className="contact-meta"><span>Based in the US</span><span>Available for select work</span></div>
          </div>
        </section>
      </main>
    </div>
  );
}
