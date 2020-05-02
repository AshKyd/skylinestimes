import domReady from "domready";
require("../theme/index.scss");

navigator.serviceWorker.register("./serviceWorker.js", {
  scope: "/"
});

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

// Load Netlify if we need it
if (["#invite_token"].includes(window.location.hash.replace(/=.*/, ""))) {
  loadScript("https://identity.netlify.com/v1/netlify-identity-widget.js");
}

function makeIframe({ src }) {
  return `<iframe 
    sandbox="allow-scripts allow-same-origin"
    src="${src}"
    allowfullscreen="true"
    loading="lazy"
  ></iframe>`;
}
const externalLinks = [
  {
    match: /clips.twitch.tv\/([^/]+)$/,
    type: "Twitch clip",
    template(id) {
      return `<div class="ratio ratio--16x9">${makeIframe({
        src: `https://clips.twitch.tv/embed?clip=${id}`
      })}</div>`;
    }
  }
];

domReady(() => {
  // embedExternalLinks
  document.querySelectorAll("a.embed").forEach(link => {
    const url = link.href;
    const embed = externalLinks.find(({ match }) => url.match(match));
    if (!embed) {
      console.error("embed not supported: ", url);
      return;
    }
    const [fullMatch, id] = url.match(embed.match);
    const template = embed.template(id);

    const finalEmbed = document.createElement("figure");
    finalEmbed.className = link.className;
    finalEmbed.innerHTML = `
      ${template}
      <figcaption class="embed__caption">
      <span class="embed__type">${embed.type}:</span>
      <a href="${link.href}">${link.innerHTML}</a>
      </figcaption>
    `;
    link.parentNode.replaceChild(finalEmbed, link);
  });

  // Enable native share
  if (navigator.share) {
    document.querySelectorAll(".share__native").forEach(link => {
      link.addEventListener("click", () => navigator.share(link.dataset));
      link.classList.add("share__native--active");
    });
  }
});
