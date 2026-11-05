import React, { JSX, useState } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBrokenLinks from "@docusaurus/useBrokenLinks";
import styles from "./index.module.css";

type Feature = {
  title: string;
  body: string;
  icon: JSX.Element;
};

const features: Feature[] = [
  {
    title: "Visual workflows",
    body: "Drag Trigger, Action, and Decision nodes onto a canvas. Each Action targets exactly one server — run across many in parallel.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="6" r="2.5" />
        <circle cx="12" cy="18" r="2.5" />
        <path d="M7.8 7.6 10.5 16M16.2 7.6 13.5 16M8.5 6h7" />
      </svg>
    ),
  },
  {
    title: "Three scripting languages",
    body: "Author scripts in Python, PowerShell, or Shell in the built-in editor — with parameters, secrets, and live output streaming.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m8 7-4 5 4 5M16 7l4 5-4 5M14 5l-4 14" />
      </svg>
    ),
  },
  {
    title: "Central Key Vault",
    body: "Save servers and credentials once. Link a default credential to a server and it auto-fills the next time you select it.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="10" width="16" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v2" />
      </svg>
    ),
  },
  {
    title: "Run anywhere, anytime",
    body: "Trigger workflows manually, on a cron schedule, via authenticated HTTP webhooks, or from your terminal and CI with SageCode.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: "Live execution & logs",
    body: "Every run streams stdout and stderr to your browser in real time. Full logs are preserved for audit and replay.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
        <path d="M7 9h2M7 13h6M7 17h4" />
      </svg>
    ),
  },
  {
    title: "Autobot",
    body: "A built-in AI assistant that drafts scripts, builds workflows from a prompt, runs them, and helps fix failing runs.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="7" width="16" height="12" rx="3" />
        <path d="M9 12h.01M15 12h.01M12 4v3M9 19v2M15 19v2" />
      </svg>
    ),
  },
];

const SAGECODE_INSTALL = "uv tool install sagex-cli";

const sagecodePoints: Feature[] = [
  {
    title: "Run and watch live",
    body: "Start any workflow or script and follow it node by node, right in your shell.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="m7 9 3 3-3 3M13 15h4" />
      </svg>
    ),
  },
  {
    title: "Webhooks and schedules",
    body: "Create, fire and follow HTTP triggers and cron schedules from the terminal.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: "Made for CI/CD",
    body: "Exit codes that follow the run, --json output, and access tokens for pipelines.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="6" cy="18" r="2.5" />
        <circle cx="18" cy="12" r="2.5" />
        <path d="M6 8.5v7M8.3 7.1l7.4 3.8M8.3 16.9l7.4-3.8" />
      </svg>
    ),
  },
  {
    title: "Signed in, not copied",
    body: "Approve each device in your browser; see and revoke every session on your profile.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3 5 6v5c0 4.5 3 8.2 7 10 4-1.8 7-5.5 7-10V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

// Introduces SageCode (the `sagex` CLI). The hero's "New" pill links here (#sagecode).
function SageCodeSection(): JSX.Element {
  const [copied, setCopied] = useState(false);
  // A custom id isn't seen by Docusaurus' broken-anchor check unless it's registered.
  useBrokenLinks().collectAnchor("sagecode");

  const copyInstall = async () => {
    try {
      await navigator.clipboard.writeText(SAGECODE_INSTALL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard blocked (permissions / insecure context): the command stays selectable.
    }
  };

  return (
    <section id="sagecode" className={styles.sagecode}>
      <div className={styles.sagecodePanel}>
        <div className={styles.sagecodeTop}>
          <div>
            <span className={styles.eyebrow}>
              <ThemedImage
                alt=""
                width={14}
                className={styles.pathwayBadgeMark}
                sources={{
                  light: useBaseUrl("/img/sagecode/mark-light.svg"),
                  dark: useBaseUrl("/img/sagecode/mark-dark.svg"),
                }}
              />
              New · SageCode
            </span>
            <h2 className={styles.sectionTitle}>
              AutoSage, <span className={styles.titleAccent}>in your terminal.</span>
            </h2>
            <p className={styles.sagecodeLead}>
              SageCode is the AutoSage command line. Build, run and watch your
              workflows, scripts, webhooks and schedules from your shell or a
              CI pipeline, signed in with the same account — all with one
              command, <code>sagex</code>.
            </p>

            <div className={styles.sagecodeInstall}>
              <span className={styles.sagecodePrompt} aria-hidden="true">$</span>
              <code className={styles.sagecodeCommand}>{SAGECODE_INSTALL}</code>
              <button
                type="button"
                className={styles.sagecodeCopyBtn}
                onClick={copyInstall}
                aria-label={copied ? "Copied" : "Copy install command"}
                title={copied ? "Copied" : "Copy"}
              >
                {copied ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="9" y="9" width="12" height="12" rx="2" />
                    <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
                  </svg>
                )}
              </button>
            </div>

            <div className={styles.sagecodeCtas}>
              <Link className={styles.ctaPrimary} to="/sagecode/">
                Read the SageCode docs
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link className={styles.ctaSecondary} to="/sagecode/getting-started/install">
                Install &amp; sign in
              </Link>
            </div>
            <p className={styles.sagecodeNote}>
              Recipes and the full command reference are on{" "}
              <a href="https://sagecode.web.app" target="_blank" rel="noopener noreferrer">
                sagecode.web.app
              </a>
              .
            </p>
          </div>

          <Link className={styles.sagecodeShot} to="/sagecode/guides/terminal-app">
            <img
              src={useBaseUrl("/img/sagecode/terminal-app.svg")}
              alt="The SageCode terminal app: workflows, scripts, vault items, recent runs and triggers on the left, and a live workflow run drawn as a graph on the right"
              width={1726}
              height={928}
              loading="lazy"
            />
          </Link>
        </div>

        <ul className={styles.sagecodePoints}>
          {sagecodePoints.map((p) => (
            <li key={p.title} className={styles.sagecodePoint}>
              <span className={styles.sagecodePointIcon}>{p.icon}</span>
              <span>
                <span className={styles.sagecodePointTitle}>{p.title}</span>
                <span className={styles.sagecodePointBody}>{p.body}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main className={styles.main}>
        <div className={styles.gridBg} aria-hidden="true" />

        <section className={styles.hero}>
          <img
            src={useBaseUrl("/img/logo.png")}
            alt="AutoSage logo"
            className={styles.logo}
            width={72}
            height={72}
          />
          <span className={styles.eyebrow}>Documentation</span>
          <h1 className={styles.title}>
            Automate your servers.{" "} <br/>
            <span className={styles.titleAccent}>End to end.</span>
          </h1>
          <p className={styles.tagline}>
            AutoSage is a workflow automation platform for server administration.
            Connect your servers, write scripts in Python, PowerShell, or Shell,
            and orchestrate them as visual workflows — triggered on demand, on a
            schedule, or via webhook.
          </p>

          <div className={styles.ctaRow}>
            <Link className={styles.ctaPrimary} to="/docs/">
              Read the docs
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link className={styles.ctaSecondary} to="/tutorials/">
              Browse tutorials
            </Link>
          </div>

          <Link className={styles.newPill} to="#sagecode">
            <span className={styles.newPillTag}>New</span>
            SageCode: AutoSage in your terminal
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </section>

        <section className={styles.previewWrap}>
          <ThemedImage
            alt="Abstract illustration of AutoSage: triggers flow into the AutoSage hub and out to servers and email, with Autobot, the Key Vault, and live logs connected"
            className={styles.previewImage}
            sources={{
              light: useBaseUrl("/img/autosage-hero-abstract-light.svg"),
              dark: useBaseUrl("/img/autosage-hero-abstract-dark.svg"),
            }}
          />
        </section>

        <section className={styles.features}>
          <header className={styles.sectionHeader}>
            <span className={styles.eyebrow}>What you get</span>
            <h2 className={styles.sectionTitle}>
              A focused toolkit for server automation
            </h2>
            <p className={styles.sectionSub}>
              Six building blocks cover everything from authoring scripts to
              watching them execute across your fleet.
            </p>
          </header>

          <div className={`${styles.previewFrame} ${styles.showcase}`}>
            <ThemedImage
              alt="AutoSage workflow editor showing a live scheduled run, streaming logs, and Autobot fixing a failed run and re-running it"
              className={styles.previewImage}
              sources={{
                light: useBaseUrl("/img/autosage-overview-light.svg"),
                dark: useBaseUrl("/img/autosage-overview-dark.svg"),
              }}
            />
          </div>

          <div className={styles.featureGrid}>
            {features.map((f) => (
              <div key={f.title} className={styles.feature}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureBody}>{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        <SageCodeSection />

        <section className={styles.pathways}>
          <header className={styles.sectionHeader}>
            <span className={styles.eyebrow}>Where to start</span>
            <h2 className={styles.sectionTitle}>Pick your path</h2>
          </header>

          <div className={styles.pathwayGrid}>
            <Link className={styles.pathway} to="/docs/">
              <div className={styles.pathwayBadge}>Docs</div>
              <h3 className={styles.pathwayTitle}>Reference & concepts</h3>
              <p className={styles.pathwayBody}>
                Every feature explained — workflows, the script editor, the Key
                Vault, parameter wiring, and execution logs.
              </p>
              <span className={styles.pathwayLink}>
                Read the docs
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>

            <Link className={styles.pathway} to="/tutorials/">
              <div className={styles.pathwayBadge}>Tutorials</div>
              <h3 className={styles.pathwayTitle}>Step-by-step guides</h3>
              <p className={styles.pathwayBody}>
                Walkthroughs that take you from an empty canvas to a working,
                scheduled workflow — one feature at a time.
              </p>
              <span className={styles.pathwayLink}>
                Start a tutorial
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>

            <Link className={styles.pathway} to="/sagecode/">
              <div className={styles.pathwayBadge}>
                <ThemedImage
                  alt=""
                  width={14}
                  className={styles.pathwayBadgeMark}
                  sources={{
                    light: useBaseUrl("/img/sagecode/mark-light.svg"),
                    dark: useBaseUrl("/img/sagecode/mark-dark.svg"),
                  }}
                />
                SageCode
              </div>
              <h3 className={styles.pathwayTitle}>AutoSage in your terminal</h3>
              <p className={styles.pathwayBody}>
                The <code>sagex</code> command line: run and build workflows,
                scripts, webhooks and schedules from your shell or CI.
              </p>
              <span className={styles.pathwayLink}>
                Explore SageCode
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          </div>
        </section>

        <section className={styles.outro}>
          <h2 className={styles.outroTitle}>Ready to build your first workflow?</h2>
          <p className={styles.outroBody}>
            The Quick Tour walks through every part of the app in about five
            minutes.
          </p>
          <Link className={styles.ctaPrimary} to="/docs/quick-tour">
            Take the Quick Tour
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </section>
      </main>
    </Layout>
  );
}
