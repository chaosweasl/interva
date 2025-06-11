
# Interva

I've built this project as a modern, customizable Pomodoro timer application that can help anyone stay focused and maintain a healthy work-study rhythm with its sleek interface.

Originally, this project was only going to be added to my portfolio for recruiters. However, after finishing the app, I decided to keep it open source and available for anyone to download.
Whether you're a student who has trouble focusing on their work, a recruiter who's looking for hirees or you just want to test this app out and contribute to it, this is the place for you :)

# Features

- 🎯 Customizable Focus & Break Timers
- 🎨 35+ Beautiful Themes
- 🔊 Variety of Sound Effects
- ⚙️ Configurable Settings
- 🔄 Auto-start next timer
- 🎵 Volume Control
- 🖥️ Lightweight Desktop App
- 🔄 Auto Updates

# Download Link

[here](https://github.com/chaosweasl/interva/releases/latest)
                        
## Authors

- [@chaosweasl](https://github.com/chaosweasl)


## FAQ (for users)

### What's the point of this application?

The Pomodoro Technique is a time management method that uses a timer to break work into focused intervals (typically 25 minutes) separated by short breaks. Interva takes this concept and adds:

## Cozy design:
- Distraction-Free Interface: A clean, minimal design that stays out of your way
- Customization: Adjust focus time, break durations, and number of rounds to match your workflow
- Visual Comfort: Choose from 35+ beautiful themes to match your setup or mood
- Audio Cues: Gentle sound effects to signal transitions without being disruptive

## Smart Features:
- Auto-start next sessions (configurable)
- Optional ticking sound for ambient focus
- Long break rewards after completing your rounds
- Volume control for all sound effects

### How do I download the app?

You go to this [link](https://github.com/chaosweasl/interva/releases/latest) and download the .msi **(NOT the .msi.sig!)** file to install the application.

As of now, this app is **only available on Windows**, hence why only a .msi download file is available.

### When will it be available for Linux and MacOS too?

i don't know, but it will be **in the near future** (possible for linux but I won't do it right now, and for macOS I'd need a developer license)

### What about Android and iOS?

**NOT in the near future** (it's possible but requires money for developer licensing so I can publish it on the app stores)

## Screenshots

[App Screenshots]



## Support

For support, you can find my email on [my Github profile](https://github.com/chaosweasl).

## Feedback

You can leave your feedback on [this Google Form](https://docs.google.com/forms/d/e/1FAIpQLSdaQUubBlTNOk8SC8pRLVXGEYHR99KCq-QJsast49FR15m26g/viewform)

## License

[MIT](https://choosealicense.com/licenses/mit/)


---

# For Recruiters

## Lessons Learned

One of the biggest challenges I faced while building this app was setting up workflows to streamline the deployment process. I wanted to avoid manually adding assets for each new build, so implementing GitHub Actions became essential—especially to ensure the Tauri auto-updater worked properly.

With no prior experience in CI/CD, I spent around 5–6 hours learning and configuring these workflows. While they’re not perfect, I’m proud of getting them up and running. This experience gave me a solid starting point and much more confidence in creating automation pipelines for future projects. I’ll definitely be applying these skills again.

Another challenge I faced was configuring the app to support specific OS-level behaviors, such as keeping the window always on top and building a custom draggable navbar instead of using the default title bar.

I also considered adding support for Linux and macOS, but those platforms require additional setup that I haven't tackled yet. In the case of macOS, I'd need a developer certificate from Apple and access to a macOS environment—which typically means owning a Mac or renting a macOS cloud instance, both of which aren't feasible for me right now.

Overall, this project helped me push past a major fear: building and deploying a real-world app. Shipping something functional and available to users gave me a huge confidence boost.
## Tech Stack

### React, React Router, Tailwind CSS, DaisyUI, Lucide React, Vite, TypeScript, Tauri



