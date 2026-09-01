import { AlertTriangle, ArrowDownRight, ArrowUpRight, Check, Clock3, ShieldCheck } from "lucide-react";
import styles from "./thumbtack-audit.module.css";

const responseRows = [
  { label: "Under 5 min", rate: 17, count: "n pending", width: 100 },
  { label: "5–15 min", rate: 16, count: "n pending", width: 94 },
  { label: "16–30 min", rate: 15, count: "n pending", width: 88 },
  { label: "31+ min", rate: 8, count: "n pending", width: 47 },
];

export default function ThumbtackAuditSample({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className={styles.heroReport} aria-label="Redacted Thumbtack lead-spend report preview">
        <div className={styles.reportTopline}>
          <span>Lead-spend snapshot</span>
          <span className={styles.redacted}>Redacted sample</span>
        </div>
        <div className={styles.heroMetrics}>
          <div><small>Contacts analyzed</small><strong>314</strong></div>
          <div><small>Matched hires</small><strong>42</strong></div>
          <div><small>Thumbtack-reported hires</small><strong>95</strong></div>
        </div>
        <div className={styles.heroFinding}>
          <span><ArrowUpRight /> Best observed day</span>
          <strong>Sunday · 19.5%</strong>
          <small>8 matched hires / 41 leads · moderate sample</small>
        </div>
        <p className={styles.dataNote}>Our data · approximately 300 leads · customer details redacted</p>
      </div>
    );
  }

  return (
    <article className={styles.sampleReport} aria-labelledby="sample-report-title">
      <header className={styles.sampleHeader}>
        <div>
          <p>Free snapshot · reference example</p>
          <h3 id="sample-report-title">Thumbtack lead-spend audit</h3>
        </div>
        <span><ShieldCheck /> Customer details redacted</span>
      </header>

      <div className={styles.sampleStats}>
        <div><small>Contacts analyzed</small><strong>314</strong><span>Reference dataset</span></div>
        <div><small>Deterministically matched hires</small><strong>42</strong><span>Used for findings</span></div>
        <div><small>Thumbtack-reported hires</small><strong>95</strong><span>Shown separately</span></div>
        <div><small>Cost per matched hire</small><strong>—</strong><span>Spend input required</span></div>
      </div>

      <div className={styles.findingGrid}>
        <section className={styles.findingCard}>
          <div className={styles.findingLabel}><ArrowUpRight /><span>01 · Best observed day</span></div>
          <strong>Sunday</strong>
          <p><b>19.5%</b> hire rate</p>
          <small>8 matched hires / 41 leads</small>
          <small>Cost / matched hire: — · spend allocation required</small>
          <span className={styles.sampleLabel}>Moderate sample · n=41</span>
        </section>

        <section className={styles.findingCard}>
          <div className={styles.findingLabel}><ArrowDownRight /><span>02 · Worst observed day</span></div>
          <strong>Saturday</strong>
          <p><b>7.3%</b> hire rate</p>
          <small>3 matched hires / 41 leads</small>
          <small>Cost / matched hire: — · spend allocation required</small>
          <span className={styles.sampleLabel}>Moderate sample · n=41</span>
        </section>

        <section className={`${styles.findingCard} ${styles.responseCard}`}>
          <div className={styles.findingLabel}><Clock3 /><span>03 · Response-time impact</span></div>
          <div className={styles.responseRows}>
            {responseRows.map((row) => (
              <div className={styles.responseRow} key={row.label}>
                <span>{row.label}</span>
                <div><i style={{ width: `${row.width}%` }} /></div>
                <b>{row.rate}%</b>
                <small>{row.count}</small>
                <small>cost/hire —</small>
              </div>
            ))}
          </div>
          <span className={`${styles.sampleLabel} ${styles.needsData}`}><AlertTriangle /> Insufficient count metadata in public reference</span>
        </section>
      </div>

      <footer className={styles.reportFooter}>
        <div><Check /><span>Every delivered percentage includes its lead count.</span></div>
        <div><Check /><span>Cost per hire = supplied spend ÷ matched hires.</span></div>
        <div><Check /><span>Findings describe observed performance; they do not promise lift.</span></div>
      </footer>
    </article>
  );
}
