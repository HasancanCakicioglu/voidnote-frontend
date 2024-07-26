"use server"
import Image from "next/image";
import AnimatedNumbers from "@/components/animatedNumbers";
import { useTranslations } from "next-intl";
import { Link } from "@/navigations";

const Home = () => {
  const t = useTranslations("Home");

  return (
    <div className="mt-10 md:mt-0 flex flex-col grow transition-colors duration-500 min-w-full">
      <main className="container mx-auto my-auto">
        <section className="flex flex-col md:flex-row items-center mb-16">
          <div className="md:w-1/2 px-4">
            <h1 className="text-6xl lg:text-8xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-purple-800 text-transparent bg-clip-text">
              {t("welcome")}
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
              {t.rich("description", {
                link: (chunks) => (
                  <span className="text-purple-600 dark:text-purple-400 font-bold">
                    <Link href="/features">{chunks}</Link>
                  </span>
                ),
              })}
            </p>
            <br />
            <Link href="/register">
              <div className="inline-block bg-gradient-to-r from-purple-300 to-purple-800 hover:from-purple-100 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                {t("getstarted")}
              </div>
            </Link>
          </div>
          <div className="md:w-1/2 px-4">
            <Image
              src="/home_comp.png"
              alt="Home"
              width={500}
              height={500}
              className="w-full rounded-lg"
            />
          </div>
        </section>

        <section className="mt-16 text-center">
          <AnimatedNumbers />
        </section>
      </main>
    </div>
  );
};

export default Home;
