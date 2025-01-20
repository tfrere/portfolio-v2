class ThemeToggle {
  constructor() {
    this.isDark = false;
    this.init();
  }

  init() {
    // Add keyboard shortcut (Ctrl/Cmd + D)
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "d") {
        e.preventDefault();
        this.toggleTheme();
      }
    });

    // Check system preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      this.isDark = true;
      document.documentElement.classList.add("black");
    }

    // Listen for system theme changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        this.isDark = e.matches;
        this.updateTheme();
      });
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    this.updateTheme();
  }

  updateTheme() {
    if (this.isDark) {
      document.documentElement.classList.remove("white");
      document.documentElement.classList.add("black");
    } else {
      document.documentElement.classList.remove("black");
      document.documentElement.classList.add("white");
    }
  }
}

export default new ThemeToggle();
