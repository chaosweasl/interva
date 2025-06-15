# Interva

I've built this project as a modern, customizable Pomodoro timer application that can help anyone stay focused and maintain a healthy work-study rhythm with its sleek interface.

Originally, this project was only going to be added to my portfolio for recruiters. However, after finishing the app, I decided to keep it open source and available for anyone to download.
Whether you're a student who has trouble focusing on their work, a recruiter who's looking for hirees or you just want to test this app out and contribute to it, this is the place for you :)

[https://interva-chaosweasl.vercel.app/](https://interva-chaosweasl.vercel.app/)

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

You can download the app [here](https://github.com/chaosweasl/interva/releases/latest). Make sure you download the .msi file and not the .msi.sig one.

## Authors

- [@chaosweasl](https://github.com/chaosweasl)

## FAQ (for users)

### Is it a virus?

No. The app is fully open-source. You can check the code yourself if you don't take my word for it. 

### Why does my computer flag the app as a virus then? 

To let Windows know it's trustworthy I need a code signing certificate which costs money :( 

### My browser flags the .msi file as a virus and doesn't let me download it, what should I do to get around it? 

If you have this problem, try to disable some security settings for your browser. (Safe Browsing if you're using chrome) 

Additionally, if that doesn't work, you can also try turning off real-time protection from the Windows Antivirus.

### Windows defender tries to warn me about the app being a potential threat and won't let me run it. How do I go around this?

Click on "more info" and then on "run anyway"

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

Not for macOS, since I'd need a developer license, but it will be **in the near future** for Linux (Debian).

### What about Android and iOS?

Not in the near future.

### Will it be available on app stores?

No. It costs money. I don't have dabloons to spare. (although it might happen if you donate on my Ko-Fi :D)

## Screenshots

<table>
<tr>
<td align="center">
    <img src="public/assets/intervalogo.svg" alt="Interva Logo" width="300"/>
</td>
<td align="center">
    <img src="public/assets/interva.png" alt="Interva Main Interface" style="transform: scale(0.5);" />
</td>
</tr>
<tr>
<td align="center">
    <img src="public/assets/intervathemes.png" alt="Interva Themes" style="transform: scale(0.5);" />
</td>
<td align="center">
    <img src="public/assets/intervasettings.png" alt="Interva Settings" style="transform: scale(0.5);" />
</td>
</tr>
</table>

## Support

For support, you can find my email on [my Github profile](https://github.com/chaosweasl).

## Feedback

You can leave your feedback on [this Google Form](https://docs.google.com/forms/d/e/1FAIpQLSdaQUubBlTNOk8SC8pRLVXGEYHR99KCq-QJsast49FR15m26g/viewform)

## ☕ Supporting my work

Projects like these take a lot of time to make, and I don't make anything from them. 
I have a big dream of creating my own startup to help students study more efficiently - your contribution would be heart-melting to me. ❤️

[Please support me on Ko-Fi!](https://ko-fi.com/chaosweasl)

---

# For Recruiters

## Lessons Learned

One of the biggest challenges I faced while building this app was setting up workflows to streamline the deployment process. I wanted to avoid manually adding assets for each new build, so implementing GitHub Actions became essential—especially to ensure the Tauri auto-updater worked properly.

With no prior experience in CI/CD, I spent around 5–6 hours learning and configuring these workflows. While they’re not perfect, I’m proud of getting them up and running. This experience gave me a solid starting point and much more confidence in creating automation pipelines for future projects. I’ll definitely be applying these skills again.

Another challenge I faced was configuring the app to support specific OS-level behaviors, such as keeping the window always on top and building a custom draggable navbar instead of using the default title bar.

I also considered adding support for Linux and macOS, but those platforms require additional setup that I haven't tackled yet. In the case of macOS, I'd need a developer certificate from Apple and access to a macOS environment—which typically means owning a Mac or renting a macOS cloud instance, both of which aren't feasible for me right now.

I also managed to make a landing page for my app. I built it with Next.js and Vercel, and you can visit it [here](https://interva-chaosweasl.vercel.app/). Developing the landing page was surprisingly a lot easier than I expected initially. I also learned how to add stuff like robots.txt, sitemap.xml and metadata to fully optimise SEO.

Overall, this project helped me push past a major fear: building and deploying a real-world app. Shipping something functional and available to users gave me a huge confidence boost.

## Tech Stack

### React, React Router, Tailwind CSS, DaisyUI, Lucide React, Vite, TypeScript, Tauri

## License

[MIT](https://choosealicense.com/licenses/mit/)
