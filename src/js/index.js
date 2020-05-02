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
