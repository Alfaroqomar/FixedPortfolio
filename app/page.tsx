import Image from "next/image";
import NavBar from "./components/navbar";
import Intro from "./components/intro";
import CardImageContainer from "./components/CardImageContainer";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="bg-item flex flex-col min-h-screen bg-white font-sans dark:bg-black pt-16">
        <Intro />
                    <CardImageContainer
                Cards={[
                    {
                        CardIndex: 0,
                        ImageSrc: "/images/ProjectImages/Apoc95Menu.png",
                        LinkHref: "https://briossilva1.itch.io/9-5-apocalip",
                        UseOriginalRatio: true,
                        ImageScale: 1.8,
                    },
                    {
                        CardIndex: 1,
                        ImageSrc: "/images/ProjectImages/GamePicture.png",
                        LinkHref: "https://example.com/project2",
                        UseOriginalRatio: true,
                        ImageScale: 1.3,
                    },
                    {
                        CardIndex: 2,
                        ImageSrc: "/images/ProjectImages/Stargazer.jpg",
                        LinkHref: "https://example.com/project3",
                        UseOriginalRatio: true,
                        ImageScale: 1.5,
                    },
                ]}
            />
      </div>

      <div className="form-section flex min-h-screen items-center justify-center bg-white font-sans dark:bg-black">
        <form className="flex flex-col space-y-4 bg-gray-100 p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Contact Me</h2>
          <input
            type="text"
            placeholder="Your Name"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-2 border border-gray-300 rounded"
          />
          <textarea
            placeholder="Your Message"
            className="p-2 border border-gray-300 rounded h-32"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
