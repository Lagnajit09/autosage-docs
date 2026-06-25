import React, {type ReactNode} from 'react';

import AutobotWidget from '@site/src/components/AutobotWidget';

// Swizzled (ejected) Root. Docusaurus renders <Root> once, wrapping every
// route — docs, tutorials, landing page, and search. That makes it the single
// place to mount a site-wide, always-available UI element with zero per-page
// wiring (Pillar A / plan 3.1).
//
// The default theme's Root is a no-op pass-through; we keep that contract
// (render {children} untouched) and append the floating docs assistant
// alongside it. The widget is fixed-positioned, so it sits outside the normal
// document flow and never disturbs page layout.
export default function Root({children}: {children: ReactNode}): ReactNode {
  return (
    <>
      {children}
      <AutobotWidget />
    </>
  );
}
