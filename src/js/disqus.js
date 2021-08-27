import loadScript from "./loadScript";
const comments = document.querySelector("#comments");

comments.id = "disqus_thread";

const url = window.location.origin + window.location.pathname;
window.disqus_config = function() {
  this.page.url = url;
  this.page.identifier = url;
};

loadScript("https://skylines-times.disqus.com/embed.js");
