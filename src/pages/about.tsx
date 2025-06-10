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
      <div className="flex flex-col items-center w-full max-w-2xl gap-8 h-full p-6 pt-8 pb-10 bg-base-200 rounded-xl shadow-lg mt-10 mb-10">
        <h1 className="text-3xl font-bold text-primary">Ahoy there!!!</h1>
        <h2 className="font-semibold text-secondary -mt-6">
          Thank you so much for using my app!
        </h2>
        <p className="-mt-3 text-base-content/80">
          I've built this simple pomodoro app with a few extra features to
          ensure that you can customize it the way you want to.
        </p>
        <p className="text-base-content/80">
          Originally, this project was built as a project to add to my
          portfolio, but I've since decided to keep it public and free of use to
          anyone who wants to use it.
        </p>
        <p className="text-base-content/80 text-center max-w-xl">
          Projects like these take a lot of time to make, and I don't make
          anything from them. I have a big dream of starting my own startup to
          help students study more efficiently - your contribution would be
          heart-melting to me. ❤️
        </p>
        <button
          className="btn btn-accent btn-wide shadow-md"
          onClick={handleSupport}
        >
          Support me on Ko-Fi
        </button>
        <p className="text-base-content/80">
          Your feedback is well-appreciated, so please feel free to give me
          honest feedback on this form. Criticism is welcome as well, please let
          me know what you'd love to see in this project, I'd be more than happy
          to hear your suggestions!
        </p>
        <button
          className="btn btn-primary btn-wide shadow-md"
          onClick={handleOpenForm}
        >
          Leave your feedback here!
        </button>
        <button
          className="btn btn-secondary btn-wide shadow-md"
          onClick={handleGithub}
        >
          Check out the project's repository here!
        </button>
      </div>
    </div>
  );
}
