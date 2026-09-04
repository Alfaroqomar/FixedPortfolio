
import Image from "next/image";
export default function Intro() {

    return (
        <section id="home" className="intro">
            <div className="intro-topline"><span>Scroll to explore</span></div>
            <div className="intro-content">
                <div className="intro-heading">
                    <p className="eyebrow">Software engineer · Game developer</p>
                    <h1>Bringing ideas<br /><em>to life</em></h1>
                </div>
                <div className="intro-aside">
                    <Image
                    src="/images/realheadshot.jpg"
                    alt="Portrait of Me"
                    width={360}
                    height={360}
                    className="intro-photo"
                    />
                    <p>Passionate about building scalable web applications and exploring new technologies. Experienced in React, Node.js, and cloud services.</p>
                </div>
            </div>
        </section>
    );
}