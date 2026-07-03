
import Image from "next/image";
import CardImageContainer from "./CardImageContainer";


export default function Intro() {

    return (
        <section className="intro flex w-full flex-row items-center justify-center gap-6 p-8 pb-20 rounded">
            <div className="top-row flex flex-col items-center gap-3">
                                <Image
                    src="/images/realheadshot.jpg"
                    alt="Headshot"
                    width={200}
                    height={200}
                    className="w-48 h-48 rounded-full opacity-100 object-cover animate-[fadeIn_1s_ease-in-out]"
                />
                <p className="intro-text text-lg text-gray-600 dark:text-white text-2xl font-semibold">
                    Software Engineer · Game Developer
                </p>

            </div>

            {/* Inter, "Segoe UI", sans-serif */}
            <p className="intro-text text-center text-gray-600 dark:text-gray-400 text-lg max-w-sm">
                Passionate about building scalable web applications and exploring new technologies. Experienced in React, Node.js, and cloud services.
            </p>
        </section>
    );
}