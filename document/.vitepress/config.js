module.exports = {
  base: "/vue-use-popperjs/",
  lang: "en-US",
  title: "Vue-use-popperjs",
  description: "Vue 2, 3 popper solution powered by @popperjs",

  themeConfig: {
    repo: "iendeavor/vue-use-popperjs",
    docsDir: "document",
    docsBranch: "develop",
    editLinks: true,
    editLinkText: "Edit this page on GitHub",
    lastUpdated: "Last Updated",

    nav: [
      { text: "Guide", link: "/", activeMatch: "^/$|^/guide/" },
      { text: "Playground", link: "/playground", activeMatch: "^/playground" },
      {
        text: "API Reference",
        link: "/api-reference",
        activeMatch: "^/api-reference",
      },
    ],
  },
};
