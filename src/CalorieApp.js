import { useState } from "react";

const C = {
  bg: "#0d0f14", surface: "#13161e", card: "#181c27", border: "#1f2535",
  accent: "#22d3a5", accentDim: "#16a37c", accentGlow: "rgba(34,211,165,0.15)",
  warn: "#f97316", danger: "#ef4444", gold: "#f59e0b",
  text: "#e8eaf0", muted: "#6b7280", subtle: "#374151",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${C.bg}; color: ${C.text}; font-family: 'DM Sans', sans-serif; min-height: 100vh; }
  .app { max-width: 520px; margin: 0 auto; padding: 0 0 80px; }
  .header { padding: 36px 24px 20px; text-align: center; position: relative; }
  .header::after { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 70% 50% at 50% 0%, ${C.accentGlow}, transparent); pointer-events: none; }
  .header-tag { display: inline-block; background: ${C.accentGlow}; border: 1px solid ${C.accent}44; color: ${C.accent}; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; margin-bottom: 12px; font-family: 'Syne', sans-serif; }
  .header h1 { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; line-height: 1.1; color: ${C.text}; letter-spacing: -0.5px; }
  .header h1 span { color: ${C.accent}; }
  .header p { color: ${C.muted}; font-size: 13px; margin-top: 8px; font-weight: 300; }
  .card { background: ${C.card}; border: 1px solid ${C.border}; border-radius: 20px; margin: 8px 16px; padding: 24px; animation: slideUp 0.35s ease; }
  @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  .card-title { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; color: ${C.text}; margin-bottom: 4px; display: flex; align-items: center; gap: 8px; }
  .card-sub { font-size: 12px; color: ${C.muted}; margin-bottom: 20px; line-height: 1.5; }
  .field { margin-bottom: 16px; }
  .field label { display: block; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: ${C.muted}; margin-bottom: 6px; font-weight: 500; }
  .field input, .field select { width: 100%; background: ${C.surface}; border: 1px solid ${C.border}; color: ${C.text}; border-radius: 10px; padding: 11px 14px; font-size: 14px; font-family: 'DM Sans', sans-serif; outline: none; transition: border-color 0.2s; appearance: none; }
  .field input:focus, .field select:focus { border-color: ${C.accent}88; box-shadow: 0 0 0 3px ${C.accentGlow}; }
  .toggle-group { display: flex; gap: 8px; flex-wrap: wrap; }
  .toggle-btn { flex: 1; min-width: 80px; padding: 9px 10px; border-radius: 10px; border: 1px solid ${C.border}; background: ${C.surface}; color: ${C.muted}; font-size: 12px; font-family: 'DM Sans', sans-serif; font-weight: 500; cursor: pointer; transition: all 0.2s; text-align: center; }
  .toggle-btn.active { background: ${C.accentGlow}; border-color: ${C.accent}88; color: ${C.accent}; }
  .row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .btn-primary { width: 100%; background: ${C.accent}; color: #0d0f14; border: none; border-radius: 12px; padding: 14px; font-size: 14px; font-family: 'Syne', sans-serif; font-weight: 700; cursor: pointer; transition: all 0.2s; margin-top: 4px; }
  .btn-primary:hover { background: ${C.accentDim}; }
  .btn-secondary { background: transparent; color: ${C.muted}; border: 1px solid ${C.border}; border-radius: 12px; padding: 12px; font-size: 13px; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s; width: 100%; margin-top: 8px; }
  .result-ring-wrap { display: flex; flex-direction: column; align-items: center; margin: 8px 0 24px; }
  .result-ring { position: relative; width: 160px; height: 160px; margin-bottom: 16px; }
  .result-ring svg { transform: rotate(-90deg); }
  .result-ring .ring-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .ring-kcal { font-family: 'Syne', sans-serif; font-size: 30px; font-weight: 800; color: ${C.accent}; line-height: 1; }
  .ring-label { font-size: 10px; color: ${C.muted}; letter-spacing: 1px; text-transform: uppercase; }
  .macro-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; width: 100%; margin-bottom: 20px; }
  .macro-card { background: ${C.surface}; border: 1px solid ${C.border}; border-radius: 12px; padding: 12px 8px; text-align: center; }
  .macro-val { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; margin-bottom: 2px; }
  .macro-name { font-size: 10px; color: ${C.muted}; text-transform: uppercase; letter-spacing: 1px; }
  .insight-box { background: linear-gradient(135deg, ${C.accentGlow}, transparent); border: 1px solid ${C.accent}33; border-radius: 14px; padding: 16px; margin-bottom: 16px; }
  .insight-box h3 { font-family: 'Syne', sans-serif; font-size: 13px; color: ${C.accent}; margin-bottom: 8px; }
  .insight-box p, .insight-box li { font-size: 12.5px; color: ${C.text}cc; line-height: 1.6; }
  .insight-box ul { padding-left: 16px; }
  .insight-box li { margin-bottom: 4px; }
  .plan-timeline { display: flex; flex-direction: column; gap: 2px; }
  .timeline-item { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid ${C.border}; }
  .timeline-item:last-child { border-bottom: none; }
  .timeline-num { width: 28px; height: 28px; border-radius: 50%; background: ${C.accentGlow}; border: 1px solid ${C.accent}44; color: ${C.accent}; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 11px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .timeline-text { font-size: 12.5px; color: ${C.text}cc; line-height: 1.4; }
  .timeline-text strong { color: ${C.text}; font-weight: 500; }
  .bmi-bar-wrap { margin: 16px 0; }
  .bmi-bar-labels { display: flex; justify-content: space-between; font-size: 10px; color: ${C.muted}; margin-bottom: 4px; }
  .bmi-bar-track { height: 8px; border-radius: 4px; background: linear-gradient(to right, #3b82f6 0%, #22d3a5 20%, #f59e0b 40%, #ef4444 65%, #7c3aed 100%); position: relative; margin-bottom: 6px; }
  .bmi-indicator { position: absolute; top: -4px; width: 16px; height: 16px; border-radius: 50%; background: white; border: 2px solid ${C.bg}; box-shadow: 0 0 0 2px ${C.accent}; transform: translateX(-50%); transition: left 0.6s ease; }
  .bmi-value { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; text-align: center; margin-bottom: 4px; }
  .bmi-cat { text-align: center; font-size: 12px; color: ${C.muted}; }
  .food-search-row { display: flex; gap: 8px; margin-bottom: 12px; }
  .food-search-row input { flex: 1; background: ${C.surface}; border: 1px solid ${C.border}; color: ${C.text}; border-radius: 10px; padding: 10px 14px; font-size: 13px; font-family: 'DM Sans', sans-serif; outline: none; }
  .food-search-row button { background: ${C.accent}; color: #0d0f14; border: none; border-radius: 10px; padding: 10px 16px; font-size: 12px; font-family: 'Syne', sans-serif; font-weight: 700; cursor: pointer; }
  .food-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; background: ${C.surface}; border: 1px solid ${C.border}; border-radius: 10px; margin-bottom: 6px; font-size: 12.5px; }
  .food-item-name { color: ${C.text}; }
  .food-item-kcal { color: ${C.accent}; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 13px; }
  .food-add-btn { background: ${C.accentGlow}; border: 1px solid ${C.accent}44; color: ${C.accent}; border-radius: 6px; padding: 4px 10px; font-size: 11px; cursor: pointer; font-family: 'Syne', sans-serif; font-weight: 700; transition: all 0.2s; }
  .daily-log-item { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid ${C.border}; font-size: 12.5px; }
  .daily-log-item:last-child { border-bottom: none; }
  .log-remove { background: none; border: none; color: ${C.danger}; cursor: pointer; font-size: 14px; padding: 2px 6px; }
  .progress-bar-wrap { margin-bottom: 10px; }
  .progress-bar-label { display: flex; justify-content: space-between; font-size: 11px; color: ${C.muted}; margin-bottom: 4px; }
  .progress-bar-track { height: 6px; background: ${C.border}; border-radius: 3px; overflow: hidden; }
  .progress-bar-fill { height: 100%; border-radius: 3px; transition: width 0.5s ease; }
  .bottom-nav { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 520px; background: ${C.surface}; border-top: 1px solid ${C.border}; display: flex; z-index: 100; }
  .nav-btn { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px 8px; background: none; border: none; color: ${C.muted}; cursor: pointer; font-size: 9px; font-family: 'DM Sans', sans-serif; gap: 4px; transition: color 0.2s; }
  .nav-btn.active { color: ${C.accent}; }
  .section-divider { display: flex; align-items: center; gap: 10px; margin: 4px 0 16px; color: ${C.muted}; font-size: 11px; }
  .section-divider::before, .section-divider::after { content: ''; flex: 1; height: 1px; background: ${C.border}; }
  .tip-chip { display: inline-block; background: ${C.surface}; border: 1px solid ${C.border}; border-radius: 20px; padding: 4px 12px; font-size: 11px; color: ${C.muted}; margin: 3px; }
  select option { background: ${C.card}; }
`;

const FOODS = [
  { name: "دجاج مشوي (100g)", kcal: 165, p: 31, c: 0, f: 3.6 },
  { name: "أرز أبيض مطبوخ (100g)", kcal: 130, p: 2.7, c: 28, f: 0.3 },
  { name: "بيضة كاملة (50g)", kcal: 72, p: 6, c: 0.4, f: 5 },
  { name: "لبن (240ml)", kcal: 149, p: 8, c: 12, f: 8 },
  { name: "خبز توست (30g)", kcal: 80, p: 3, c: 15, f: 1 },
  { name: "موز (100g)", kcal: 89, p: 1.1, c: 23, f: 0.3 },
  { name: "تفاحة (100g)", kcal: 52, p: 0.3, c: 14, f: 0.2 },
  { name: "لوز (30g)", kcal: 174, p: 6, c: 6, f: 15 },
  { name: "سمك سلمون (100g)", kcal: 208, p: 20, c: 0, f: 13 },
  { name: "عدس مطبوخ (100g)", kcal: 116, p: 9, c: 20, f: 0.4 },
  { name: "بطاطا مسلوقة (100g)", kcal: 87, p: 1.9, c: 20, f: 0.1 },
  { name: "زيت زيتون (10ml)", kcal: 88, p: 0, c: 0, f: 10 },
  { name: "جبن أبيض (30g)", kcal: 75, p: 4, c: 1, f: 6 },
];

const ACTIVITY = [
  { id: "sedentary", label: "مستقر", desc: "لا تمرين", factor: 1.2 },
  { id: "light", label: "خفيف", desc: "1-3 أيام/أسبوع", factor: 1.375 },
  { id: "moderate", label: "متوسط", desc: "3-5 أيام/أسبوع", factor: 1.55 },
  { id: "active", label: "نشط", desc: "6-7 أيام/أسبوع", factor: 1.725 },
  { id: "very_active", label: "مكثف", desc: "يومياً + عمل بدني", factor: 1.9 },
];

const GOALS = [
  { id: "lose_fast", label: "خسارة سريعة", delta: -700, color: "#ef4444" },
  { id: "lose", label: "خسارة معتدلة", delta: -400, color: "#f97316" },
  { id: "maintain", label: "الحفاظ على الوزن", delta: 0, color: "#22d3a5" },
  { id: "gain", label: "زيادة معتدلة", delta: 300, color: "#60a5fa" },
  { id: "gain_fast", label: "زيادة سريعة", delta: 600, color: "#a78bfa" },
];

function calcBMR(w, h, a, g) {
  if (g === "male") return 10 * w + 6.25 * h - 5 * a + 5;
  if (g === "female") return 10 * w + 6.25 * h - 5 * a - 161;
  return 10 * w + 6.25 * h - 5 * a - 78;
}

function bmiCategory(bmi) {
  if (bmi < 18.5) return { label: "نقص وزن", color: "#3b82f6", pos: 8 };
  if (bmi < 25) return { label: "وزن طبيعي ✓", color: "#22d3a5", pos: 28 };
  if (bmi < 30) return { label: "زيادة وزن", color: "#f59e0b", pos: 52 };
  if (bmi < 35) return { label: "سمنة (Ⅰ)", color: "#ef4444", pos: 72 };
  return { label: "سمنة مفرطة", color: "#7c3aed", pos: 90 };
}

function macros(tdee, goal) {
  const goalDef = GOALS.find(g => g.id === goal) || GOALS[2];
  const target = tdee + goalDef.delta;
  let proteinG, fatG, carbG;
  if (goal === "lose" || goal === "lose_fast") {
    proteinG = Math.round(target * 0.35 / 4);
    fatG = Math.round(target * 0.30 / 9);
    carbG = Math.round(target * 0.35 / 4);
  } else if (goal === "gain" || goal === "gain_fast") {
    proteinG = Math.round(target * 0.28 / 4);
    fatG = Math.round(target * 0.25 / 9);
    carbG = Math.round(target * 0.47 / 4);
  } else {
    proteinG = Math.round(target * 0.30 / 4);
    fatG = Math.round(target * 0.30 / 9);
    carbG = Math.round(target * 0.40 / 4);
  }
  return { target: Math.round(target), protein: proteinG, fat: fatG, carbs: carbG, color: goalDef.color };
}

function idealWeight(height, gender) {
  const h = height - 100;
  if (gender === "male") return (h * 0.9).toFixed(1);
  if (gender === "female") return (h * 0.85).toFixed(1);
  return (h * 0.875).toFixed(1);
}

function Ring({ value, max, color, size = 160 }) {
  const r = 62, cx = 80, cy = 80;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  const dash = pct * circ;
  return (
    <svg width={size} height={size} viewBox="0 0 160 160">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.border} strokeWidth="10" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="10"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        style={{ transition: "stroke-dasharray 0.8s ease" }} />
    </svg>
  );
}

function ProfileScreen({ data, setData, onNext }) {
  const s0Done = data.gender && data.age && data.height && data.weight;
  const s1Done = data.activity;
  const s2Done = data.goal;
  return (
    <>
      <div className="card">
        <div className="card-title">👤 بياناتك الأساسية</div>
        <div className="card-sub">تستخدم معادلة Mifflin-St Jeor المعتمدة علمياً لحساب معدل الأيض</div>
        <div className="field">
          <label>الجنس</label>
          <div className="toggle-group">
            {[{ id: "male", l: "ذكر 👨" }, { id: "female", l: "أنثى 👩" }, { id: "other", l: "غير محدد" }].map(g => (
              <button key={g.id} className={`toggle-btn ${data.gender === g.id ? "active" : ""}`}
                onClick={() => setData(d => ({ ...d, gender: g.id }))}>{g.l}</button>
            ))}
          </div>
        </div>
        <div className="row">
          <div className="field">
            <label>العمر</label>
            <input type="number" min="10" max="100" placeholder="25"
              value={data.age || ""} onChange={e => setData(d => ({ ...d, age: +e.target.value }))} />
          </div>
          <div className="field">
            <label>الطول (سم)</label>
            <input type="number" min="100" max="250" placeholder="175"
              value={data.height || ""} onChange={e => setData(d => ({ ...d, height: +e.target.value }))} />
          </div>
        </div>
        <div className="row">
          <div className="field">
            <label>الوزن الحالي (كغ)</label>
            <input type="number" min="30" max="300" placeholder="75"
              value={data.weight || ""} onChange={e => setData(d => ({ ...d, weight: +e.target.value }))} />
          </div>
          <div className="field">
            <label>الوزن المستهدف (كغ)</label>
            <input type="number" min="30" max="300" placeholder="70"
              value={data.targetWeight || ""} onChange={e => setData(d => ({ ...d, targetWeight: +e.target.value }))} />
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-title">🏃 مستوى النشاط البدني</div>
        <div className="card-sub">يحدد عامل النشاط مقدار السعرات الإضافية التي يحرقها جسمك</div>
        <div className="toggle-group" style={{ flexDirection: "column" }}>
          {ACTIVITY.map(a => (
            <button key={a.id} className={`toggle-btn ${data.activity === a.id ? "active" : ""}`}
              style={{ textAlign: "left", padding: "10px 14px" }}
              onClick={() => setData(d => ({ ...d, activity: a.id }))}>
              <span style={{ fontWeight: 600 }}>{a.label}</span>
              <span style={{ opacity: 0.6, marginRight: "auto", fontSize: 11 }}> — {a.desc}</span>
              <span style={{ opacity: 0.5, fontSize: 11 }}>×{a.factor}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="card-title">🎯 هدفك</div>
        <div className="card-sub">بناءً على مبدأ 7700 سعرة = 1 كغ دهون</div>
        <div className="toggle-group" style={{ flexDirection: "column" }}>
          {GOALS.map(g => (
            <button key={g.id} className={`toggle-btn ${data.goal === g.id ? "active" : ""}`}
              style={{ textAlign: "left", padding: "10px 14px" }}
              onClick={() => setData(d => ({ ...d, goal: g.id }))}>
              <span style={{ fontWeight: 600, color: data.goal === g.id ? g.color : C.text }}>{g.label}</span>
              <span style={{ opacity: 0.5, fontSize: 11, marginRight: "auto" }}>
                {g.delta > 0 ? `+${g.delta}` : g.delta === 0 ? "±0" : g.delta} سعرة/يوم
              </span>
            </button>
          ))}
        </div>
        <button className="btn-primary" style={{ marginTop: 20 }}
          disabled={!s0Done || !s1Done || !s2Done}
          onClick={onNext}>
          احسب نتائجي ←
        </button>
      </div>
    </>
  );
}

function ResultsScreen({ data, onReset }) {
  if (!data.weight || !data.height || !data.age || !data.gender || !data.activity || !data.goal)
    return <div className="card"><div className="card-sub">أكمل بياناتك أولاً من تبويب الملف الشخصي.</div></div>;
  const actFactor = ACTIVITY.find(a => a.id === data.activity)?.factor || 1.2;
  const bmr = calcBMR(data.weight, data.height, data.age, data.gender);
  const tdee = bmr * actFactor;
  const mac = macros(tdee, data.goal);
  const bmi = data.weight / ((data.height / 100) ** 2);
  const bmiCat = bmiCategory(bmi);
  const idW = idealWeight(data.height, data.gender);
  const goalObj = GOALS.find(g => g.id === data.goal);
  const weeksToGoal = data.targetWeight
    ? Math.abs((data.weight - data.targetWeight) * 7700 / (Math.abs(goalObj.delta) || 1) / 7)
    : null;
  return (
    <>
      <div className="card">
        <div className="card-title">🔥 احتياجاتك اليومية</div>
        <div className="result-ring-wrap">
          <div className="result-ring">
            <Ring value={mac.target} max={3500} color={mac.color} />
            <div className="ring-center">
              <div className="ring-kcal">{mac.target}</div>
              <div className="ring-label">سعرة/يوم</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 20, fontSize: 12, color: C.muted }}>
            <span>BMR: <strong style={{ color: C.text }}>{Math.round(bmr)}</strong></span>
            <span>TDEE: <strong style={{ color: C.text }}>{Math.round(tdee)}</strong></span>
            <span>الهدف: <strong style={{ color: mac.color }}>{mac.target}</strong></span>
          </div>
        </div>
        <div className="macro-row">
          <div className="macro-card">
            <div className="macro-val" style={{ color: "#f97316" }}>{mac.protein}g</div>
            <div className="macro-name">بروتين</div>
          </div>
          <div className="macro-card">
            <div className="macro-val" style={{ color: "#60a5fa" }}>{mac.carbs}g</div>
            <div className="macro-name">كربوهيدرات</div>
          </div>
          <div className="macro-card">
            <div className="macro-val" style={{ color: "#f59e0b" }}>{mac.fat}g</div>
            <div className="macro-name">دهون</div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-title">📊 مؤشر كتلة الجسم (BMI)</div>
        <div className="bmi-value" style={{ color: bmiCat.color }}>{bmi.toFixed(1)}</div>
        <div className="bmi-cat" style={{ color: bmiCat.color }}>{bmiCat.label}</div>
        <div className="bmi-bar-wrap">
          <div className="bmi-bar-labels"><span>نقص</span><span>طبيعي</span><span>زيادة</span><span>سمنة</span></div>
          <div className="bmi-bar-track">
            <div className="bmi-indicator" style={{ left: `${bmiCat.pos}%` }} />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.muted, marginTop: 8 }}>
          <span>الوزن المثالي: <strong style={{ color: C.accent }}>{idW} كغ</strong></span>
          {weeksToGoal && <span>المدة: <strong style={{ color: C.accent }}>~{Math.round(weeksToGoal)} أسبوع</strong></span>}
        </div>
      </div>
      <div className="card">
        <div className="card-title">💡 توصيات مخصصة</div>
        {(data.goal === "lose" || data.goal === "lose_fast") ? (
          <div className="insight-box">
            <h3>🥗 استراتيجية الخسارة الصحية</h3>
            <ul>
              <li>لا تنزل عن 1200 سعرة للنساء أو 1500 للرجال</li>
              <li>البروتين العالي يقلل فقدان العضلات ويزيد الشبع</li>
              <li>الألياف (25-35g/يوم) ضرورية للشبع وصحة الهضم</li>
              <li>4-5 وجبات صغيرة أفضل من وجبتين كبيرتين</li>
              <li>2-3 لتر ماء يومياً يساعد على الحرق وتقليل الجوع</li>
            </ul>
          </div>
        ) : (data.goal === "gain" || data.goal === "gain_fast") ? (
          <div className="insight-box">
            <h3>💪 استراتيجية الزيادة الصحية</h3>
            <ul>
              <li>ركز على الكربوهيدرات المعقدة: أرز، شوفان، بطاطا</li>
              <li>تدريب القوة ضروري لبناء العضل لا الدهون</li>
              <li>وجبة بروتينية خلال 30 دقيقة بعد التمرين</li>
              <li>الزيادة المثالية 0.25-0.5 كغ/أسبوع</li>
            </ul>
          </div>
        ) : (
          <div className="insight-box">
            <h3>⚖️ الحفاظ على الوزن الصحي</h3>
            <ul>
              <li>راقب وزنك مرة أسبوعياً صباحاً على معدة فارغة</li>
              <li>التنوع الغذائي يضمن الحصول على جميع المغذيات</li>
              <li>150 دقيقة تمرين أسبوعياً كحد أدنى (WHO)</li>
            </ul>
          </div>
        )}
        <div className="section-divider">نصائح إضافية</div>
        <div>
          {["تجنب المشروبات السكرية", "اقرأ ملصقات الأغذية", "النوم يؤثر على الوزن", "تتبع سعراتك أسبوعين"].map(t => (
            <span key={t} className="tip-chip">{t}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: "0 16px" }}>
        <button className="btn-secondary" onClick={onReset}>← تعديل البيانات</button>
      </div>
    </>
  );
}

function FoodScreen({ profile }) {
  const [search, setSearch] = useState("");
  const [log, setLog] = useState([]);
  const filtered = FOODS.filter(f => f.name.includes(search) || search === "");
  const totalKcal = log.reduce((s, f) => s + f.kcal, 0);
  const totalP = log.reduce((s, f) => s + f.p, 0);
  const totalC = log.reduce((s, f) => s + f.c, 0);
  const totalF = log.reduce((s, f) => s + f.f, 0);
  const targetKcal = (() => {
    if (!profile.weight || !profile.height || !profile.age || !profile.gender || !profile.activity || !profile.goal) return 2000;
    const bmr = calcBMR(profile.weight, profile.height, profile.age, profile.gender);
    const tdee = bmr * (ACTIVITY.find(a => a.id === profile.activity)?.factor || 1.2);
    return macros(tdee, profile.goal).target;
  })();
  const pct = Math.min(totalKcal / targetKcal, 1);
  const barColor = pct < 0.7 ? C.accent : pct < 1 ? C.warn : C.danger;
  return (
    <>
      <div className="card">
        <div className="card-title">🥗 تتبع الوجبات</div>
        <div className="card-sub">ابحث عن الأطعمة وأضفها لحساب مجموع السعرات</div>
        <div className="food-search-row">
          <input placeholder="ابحث عن طعام..." value={search} onChange={e => setSearch(e.target.value)} />
          <button onClick={() => setSearch("")}>مسح</button>
        </div>
        <div style={{ maxHeight: 220, overflowY: "auto" }}>
          {filtered.map((f, i) => (
            <div className="food-item" key={i}>
              <div>
                <div className="food-item-name">{f.name}</div>
                <div style={{ fontSize: 10, color: C.muted }}>P:{f.p}g · C:{f.c}g · F:{f.f}g</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="food-item-kcal">{f.kcal}</span>
                <button className="food-add-btn" onClick={() => setLog(l => [...l, f])}>+</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="card-title">📋 سجل اليوم</div>
        <div className="progress-bar-wrap">
          <div className="progress-bar-label">
            <span>السعرات: {totalKcal} / {targetKcal}</span>
            <span style={{ color: barColor }}>{Math.round(pct * 100)}%</span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${pct * 100}%`, background: barColor }} />
          </div>
        </div>
        <div className="macro-row" style={{ marginBottom: 12 }}>
          <div className="macro-card">
            <div className="macro-val" style={{ color: "#f97316", fontSize: 15 }}>{Math.round(totalP)}g</div>
            <div className="macro-name">بروتين</div>
          </div>
          <div className="macro-card">
            <div className="macro-val" style={{ color: "#60a5fa", fontSize: 15 }}>{Math.round(totalC)}g</div>
            <div className="macro-name">كرب.</div>
          </div>
          <div className="macro-card">
            <div className="macro-val" style={{ color: "#f59e0b", fontSize: 15 }}>{Math.round(totalF)}g</div>
            <div className="macro-name">دهون</div>
          </div>
        </div>
        {log.length === 0 ? (
          <div style={{ textAlign: "center", color: C.muted, fontSize: 13, padding: "16px 0" }}>لم تضف أي وجبات بعد</div>
        ) : (
          <div className="plan-timeline">
            {log.map((f, i) => (
              <div className="daily-log-item" key={i}>
                <span>{f.name}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: C.accent, fontFamily: "Syne", fontWeight: 700 }}>{f.kcal}</span>
                  <button className="log-remove" onClick={() => setLog(l => l.filter((_, j) => j !== i))}>✕</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {log.length > 0 && <button className="btn-secondary" style={{ marginTop: 12 }} onClick={() => setLog([])}>مسح السجل</button>}
      </div>
    </>
  );
}

function PlanScreen({ profile }) {
  const hasProfile = profile.weight && profile.height && profile.age && profile.gender && profile.activity && profile.goal;
  if (!hasProfile) return (
    <div className="card">
      <div className="card-title">📅 خطة الدايت</div>
      <div className="card-sub">أكمل بياناتك في تبويب الملف الشخصي لعرض خطتك المخصصة.</div>
    </div>
  );
  const actFactor = ACTIVITY.find(a => a.id === profile.activity)?.factor || 1.2;
  const bmr = calcBMR(profile.weight, profile.height, profile.age, profile.gender);
  const tdee = bmr * actFactor;
  const mac = macros(tdee, profile.goal);
  const goalObj = GOALS.find(g => g.id === profile.goal);
  const isLoss = profile.goal === "lose" || profile.goal === "lose_fast";
  const isGain = profile.goal === "gain" || profile.goal === "gain_fast";
  const weeklyKg = (Math.abs(goalObj.delta) * 7 / 7700).toFixed(2);
  const planSteps = isLoss ? [
    { t: "الأسبوع 1-2: التكيف", d: `ابدأ بـ ${mac.target + 200} سعرة، قلّل تدريجياً.` },
    { t: "الأسبوع 3-6: الحرق", d: `استقر على ${mac.target} سعرة مع 20 دقيقة كارديو يومياً.` },
    { t: "الأسبوع 7-10: التسارع", d: "أضف تمارين مقاومة للحفاظ على العضلات." },
    { t: "التثبيت: مستمر", d: "راجع الحسابات كل شهر مع كل كغ تخسره." },
  ] : isGain ? [
    { t: "الأسبوع 1-2: التحضير", d: `ابدأ بـ ${mac.target - 200} سعرة وأضف تدريجياً.` },
    { t: "الأسبوع 3-6: البناء", d: `${mac.target} سعرة مع تمارين قوة 3-4 أيام/أسبوع.` },
    { t: "الأسبوع 7-12: التقدم", d: "زد الأوزان تدريجياً لتحفيز نمو العضل." },
    { t: "كل شهر: التقييم", d: "إذا تراكمت دهون زائدة، قلل الفائض مؤقتاً." },
  ] : [
    { t: "أسبوعياً: المراقبة", d: "تتبع وزنك مرة صباحاً على معدة فارغة." },
    { t: "شهرياً: الإعادة", d: "أعد حساب TDEE كل شهر." },
    { t: "مستمر: التنويع", d: "غيّر مصادر بروتينك وكربوهيدراتك." },
    { t: "سنوياً: الفحص", d: "فحص دم سنوي للتأكد من السلامة." },
  ];
  return (
    <>
      <div className="card">
        <div className="card-title">📅 خطتك الشخصية</div>
        <div className="insight-box">
          <h3>🎯 ملخص هدفك</h3>
          <p>معدل حرقك اليومي <strong>{Math.round(tdee)} سعرة</strong>. تحتاج <strong style={{ color: mac.color }}>{mac.target} سعرة/يوم</strong> لخسارة/زيادة <strong>~{weeklyKg} كغ/أسبوع</strong>.</p>
        </div>
        <div className="plan-timeline">
          {planSteps.map((s, i) => (
            <div className="timeline-item" key={i}>
              <div className="timeline-num">{i + 1}</div>
              <div className="timeline-text"><strong>{s.t}</strong><br />{s.d}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="card-title">🍽 نموذج يوم غذائي</div>
        {[
          { meal: "الفطور", foods: isLoss ? "شوفان + بيضتان + قهوة سوداء" : "شوفان + موز + لبن + بيضتان" },
          { meal: "وجبة خفيفة", foods: isLoss ? "30g لوز + تفاحة" : "موز + زبدة الفول السوداني" },
          { meal: "الغداء", foods: isLoss ? "200g دجاج + 150g أرز + سلطة" : "250g دجاج + 250g أرز + خضروات" },
          { meal: "وجبة خفيفة", foods: isLoss ? "لبن خالي الدسم" : "تمر + حليب + مكسرات" },
          { meal: "العشاء", foods: isLoss ? "سمك مشوي + خضروات بخار" : "سمك + بطاطا + زيت زيتون" },
        ].map((m, i) => (
          <div className="timeline-item" key={i}>
            <div className="timeline-num" style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.accent }}>
              {["🌅", "🥜", "☀️", "🕒", "🌙"][i]}
            </div>
            <div className="timeline-text"><strong>{m.meal}</strong><br />{m.foods}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function CalorieApp() {
  const [tab, setTab] = useState("profile");
  const [data, setData] = useState({});

  const handleNext = () => setTab("results");
  const handleReset = () => setTab("profile");

  const navItems = [
    { key: "profile", label: "ملفي", icon: "👤" },
    { key: "results", label: "نتائج", icon: "📊" },
    { key: "food", label: "وجباتي", icon: "🥗" },
    { key: "plan", label: "خطتي", icon: "📅" },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="app" dir="rtl">
        <div className="header">
          <div className="header-tag">علم التغذية • WHO & ACSM</div>
          <h1>حاسبة <span>السعرات</span><br />الذكية</h1>
          <p>خطة غذائية علمية مخصصة لجسمك وأهدافك</p>
        </div>
        {tab === "profile" && <ProfileScreen data={data} setData={setData} onNext={handleNext} />}
        {tab === "results" && <ResultsScreen data={data} onReset={handleReset} />}
        {tab === "food" && <FoodScreen profile={data} />}
        {tab === "plan" && <PlanScreen profile={data} />}
        <nav className="bottom-nav">
          {navItems.map(s => (
            <button key={s.key} className={`nav-btn ${tab === s.key ? "active" : ""}`}
              onClick={() => setTab(s.key)}>
              <span style={{ fontSize: 18 }}>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
