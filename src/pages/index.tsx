import React, { JSX } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
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
    body: "Trigger workflows manually, on a cron schedule, or via authenticated HTTP webhooks from any external system.",
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
    title: "Autobot (coming soon)",
    body: "A built-in AI assistant that drafts scripts, suggests workflows from a prompt, and helps debug failing runs.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="7" width="16" height="12" rx="3" />
        <path d="M9 12h.01M15 12h.01M12 4v3M9 19v2M15 19v2" />
      </svg>
    ),
  },
];

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
        </section>

        <section className={styles.previewWrap}>
          <div className={styles.previewFrame}>
            <ThemedImage
              alt="AutoSage product preview"
              className={styles.previewImage}
              sources={{
                light: useBaseUrl("/img/autosage-landing-img.png"),
                dark: useBaseUrl("/img/autosage-landing-img.png"),
              }}
            />
          </div>
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
