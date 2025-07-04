# Interva

I've built this project as a modern, customizable Pomodoro timer application that can help anyone stay focused and maintain a healthy work-study rhythm with its sleek interface.

Originally, this project was only going to be added to my portfolio for recruiters. However, after finishing the app, I decided to keep it open source and available for anyone to download.
Whether you're a student who has trouble focusing on their work, a recruiter who's looking for hirees or you just want to test this app out and contribute to it, this is the place for you :)

---

### Disclaimer: Due to licensing issues and macOS's hatred for non-Apple developers, the auto-updater will NOT work on macOS. You will have to manually redownload each release.

### Disclaimer: Interva is still in early development! Expect to see bugs and potential performance issues.

---

### [https://interva-chaosweasl.vercel.app/](https://interva-chaosweasl.vercel.app/)

---

## Authors

- [@chaosweasl](https://github.com/chaosweasl)

---

## 🤝 Contributing

We welcome contributions from everyone!  
If you'd like to help improve Interva, please read our [CONTRIBUTING.md](CONTRIBUTING.md) for a step-by-step guide on installing, running, and making changes to the app.

- Fork, clone, and install dependencies with `pnpm install`
- Run the app locally with `pnpm dev` (web) or `pnpm tauri dev` (desktop)
- See [`scripts/`](scripts/) for release/versioning automation
- Open a pull request when you're ready!

> **Note:** Only maintainers can run the release script and publish new releases. Contributors should open a pull request and request a release if needed.

---

# Features

- 🎯 Customizable Focus & Break Timers
- 🎨 35+ Beautiful Themes
- 🔊 Variety of Sound Effects
- ⚙️ Configurable Settings
- 🔄 Auto-start next timer
- 🎵 Volume Control
- 🖥️ Lightweight Desktop App
- 🔄 Auto Updates

---

## Download

You can download the latest version of Interva from the [GitHub Releases page](https://github.com/chaosweasl/interva/releases/latest).

### Windows

- `.msi` installer

### macOS

- `.dmg` disk image (recommended)
- alternatively, you can also download the `.app.tar.gz` installer and extract it.

### Linux

- `.AppImage` executable

---

## Installation via Winget

For Windows users, you can install Interva using [winget](https://learn.microsoft.com/en-us/windows/package-manager/winget/):

```bash
winget install chaosweasl.interva
```

---

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

---

## FAQ

---

### Is it a virus?

No. The app is fully open-source. You can check the code yourself if you don't take my word for it.

---

### Why does my computer flag the app as a virus then?

I need a code signing certificate for Windows and macOS, which costs money. :(

---

### My browser flags the `.msi` file as a virus and doesn't let me download it, what should I do?

Try disabling some security settings in your browser (e.g., Safe Browsing in Chrome). If that doesn't work, you can also try turning off real-time protection in your antivirus temporarily.

---

### Windows Defender warns me about the app being a potential threat and won't let me run it. How do I bypass this?

Click on "More info" and then on "Run anyway."

---

### macOS says that the app is corrupted and can't be opened. How can I get around this?

Run the following command to install the app:

```bash
sudo xattr -rd com.apple.quarantine "/Users/(your username)/Downloads/interva_1.2.0_aarch64.dmg"
```

Replace `(your username)` with your actual macOS username.

---

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

---

### Will it be available on Android and iOS?

Not in the near future, and unlikely if the app ends up in the Github repository graveyard.

---

### Will it be available on app stores?

No. It costs money. I don't have dabloons to spare. (although it might happen if you donate on my Ko-Fi :D)

---

## Support

For support, you can find my email on [my Github profile](https://github.com/chaosweasl).

---

## Feedback

You can leave your feedback on [this Google Form](https://docs.google.com/forms/d/e/1FAIpQLSdaQUubBlTNOk8SC8pRLVXGEYHR99KCq-QJsast49FR15m26g/viewform)

---

## ☕ Supporting my work

Projects like these take a lot of time to make, and I don't make anything from them.
I have a big dream of creating my own startup to help students study more efficiently - your contribution would be heart-melting to me. ❤️

[Please support me on Ko-Fi!](https://ko-fi.com/chaosweasl)

---

## Tech Stack

### React, React Router, Tailwind CSS, DaisyUI, Lucide React, Vite, TypeScript, Tauri

### Vercel, Next.js, ShadCN (for the landing page)

---

## License

[MIT](https://choosealicense.com/licenses/mit/)
