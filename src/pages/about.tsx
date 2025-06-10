import { openUrl } from "@tauri-apps/plugin-opener";

export default function about() {
  function handleOpenForm() {
    openUrl("https://forms.gle/Tv8XvLxs8f98YtJ47");
  }

  function handleSupport() {
    openUrl("https://ko-fi.com/chaosweasl");
  }

  function handleGithub() {
    openUrl("https://github.com/chaosweasl/interva");
  }
  return (
    <div className="flex flex-col items-center min-h-screen bg-base-100">
      <div className="flex flex-col items-center w-full max-w-2xl gap-6 p-8 bg-base-200 rounded-xl shadow-lg mt-10 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary opacity-50" />
        <div className="absolute top-2 left-0 w-full h-1 bg-gradient-to-r from-secondary to-accent opacity-30" />

        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">Ahoy there! 👋</h1>
          <h2 className="text-xl font-semibold text-secondary animate-pulse">
            Thank you so much for using my app!
          </h2>
        </div>

        <div className="space-y-4 text-center">
          <p className="text-base-content/80 leading-relaxed">
            I've built this simple pomodoro app with a few extra features to
            ensure that you can customize it the way you want to.
          </p>
          <p className="text-base-content/80 leading-relaxed">
            Originally, this project was built as a project to add to my
            portfolio, but I've since decided to keep it public and free of use
            to anyone who wants to use it.
          </p>
        </div>

        <div className="divider before:bg-primary/20 after:bg-primary/20">
          Support the Project
        </div>

        <div className="bg-base-300 p-6 rounded-lg shadow-inner w-full">
          <p className="text-base-content/80 text-center leading-relaxed">
            Projects like these take a lot of time to make, and I don't make
            anything from them. I have a big dream of creating my own startup to
            help students study more efficiently - your contribution would be
            heart-melting to me. ❤️
          </p>
          <div className="flex justify-center mt-4">
            <button
              className="btn btn-accent btn-wide shadow-md hover:scale-105 transition-transform"
              onClick={handleSupport}
            >
              <span className="mr-2">☕</span>
              Support me on Ko-Fi
            </button>
          </div>
        </div>

        <div className="divider before:bg-primary/20 after:bg-primary/20">
          Feedback
        </div>

        <div className="space-y-6 w-full">
          <p className="text-base-content/80 text-center leading-relaxed">
            Your feedback is well-appreciated, so please feel free to give me
            honest feedback on this form. Criticism is welcome as well, please
            let me know what you'd love to see in this project, I'd be more than
            happy to hear your suggestions!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
            <button
              className="btn btn-primary shadow-md hover:scale-105 transition-transform flex-1 max-w-xs"
              onClick={handleOpenForm}
            >
              <span className="mr-2">📝</span>
              Leave Feedback
            </button>
            <button
              className="btn btn-secondary shadow-md hover:scale-105 transition-transform flex-1 max-w-xs"
              onClick={handleGithub}
            >
              <span className="mr-2">⭐</span>
              GitHub Repository
            </button>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-accent to-primary opacity-50" />
        <div className="absolute bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary opacity-30" />
      </div>
    </div>
  );
}
