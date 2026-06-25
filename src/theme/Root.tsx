import React, {type ReactNode} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

// Swizzled (ejected) Root. Docusaurus renders <Root> once, wrapping every
// route — docs, tutorials, landing page, and search. That makes it the single
// place to mount a site-wide, always-available UI element with zero per-page
// wiring (Pillar A / plan 3.1).
//
// The default theme's Root is a no-op pass-through; we keep that contract
// (render {children} untouched) and append the docs assistant alongside it.
//
// The widget is wrapped in <BrowserOnly>: Root mounts ABOVE the theme's
// ColorModeProvider/etc., and the assistant is a purely client-interactive
// element (streaming fetch, localStorage). Rendering it only in the browser
// keeps it out of static site generation entirely — no SSR context pitfalls,
// and nothing about it needs to be in the prerendered HTML.
export default function Root({children}: {children: ReactNode}): ReactNode {
  return (
    <>
      {children}
      <BrowserOnly>
        {() => {
          const AutobotWidget =
            require('@site/src/components/AutobotWidget').default;
          return <AutobotWidget />;
        }}
      </BrowserOnly>
    </>
  );
}
