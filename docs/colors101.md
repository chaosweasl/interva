# daisyUI Color Usage Guide

A practical guide on how to use daisyUI’s color palette effectively in your UI.

---

## 1. Primary & Primary-content

- **Primary:** Your brand’s main color, for the most important UI elements.
- **Primary-content:** Text or icons displayed _on_ a primary-colored background.

**Use for:**

- Buttons (main actions like "Submit", "Save")
- Active states (e.g., selected tabs)
- Highlights or key interactive elements

```html
<button class="bg-primary text-primary-content">Save</button>
```

---

## 2. Secondary & Secondary-content

- **Secondary:** A complementary secondary brand color.
- **Secondary-content:** Text/icons on secondary backgrounds.

**Use for:**

- Secondary buttons or actions ("Cancel", "Back")
- Less prominent highlights (badges, links)
- Supporting UI elements requiring less emphasis

```html
<button class="bg-secondary text-secondary-content">Cancel</button>
```

---

## 3. Accent & Accent-content

- **Accent:** Optional accent color to add vibrancy or emphasis.
- **Accent-content:** Text/icons on accent backgrounds.

**Use for:**

- Decorative accents (callouts, tags)
- Notifications or badges (non-error/success)
- Special interactive elements (toggles, sliders)

```html
<span class="bg-accent text-accent-content px-2 py-1 rounded">New</span>
```

---

## 4. Neutral & Neutral-content

- **Neutral:** Darker neutral color for subtle UI parts.
- **Neutral-content:** Text/icons on neutral backgrounds.

**Use for:**

- Borders, dividers, disabled elements background
- Subtle components like tooltips, hints
- Non-primary buttons or background shades

```html
<div class="bg-neutral text-neutral-content p-4 rounded">
  Hint: You can drag this!
</div>
```

---

## 5. Base Colors: base-100, base-200, base-300 & base-content

- **base-100:** Main surface color (e.g., page or card background)
- **base-200:** Slightly elevated background (e.g., secondary card, dropdown)
- **base-300:** Even more elevated surfaces (e.g., modal background)
- **base-content:** Text/icons on base backgrounds

**Use for:**

- App backgrounds (`base-100`)
- Cards, dropdown menus, modals (`base-200`, `base-300`)
- General text and icons (`base-content`)

```html
<div class="bg-base-100 text-base-content p-6 shadow rounded">
  Welcome to your dashboard!
</div>
```

---

## 6. Feedback Colors: info, success, warning, error

Use these for semantic feedback states in your UI.

| Color     | Purpose                                       |
| --------- | --------------------------------------------- |
| `info`    | Informative or helpful messages               |
| `success` | Positive feedback (e.g., "Saved!", "Success") |
| `warning` | Cautionary messages                           |
| `error`   | Errors or destructive actions                 |

**Examples:**

```html
<p class="text-info">ℹ️ This is some helpful information.</p>
<p class="text-success">✔️ Changes saved successfully!</p>
<p class="text-warning">⚠️ Your trial is about to end.</p>
<p class="text-error">❌ An error occurred while saving.</p>
```

---

## Final Tips

- Combine background and content classes correctly (e.g., `bg-primary text-primary-content`).
- Maintain contrast for accessibility.
- Use base colors as your UI foundation, and feedback/brand colors for interaction and emphasis.
