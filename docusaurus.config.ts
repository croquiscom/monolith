import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Monolith',
  tagline: 'kakakostyle frontend common utility library',
  favicon: 'https://kakaostyle.com/_next/static/images/favicon-b20ad83423dad48e2ab0c4321f7e991d.ico',
  url: 'https://croquiscom.github.io',
  baseUrl: '/monolith/',
  trailingSlash: false,
  organizationName: 'kakaostyle',
  projectName: 'monoluth',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },
  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        outputFileStrategy: 'members',
        entryPoints: ['./src/components/*', './src/hooks/*', './src/utils/*'],
        tsconfig: './tsconfig.json',
        plugin: ['./typedoc-plugin.mjs'],
        readme: 'none',
        categorizeByGroup: false,
        indexFormat: 'table',
        disableSources: true,
        groupOrder: ['Classes', 'Interfaces', 'Enums'],
        sort: ['source-order'],
        sidebar: { pretty: true, fullNames: true },
        textContentMappings: {
          'title.indexPage': '공통 사용',
          'title.memberPage': '{name}',
        },
        parametersFormat: 'table',
        enumMembersFormat: 'table',
        useCodeBlocks: true,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/docs', // 문서 경로를 /docs로 변경
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        pages: {
          path: 'docusaurus', // 기본 pages 경로를 변경
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'https://cf.image-farm.s.zigzag.kr/original/cms/2025/03/28/202503280837182070_027536.png',
    navbar: {
      title: 'Monolith',
      logo: {
        alt: 'kakaostyle Site Logo',
        src: 'https://cf.image-farm.s.zigzag.kr/original/cms/2025/03/28/202503280837182070_027536.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '공통 함수 문서',
        },
        { to: '/setting', label: '개발세팅', position: 'left' },
        { to: '/developer', label: '개발작성 가이드', position: 'left' },
        { to: '/convention', label: '컨벤션', position: 'left' },

        {
          href: 'https://github.com/croquiscom/monolith',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/croquiscom/monolith',
            },
          ],
        },
      ],
      copyright: 'Copyright © kakaostyle Corp. All rights reserved.',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
