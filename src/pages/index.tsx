import React from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>{siteConfig.title}</h1>
          <p className={styles.tagline}>{siteConfig.tagline}</p>
        </section>

        <section className={styles.cards}>
          <Link className={styles.card} to="/docs/">
            <h2 className={styles.cardTitle}>Docs →</h2>
            <p className={styles.cardBody}>
              Reference for every feature — workflows, the script editor, the key vault,
              execution logs, and more.
            </p>
          </Link>

          <Link className={styles.card} to="/tutorials/">
            <h2 className={styles.cardTitle}>Tutorials →</h2>
            <p className={styles.cardBody}>
              Step-by-step walkthroughs that take you from an empty canvas to a working,
              scheduled workflow.
            </p>
          </Link>
        </section>
      </main>
    </Layout>
  );
}
