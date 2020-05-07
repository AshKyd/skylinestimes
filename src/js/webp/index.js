import domReady from "domready";
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
    import("./webp").then(({ default: go }) => {
      domReady(go);
    });
  };
  img.src = "data:image/webp;base64," + testImageAlpha;
}
