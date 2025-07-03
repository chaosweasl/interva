# Contributing to Interva

Thank you for your interest in contributing to Interva! 🎉  
Your help is welcome, whether you want to fix bugs, add features, improve documentation, or just try things out.

## Getting Started

### 1. Fork & Clone

- Fork the repository: [https://github.com/chaosweasl/interva](https://github.com/chaosweasl/interva)
- Clone your fork:
  ```bash
  git clone https://github.com/YOUR_USERNAME/interva.git
  cd interva
  ```

### 2. Install Dependencies

- Make sure you have [Node.js](https://nodejs.org/), [pnpm](https://pnpm.io/), and (optionally) [Rust](https://www.rust-lang.org/tools/install) for Tauri desktop builds.
- Install dependencies:
  ```bash
  pnpm install
  ```

### 3. Run the App (Web)

- Start the development server:
  ```bash
  pnpm dev
  ```
- Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Run the Desktop App (Tauri)

- Make sure you have Rust and Tauri prerequisites installed ([Tauri setup guide](https://tauri.app/v1/guides/getting-started/prerequisites/)).
- Start the Tauri app:
  ```bash
  pnpm tauri dev
  ```

### 5. Make Changes

- Edit files in `src/` for the frontend.
- Edit files in `src-tauri/` for desktop-specific logic.
- Use the [`scripts/`](scripts/) folder for release/versioning automation (see `release.js` and `set-version.js`).

### 6. Test Your Changes

- Make sure the app runs and your changes work as expected.
- Add or update tests if needed.

### 7. Commit & Push

- Create a new branch:
  ```bash
  git checkout -b your-feature-name
  ```
- Commit your changes:
  ```bash
  git add .
  git commit -m "Describe your changes"
  git push origin your-feature-name
  ```

### 8. Open a Pull Request

- Go to your fork on GitHub and click "Compare & pull request".
- Fill in the PR template and submit.

---

## Scripts

- See the [`scripts/`](scripts/) folder for release automation and version management.
- To create a new release, use:
  ```bash
  node scripts/release.js <new-version>
  ```

---

## Guidelines

- Follow the existing code style (Prettier, ESLint).
- Write clear, descriptive commit messages.
- Be respectful and constructive in discussions.

If you have questions, open an [issue](https://github.com/chaosweasl/interva/issues) or start a discussion.

Happy coding! 🚀
