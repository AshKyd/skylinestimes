const moment = require("moment");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addNunjucksFilter(
    "date",
    (date, modifier) =>
      `<time datetime="${date.toISOString()}" class="date date--${modifier ||
        "static"}">
      <span class="date">${moment(date).format("MMMM Do YYYY")}</span>
      <span class="time">${moment(date).format("hh:mm:ss a")}</span>
    </time>`
  );
  eleventyConfig.addWatchTarget("./theme/**/*.{js,scss}");
  eleventyConfig.setTemplateFormats([
    "njk",
    "md",
    "css",
    "jpg",
    "png",
    "webp",
    "webmanifest"
  ]);

  return {
    dir: {
      input: "src/site",
      output: "_site"
    }
  };
};
