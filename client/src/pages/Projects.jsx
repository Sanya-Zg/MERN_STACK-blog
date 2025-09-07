import { Link } from "react-router-dom"

const Projects = () => {
  return (
    <div className="min-h-screen max-w-4xl mx-auto flex justify-center gap-8 items-center flex-col p-6">
      <h1 className="text-4xl font-bold text-center">Explore my Projects</h1>
      <p className="text-lg text-gray-600 text-center max-w-3xl dark:text-gray-400">
        Dive into a collection of fun and engaging projects designed to help you
        learn and master HTML, CSS, and JavaScript. Start building today and
        take your development journey to the next level!
      </p>
      <div className="w-full flex flex-col gap-6">
        <section className="bg-gray-100 dark:bg-neutral-700 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold dark:text-cyan-300">
            Why Build Projects?
          </h2>
          <p className="text-gray-700 dark:text-cyan-100 mt-2">
            Building projects is one of the best ways to learn programming. It
            allows you to apply theoretical knowledge in a practical way, solve
            real-world problems, and create a portfolio that showcases your
            skills to potential employers or clients.
          </p>
          <div>
            <Link to="https://sanya-zg.github.io/my-portfolio/" target="_blank" rel="noreferrer noopener" className="mt-4 border-2 border-transparent border-b-cyan-800 inline-block bg-gradient-to-b from-teal-500 to-cyan-800 text-white px-4 py-2 rounded hover:border-teal-500 transition duration-300">
              {'->'} My Projects
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
export default Projects