import domReady from "domready";
import loadScript from "./loadScript";

function makeIframe({ src, title }) {
  return `<iframe 
    sandbox="allow-scripts allow-same-origin allow-presentation"
    src="${src}"
    allowfullscreen="true"
    loading="lazy"
    title="${title}"
  ></iframe>`;
}

function makeRatioBox(content, ratio = "16x9") {
  return `<div class="ratio ratio--${ratio}">${content}</div>`;
}

const externalLinks = [
  {
    type: "Twitch clip",
    match: /clips.twitch.tv\/([^/]+)$/,
    template({ id, title }) {
      const src = `https://clips.twitch.tv/embed?clip=${id}&autoplay=false`;
      return makeRatioBox(makeIframe({ src, title }));
    }
  },
  {
    type: "Twitch video",
    match: /www.twitch.tv\/videos\/(\d+)$/,
    template({ id, title }) {
      const src = `https://player.twitch.tv/?video=${id}&parent=${
        document.domain
      }&autoplay=false`;
      return makeRatioBox(makeIframe({ src, title }));
    }
  },
  {
    type: "Twitch channel",
    match: /www.twitch.tv\/([^/]+)\/?/,
    template({ id, title }) {
      const src = `https://player.twitch.tv/?channel=${id}&parent=${
        document.domain
      }&autoplay=false`;
      return makeRatioBox(makeIframe({ src, title }));
    }
  },
  {
    type: "Youtube",
    match: /youtube.com\/watch.*v=([0-9a-zA-Z]+)/,
    template({ id, title }) {
      const src = `https://www.youtube.com/embed/${id}`;
      return makeRatioBox(makeIframe({ src, title }));
    }
  }
];

domReady(() => {
  if (document.querySelector("blockquote.twitter-tweet")) {
    loadScript("https://platform.twitter.com/widgets.js");
  }

  document.querySelectorAll("a.embed").forEach(link => {
    const url = link.href;
    const embed = externalLinks.find(({ match }) => url.match(match));
    if (!embed) {
      console.error("embed not supported: ", url);
      return;
    }
    const [fullMatch, id] = url.match(embed.match);
    const template = embed.template({ id, title: link.innerHTML });

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
});
