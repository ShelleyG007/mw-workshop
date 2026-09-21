import { useState, useEffect, useRef, useCallback } from "react";
import { Sun, Moon, ChevronRight, Check, Users, LogOut, RefreshCw, ArrowLeft, Calculator, Printer, ClipboardCheck } from "lucide-react";

/* ============================================================
   COURSE CONTENT  (Mark's current wording — working draft)
   The ONE place the wording lives. To update the course, edit
   here. To add another course later, add a new object to
   COURSES and point a class code at it below.

   Section "kind" decides how a section renders:
     (default)  fields    — labelled short/long answer boxes
     "calc"     the live Pipeline / Targets & Ratios calculator
     "diary"    the day planner grid
     "choice"   a self-check: pick one option (saved to Mark)
     "score"    a role-play self-scorecard (1–5 per line + note)
   Every kind still saves to Mark exactly like a normal answer.
   ============================================================ */
const INBOUND_TRAVEL = {
  id: "inbound-travel",
  title: "Inbound Travel Sales Mastery",
  subtitle: "Your live workshop workbook",
  motto: "Information without implementation is just information.",
  weeks: [
    {
      id: "w1",
      title: "Building Our Foundations",
      intro: "Goal setting, diary discipline and the math of success.",
      sections: [
        {
          id: "pipeline-math",
          kind: "calc",
          title: "The Pipeline Math",
          body: "Know your numbers. Enter your targets and your current ratios, then set the ratios you are aiming for after the workshop. Lead volume stays the same, so you can see exactly what sharper ratios are worth to you.",
          fields: [{ id: "calc", type: "calc" }],
        },
        {
          id: "diary",
          kind: "diary",
          title: "Time & Diary Management",
          body: "Having a plan leaves no time for procrastination. Block your day around revenue-generating work, not admin, and lock your high-energy hours for selling.",
          fields: [{ id: "grid", type: "diary" }],
        },
        {
          id: "time-block",
          title: "The Anti-Procrastination Time Block",
          body: "Look at your week and cut the low-value work that eats your selling time.",
          fields: [
            { id: "todo", label: "My to-do list for the next 5 days (I will prioritise these in my diary)", type: "long" },
            { id: "cut", label: "One low-value task I will cut this week", type: "long" },
          ],
        },
        {
          id: "commit1",
          title: "My commitment this week",
          body: "Write the one action you will take, then report back next session.",
          fields: [{ id: "commit", label: "This week I will…", type: "long" }],
        },
      ],
    },
    {
      id: "w2",
      title: "Lead Qualifying & Rapport",
      intro: "Prospect vs suspect, the 4-core matrix, deep listening and backtracking.",
      sections: [
        {
          id: "prospect-suspect",
          title: "Prospect vs Suspect",
          body: "A prospect has budget clarity, a real timeline, responds within 24 hours, and the decision-makers are present. A suspect is vague, ghosts you, and is just looking. If a lead fails 3 of those 4 within 72 hours, move them to nurture.",
          fields: [{ id: "archive", label: "A lead I need to move to nurture, and why", type: "long" }],
        },
        {
          id: "backtracking",
          title: "The Backtracking Framework",
          body: "Never send a quote without repeating the client's needs back in their own words. For example: just to make sure I've captured your vision, you want to celebrate your 25th anniversary with a private safari, no crowds, avoiding long internal flights. Is that right?",
          fields: [{ id: "summary", label: "A backtracking summary for my most recent enquiry", type: "long" }],
        },
        {
          id: "tracker-start",
          title: "Start your Pipeline Tracker",
          body: "Open your Sales Diary & Pipeline Tracker. Log your current leads and mark each one Prospect or Suspect. Anything that trips the 72-hour flag, act on it now.",
          fields: [{ id: "counts", label: "How many active prospects vs suspects do I have right now?", type: "short" }],
        },
        {
          id: "roleplay2",
          kind: "score",
          title: "Role-play: the Discovery Call",
          body: "You are the travel designer qualifying an enthusiastic but budget-defensive traveller. Score yourself honestly after the role-play.",
          fields: [{ id: "score", type: "score", criteria: [
            "Uncovered \u201CWhy now?\u201D",
            "Budget clarified smoothly",
            "Identified all decision-makers",
            "Deep listening, backtracking, pace and tone matching",
          ] }],
        },
        {
          id: "reflect2",
          title: "After the role-play",
          fields: [{ id: "learned", label: "What I learned from the discovery call", type: "long" }],
        },
        { id: "commit2", title: "My commitment this week", fields: [{ id: "commit", label: "This week I will…", type: "long" }] },
      ],
    },
    {
      id: "w3",
      title: "Pipeline & Closing Mastery",
      intro: "Forecasting, natural closing and reframing local objections.",
      sections: [
        {
          id: "forecast",
          title: "Pipeline Forecasting",
          body: "In your tracker, each open deal has a weighted value (quote value times win chance). Open the Dashboard tab and read your weighted forecast for the month.",
          fields: [
            { id: "weighted", label: "My weighted pipeline forecast this month (R)", type: "short" },
            { id: "means", label: "What that tells me about my month", type: "long" },
          ],
        },
        {
          id: "objections",
          title: "The Objection Reframing Playbook",
          body: "Do not dump your toolbox and do not discount on reflex. Reframe the partner delay, over-research, safety anxiety, and shopping around. Match the need and the close is natural.",
          fields: [{ id: "hardest", label: "The objection I struggle with most, and my reframe", type: "long" }],
        },
        {
          id: "roleplay3",
          kind: "score",
          title: "Role-play: the Itinerary Review",
          body: "You presented a premium itinerary against a cheaper online quote, with a partner delay in play. Score yourself after the role-play.",
          fields: [{ id: "score", type: "score", criteria: [
            "Avoided panic discounting",
            "Uncovered hidden competitor gaps",
            "Handled the partner objection",
            "Maintained premium authority",
            "Secured a firm next step",
          ] }],
        },
        {
          id: "reflect3",
          title: "After the role-play",
          fields: [{ id: "defend", label: "How I defended my premium price", type: "long" }],
        },
        { id: "commit3", title: "My commitment this week", fields: [{ id: "commit", label: "This week I will…", type: "long" }] },
      ],
    },
    {
      id: "w4",
      title: "Mental Mastery & Follow-Up",
      intro: "Selling premium value, resilience and high-conversion follow-up.",
      sections: [
        {
          id: "mirror-check",
          kind: "choice",
          title: "The Psychological Mirror",
          body: "When you quote a room night at R25,000 (about $1,400), what is your honest first thought? In luxury travel a cheap price signals risk, not value. Stop projecting your own budget onto international buyers.",
          fields: [{ id: "thought", type: "choice", options: [
            "\u201CThat's incredible value for a high-end luxury safari experience.\u201D",
            "\u201CThat's insane money, I need a cheaper alternative in case they push back.\u201D",
          ] }],
        },
        {
          id: "mirror",
          title: "Rewrite your value",
          body: "Stop saying I book hotels and safaris. Try: I design secure, end-to-end luxury travel experiences for families who want Southern Africa without any logistical stress.",
          fields: [
            { id: "valueprop", label: "My rewritten value proposition", type: "long" },
            { id: "beliefs", label: "My three top limiting beliefs, reframed positively", type: "long" },
          ],
        },
        {
          id: "followup",
          title: "The High-Conversion Follow-Up",
          body: "Replace just checking in with value. Day 2: a genuine update, a lodge note or a local insight. Day 5: real scarcity, the final rooms over their dates.",
          fields: [{ id: "day2", label: "My Day 2 value-add message for a live client", type: "long" }],
        },
        {
          id: "roleplay4",
          kind: "score",
          title: "Role-play: the Ultimate Premium Pitch",
          body: "You are selling a high-margin package to an executive who says they can book the same hotels themselves. Score yourself after the role-play.",
          fields: [{ id: "score", type: "score", criteria: [
            "Protected the margin with confidence",
            "Shifted price to peace of mind",
            "Avoided cliché sales pitches",
            "Secured firm next steps",
          ] }],
        },
        {
          id: "actionplan",
          title: "My 90-Day Action Plan",
          body: "This is your commitment to yourself. Keep it where you will see it every day.",
          fields: [
            { id: "learned", label: "Three things I have learned from this workshop", type: "long" },
            { id: "habits", label: "The three new daily activities I am adding to increase sales", type: "long" },
            { id: "target", label: "My monthly target, my current average, and my shortfall", type: "long" },
            { id: "routine", label: "My follow-up routine (when a proposal goes out, I follow up on…)", type: "long" },
            { id: "accountable", label: "Who will hold me to this, and when I will check in", type: "long" },
          ],
        },
      ],
    },
  ],
};

const COURSES = { "inbound-travel": INBOUND_TRAVEL };

/* Mark issues a class code to each cohort. Add a line per cohort.
   Any code not listed still works and defaults to the inbound course. */
const CLASSES = {
  "ITSM-01": { course: "inbound-travel", label: "Inbound Travel · Cohort 1", facilitatorCode: "MW-VIEW-01" },
};

/* Ratio dropdown options: 10% to 100% in 5% steps (matches the sheet). */
const RATIOS = Array.from({ length: 19 }, (_, i) => 0.1 + i * 0.05);

/* ============================================================
   Storage layer. Artifact key-value store with in-memory
   fallback. Swap for Supabase when deploying to your own host.
   ============================================================ */
import { store } from "./supabaseStore.js";

const sanitizeCode = (s) => (s || "").trim().toUpperCase().replace(/[^A-Z0-9-]/g, "");
const recordKey = (code, pid) => `resp:${code}:${pid}`;
const assessKey = (code, pid) => `assess:${code}:${pid}`;
const courseForCode = (code) => COURSES[(CLASSES[code] && CLASSES[code].course) || "inbound-travel"];
const labelForCode = (code) => (CLASSES[code] && CLASSES[code].label) || code;
function facilitatorClassFor(code) {
  for (const classCode of Object.keys(CLASSES)) {
    const fc = CLASSES[classCode].facilitatorCode;
    if (fc && sanitizeCode(fc) === code) return classCode;
  }
  return null;
}

/* ---- numbers ---- */
const rnd = (n) => Math.round(n);
const rup = (n) => Math.ceil(n - 1e-9);
const safe = (n) => (isFinite(n) ? n : 0);
function fmtR(n) {
  const v = Math.round(safe(n));
  return "R" + v.toLocaleString("en-ZA").replace(/,/g, " ");
}
function fmtPct(x) { return Math.round(safe(x) * 100) + "%"; }

/* Full Targets & Ratios computation, mirroring the spreadsheet. */
function computeCalc(v) {
  const target = +v.target || 0, avg = +v.avg || 0, leadsDay = +v.leadsDay || 0;
  const ltq = +v.ltq || 0, qtc = +v.qtc || 0, days = +v.days || 0;
  const aLtq = +v.aLtq || ltq, aQtc = +v.aQtc || qtc;
  const leadsMonth = rnd(leadsDay * days);
  const quotesCur = rup(leadsMonth * ltq), quotesAft = rup(leadsMonth * aLtq);
  const bookCur = rup(quotesCur * qtc), bookAft = rup(quotesAft * aQtc);
  const salesCur = bookCur * avg, salesAft = bookAft * avg;
  const extra = salesAft - salesCur;
  const extraPct = salesCur ? (salesAft - salesCur) / salesCur : 0;
  const bookNeeded = avg ? rup(target / avg) : 0;
  const qNeedCur = qtc ? rup(bookNeeded / qtc) : 0, qNeedAft = aQtc ? rup(bookNeeded / aQtc) : 0;
  const lNeedCur = ltq ? rup(qNeedCur / ltq) : 0, lNeedAft = aLtq ? rup(qNeedAft / aLtq) : 0;
  const dailyCur = days ? rup(lNeedCur / days) : 0, dailyAft = days ? rup(lNeedAft / days) : 0;
  return {
    leadsMonth, quotesCur, quotesAft, bookCur, bookAft, salesCur, salesAft, extra, extraPct,
    bookNeeded, dailyCur, dailyAft, fewer: dailyCur - dailyAft,
  };
}

/* ---- answered / counting ---- */
function fieldAnswered(f, raw) {
  if (raw == null || raw === "") return false;
  if (f.type === "calc") {
    try { const v = JSON.parse(raw); return !!(v.target && v.avg); } catch (e) { return false; }
  }
  if (f.type === "diary") {
    try { const v = JSON.parse(raw); return Object.values(v).some((x) => String(x).trim()); } catch (e) { return false; }
  }
  if (f.type === "score") {
    try { const v = JSON.parse(raw); return Object.values(v).some((x) => x && x.score); } catch (e) { return false; }
  }
  return String(raw).trim() !== "";
}
function countFields(course) {
  return course.weeks.reduce((n, w) => n + w.sections.reduce((m, s) => m + s.fields.length, 0), 0);
}
function countAnswered(course, answers) {
  let n = 0;
  course.weeks.forEach((w) => w.sections.forEach((s) => s.fields.forEach((f) => {
    if (fieldAnswered(f, answers[`${w.id}.${s.id}.${f.id}`])) n++;
  })));
  return n;
}

/* ============================================================
   Styles + theme  (Mark's blue)
   ============================================================ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');
.tw-light{
  --bg:#F5F9FC; --surface:#FFFFFF; --surface2:#EEF4FA; --ink:#1B2E3D; --muted:#5C7183;
  --accent:#86B4D9; --accent-strong:#2E5F84; --accent-ink:#2E5F84; --accent-soft:#DCEBF6;
  --on-accent:#12303F; --line:#DCE6EF; --shadow:rgba(20,50,80,.08);
}
.tw-dark{
  --bg:#0E1922; --surface:#16232E; --surface2:#1C2C39; --ink:#E7EEF4; --muted:#9BB0C0;
  --accent:#7FB2D8; --accent-strong:#8FC0E4; --accent-ink:#A9CEE6; --accent-soft:#17313F;
  --on-accent:#0C1E2A; --line:#263A49; --shadow:rgba(0,0,0,.35);
}
.tw-root{ background:var(--bg); color:var(--ink); min-height:100vh;
  font-family:'Inter',ui-sans-serif,system-ui,-apple-system,sans-serif; transition:background .25s,color .25s; }
.tw-serif{ font-family:'Fraunces','Iowan Old Style',Georgia,serif; }
.tw-wrap{ max-width:820px; margin:0 auto; padding:20px 18px 96px; }
.tw-eyebrow{ color:var(--accent-ink); font-weight:600; font-size:12px; letter-spacing:.14em; text-transform:uppercase; }
.tw-card{ background:var(--surface); border:1px solid var(--line); border-radius:16px; box-shadow:0 1px 3px var(--shadow); }
.tw-btn{ font:inherit; font-weight:600; border-radius:11px; padding:11px 18px; border:1px solid var(--line);
  background:var(--surface); color:var(--ink); cursor:pointer; transition:transform .06s, background .2s, border-color .2s; }
.tw-btn:active{ transform:translateY(1px); }
.tw-btn:disabled{ opacity:.45; cursor:not-allowed; }
.tw-primary{ background:var(--accent); border-color:var(--accent); color:var(--on-accent); }
.tw-ghost{ background:transparent; border-color:transparent; color:var(--muted); padding:8px 12px; }
.tw-ghost:hover{ color:var(--ink); }
.tw-input, .tw-area{ width:100%; font:inherit; color:var(--ink); background:var(--surface2);
  border:1px solid var(--line); border-radius:11px; padding:12px 13px; outline:none; transition:border-color .15s, box-shadow .15s; }
.tw-input:focus, .tw-area:focus{ border-color:var(--accent-strong); box-shadow:0 0 0 3px var(--accent-soft); }
.tw-area{ min-height:96px; resize:vertical; line-height:1.5; }
.tw-label{ font-weight:600; font-size:14px; margin-bottom:7px; display:block; }
.tw-muted{ color:var(--muted); }
.tw-chip{ display:inline-flex; align-items:center; gap:6px; font-size:12px; font-weight:600;
  padding:5px 10px; border-radius:999px; background:var(--accent-soft); color:var(--accent-ink); }
.tw-weeks{ display:flex; gap:8px; overflow-x:auto; padding:4px 2px 8px; -webkit-overflow-scrolling:touch; }
.tw-week{ flex:0 0 auto; padding:9px 14px; border-radius:999px; border:1px solid var(--line);
  background:var(--surface); color:var(--muted); font-weight:600; font-size:13px; cursor:pointer; white-space:nowrap; }
.tw-week.on{ background:var(--accent); border-color:var(--accent); color:var(--on-accent); }
.tw-week.done{ border-color:var(--accent-strong); color:var(--accent-ink); }
.tw-bar{ height:5px; border-radius:999px; background:var(--surface2); overflow:hidden; }
.tw-bar > i{ display:block; height:100%; background:var(--accent-strong); border-radius:999px; transition:width .4s ease; }
.tw-row{ display:flex; align-items:center; justify-content:space-between; gap:12px; }
.tw-iconbtn{ display:inline-flex; align-items:center; justify-content:center; width:40px; height:40px;
  border-radius:11px; border:1px solid var(--line); background:var(--surface); color:var(--ink); cursor:pointer; }
.tw-listitem{ text-align:left; width:100%; background:var(--surface); border:1px solid var(--line);
  border-radius:13px; padding:14px 15px; cursor:pointer; transition:border-color .15s; }
.tw-listitem:hover{ border-color:var(--accent-strong); }
.tw-fade{ animation:twf .3s ease; }
@keyframes twf{ from{ opacity:0; transform:translateY(4px);} to{ opacity:1; transform:none;} }
.tw-tbl{ width:100%; border-collapse:collapse; font-size:14px; }
.tw-tbl th{ background:var(--accent-strong); color:#fff; text-align:left; padding:8px 10px; font-weight:600; font-size:13px; }
.tw-tbl td{ border-bottom:1px solid var(--line); padding:7px 10px; vertical-align:middle; }
.tw-tbl tr:nth-child(even) td{ background:var(--surface2); }
.tw-calcgrid{ display:grid; grid-template-columns:1fr 1fr; gap:12px; }
.tw-stat{ background:var(--accent-soft); border:1px solid var(--line); border-radius:12px; padding:12px 14px; }
.tw-stat b{ font-size:22px; color:var(--accent-ink); display:block; }
.tw-scoredots{ display:flex; gap:6px; }
.tw-dot{ width:34px; height:34px; border-radius:9px; border:1px solid var(--line); background:var(--surface2);
  color:var(--muted); font-weight:600; cursor:pointer; display:grid; place-items:center; }
.tw-dot.on{ background:var(--accent); border-color:var(--accent); color:var(--on-accent); }
.tw-opt{ display:block; width:100%; text-align:left; border:1px solid var(--line); background:var(--surface2);
  border-radius:11px; padding:12px 14px; margin-bottom:8px; cursor:pointer; font:inherit; color:var(--ink); }
.tw-opt.on{ border-color:var(--accent-strong); background:var(--accent-soft); box-shadow:0 0 0 2px var(--accent-soft); }
.tw-seg{ display:flex; background:var(--surface2); border-radius:12px; padding:4px; gap:4px; margin-bottom:16px; }
.tw-seg button{ flex:1; font:inherit; font-weight:600; font-size:14px; border:none; border-radius:9px;
  padding:9px; background:transparent; color:var(--muted); cursor:pointer; }
.tw-seg button.on{ background:var(--surface); color:var(--ink); box-shadow:0 1px 2px var(--shadow); }
@media print{
  .tw-noprint{ display:none !important; }
  .tw-root{ background:#fff; color:#000; }
  .tw-wrap{ max-width:none; padding:0; }
  .tw-card{ box-shadow:none; border:1px solid #ccc; break-inside:avoid; }
}
@media (max-width:640px){ .tw-calcgrid{ grid-template-columns:1fr; } }
@media (prefers-reduced-motion: reduce){ .tw-fade{ animation:none; } .tw-bar > i{ transition:none; } }
`;

/* ============================================================
   Small shared bits
   ============================================================ */
function TopBar({ theme, toggleTheme, right }) {
  return (
    <div className="tw-row tw-noprint" style={{ marginBottom: 18 }}>
      <div className="tw-row" style={{ gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: "var(--accent)", display: "grid", placeItems: "center", color: "var(--on-accent)", fontWeight: 700 }} className="tw-serif">M</div>
        <div style={{ fontWeight: 600, fontSize: 14 }}>MW Coaching</div>
      </div>
      <div className="tw-row" style={{ gap: 8 }}>
        {right}
        <button className="tw-iconbtn" onClick={toggleTheme} aria-label="Toggle light or dark theme">
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   Welcome + Entry
   ============================================================ */
function Welcome({ theme, toggleTheme, onStart }) {
  const points = [
    "Work through it live during your Zoom sessions.",
    "Your answers save on their own as you type.",
    "Mark sees them in his dashboard, by week.",
  ];
  return (
    <div className="tw-root">
      <div className="tw-wrap" style={{ maxWidth: 460 }}>
        <TopBar theme={theme} toggleTheme={toggleTheme} />
        <div style={{ marginTop: 34 }}>
          <div className="tw-eyebrow">Live workshop workbook</div>
          <h1 className="tw-serif" style={{ fontSize: 36, lineHeight: 1.08, margin: "10px 0 12px", fontWeight: 600 }}>
            Inbound Travel<br />Sales Mastery
          </h1>
          <p className="tw-muted" style={{ margin: "0 0 24px", fontSize: 15.5, lineHeight: 1.55 }}>
            Your companion for the four-week workshop. Read each section, type your answers, and they go straight to your coach.
          </p>
          <div className="tw-card" style={{ padding: 6, marginBottom: 24 }}>
            {points.map((t, i) => (
              <div key={i} className="tw-row" style={{ gap: 12, padding: "13px 14px", borderBottom: i < points.length - 1 ? "1px solid var(--line)" : "none", justifyContent: "flex-start" }}>
                <span style={{ flex: "0 0 auto", width: 26, height: 26, borderRadius: 8, background: "var(--accent-soft)", color: "var(--accent-ink)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 13 }}>{i + 1}</span>
                <span style={{ fontSize: 14.5 }}>{t}</span>
              </div>
            ))}
          </div>
          <button className="tw-btn tw-primary" style={{ width: "100%" }} onClick={onStart}>Get started</button>
        </div>
      </div>
    </div>
  );
}

function Entry({ theme, toggleTheme, onEnter }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  function go() {
    const c = sanitizeCode(code);
    if (!c) return setErr("Enter the code you were given.");
    const fClass = facilitatorClassFor(c);
    if (fClass) { onEnter({ role: "facilitator", code: fClass, name: "Facilitator" }); return; }
    if (!name.trim()) return setErr("Enter your name so Mark knows whose answers these are.");
    onEnter({ role: "participant", code: c, name: name.trim() });
  }
  return (
    <div className="tw-root">
      <div className="tw-wrap" style={{ maxWidth: 460 }}>
        <TopBar theme={theme} toggleTheme={toggleTheme} />
        <div style={{ marginTop: 26, marginBottom: 22 }}>
          <div className="tw-eyebrow">Live workshop</div>
          <h1 className="tw-serif" style={{ fontSize: 34, lineHeight: 1.1, margin: "8px 0 6px", fontWeight: 600 }}>
            Inbound Travel<br />Sales Mastery
          </h1>
          <p className="tw-muted" style={{ margin: 0 }}>Sign in to your workbook. Your answers save straight to Mark.</p>
        </div>
        <div className="tw-card" style={{ padding: 18 }}>
          <label className="tw-label">Your name</label>
          <input className="tw-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sarah Adams" style={{ marginBottom: 14 }} />
          <label className="tw-label">Class code</label>
          <input className="tw-input" value={code} onChange={(e) => setCode(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") go(); }} placeholder="e.g. ITSM-01" style={{ textTransform: "uppercase" }} />
          {err && <p style={{ color: "#D9534F", fontSize: 13, marginTop: 14, marginBottom: 0 }}>{err}</p>}
          <button className="tw-btn tw-primary" style={{ width: "100%", marginTop: 18 }} onClick={go}>Open my workbook</button>
        </div>
        <p className="tw-muted" style={{ fontSize: 12.5, textAlign: "center", marginTop: 18 }}>
          Information without implementation is just information.
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   Special field renderers (participant)
   ============================================================ */
function CalcField({ value, onChange }) {
  let v = {};
  try { v = value ? JSON.parse(value) : {}; } catch (e) { v = {}; }
  const set = (k, val) => onChange(JSON.stringify({ ...v, [k]: val }));
  const r = computeCalc(v);
  const numInput = (k, ph) => (
    <input className="tw-input" inputMode="numeric" value={v[k] ?? ""} placeholder={ph}
      onChange={(e) => set(k, e.target.value.replace(/[^0-9.]/g, ""))} />
  );
  const ratioSel = (k, fallback) => (
    <select className="tw-input" value={v[k] ?? fallback ?? ""} onChange={(e) => set(k, e.target.value)}>
      <option value="">—</option>
      {RATIOS.map((x) => <option key={x} value={x}>{Math.round(x * 100)}%</option>)}
    </select>
  );
  return (
    <div>
      <div className="tw-calcgrid">
        <div><label className="tw-label">Monthly sales / commission target (R)</label>{numInput("target", "e.g. 60000")}</div>
        <div><label className="tw-label">Average booking value (R)</label>{numInput("avg", "e.g. 15000")}</div>
        <div><label className="tw-label">Leads per day now</label>{numInput("leadsDay", "e.g. 3")}</div>
        <div><label className="tw-label">Working days per month</label>{numInput("days", "e.g. 20")}</div>
        <div><label className="tw-label">Current lead-to-quote ratio</label>{ratioSel("ltq")}</div>
        <div><label className="tw-label">Current quote-to-close ratio</label>{ratioSel("qtc")}</div>
        <div><label className="tw-label">Target lead-to-quote (after workshop)</label>{ratioSel("aLtq")}</div>
        <div><label className="tw-label">Target quote-to-close (after workshop)</label>{ratioSel("aQtc")}</div>
      </div>

      <h4 style={{ margin: "18px 0 8px", fontSize: 14 }}>Your sales: current vs after workshop</h4>
      <p className="tw-muted" style={{ fontSize: 12.5, margin: "0 0 10px" }}>Lead volume stays the same. This is what sharper ratios are worth.</p>
      <div style={{ overflowX: "auto" }}>
        <table className="tw-tbl">
          <thead><tr><th>Per month</th><th>Current</th><th>After</th></tr></thead>
          <tbody>
            <tr><td>Leads</td><td>{r.leadsMonth}</td><td>{r.leadsMonth}</td></tr>
            <tr><td>Quotes</td><td>{r.quotesCur}</td><td>{r.quotesAft}</td></tr>
            <tr><td>Bookings</td><td>{r.bookCur}</td><td>{r.bookAft}</td></tr>
            <tr><td>Monthly sales</td><td>{fmtR(r.salesCur)}</td><td>{fmtR(r.salesAft)}</td></tr>
          </tbody>
        </table>
      </div>
      <div className="tw-calcgrid" style={{ marginTop: 12 }}>
        <div className="tw-stat"><b>{fmtR(r.extra)}</b><span className="tw-muted" style={{ fontSize: 12.5 }}>Extra sales per month</span></div>
        <div className="tw-stat"><b>{fmtPct(r.extraPct)}</b><span className="tw-muted" style={{ fontSize: 12.5 }}>Uplift on current sales</span></div>
      </div>

      <h4 style={{ margin: "18px 0 8px", fontSize: 14 }}>What you need to hit target</h4>
      <div style={{ overflowX: "auto" }}>
        <table className="tw-tbl">
          <thead><tr><th></th><th>Current</th><th>After</th></tr></thead>
          <tbody>
            <tr><td>Bookings needed / month</td><td>{r.bookNeeded}</td><td>{r.bookNeeded}</td></tr>
            <tr><td>Daily lead target</td><td>{r.dailyCur}</td><td>{r.dailyAft}</td></tr>
          </tbody>
        </table>
      </div>
      <div className="tw-stat" style={{ marginTop: 12 }}>
        <b>{r.fewer} fewer leads a day</b>
        <span className="tw-muted" style={{ fontSize: 12.5 }}>What the workshop saves you in daily hustle to hit the same target</span>
      </div>
    </div>
  );
}

const DIARY_SLOTS = ["07h00 – 07h30","07h30 – 08h00","08h00 – 08h30","08h30 – 09h00","09h00 – 09h30","09h30 – 10h00","10h00 – 10h30","10h30 – 11h00","11h00 – 11h30","11h30 – 12h00","12h00 – 12h30","12h30 – 13h00","13h00 – 13h30","13h30 – 14h00","14h00 – 14h30","14h30 – 15h00","15h00 – 15h30","15h30 – 16h00","16h00 – 16h30","16h30 – 17h00","17h00 – 17h30","17h30 – 18h00"];
function DiaryField({ value, onChange }) {
  let v = {};
  try { v = value ? JSON.parse(value) : {}; } catch (e) { v = {}; }
  const set = (slot, val) => onChange(JSON.stringify({ ...v, [slot]: val }));
  return (
    <div style={{ overflowX: "auto" }}>
      <table className="tw-tbl">
        <thead><tr><th style={{ width: 130 }}>Time</th><th>Day 1</th></tr></thead>
        <tbody>
          {DIARY_SLOTS.map((s) => (
            <tr key={s}>
              <td style={{ whiteSpace: "nowrap", fontWeight: 600 }}>{s}</td>
              <td style={{ padding: 4 }}>
                <input className="tw-input" style={{ padding: "7px 10px" }} value={v[s] || ""} onChange={(e) => set(s, e.target.value)} placeholder="…" />
              </td>
            </tr>
          ))}
          <tr>
            <td style={{ fontWeight: 600 }}>Notes</td>
            <td style={{ padding: 4 }}><input className="tw-input" style={{ padding: "7px 10px" }} value={v["notes"] || ""} onChange={(e) => set("notes", e.target.value)} placeholder="…" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function ChoiceField({ field, value, onChange }) {
  return (
    <div>
      {field.options.map((opt, i) => (
        <button key={i} type="button" className={`tw-opt ${value === opt ? "on" : ""}`} onClick={() => onChange(opt)}>{opt}</button>
      ))}
    </div>
  );
}

function ScoreField({ field, value, onChange }) {
  let v = {};
  try { v = value ? JSON.parse(value) : {}; } catch (e) { v = {}; }
  const set = (crit, patch) => onChange(JSON.stringify({ ...v, [crit]: { ...(v[crit] || {}), ...patch } }));
  return (
    <div>
      {field.criteria.map((crit, i) => {
        const cur = v[crit] || {};
        return (
          <div key={i} style={{ marginBottom: 14, paddingBottom: 12, borderBottom: i < field.criteria.length - 1 ? "1px solid var(--line)" : "none" }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{crit}</div>
            <div className="tw-scoredots" style={{ marginBottom: 8 }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" className={`tw-dot ${cur.score === n ? "on" : ""}`} onClick={() => set(crit, { score: n })}>{n}</button>
              ))}
            </div>
            <input className="tw-input" style={{ padding: "8px 11px" }} placeholder="Notes to work on (optional)" value={cur.note || ""} onChange={(e) => set(crit, { note: e.target.value })} />
          </div>
        );
      })}
      <p className="tw-muted" style={{ fontSize: 12, margin: 0 }}>Score yourself 1 (low) to 5 (strong).</p>
    </div>
  );
}

function Field({ f, value, onChange }) {
  if (f.type === "calc") return <CalcField value={value} onChange={onChange} />;
  if (f.type === "diary") return <DiaryField value={value} onChange={onChange} />;
  if (f.type === "choice") return <ChoiceField field={f} value={value} onChange={onChange} />;
  if (f.type === "score") return <ScoreField field={f} value={value} onChange={onChange} />;
  return (
    <>
      <label className="tw-label">{f.label}</label>
      {f.type === "short"
        ? <input className="tw-input" value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder="Type your answer" />
        : <textarea className="tw-area" value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder="Type your answer" />}
    </>
  );
}

/* ============================================================
   Participant workbook
   ============================================================ */
function Workbook({ session, theme, toggleTheme, onLeave }) {
  const course = courseForCode(session.code);
  const [answers, setAnswers] = useState({});
  const [wi, setWi] = useState(0);
  const [status, setStatus] = useState("idle");
  const [loaded, setLoaded] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    (async () => {
      const raw = await store.get(recordKey(session.code, session.pid), true);
      if (raw) { try { const rec = JSON.parse(raw); setAnswers(rec.answers || {}); } catch (e) {} }
      setLoaded(true);
    })();
  }, [session.code, session.pid]);

  const persist = useCallback(async (next) => {
    setStatus("saving");
    const rec = { pid: session.pid, name: session.name, updatedAt: Date.now(), answers: next };
    await store.set(recordKey(session.code, session.pid), JSON.stringify(rec), true);
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 1400);
  }, [session]);

  function onChange(fieldKey, value) {
    setAnswers((prev) => {
      const next = { ...prev, [fieldKey]: value };
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => persist(next), 900);
      return next;
    });
  }

  const total = countFields(course);
  const answered = countAnswered(course, answers);
  const pct = total ? Math.round((answered / total) * 100) : 0;
  const week = course.weeks[wi];
  const weekDone = (w) => w.sections.every((s) => s.fields.every((f) => fieldAnswered(f, answers[`${w.id}.${s.id}.${f.id}`])));

  return (
    <div className="tw-root">
      <div className="tw-wrap">
        <TopBar theme={theme} toggleTheme={toggleTheme}
          right={<button className="tw-ghost tw-btn" onClick={onLeave}><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><LogOut size={15} /> Leave</span></button>} />
        <div style={{ marginBottom: 14 }}>
          <div className="tw-eyebrow">{labelForCode(session.code)}</div>
          <h1 className="tw-serif" style={{ fontSize: 27, margin: "6px 0 2px", fontWeight: 600 }}>{course.title}</h1>
          <div className="tw-row">
            <span className="tw-muted" style={{ fontSize: 13.5 }}>Welcome, {session.name.split(" ")[0]}</span>
            <span className="tw-muted" style={{ fontSize: 13 }}>{answered} of {total} answered</span>
          </div>
          <div className="tw-bar" style={{ marginTop: 8 }}><i style={{ width: pct + "%" }} /></div>
        </div>
        <div className="tw-weeks">
          {course.weeks.map((w, i) => (
            <button key={w.id} className={`tw-week ${i === wi ? "on" : ""} ${weekDone(w) ? "done" : ""}`} onClick={() => setWi(i)}>
              {weekDone(w) && i !== wi ? <Check size={13} style={{ marginRight: 5, verticalAlign: "-2px" }} /> : null}
              Week {i + 1}
            </button>
          ))}
        </div>
        <div className="tw-fade" key={week.id}>
          <div style={{ margin: "14px 2px 16px" }}>
            <h2 className="tw-serif" style={{ fontSize: 21, margin: "0 0 4px", fontWeight: 600 }}>{week.title}</h2>
            <p className="tw-muted" style={{ margin: 0, fontSize: 14 }}>{week.intro}</p>
          </div>
          {week.sections.map((s) => (
            <div key={s.id} className="tw-card" style={{ padding: 18, marginBottom: 14 }}>
              <h3 style={{ margin: "0 0 8px", fontSize: 16.5, fontWeight: 600 }}>{s.title}</h3>
              {s.body && <p className="tw-muted" style={{ margin: "0 0 15px", fontSize: 14, lineHeight: 1.55 }}>{s.body}</p>}
              {s.fields.map((f) => (
                <div key={f.id} style={{ marginBottom: 14 }}>
                  <Field f={f} value={answers[`${week.id}.${s.id}.${f.id}`]} onChange={(val) => onChange(`${week.id}.${s.id}.${f.id}`, val)} />
                </div>
              ))}
            </div>
          ))}
          <div className="tw-row" style={{ marginTop: 18 }}>
            <button className="tw-btn" disabled={wi === 0} onClick={() => setWi((n) => Math.max(0, n - 1))}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><ArrowLeft size={16} /> Previous</span>
            </button>
            <span className="tw-chip">{status === "saving" ? "Saving…" : status === "saved" ? <><Check size={13} /> Saved for Mark</> : "Saves as you type"}</span>
            <button className="tw-btn tw-primary" disabled={wi === course.weeks.length - 1} onClick={() => setWi((n) => Math.min(course.weeks.length - 1, n + 1))}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>Next <ChevronRight size={16} /></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Facilitator: read one participant's answer nicely
   ============================================================ */
function ReadValue({ f, raw }) {
  if (f.type === "calc") {
    let v = {}; try { v = JSON.parse(raw); } catch (e) {}
    const r = computeCalc(v);
    return (
      <div className="tw-muted" style={{ fontSize: 13.5, lineHeight: 1.6 }}>
        Target {fmtR(v.target)} · avg booking {fmtR(v.avg)} · {v.leadsDay || 0} leads/day · ratios {fmtPct(+v.ltq || 0)}→{fmtPct(+v.aLtq || +v.ltq || 0)} and {fmtPct(+v.qtc || 0)}→{fmtPct(+v.aQtc || +v.qtc || 0)}.
        <br /><b>Current sales {fmtR(r.salesCur)} → after {fmtR(r.salesAft)}</b> ({fmtR(r.extra)}, {fmtPct(r.extraPct)}). {r.fewer} fewer leads/day needed.
      </div>
    );
  }
  if (f.type === "diary") {
    let v = {}; try { v = JSON.parse(raw); } catch (e) {}
    const filled = Object.entries(v).filter(([k, val]) => String(val).trim());
    return <div className="tw-muted" style={{ fontSize: 13.5 }}>{filled.length ? filled.map(([k, val]) => <div key={k}>{k === "notes" ? "Notes" : k}: {val}</div>) : "—"}</div>;
  }
  if (f.type === "choice") return <div style={{ fontSize: 14 }}>{raw}</div>;
  if (f.type === "score") {
    let v = {}; try { v = JSON.parse(raw); } catch (e) {}
    return (
      <div style={{ fontSize: 13.5 }}>
        {Object.entries(v).map(([crit, val]) => (
          <div key={crit} style={{ marginBottom: 3 }}><b>{val.score || "–"}/5</b> {crit}{val.note ? <span className="tw-muted"> — {val.note}</span> : null}</div>
        ))}
      </div>
    );
  }
  return <div style={{ whiteSpace: "pre-wrap", fontSize: 14 }}>{raw}</div>;
}

/* ============================================================
   Facilitator dashboard  (answers + private assessment + report)
   ============================================================ */
function Dashboard({ session, theme, toggleTheme, onLeave }) {
  const course = courseForCode(session.code);
  const [people, setPeople] = useState([]);
  const [sel, setSel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("answers"); // answers | assess | report
  const [assess, setAssess] = useState({ weeks: {}, overall: "", company: "", manager: "", date: "", recommendation: "" });
  const [aStatus, setAStatus] = useState("idle");
  const aTimer = useRef(null);

  const load = useCallback(async () => {
    setLoading(true);
    const keys = await store.list(`resp:${session.code}:`, true);
    const recs = [];
    for (const k of keys) {
      const raw = await store.get(k, true);
      if (!raw) continue;
      try { recs.push(JSON.parse(raw)); } catch (e) {}
    }
    recs.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    setPeople(recs);
    setLoading(false);
  }, [session.code]);
  useEffect(() => { load(); }, [load]);

  // load this participant's assessment when opened
  useEffect(() => {
    if (!sel) return;
    setTab("answers");
    (async () => {
      const raw = await store.get(assessKey(session.code, sel.pid), true);
      const blank = { weeks: {}, overall: "", company: "", manager: "", date: "", recommendation: "" };
      if (raw) { try { setAssess({ ...blank, ...JSON.parse(raw) }); } catch (e) { setAssess(blank); } }
      else setAssess(blank);
    })();
  }, [sel, session.code]);

  const saveAssess = useCallback(async (next) => {
    if (!sel) return;
    setAStatus("saving");
    await store.set(assessKey(session.code, sel.pid), JSON.stringify(next), true);
    setAStatus("saved");
    setTimeout(() => setAStatus("idle"), 1400);
  }, [sel, session.code]);

  function editAssess(patch) {
    setAssess((prev) => {
      const next = { ...prev, ...patch, weeks: { ...prev.weeks, ...(patch.weeks || {}) } };
      if (aTimer.current) clearTimeout(aTimer.current);
      aTimer.current = setTimeout(() => saveAssess(next), 900);
      return next;
    });
  }

  const total = countFields(course);

  return (
    <div className="tw-root">
      <div className="tw-wrap">
        <TopBar theme={theme} toggleTheme={toggleTheme}
          right={<button className="tw-ghost tw-btn" onClick={onLeave}><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><LogOut size={15} /> Leave</span></button>} />

        {!sel && (
          <>
            <div className="tw-row" style={{ marginBottom: 14 }}>
              <div>
                <div className="tw-eyebrow">Facilitator view</div>
                <h1 className="tw-serif" style={{ fontSize: 26, margin: "6px 0 2px", fontWeight: 600 }}>{labelForCode(session.code)}</h1>
                <p className="tw-muted" style={{ margin: 0, fontSize: 13.5 }}>{people.length} {people.length === 1 ? "participant" : "participants"} signed in</p>
              </div>
              <button className="tw-iconbtn" onClick={load} aria-label="Refresh"><RefreshCw size={18} /></button>
            </div>
            {loading ? (
              <div className="tw-card tw-muted" style={{ padding: 22, textAlign: "center" }}>Loading answers…</div>
            ) : people.length === 0 ? (
              <div className="tw-card" style={{ padding: 24, textAlign: "center" }}>
                <Users size={26} style={{ color: "var(--accent-strong)" }} />
                <p style={{ margin: "10px 0 4px", fontWeight: 600 }}>No participants yet</p>
                <p className="tw-muted" style={{ margin: 0, fontSize: 14 }}>Share the class code <b>{session.code}</b>. Answers land here as they type. Tap refresh to update.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gap: 10 }}>
                {people.map((p) => {
                  const done = countAnswered(course, p.answers || {});
                  const pct = total ? Math.round((done / total) * 100) : 0;
                  return (
                    <button key={p.pid} className="tw-listitem" onClick={() => setSel(p)}>
                      <div className="tw-row"><span style={{ fontWeight: 600 }}>{p.name}</span><span className="tw-chip">{pct}%</span></div>
                      <div className="tw-bar" style={{ marginTop: 10 }}><i style={{ width: pct + "%" }} /></div>
                      <div className="tw-muted" style={{ fontSize: 12, marginTop: 8 }}>{done} of {total} answered</div>
                    </button>
                  );
                })}
              </div>
            )}
            <p className="tw-muted" style={{ fontSize: 12, textAlign: "center", marginTop: 20 }}>Answers refresh when you tap the refresh button.</p>
          </>
        )}

        {sel && (
          <div className="tw-fade">
            <button className="tw-ghost tw-btn tw-noprint" onClick={() => setSel(null)} style={{ marginBottom: 8, paddingLeft: 0 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><ArrowLeft size={16} /> All participants</span>
            </button>
            <h1 className="tw-serif" style={{ fontSize: 24, margin: "0 0 14px", fontWeight: 600 }}>{sel.name}</h1>

            <div className="tw-seg tw-noprint">
              <button className={tab === "answers" ? "on" : ""} onClick={() => setTab("answers")}>Their answers</button>
              <button className={tab === "assess" ? "on" : ""} onClick={() => setTab("assess")}>My assessment</button>
              <button className={tab === "report" ? "on" : ""} onClick={() => setTab("report")}>Report</button>
            </div>

            {/* ---- their answers ---- */}
            {tab === "answers" && course.weeks.map((w) => {
              const rows = [];
              w.sections.forEach((s) => s.fields.forEach((f) => {
                const raw = (sel.answers || {})[`${w.id}.${s.id}.${f.id}`];
                if (fieldAnswered(f, raw)) rows.push({ f, label: f.label || s.title, raw });
              }));
              if (!rows.length) return null;
              return (
                <div key={w.id} style={{ marginBottom: 18 }}>
                  <div className="tw-eyebrow" style={{ marginBottom: 8 }}>{w.title}</div>
                  {rows.map((r, i) => (
                    <div key={i} className="tw-card" style={{ padding: 14, marginBottom: 10 }}>
                      <div className="tw-muted" style={{ fontSize: 12.5, marginBottom: 5 }}>{r.label}</div>
                      <ReadValue f={r.f} raw={r.raw} />
                    </div>
                  ))}
                </div>
              );
            })}

            {/* ---- Mark's private assessment ---- */}
            {tab === "assess" && (
              <div>
                <p className="tw-muted" style={{ fontSize: 13.5, marginTop: 0 }}>Private to you. Participants never see this. Everything here flows into the management report on the next tab.</p>
                <div className="tw-card" style={{ padding: 16, marginBottom: 12 }}>
                  <label className="tw-label">Report details</label>
                  <div className="tw-calcgrid">
                    <div><input className="tw-input" placeholder="Company / organisation" value={assess.company || ""} onChange={(e) => editAssess({ company: e.target.value })} /></div>
                    <div><input className="tw-input" placeholder="Attention (manager, optional)" value={assess.manager || ""} onChange={(e) => editAssess({ manager: e.target.value })} /></div>
                    <div><input className="tw-input" placeholder="Date (e.g. 15 March 2026)" value={assess.date || ""} onChange={(e) => editAssess({ date: e.target.value })} /></div>
                  </div>
                </div>
                {course.weeks.map((w, i) => (
                  <div key={w.id} className="tw-card" style={{ padding: 16, marginBottom: 12 }}>
                    <label className="tw-label">Module {i + 1}: {w.title}</label>
                    <textarea className="tw-area" placeholder="How did they do in this module?" value={assess.weeks[w.id] || ""}
                      onChange={(e) => editAssess({ weeks: { [w.id]: e.target.value } })} />
                  </div>
                ))}
                <div className="tw-card" style={{ padding: 16, marginBottom: 12, borderColor: "var(--accent-strong)" }}>
                  <label className="tw-label">Overall assessment</label>
                  <textarea className="tw-area" placeholder="Your overall view of this participant across the course." value={assess.overall || ""}
                    onChange={(e) => editAssess({ overall: e.target.value })} />
                </div>
                <div className="tw-card" style={{ padding: 16, marginBottom: 12 }}>
                  <label className="tw-label">Recommendation / next steps (optional)</label>
                  <textarea className="tw-area" placeholder="What you would suggest for this person going forward." value={assess.recommendation || ""}
                    onChange={(e) => editAssess({ recommendation: e.target.value })} />
                </div>
                <span className="tw-chip">{aStatus === "saving" ? "Saving…" : aStatus === "saved" ? <><Check size={13} /> Saved</> : "Saves as you type"}</span>
              </div>
            )}

            {/* ---- printable report for management ---- */}
            {tab === "report" && (() => {
              const totalF = countFields(course);
              const done = countAnswered(course, sel.answers || {});
              const pct = totalF ? Math.round((done / totalF) * 100) : 0;
              return (
              <div>
                <button className="tw-btn tw-primary tw-noprint" style={{ marginBottom: 14 }} onClick={() => window.print()}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Printer size={16} /> Print / save as PDF</span>
                </button>
                <div className="tw-card" style={{ padding: 26 }}>
                  {/* header */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12, borderBottom: "3px solid var(--accent)", paddingBottom: 12, marginBottom: 16 }}>
                    <div className="tw-serif" style={{ width: 40, height: 40, borderRadius: 10, background: "var(--accent)", color: "var(--on-accent)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 20 }}>M</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: "var(--accent-ink)" }}>MW COACHING</div>
                      <div className="tw-muted" style={{ fontSize: 12 }}>Mark Wyngaard · Head Coach</div>
                    </div>
                  </div>

                  <div className="tw-eyebrow">Participant Feedback Report</div>
                  <h2 className="tw-serif" style={{ fontSize: 24, margin: "6px 0 10px", fontWeight: 600 }}>{sel.name}</h2>

                  {/* meta */}
                  <div style={{ fontSize: 13.5, lineHeight: 1.7, marginBottom: 16 }}>
                    {assess.company ? <div><b>Prepared for:</b> {assess.company}</div> : null}
                    {assess.manager ? <div><b>Attention:</b> {assess.manager}</div> : null}
                    <div><b>Programme:</b> {course.title}</div>
                    <div><b>Cohort:</b> {labelForCode(session.code)}</div>
                    {assess.date ? <div><b>Date:</b> {assess.date}</div> : null}
                    <div><b>Engagement:</b> completed {done} of {totalF} workbook sections ({pct}%)</div>
                  </div>

                  <p style={{ fontSize: 14, lineHeight: 1.6, margin: "0 0 18px" }}>
                    The following summarises {sel.name.split(" ")[0]}'s participation and development across the four-week Inbound Travel Sales Mastery programme, module by module, with an overall assessment and recommendation.
                  </p>

                  {/* module feedback */}
                  {course.weeks.map((w, i) => (
                    <div key={w.id} style={{ marginBottom: 13, breakInside: "avoid" }}>
                      <div style={{ fontWeight: 600, fontSize: 14.5, color: "var(--accent-ink)", marginBottom: 3 }}>Module {i + 1}: {w.title}</div>
                      <div style={{ fontSize: 14, whiteSpace: "pre-wrap", lineHeight: 1.55 }}>{assess.weeks[w.id] || <span className="tw-muted">No specific notes recorded for this module.</span>}</div>
                    </div>
                  ))}

                  <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--line)", breakInside: "avoid" }}>
                    <div style={{ fontWeight: 600, fontSize: 14.5, color: "var(--accent-ink)", marginBottom: 3 }}>Overall assessment</div>
                    <div style={{ fontSize: 14, whiteSpace: "pre-wrap", lineHeight: 1.55 }}>{assess.overall || <span className="tw-muted">—</span>}</div>
                  </div>

                  {assess.recommendation ? (
                    <div style={{ marginTop: 14, breakInside: "avoid" }}>
                      <div style={{ fontWeight: 600, fontSize: 14.5, color: "var(--accent-ink)", marginBottom: 3 }}>Recommendation &amp; next steps</div>
                      <div style={{ fontSize: 14, whiteSpace: "pre-wrap", lineHeight: 1.55 }}>{assess.recommendation}</div>
                    </div>
                  ) : null}

                  {/* sign-off */}
                  <div style={{ marginTop: 22, paddingTop: 14, borderTop: "1px solid var(--line)", fontSize: 13 }}>
                    <div style={{ fontWeight: 600 }}>Mark Wyngaard</div>
                    <div className="tw-muted">Head Coach, MW Coaching</div>
                    <div className="tw-muted">062 404 5744 · mark@markwyngaard.com · www.markwyngaard.com</div>
                  </div>
                </div>
                <p className="tw-muted tw-noprint" style={{ fontSize: 12, marginTop: 12 }}>Fill in the company, attention and date on the “My assessment” tab so the report is addressed correctly before you send it.</p>
              </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   Root
   ============================================================ */
export default function App() {
  const [theme, setTheme] = useState("light");
  const [screen, setScreen] = useState("welcome"); // welcome | entry | app
  const [session, setSession] = useState(null);
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  useEffect(() => {
    (async () => {
      const t = await store.get("theme");
      if (t) setTheme(t);
      const s = await store.get("session");
      if (s) { try { const parsed = JSON.parse(s); setSession(parsed); setScreen("app"); } catch (e) {} }
    })();
  }, []);
  useEffect(() => { store.set("theme", theme); }, [theme]);

  function enter(sess) {
    const withPid = sess.role === "participant"
      ? { ...sess, pid: sanitizeCode(sess.name).slice(0, 24) || "P" + Date.now() }
      : sess;
    setSession(withPid);
    store.set("session", JSON.stringify(withPid));
    setScreen("app");
  }
  function leave() {
    setSession(null);
    store.del("session");
    setScreen("entry");
  }

  return (
    <div className={theme === "dark" ? "tw-dark" : "tw-light"}>
      <style>{CSS}</style>
      {screen === "welcome" && <Welcome theme={theme} toggleTheme={toggleTheme} onStart={() => setScreen("entry")} />}
      {screen === "entry" && <Entry theme={theme} toggleTheme={toggleTheme} onEnter={enter} />}
      {screen === "app" && session && session.role === "facilitator" && <Dashboard session={session} theme={theme} toggleTheme={toggleTheme} onLeave={leave} />}
      {screen === "app" && session && session.role === "participant" && <Workbook session={session} theme={theme} toggleTheme={toggleTheme} onLeave={leave} />}
    </div>
  );
}
