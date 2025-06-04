import { openUrl } from "@tauri-apps/plugin-opener";

export default function about() {
  function handleOpenForm() {
    openUrl("https://forms.gle/Tv8XvLxs8f98YtJ47");
  }

  function handleSupport() {
    openUrl("https://ko-fi.com/chaosweasl");
  }

  return (
    <div className="flex flex-col justify-between items-center min-h-screen bg-base-100">
      <div className="flex flex-col items-center w-full gap-10 h-full p-5 pt-16">
        <h1 className="text-2xl">Ahoy there!!</h1>
        <p className="-mt-5">
          I've built this simple pomodoro app with a few extra features to
          ensure that you can customize it the way you want to.
        </p>
        <p>
          Originally, this project was built as a project to add to my
          portfolio, but I've since decided to keep it public and free of use to
          anyone who wants to use it.
        </p>
        <p>
          Your feedback is well-appreciated, so please feel free to give me
          honest feedback on this form. Criticism is welcome as well, please let
          me know what you'd love to see in this project, I'd be more than happy
          to hear your suggestions!
        </p>
        <button className="btn btn-ghost" onClick={handleOpenForm}>
          Leave your feedback here!
        </button>
        <p>
          Projects like these take a lot of time to make, and I don't make
          anything from them. I have a big dream of starting my own startup to
          help students study more efficiently - your contribution would be
          heart-melting to me. ❤️
        </p>
        <button className="btn btn-ghost" onClick={handleSupport}>
          Support me on Ko-Fi
        </button>
      </div>
    </div>
  );
}
