import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Autosage",
  tagline: "Automation platform powered by AI agents",
  favicon: "img/icon.png",

  url: "https://autosage-docs.example.com",
  baseUrl: "/",

  organizationName: "Lagnajit09",
  projectName: "autosage-docs",

  onBrokenLinks: "throw",

  // Build-time config consumed by the docs assistant widget (Pillar A).
  // The AutobotWidget reads `autobotApiUrl` via useDocusaurusContext() and
  // calls `${autobotApiUrl}/api/ai/docs/chat/stream/`. Override per
  // environment by setting AUTOBOT_API_URL when building (e.g.
  // `AUTOBOT_API_URL=https://api.example.com npm run build`); the default is
  // the deployed backend so a plain build still points somewhere valid.
  customFields: {
    autobotApiUrl:
      process.env.AUTOBOT_API_URL || "https://autosagex-api.duckdns.org",
  },

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
      onBrokenMarkdownImages: "warn",
    },
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/docs",
          editUrl: "https://github.com/Lagnajit09/autosage-docs/tree/main/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "tutorials",
        path: "tutorials",
        routeBasePath: "/tutorials",
        sidebarPath: "./sidebarsTutorials.ts",
        editUrl: "https://github.com/Lagnajit09/autosage-docs/tree/main/",
      },
    ],
  ],

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        docsRouteBasePath: ["/docs", "/tutorials"],
        language: ["en"],
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: "AUTOSAGE",
      logo: {
        alt: "AutoSage Logo",
        src: "img/icon.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "left",
          label: "Docs",
        },
        {
          type: "docSidebar",
          sidebarId: "tutorialsSidebar",
          docsPluginId: "tutorials",
          position: "left",
          label: "Tutorials",
        },
        {
          type: "search",
          position: "right",
        },
        {
          href: "https://github.com/Lagnajit09/autosage",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
