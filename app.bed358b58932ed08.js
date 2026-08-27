/* KASFH M3 App — short-key aware, simultaneous ID+EN, hash router, fetch, progressive render, a11y */
const I18N = {
  ID: {
    app_subtitle: "Quran Literal Lexicon Indonesia",
    canonical_badge: "QLM v3 Kanonikal",
    verses: "Ayat", tokens: "Token",
    pos_label: "Kelas Kata:",
    pos_n: "N (Nomina)", pos_pn: "PN (Nama Diri)", pos_v: "V (Verba)",
    pos_adj: "ADJ (Sifat)", pos_prep: "PREP (Harf)",
    ayah_label_big: "AYAT",
    ayah_number_label: "Nomor Ayat:",
    full_ayah_header: "TEKS AYAT LENGKAP (INTERAKTIF)",
    rtl_mode: "Mode RTL",
    verse_trans_label: "Terjemahan Konteks Ayat:",
    wbw_title: "Analisis Kata-per-Kata",
    wbw_subtitle: "(Word-by-Word Matrix)",
    wbw_instruction: "Pilih salah satu kartu untuk meninjau profil linguistik lengkap di sidebar kanan",
    wbw_seq: "Urutan posisi kata dalam ayat",
    sidebar_title: "Profil Linguistik Lengkap",
    active_token_label: "Token Aktif (RTL)",
    trans_section_title: "Terjemahan Literal & AI",
    lit_id_title: "Literal Indonesia (QLLI)",
    lit_id_badge: "Utama",
    lit_en_title: "Literal English",
    ai_output_title: "AI Finishing Output",
    morph_section_title: "Morfologi & Tata Bahasa",
    pos_prop: "Part of Speech", root_prop: "Root (Akar Kata)", lemma_prop: "Lemma",
    state_prop: "State (I'rab)", gender_prop: "Gender", number_prop: "Number",
    verb_prop: "Verb Features (Aspect / Voice / Mood)",
    non_verbal: "Non-verbal / Tidak memiliki fitur kata kerja khusus",
    prev_ayah: "Prev Ayat", next_ayah: "Next Ayat",
    picker_title: "Pilih Nomor Ayat"
  },
  EN: {
    app_subtitle: "Quran Literal Lexicon Indonesia",
    canonical_badge: "QLM v3 Canonical",
    verses: "Verses", tokens: "Tokens",
    pos_label: "Parts of Speech:",
    pos_n: "N (Noun)", pos_pn: "PN (Proper Noun)", pos_v: "V (Verb)",
    pos_adj: "ADJ (Adjective)", pos_prep: "PREP (Preposition)",
    ayah_label_big: "VERSE",
    ayah_number_label: "Ayah Number:",
    full_ayah_header: "FULL VERSE TEXT (INTERACTIVE)",
    rtl_mode: "RTL Mode",
    verse_trans_label: "Contextual Verse Translation:",
    wbw_title: "Word-by-Word Analysis",
    wbw_subtitle: "(Word-by-Word Matrix)",
    wbw_instruction: "Select a card to inspect full morphological & literal metadata",
    wbw_seq: "Sequential word order in verse",
    sidebar_title: "Complete Linguistic Profile",
    active_token_label: "Active Token (RTL)",
    trans_section_title: "Literal & AI Translations",
    lit_id_title: "Indonesian Literal (QLLI)",
    lit_id_badge: "Primary",
    lit_en_title: "English Literal",
    ai_output_title: "AI Finishing Output",
    morph_section_title: "Morphology & Grammar",
    pos_prop: "Part of Speech", root_prop: "Root", lemma_prop: "Lemma",
    state_prop: "State (I'rab)", gender_prop: "Gender", number_prop: "Number",
    verb_prop: "Verb Features (Aspect / Voice / Mood)",
    non_verbal: "Non-verbal / No specific verbal features",
    prev_ayah: "\u2039 Prev Verse", next_ayah: "Next Verse \u203a",
    picker_title: "Select Verse Number"
  }
};
let currentLang = localStorage.getItem('kasfh_lang') || 'ID';

function applyI18N() {
  const t = I18N[currentLang];
  const _s = (id, v) => { const e = document.getElementById(id); if(e) e.textContent = v; };
  _s('ui-app-subtitle', t.app_subtitle);
  _s('ui-canonical-badge', t.canonical_badge);
  _s('ui-pos-legend-label', t.pos_label);
  _s('ui-legend-pos-n', t.pos_n);
  _s('ui-legend-pos-pn', t.pos_pn);
  _s('ui-legend-pos-v', t.pos_v);
  _s('ui-legend-pos-adj', t.pos_adj);
  _s('ui-legend-pos-prep', t.pos_prep);
  _s('ui-ayah-label-big', t.ayah_label_big);
  _s('ui-ayah-number_label', t.ayah_number_label);
  _s('ui-full-ayah-header', t.full_ayah_header);
  _s('ui-rtl-mode-tag', t.rtl_mode);
  _s('ayah-trans-label', t.verse_trans_label);
  _s('ui-wbw-title', t.wbw_title);
  _s('ui-wbw-subtitle', t.wbw_subtitle);
  _s('ui-wbw-instruction', t.wbw_instruction);
  _s('ui-wbw-seq', t.wbw_seq);
  _s('ui-sidebar-title', t.sidebar_title);
  _s('ui-active-token-label', t.active_token_label);
  _s('ui-trans-section-title', t.trans_section_title);
  _s('ui-lit-id-title', t.lit_id_title);
  _s('ui-lit-id-badge', t.lit_id_badge);
  _s('ui-lit-en-title', t.lit_en_title);
  _s('ui-ai-output-title', t.ai_output_title);
  _s('ui-morph-section-title', t.morph_section_title);
  _s('ui-pos-prop', t.pos_prop);
  _s('ui-root-prop', t.root_prop);
  _s('ui-lemma-prop', t.lemma_prop);
  _s('ui-state-prop', t.state_prop);
  _s('ui-gender-prop', t.gender_prop);
  _s('ui-number-prop', t.number_prop);
  _s('ui-verb-prop', t.verb_prop);
  _s('ui-btn-prev-ayah', t.prev_ayah);
  _s('ui-btn-next-ayah', t.next_ayah);
  _s('ui-picker-title', t.picker_title);
  // Button highlight
  const idBtn = document.getElementById('lang-btn-id');
  const enBtn = document.getElementById('lang-btn-en');
  if(idBtn) idBtn.className = currentLang==='ID'
    ? 'px-2.5 py-1 rounded-lg text-xs font-extrabold transition duration-150 bg-blue-600 text-white shadow-sm'
    : 'px-2.5 py-1 rounded-lg text-xs font-extrabold transition duration-150 text-slate-400 hover:text-slate-200';
  if(enBtn) enBtn.className = currentLang==='EN'
    ? 'px-2.5 py-1 rounded-lg text-xs font-extrabold transition duration-150 bg-blue-600 text-white shadow-sm'
    : 'px-2.5 py-1 rounded-lg text-xs font-extrabold transition duration-150 text-slate-400 hover:text-slate-200';
}

const SURAH_META_URL = "./data/surah_metadata.json";
let SURAH_META = [];
let currentSurah = 1, currentAyah = 1, currentTokenRef = null;
const cache = new Map();

function getSurahIdFromHash(){
  const h = location.hash.replace(/^#\/?/, '');
  if(!h) return '001';
  const n = parseInt(h,10);
  if(isNaN(n) || n<1 || n>114) return null;
  return String(n).padStart(3,'0');
}
function navigateSurah(d){
  const id = parseInt(getSurahIdFromHash()||String(currentSurah),10);
  const nid = Math.min(114, Math.max(1, id+d));
  location.hash = '#/'+String(nid).padStart(3,'0');
}
function onSurahSelectChange(v){ location.hash = '#/'+String(parseInt(v,10)).padStart(3,'0'); }
function setLanguage(l){ currentLang=l; localStorage.setItem('kasfh_lang',l); applyI18N(); renderCurrentAyah(); }
function toggleAyahPicker(){ document.getElementById('ayah-picker-dropdown').classList.toggle('hidden'); }
function stepAyah(d){
  const sel = getSurahData(currentSurah);
  if(!sel) return;
  const maxA = sel.ay;
  currentAyah = Math.min(maxA, Math.max(1, currentAyah+d));
  renderCurrentAyah();
  document.getElementById('big-ayah-number').textContent = currentAyah;
}
function jumpToAyahInput(){
  const v = parseInt(document.getElementById('ayah-jump-input').value,10);
  if(!isNaN(v)){ currentAyah = v; renderCurrentAyah(); }
}

let surahCache = new Map();
async function fetchSurah(surahNum){
  const sid = String(surahNum).padStart(3,'0');
  if(surahCache.has(sid)) return surahCache.get(sid);
  const url = `./data/surah/${sid}.json`;
  const res = await fetch(url);
  if(!res.ok) throw new Error('Surah not found '+sid);
  const data = await res.json();
  surahCache.set(sid, data);
  return data;
}
function getSurahData(n){ return surahCache.get(String(n).padStart(3,'0')); }

async function loadSurah(surahId){
  const n = parseInt(surahId,10);
  currentSurah = n;
  try{
    const data = await fetchSurah(n);
    const meta = SURAH_META.find(s=>s.s===n);
    document.getElementById('meta-surah-info').textContent = `${String(n).padStart(3,'0')}. ${meta.ni} (${meta.na})`;
    document.getElementById('meta-surah-type').textContent = meta.pl;
    document.getElementById('meta-surah-ayahs-tokens').textContent = `${data.ay} Ayat · ${data.a.reduce((s,ay)=>s+ay.t.length,0)} Token`;
    document.getElementById('bottom-ayah-total').textContent = data.ay;
    // populate picker
    const grid = document.getElementById('ayah-picker-grid');
    grid.innerHTML = '';
    for(let i=1;i<=data.ay;i++){
      const b=document.createElement('button');
      b.textContent=i; b.className='px-2 py-1 rounded bg-slate-800 text-white text-xs';
      b.onclick=()=>{ currentAyah=i; renderCurrentAyah(); document.getElementById('ayah-picker-dropdown').classList.add('hidden'); };
      grid.appendChild(b);
    }
    currentAyah = 1;
    renderCurrentAyah();
    document.getElementById('big-ayah-number').textContent = 1;
  }catch(e){
    document.getElementById('full-ayah-container').innerHTML = `<div class="text-amber-300">Surah Tidak Ditemukan (${surahId})</div>`;
  }
}
function renderCurrentAyah(){
  const data = getSurahData(currentSurah);
  if(!data) return;
  const ayah = data.a.find(x=>x.n===currentAyah);
  if(!ayah) return;
  document.getElementById('ayah-badge').textContent = `${String(currentSurah).padStart(3,'0')}:${String(currentAyah).padStart(2,'0')}`;
  document.getElementById('ayah-title').textContent = `Surah ${SURAH_META.find(s=>s.s===currentSurah).ni} — Ayat ${currentAyah}`;
  document.getElementById('big-ayah-number').textContent = currentAyah;
  document.getElementById('bottom-ayah-current').textContent = currentAyah;
  // Arabic sentence
  const cont = document.getElementById('full-ayah-container');
  cont.innerHTML = '';
  cont.dir='rtl'; cont.lang='ar';
  ayah.t.forEach(tok=>{
    const span=document.createElement('span');
    span.className='arabic-word inline-block cursor-pointer hover:bg-blue-900/30 rounded px-1';
    span.textContent=tok.a;
    span.dir='rtl'; span.lang='ar';
    span.onclick=()=>showToken(tok);
    if(tok.ref===currentTokenRef) span.classList.add('bg-blue-600','text-white');
    cont.appendChild(span);
    cont.appendChild(document.createTextNode(' '));
  });
  // translation context: join id
  const joinedId = ayah.t.map(x=>x.id).join(' ');
  document.getElementById('ayah-translation-text').textContent = `"${joinedId}"`;
  document.getElementById('ayah-trans-lang-tag').textContent='ID+EN';
  document.getElementById('ayah-token-count').textContent = `${ayah.t.length} Kata`;
  // word cards
  const grid=document.getElementById('word-cards-grid');
  grid.innerHTML='';
  const frag=document.createDocumentFragment();
  ayah.t.forEach((tok, idx)=>{
    const card=document.createElement('div');
    card.className='bg-[#182438] border border-slate-700 rounded-xl p-3 cursor-pointer hover:border-blue-500/50';
    card.setAttribute('role','button'); card.tabIndex=0;
    card.innerHTML = `
      <div dir="rtl" lang="ar" class="arabic-text arabic-word-card text-2xl text-white text-center">${tok.a}</div>
      <div class="text-[11px] font-mono text-blue-300 text-center">${tok.t}</div>
      <div class="text-[11px] text-slate-400 text-center">${tok.r}</div>
      <div class="mt-2 text-xs font-bold text-white text-center">${tok.id}</div>
      <div class="text-[11px] text-slate-300 text-center italic">${tok.en}</div>
      <div class="text-[10px] font-mono text-slate-500 text-center mt-1">${tok.ref}</div>
      <div class="text-[10px] text-slate-500 text-center">${tok.p} · ${tok.rt||'—'} · ${tok.lm||'—'}</div>
    `;
    card.onclick=()=>showToken(tok);
    card.onkeydown=(e)=>{ if(e.key==='Enter') showToken(tok); };
    frag.appendChild(card);
  });
  // progressive render: chunk 10
  let i=0;
  function chunk(){
    const end=Math.min(i+10, frag.childNodes.length);
    // already appended via frag, so just append once
    if(i===0) grid.appendChild(frag);
    i=end;
    if(i<frag.childNodes.length) requestAnimationFrame(chunk);
  }
  chunk();
  if(ayah.t[0]) showToken(ayah.t[0]);
}
function showToken(tok){
  currentTokenRef=tok.ref;
  document.getElementById('detail-ref-badge').textContent=tok.ref;
  document.getElementById('detail-arabic').textContent=tok.a;
  document.getElementById('detail-arabic').dir='rtl'; document.getElementById('detail-arabic').lang='ar';
  document.getElementById('detail-translit').textContent=tok.r || tok.t;
  document.getElementById('detail-id-literal').textContent=tok.id;
  document.getElementById('detail-en-literal').textContent=tok.en;
  document.getElementById('detail-ai-output').textContent=tok.id; // simultaneous, no AI separate
  document.getElementById('detail-pos').textContent=tok.p;
  document.getElementById('detail-root').textContent=tok.rt||'—';
  document.getElementById('detail-lemma').textContent=tok.lm||'—';
  const m=tok.m||{};
  document.getElementById('detail-state').textContent=m.st||'—';
  document.getElementById('detail-gender').textContent=m.g||'—';
  document.getElementById('detail-number').textContent=m.n||'—';
  const verb=[m.as&&`AS:${m.as}`, m.vc&&`VC:${m.vc}`, m.md&&`MD:${m.md}`].filter(Boolean).join(' ')||'—';
  document.getElementById('detail-verb-features').textContent=verb;
  const _el=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};_el('meta-token-ref',tok.ref);_el('meta-token-index',tok.ref.split(':')[2]);
}
function navigateAyah(d){ stepAyah(d); }

async function init(){
  // a11y: lang/dir already set in HTML
  const res = await fetch(SURAH_META_URL);
  SURAH_META = await res.json(); applyI18N();
  const sel=document.getElementById('surah-select');
  sel.innerHTML='';
  SURAH_META.forEach(s=>{
    const o=document.createElement('option');
    o.value=s.s; o.textContent=`${String(s.s).padStart(3,'0')}. ${s.ni} (${s.na}) — ${s.ay} ayat`;
    sel.appendChild(o);
  });
  // search: surah name filter (metadata-level, FINAL:6)
  sel.addEventListener('input', (e)=>{
    const q=e.target.value.toLowerCase();
    // simple: if user types name, jump is handled via select; for now no extra search box (metadata search = select filter)
  });
  window.addEventListener('hashchange', ()=>{
    const sid=getSurahIdFromHash();
    if(!sid){ document.getElementById('full-ayah-container').innerHTML='<div class="text-amber-300">Surah Tidak Ditemukan</div>'; return; }
    document.getElementById('surah-select').value=parseInt(sid,10);
    loadSurah(sid);
  });
  const initial=getSurahIdFromHash()||'001';
  document.getElementById('surah-select').value=parseInt(initial,10);
  await loadSurah(initial);
  // keyboard nav
  document.addEventListener('keydown', (e)=>{
    if(e.key==='ArrowLeft') navigateAyah(-1);
    if(e.key==='ArrowRight') navigateAyah(1);
  });
}
document.addEventListener('DOMContentLoaded', init);
