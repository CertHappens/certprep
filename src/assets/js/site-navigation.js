(() => {
  const header = document.querySelector("[data-site-header]");
  const navigation = document.querySelector("[data-primary-navigation]");
  const menuToggle = document.querySelector("[data-site-nav-toggle]");

  if (!header || !navigation || !menuToggle) {
    return;
  }

  const menuToggleLabel = menuToggle.querySelector("[data-site-nav-toggle-label]");
  const submenus = Array.from(navigation.querySelectorAll("[data-nav-submenu]"));
  const mobileViewport = window.matchMedia("(max-width: 48rem)");

  function setSubmenuState(submenu, open) {
    submenu.open = open;
    submenu
      .querySelector(":scope > summary")
      ?.setAttribute("aria-expanded", String(open));
  }

  function closeSubmenus(except = null) {
    for (const submenu of submenus) {
      if (submenu !== except) {
        setSubmenuState(submenu, false);
      }
    }
  }

  function setNavigationOpen(open, { returnFocus = false } = {}) {
    navigation.dataset.open = String(open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute(
      "aria-label",
      open ? "Close navigation menu" : "Open navigation menu"
    );

    if (menuToggleLabel) {
      menuToggleLabel.textContent = open ? "Close" : "Menu";
    }

    if (!open) {
      closeSubmenus();
      if (returnFocus) {
        menuToggle.focus();
      }
    }
  }

  function normalizePath(value) {
    const path = value || "/";
    return path.endsWith("/") ? path : `${path}/`;
  }

  function markCurrentLocation() {
    const currentPath = normalizePath(window.location.pathname);

    for (const link of navigation.querySelectorAll("a[href]")) {
      const targetPath = normalizePath(link.getAttribute("href"));
      if (targetPath === currentPath) {
        link.setAttribute("aria-current", "page");
      }
    }

    for (const item of navigation.querySelectorAll("[data-nav-prefix]")) {
      const prefix = normalizePath(item.dataset.navPrefix);
      if (currentPath.startsWith(prefix)) {
        item.dataset.active = "true";
      }
    }
  }

  menuToggle.hidden = false;
  header.dataset.navEnhanced = "true";
  setNavigationOpen(false);
  markCurrentLocation();

  menuToggle.addEventListener("click", () => {
    setNavigationOpen(navigation.dataset.open !== "true");
  });

  for (const submenu of submenus) {
    const summary = submenu.querySelector(":scope > summary");

    submenu.addEventListener("toggle", () => {
      summary?.setAttribute("aria-expanded", String(submenu.open));
      if (submenu.open) {
        closeSubmenus(submenu);
      }
    });

    submenu.addEventListener("focusout", () => {
      window.setTimeout(() => {
        if (!submenu.contains(document.activeElement)) {
          setSubmenuState(submenu, false);
        }
      });
    });
  }

  navigation.addEventListener("click", (event) => {
    if (mobileViewport.matches && event.target.closest("a[href]")) {
      setNavigationOpen(false);
    }
  });

  document.addEventListener("pointerdown", (event) => {
    if (header.contains(event.target)) {
      return;
    }

    closeSubmenus();
    if (mobileViewport.matches && navigation.dataset.open === "true") {
      setNavigationOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    const openSubmenu = submenus.find((submenu) => submenu.open);
    if (openSubmenu) {
      const summary = openSubmenu.querySelector(":scope > summary");
      setSubmenuState(openSubmenu, false);
      summary?.focus();
      return;
    }

    if (mobileViewport.matches && navigation.dataset.open === "true") {
      setNavigationOpen(false, { returnFocus: true });
    }
  });

  mobileViewport.addEventListener("change", () => {
    setNavigationOpen(false);
  });
})();
