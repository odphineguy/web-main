"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import styles from "./how-it-works.module.css";

type PipelineNode = { num: string; label: string; sub: string };
type Caption = { b: string; rest: string };
type LogRow = { t: string; text: string; ok: boolean };
type CategoryRow = { cat: string; badge: string; type: "quote" | "rate" | "human"; text: string };
type FlowChip = { text: string; hot: boolean };
type CaseCard = { h: string; sub: string; text: string; link: string; meta: string };
type Gate = { b: string; rest: string; arrow?: boolean };
type Flag = { b: string; rest: string };
type EmailRow = { k: string; v: string };
type FuStop = { ft: string; fl: string; fs: string };
type BookStep = { b: string; s: string };
type SyncRow = { src: string; dst: string };
type Check = { b: string; rest: string };
type MoneyPanel = { title: string; body: string };
type Rule = { b: string; s: string };
type BoardRow = { cap: string; small?: string; status: "live" | "built" | "future" };
type GlossRow = { t: string; d: string };

const BADGE_CLASS = { quote: "cbQuote", rate: "cbRate", human: "cbHuman" } as const;

export default function HowItWorksPage() {
  const t = useTranslations("HowItWorks");
  const locale = useLocale();
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Scroll-triggered reveals (stages fade in once)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add(styles.in);
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 }
    );
    root.querySelectorAll(`.${styles.stage}`).forEach((s) => io.observe(s));

    // Scroll-spy for the left rail
    const railLinks = Array.from(root.querySelectorAll<HTMLAnchorElement>(`.${styles.rail} a`));
    const targets = railLinks
      .map((a) => {
        const href = a.getAttribute("href") ?? "";
        return root.querySelector(href.startsWith("#") ? href : "");
      })
      .filter((el): el is Element => Boolean(el));
    const spy = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            railLinks.forEach((a) =>
              a.classList.toggle(styles.active, a.getAttribute("href") === `#${e.target.id}`)
            );
          }
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    targets.forEach((el) => spy.observe(el));

    // Hero video: preload="none" protects LCP; start playback once it's on screen
    const video = videoRef.current;
    let vio: IntersectionObserver | undefined;
    if (video) {
      vio = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              video.play().catch(() => {});
              vio?.disconnect();
            }
          }
        },
        { threshold: 0.2 }
      );
      vio.observe(video);
    }

    return () => {
      io.disconnect();
      spy.disconnect();
      vio?.disconnect();
    };
  }, []);

  const nodes = t.raw("Pipeline.nodes") as PipelineNode[];
  const captions = t.raw("Pipeline.captions") as Caption[];
  const s1Tags = t.raw("Stage1.tags") as string[];
  const s1Log = t.raw("Stage1.log") as LogRow[];
  const s1Safety = t.raw("Stage1.safety") as string[];
  const s2Rows = t.raw("Stage2.rows") as CategoryRow[];
  const s2Flow = t.raw("Stage2.flow") as FlowChip[];
  const s3Cases = t.raw("Stage3.cases") as CaseCard[];
  const s3Gates = t.raw("Stage3.gates") as Gate[];
  const s4Tags = t.raw("Stage4.tags") as string[];
  const s4Flags = t.raw("Stage4.flags") as Flag[];
  const s4Email = t.raw("Stage4.emailRows") as EmailRow[];
  const s5Stops = t.raw("Stage5.stops") as FuStop[];
  const s5Checks = t.raw("Stage5.checks") as string[];
  const s6Steps = t.raw("Stage6.steps") as BookStep[];
  const s6Strip = t.raw("Stage6.strip") as string[];
  const s7Sync = t.raw("Stage7.sync") as SyncRow[];
  const s7Checks = t.raw("Stage7.checks") as Check[];
  const s8Panels = t.raw("Stage8.panels") as MoneyPanel[];
  const s8Labels = t.raw("Stage8.meterLabels") as string[];
  const safetyRules = t.raw("Safety.rules") as Rule[];
  const boardRows = t.raw("Board.rows") as BoardRow[];
  const glossRows = t.raw("Glossary.rows") as GlossRow[];

  const stageDelays = ["0s", "1.4s", "2.8s", "4.2s", "5.6s", "7s", "8.4s", "9.8s"];

  const statusChip = (status: BoardRow["status"]) => {
    const cls =
      status === "live" ? styles.chipLive : status === "built" ? styles.chipBuilt : styles.chipFuture;
    return (
      <span className={`${styles.chip} ${cls}`}>
        <span className={styles.dot}></span>
        {t(`Board.status.${status}`)}
      </span>
    );
  };

  const liveChip = (
    <span className={`${styles.chip} ${styles.chipLive}`}>
      <span className={styles.dot}></span>
      {t("liveLabel")}
    </span>
  );

  return (
    <div className={styles.page} ref={rootRef}>
      <div className={styles.shell}>
        <nav className={styles.rail} aria-label="Stages">
          <span className={styles.railCap}>{t("railCap")}</span>
          {["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map((id, i) => (
            <a key={id} href={`#${id}`}>{String(i + 1).padStart(2, "0")}</a>
          ))}
          <a href="#safety" title={t("Safety.title")}>SF</a>
          <a href="#board" title={t("Board.title")}>ST</a>
          <a href="#cta" title={t("Cta.title")}>GO</a>
        </nav>

        <main className={styles.main}>
          {/* ================= HERO ================= */}
          <header className={`${styles.hero} ${styles.in}`} id="top">
            <div className={styles.heroTop}>
              <div>
                <p className={`${styles.eyebrow} ${styles.reveal}`} style={{ "--i": 0 } as CSSProperties}>{t("Hero.eyebrow")}</p>
                <h1 className={styles.reveal} style={{ "--i": 1 } as CSSProperties}>{t("Hero.title1")}<br />{t("Hero.title2")}</h1>
              </div>
              <div className={`${styles.clock} ${styles.reveal}`} style={{ "--i": 2 } as CSSProperties}>
                11<span className={styles.colon}>:</span>30 PM
                <span className={styles.sub}>{t("Hero.clockSub")}</span>
              </div>
            </div>
            <video
              ref={videoRef}
              className={styles.heroVideo}
              muted
              loop
              playsInline
              preload="none"
              poster="/video/workflow-hero-poster.jpg"
              aria-label={t("Hero.videoLabel")}
            >
              <source src="/video/workflow-hero.mp4" type="video/mp4" />
            </video>
            <p className={`${styles.pitch} ${styles.reveal}`} style={{ "--i": 3 } as CSSProperties}>
              {t("Hero.pitchStart")}<em>{t("Hero.pitchEm")}</em>{t("Hero.pitchEnd")}
            </p>
            <p className={`${styles.heroNote} ${styles.reveal}`} style={{ "--i": 4 } as CSSProperties}>
              {t("Hero.notePre")}<b>{t("liveLabel").toUpperCase()}</b>{t("Hero.notePost")}
            </p>

            <div className={`${styles.pipelineWrap} ${styles.reveal}`} style={{ "--i": 5 } as CSSProperties} aria-label="Pipeline overview diagram">
              <div className={styles.pipeline}>
                <div className={styles.pipeTrack}></div>
                <div className={styles.pipePulse} aria-hidden="true"></div>
                <div className={styles.pipeNodes}>
                  {nodes.map((n, i) => (
                    <div className={styles.pnode} key={i}>
                      <a href={`#s${i + 1}`}>
                        <span className={styles.bulb} style={{ "--d": stageDelays[i] } as CSSProperties}></span>
                        <span className={styles.pnum}>{String(i + 1).padStart(2, "0")}</span>
                        <span className={styles.plabel}>{n.label}</span>
                        <span className={styles.psub}>{n.sub}</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.pipeCaption}>
                {captions.map((c, i) => (
                  <span key={i}><b>{c.b}</b>{c.rest}</span>
                ))}
              </div>
            </div>
          </header>

          {/* ================= STAGE 1 ================= */}
          <section className={styles.stage} id="s1">
            <div className={styles.stageHead}>
              <div className={`${styles.stageNum} ${styles.reveal}`} style={{ "--i": 0 } as CSSProperties}>01</div>
              <div className={styles.stageTitleBlock}>
                <div className={`${styles.stageKicker} ${styles.reveal}`} style={{ "--i": 1 } as CSSProperties}>
                  {t("Stage1.kicker")}
                  {liveChip}
                </div>
                <h2 className={styles.reveal} style={{ "--i": 2 } as CSSProperties}>{t("Stage1.title")}</h2>
              </div>
            </div>
            <div className={styles.cols}>
              <div>
                <p className={`${styles.lede} ${styles.reveal}`} style={{ "--i": 3 } as CSSProperties}>{t("Stage1.lede")}</p>
                <div className={`${styles.panel} ${styles.reveal}`} style={{ "--i": 4, marginTop: "var(--hiw-space-lg)" } as CSSProperties}>
                  <div className={styles.panelTitle}>{t("Stage1.captureTitle")}</div>
                  <div className={styles.tags}>
                    {s1Tags.map((tag, i) => (
                      <span className={styles.tag} key={i}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div className={`${styles.panel} ${styles.reveal}`} style={{ "--i": 5, marginTop: "var(--hiw-space-md)" } as CSSProperties}>
                  <div className={styles.panelTitle}>{t("Stage1.logTitle")}</div>
                  <div className={styles.log}>
                    {s1Log.map((row, i) => (
                      <div key={i}>
                        <span className={styles.t}>{row.t}</span>
                        {row.text} {row.ok && <span className={styles.ok}>✓</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.reveal} style={{ "--i": 5 } as CSSProperties}>
                <h3 style={{ marginBottom: "var(--hiw-space-md)" }}>{t("Stage1.safetyTitle")}</h3>
                <ul className={styles.checks}>
                  {s1Safety.map((item, i) => (
                    <li key={i}><span className={styles.tick}>✓</span><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ================= STAGE 2 ================= */}
          <section className={styles.stage} id="s2">
            <div className={styles.stageHead}>
              <div className={`${styles.stageNum} ${styles.reveal}`} style={{ "--i": 0 } as CSSProperties}>02</div>
              <div className={styles.stageTitleBlock}>
                <div className={`${styles.stageKicker} ${styles.reveal}`} style={{ "--i": 1 } as CSSProperties}>
                  {t("Stage2.kicker")}
                  {liveChip}
                </div>
                <h2 className={styles.reveal} style={{ "--i": 2 } as CSSProperties}>{t("Stage2.title")}</h2>
              </div>
            </div>
            <p className={`${styles.lede} ${styles.reveal}`} style={{ "--i": 3 } as CSSProperties}>{t("Stage2.lede")}</p>

            <div className={styles.reveal} style={{ marginTop: "var(--hiw-space-xl)", overflowX: "auto" }}>
              <table className={styles.catTable}>
                <thead><tr><th>{t("Stage2.colCategory")}</th><th>{t("Stage2.colAction")}</th></tr></thead>
                <tbody>
                  {s2Rows.map((row, i) => (
                    <tr key={i}>
                      <td>
                        {row.cat}<br />
                        <span className={`${styles.catBadge} ${styles[BADGE_CLASS[row.type]]}`}>{row.badge}</span>
                      </td>
                      <td>{row.text}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={`${styles.golden} ${styles.reveal}`} style={{ marginTop: "var(--hiw-space-xl)" }}>
              <p className={styles.rule}>{t("Stage2.rulePre")}<em>{t("Stage2.ruleEm")}</em>{t("Stage2.rulePost")}</p>
              <p>{t("Stage2.ruleBody")}</p>
              <div className={styles.priceFlow}>
                {s2Flow.map((chip, i) => (
                  <span key={i} style={{ display: "contents" }}>
                    {i > 0 && <span className={styles.arrow}>→</span>}
                    <span className={`${styles.pf} ${chip.hot ? styles.pfHot : ""}`}>{chip.text}</span>
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ================= STAGE 3 ================= */}
          <section className={styles.stage} id="s3">
            <div className={styles.stageHead}>
              <div className={`${styles.stageNum} ${styles.reveal}`} style={{ "--i": 0 } as CSSProperties}>03</div>
              <div className={styles.stageTitleBlock}>
                <div className={`${styles.stageKicker} ${styles.reveal}`} style={{ "--i": 1 } as CSSProperties}>
                  {t("Stage3.kicker")}
                  {liveChip}
                </div>
                <h2 className={styles.reveal} style={{ "--i": 2 } as CSSProperties}>{t("Stage3.title1")}<br />{t("Stage3.title2")}</h2>
              </div>
            </div>

            <p className={`${styles.lede} ${styles.reveal}`} style={{ "--i": 3 } as CSSProperties}>{t("Stage3.lede")}</p>
            <p className={styles.reveal} style={{ "--i": 4, maxWidth: "66ch", marginTop: "var(--hiw-space-lg)" } as CSSProperties}>{t("Stage3.casesIntro")}</p>

            <div className={styles.cases} style={{ marginTop: "var(--hiw-space-xl)" }}>
              {s3Cases.map((c, i) => (
                <div className={`${styles.caseRow} ${styles.reveal}`} style={{ "--i": i } as CSSProperties} key={i}>
                  <div className={styles.caseLabel}>
                    <h3>{c.h}</h3>
                    <p className={styles.clSub}>{c.sub}</p>
                  </div>
                  <div className={styles.bubble} style={{ "--i": i } as CSSProperties}>
                    &ldquo;{c.text} <span className={styles.link}>{c.link}</span>&rdquo;
                    <span className={styles.meta}>{c.meta}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className={styles.reveal} style={{ marginTop: "var(--hiw-space-lg)", maxWidth: "66ch", color: "var(--hiw-ink-mute)" }}>{t("Stage3.verifyNote")}</p>

            <div className={`${styles.gates} ${styles.reveal}`}>
              <h3>{t("Stage3.gatesTitle")}</h3>
              <div className={styles.gateGrid}>
                {s3Gates.map((g, i) => (
                  <span className={styles.gate} key={i}>
                    <span className={styles.gx}>{g.arrow ? "→" : "✓"}</span>
                    <span><b>{g.b}</b>{g.rest}</span>
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ================= STAGE 4 ================= */}
          <section className={styles.stage} id="s4">
            <div className={styles.stageHead}>
              <div className={`${styles.stageNum} ${styles.reveal}`} style={{ "--i": 0 } as CSSProperties}>04</div>
              <div className={styles.stageTitleBlock}>
                <div className={`${styles.stageKicker} ${styles.reveal}`} style={{ "--i": 1 } as CSSProperties}>
                  {t("Stage4.kicker")}
                  {liveChip}
                </div>
                <h2 className={styles.reveal} style={{ "--i": 2 } as CSSProperties}>{t("Stage4.title")}</h2>
              </div>
            </div>
            <div className={styles.cols}>
              <div>
                <p className={`${styles.lede} ${styles.reveal}`} style={{ "--i": 3 } as CSSProperties}>{t("Stage4.lede")}</p>
                <div className={`${styles.panel} ${styles.reveal}`} style={{ "--i": 4, marginTop: "var(--hiw-space-lg)" } as CSSProperties}>
                  <div className={styles.panelTitle}>{t("Stage4.escalatesTitle")}</div>
                  <div className={styles.tags}>
                    {s4Tags.map((tag, i) => (
                      <span className={styles.tag} key={i}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.reveal} style={{ marginTop: "var(--hiw-space-xl)" }}>
                  <h3 style={{ marginBottom: "var(--hiw-space-md)" }}>{t("Stage4.flagsTitle")}</h3>
                  <ul className={styles.flagList}>
                    {s4Flags.map((f, i) => (
                      <li key={i}><span><b>{f.b}</b>{f.rest}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={styles.reveal} style={{ "--i": 5 } as CSSProperties}>
                <div className={styles.email}>
                  <div className={styles.emailBar}><span>{t("Stage4.emailBar1")}</span><span>{t("Stage4.emailBar2")}</span></div>
                  <div className={styles.emailBody}>
                    {s4Email.map((row, i) => (
                      <div className={styles.row} key={i}><span className={styles.k}>{row.k}</span><span>{row.v}</span></div>
                    ))}
                  </div>
                </div>
                <p style={{ marginTop: "var(--hiw-space-md)", fontSize: "0.88rem", color: "var(--hiw-ink-faint)" }}>{t("Stage4.emailNote")}</p>
              </div>
            </div>
          </section>

          {/* ================= STAGE 5 ================= */}
          <section className={styles.stage} id="s5">
            <div className={styles.stageHead}>
              <div className={`${styles.stageNum} ${styles.reveal}`} style={{ "--i": 0 } as CSSProperties}>05</div>
              <div className={styles.stageTitleBlock}>
                <div className={`${styles.stageKicker} ${styles.reveal}`} style={{ "--i": 1 } as CSSProperties}>
                  {t("Stage5.kicker")}
                  {liveChip}
                </div>
                <h2 className={styles.reveal} style={{ "--i": 2 } as CSSProperties}>{t("Stage5.title1")}<br />{t("Stage5.title2")}</h2>
              </div>
            </div>
            <p className={`${styles.lede} ${styles.reveal}`} style={{ "--i": 3 } as CSSProperties}>{t("Stage5.lede")}</p>

            <div className={`${styles.fuTrack} ${styles.reveal}`} style={{ "--i": 4 } as CSSProperties}>
              <div className={styles.fuLine}></div>
              <div className={styles.fuFill}></div>
              <div className={styles.fuStops}>
                {s5Stops.map((stop, i) => (
                  <div className={styles.fuStop} style={{ "--d": `${0.1 + i * 0.55}s` } as CSSProperties} key={i}>
                    <span className={styles.fdot}></span>
                    <span className={styles.ft}>{stop.ft}</span>
                    <span className={styles.fl2}>{stop.fl}</span>
                    <span className={styles.fs}>{stop.fs}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.reveal} style={{ "--i": 5 } as CSSProperties}>
              <span className={styles.stopRule}>✓ {t("Stage5.stopRule")}</span>
            </div>

            <div className={styles.cols} style={{ marginTop: "var(--hiw-space-xl)" }}>
              <ul className={`${styles.checks} ${styles.reveal}`} style={{ "--i": 6 } as CSSProperties}>
                {s5Checks.map((c, i) => (
                  <li key={i}><span className={styles.tick}>✓</span><span>{c}</span></li>
                ))}
              </ul>
            </div>
          </section>

          {/* ================= STAGE 6 ================= */}
          <section className={styles.stage} id="s6">
            <div className={styles.stageHead}>
              <div className={`${styles.stageNum} ${styles.reveal}`} style={{ "--i": 0 } as CSSProperties}>06</div>
              <div className={styles.stageTitleBlock}>
                <div className={`${styles.stageKicker} ${styles.reveal}`} style={{ "--i": 1 } as CSSProperties}>
                  {t("Stage6.kicker")}
                  {liveChip}
                </div>
                <h2 className={styles.reveal} style={{ "--i": 2 } as CSSProperties}>{t("Stage6.title")}</h2>
              </div>
            </div>
            <div className={styles.cols}>
              <div>
                <p className={`${styles.lede} ${styles.reveal}`} style={{ "--i": 3 } as CSSProperties}>{t("Stage6.lede")}</p>
                <ol className={`${styles.bookSteps} ${styles.reveal}`} style={{ "--i": 4, marginTop: "var(--hiw-space-xl)" } as CSSProperties}>
                  {s6Steps.map((step, i) => (
                    <li key={i}><div><b>{step.b}</b><span>{step.s}</span></div></li>
                  ))}
                </ol>
              </div>
              <div className={`${styles.panel} ${styles.reveal}`} style={{ "--i": 5 } as CSSProperties}>
                <div className={styles.panelTitle}>
                  {t("Stage6.enrichTitle")} · <span style={{ color: "var(--hiw-amber)" }}>{t("Stage6.enrichBadge")}</span>
                </div>
                <p className={styles.panelBody}>{t("Stage6.enrichBody")}</p>
                <div className={styles.previewStrip}>
                  {s6Strip.map((chip, i) => (
                    <span key={i} style={{ display: "contents" }}>
                      {i > 0 && <span className={styles.arrow}>→</span>}
                      <span className={`${styles.ps} ${i === s6Strip.length - 1 ? styles.psMail : ""}`}>{chip}</span>
                    </span>
                  ))}
                </div>
                <p style={{ marginTop: "var(--hiw-space-md)", fontSize: "0.85rem", color: "var(--hiw-ink-faint)" }}>{t("Stage6.enrichNote")}</p>
              </div>
            </div>
          </section>

          {/* ================= STAGE 7 ================= */}
          <section className={styles.stage} id="s7">
            <div className={styles.stageHead}>
              <div className={`${styles.stageNum} ${styles.reveal}`} style={{ "--i": 0 } as CSSProperties}>07</div>
              <div className={styles.stageTitleBlock}>
                <div className={`${styles.stageKicker} ${styles.reveal}`} style={{ "--i": 1 } as CSSProperties}>
                  {t("Stage7.kicker")}
                  {liveChip}
                </div>
                <h2 className={styles.reveal} style={{ "--i": 2 } as CSSProperties}>{t("Stage7.title1")}<br />{t("Stage7.title2")}</h2>
              </div>
            </div>
            <div className={styles.cols}>
              <div>
                <p className={`${styles.lede} ${styles.reveal}`} style={{ "--i": 3 } as CSSProperties}>{t("Stage7.lede")}</p>
                <div className={`${styles.syncMap} ${styles.reveal}`} style={{ "--i": 4 } as CSSProperties}>
                  {s7Sync.map((row, i) => (
                    <div className={styles.syncRow} key={i}>
                      <span className={styles.src}>{row.src}</span>
                      <span className={styles.arrow}>→</span>
                      <span className={styles.dst}>{row.dst}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.reveal} style={{ "--i": 5 } as CSSProperties}>
                <ul className={styles.checks}>
                  {s7Checks.map((c, i) => (
                    <li key={i}><span className={styles.tick}>✓</span><span><b>{c.b}</b>{c.rest}</span></li>
                  ))}
                </ul>
                <span className={styles.kill}>⏻ {t("Stage7.kill")}</span>
              </div>
            </div>
          </section>

          {/* ================= STAGE 8 ================= */}
          <section className={styles.stage} id="s8">
            <div className={styles.stageHead}>
              <div className={`${styles.stageNum} ${styles.reveal}`} style={{ "--i": 0 } as CSSProperties}>08</div>
              <div className={styles.stageTitleBlock}>
                <div className={`${styles.stageKicker} ${styles.reveal}`} style={{ "--i": 1 } as CSSProperties}>
                  {t("Stage8.kicker")}
                  {liveChip}
                </div>
                <h2 className={styles.reveal} style={{ "--i": 2 } as CSSProperties}>{t("Stage8.title")}</h2>
              </div>
            </div>
            <p className={`${styles.lede} ${styles.reveal}`} style={{ "--i": 3 } as CSSProperties}>{t("Stage8.lede")}</p>

            <div className={styles.moneyGrid}>
              {s8Panels.map((panel, i) => (
                <div className={`${styles.panel} ${styles.reveal}`} style={{ "--i": 4 + i } as CSSProperties} key={i}>
                  <div className={styles.panelTitle}>{panel.title}</div>
                  <p className={styles.panelBody}>{panel.body}</p>
                  {i === 0 && (
                    <div className={styles.meterWrap}>
                      <div className={styles.meter}>
                        <div className={styles.fill}></div>
                        <span className={`${styles.mark} ${styles.m80}`}></span>
                        <span className={`${styles.mark} ${styles.m100}`}></span>
                      </div>
                      <div className={styles.meterLabels}>
                        {s8Labels.map((label, j) => (
                          <span key={j}>{label}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ================= SAFETY PHILOSOPHY ================= */}
          <section className={styles.stage} id="safety">
            <div className={styles.stageHead}>
              <div className={styles.stageTitleBlock}>
                <div className={`${styles.stageKicker} ${styles.reveal}`} style={{ "--i": 0 } as CSSProperties}>{t("Safety.kicker")}</div>
                <h2 className={styles.reveal} style={{ "--i": 1 } as CSSProperties}>{t("Safety.title")}</h2>
              </div>
            </div>
            <ol className={styles.rules}>
              {safetyRules.map((rule, i) => (
                <li className={styles.reveal} style={{ "--i": i } as CSSProperties} key={i}>
                  <div><b>{rule.b}</b><span>{rule.s}</span></div>
                </li>
              ))}
            </ol>
          </section>

          {/* ================= STATUS BOARD ================= */}
          <section className={styles.stage} id="board">
            <div className={styles.stageHead}>
              <div className={styles.stageTitleBlock}>
                <div className={`${styles.stageKicker} ${styles.reveal}`} style={{ "--i": 0 } as CSSProperties}>{t("Board.kicker")}</div>
                <h2 className={styles.reveal} style={{ "--i": 1 } as CSSProperties}>{t("Board.title")}</h2>
              </div>
            </div>
            <p className={`${styles.lede} ${styles.reveal}`} style={{ "--i": 2 } as CSSProperties}>{t("Board.lede")}</p>
            <div className={`${styles.board} ${styles.reveal}`} style={{ "--i": 3 } as CSSProperties}>
              {boardRows.map((row, i) => (
                <div className={styles.boardRow} key={i}>
                  <div className={styles.cap}>
                    {row.cap}
                    {row.small && <small>{row.small}</small>}
                  </div>
                  {statusChip(row.status)}
                </div>
              ))}
            </div>
          </section>

          {/* ================= CTA ================= */}
          <section className={`${styles.stage} ${styles.ctaStage}`} id="cta">
            <div className={styles.stageHead}>
              <div className={styles.stageTitleBlock}>
                <div className={`${styles.stageKicker} ${styles.reveal}`} style={{ "--i": 0 } as CSSProperties}>{t("Cta.kicker")}</div>
                <h2 className={styles.reveal} style={{ "--i": 1 } as CSSProperties}>{t("Cta.title")}</h2>
              </div>
            </div>
            <p className={`${styles.lede} ${styles.ctaLede} ${styles.reveal}`} style={{ "--i": 2 } as CSSProperties}>{t("Cta.lede")}</p>
            <div className={`${styles.ctaActions} ${styles.reveal}`} style={{ "--i": 3 } as CSSProperties}>
              <Link href={`/${locale}/contact`} className={styles.ctaButton}>{t("Cta.button")} →</Link>
              <Link href={`/${locale}/#agents`} className={styles.ctaSecondary}>{t("Cta.secondary")}</Link>
            </div>
          </section>

          {/* ================= GLOSSARY ================= */}
          <section className={styles.stage} id="glossary">
            <div className={styles.stageHead}>
              <div className={styles.stageTitleBlock}>
                <div className={`${styles.stageKicker} ${styles.reveal}`} style={{ "--i": 0 } as CSSProperties}>{t("Glossary.kicker")}</div>
                <h2 className={styles.reveal} style={{ "--i": 1 } as CSSProperties}>{t("Glossary.title")}</h2>
              </div>
            </div>
            <div className={styles.reveal} style={{ "--i": 2, overflowX: "auto" } as CSSProperties}>
              <table className={styles.gloss}>
                <thead><tr><th>{t("Glossary.colTerm")}</th><th>{t("Glossary.colMeaning")}</th></tr></thead>
                <tbody>
                  {glossRows.map((row, i) => (
                    <tr key={i}><td>{row.t}</td><td>{row.d}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
