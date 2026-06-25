import React, {type ReactNode} from 'react';

// Placeholder mount for the public docs assistant (Pillar A).
//
// Plan 3.1 establishes the global mount point (src/theme/Root.tsx) only; the
// actual floating chat UI — button, panel, streaming, source links — is
// built in 3.2 (this file's real implementation) and 3.3 (API URL config).
//
// Until then this renders nothing so the swizzled Root compiles and the site
// builds cleanly. Returning null is intentional: no visible UI ships yet.
export default function AutobotWidget(): ReactNode {
  return null;
}
