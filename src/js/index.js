import domReady from "domready";
import loadScript from "./loadScript";
require("../theme/index.scss");

navigator.serviceWorker.register("./serviceWorker.js", {
  scope: "/"
});

// Load Netlify if we need it
if (["#invite_token"].includes(window.location.hash.replace(/=.*/, ""))) {
  loadScript("https://identity.netlify.com/v1/netlify-identity-widget.js");
}

domReady(() => {
  // Enable native share
  if (navigator.share) {
    document.querySelectorAll(".share__native").forEach(link => {
      link.addEventListener("click", () => navigator.share(link.dataset));
      link.classList.add("share__native--active");
    });
  }
});

require("./embedExternalLinks");

// Load the webp polyfill if necessary
const webp = document.querySelectorAll("img[src$=webp]");
if (webp) {
  const testImageAlpha =
    "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==";
  const img = new Image();
  img.onerror = function() {
    webp.forEach(image => {
      image.classList.add("loading");
      image.onload = () => image.classList.remove("loading");
    });
    const base = "https://unpkg.com/webp-hero@0.0.0-dev.21/dist-cjs/";
    Promise.all(
      [base + "polyfills.js", base + "webp-hero.bundle.js"].map(loadScript)
    ).then(() => {
      const webpMachine = new window.webpHero.WebpMachine();
      webpMachine.polyfillDocument();
    });
  };
  img.src = "data:image/webp;base64," + testImageAlpha;
}
