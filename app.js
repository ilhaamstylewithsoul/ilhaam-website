// Ilhaam single-page mock + WhatsApp order
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

/* Theme toggle */
(function initTheme(){
  const saved = localStorage.getItem('ilhaam_theme');
  if(saved){ document.documentElement.setAttribute('data-theme', saved); }
  const btn = $('#themeToggle');
  const label = btn?.querySelector('.theme-toggle__label');
  const dot = btn?.querySelector('.theme-toggle__dot');
  function sync(){
    const t = document.documentElement.getAttribute('data-theme') || 'light';
    const isDark = t === 'dark';
    label.textContent = isDark ? 'Light' : 'Dark';
    dot.style.background = isDark ? '#f3b400' : '#111';
  }
  btn?.addEventListener('click', ()=>{
    const cur = document.documentElement.getAttribute('data-theme') || 'light';
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ilhaam_theme', next);
    sync();
  });
  sync();
})();

/* Year */
$('#yr').textContent = new Date().getFullYear();

/* Hero slider */
(function hero(){
  const imgs = $$('.hero__img');
  const dotsWrap = $('#heroDots');
  const slides = $('#heroSlides');
  let idx = 0;
  let timer = null;

  function go(i){
    idx = (i + imgs.length) % imgs.length;
    imgs.forEach((im, k)=> im.classList.toggle('is-active', k===idx));
    $$('.hero__dot', dotsWrap).forEach((d,k)=> d.classList.toggle('is-active', k===idx));
  }
  function buildDots(){
    dotsWrap.innerHTML = '';
    imgs.forEach((_,i)=>{
      const b = document.createElement('button');
      b.className = 'hero__dot';
      b.type = 'button';
      b.addEventListener('click', ()=>{ go(i); reset(); });
      dotsWrap.appendChild(b);
    });
  }
  function reset(){
    if(timer) clearInterval(timer);
    timer = setInterval(()=> go(idx+1), 5000);
  }

  buildDots();
  go(0);
  reset();

  $('.hero__arrow--left')?.addEventListener('click', ()=>{ go(idx-1); reset(); });
  $('.hero__arrow--right')?.addEventListener('click', ()=>{ go(idx+1); reset(); });

  // swipe
  let x0=null;
  slides.addEventListener('pointerdown', e=>{ x0=e.clientX; });
  slides.addEventListener('pointerup', e=>{
    if(x0===null) return;
    const dx = e.clientX - x0;
    if(Math.abs(dx) > 40){
      go(idx + (dx<0 ? 1 : -1));
      reset();
    }
    x0=null;
  });
})();

/* Friday countdown to next Friday 00:00 (India IST approx using local time) */
(function countdown(){
  function nextFriday(){
    const now = new Date();
    const d = new Date(now);
    d.setHours(0,0,0,0);
    // day: 0 Sun ... 5 Fri
    const day = d.getDay();
    const add = (5 - day + 7) % 7 || 7; // if today is Fri, next week
    d.setDate(d.getDate() + add);
    return d;
  }
  const target = nextFriday();
  function pad(n){ return String(n).padStart(2,'0'); }
  function tick(){
    const now = new Date();
    const ms = Math.max(0, target - now);
    const s = Math.floor(ms/1000);
    const days = Math.floor(s/86400);
    const hours = Math.floor((s%86400)/3600);
    const mins = Math.floor((s%3600)/60);
    const secs = s%60;
    $('#cdDays').textContent = pad(days);
    $('#cdHours').textContent = pad(hours);
    $('#cdMins').textContent = pad(mins);
    $('#cdSecs').textContent = pad(secs);
  }
  tick();
  setInterval(tick, 1000);
})();

/* Product data (demo) */
const PRODUCTS = [
  {
    id:'alhamdullah-white',
    title:'ALHAMDULLAH',
    price:849,
    variant:'White',
    tags:['white', 'all', 'friday'],
    images:['assets/products/white/alhamdullah/03.png', 'assets/products/white/alhamdullah/01.png', 'assets/products/white/alhamdullah/02.png', 'assets/products/white/alhamdullah/04.png', 'assets/products/white/alhamdullah/05.png']
  },
  {
    id:'bismillah-white',
    title:'BISMILLAH',
    price:849,
    variant:'White',
    tags:['white', 'all', 'friday'],
    images:['assets/products/white/bismillah/03.png', 'assets/products/white/bismillah/01.png', 'assets/products/white/bismillah/02.png', 'assets/products/white/bismillah/04.png', 'assets/products/white/bismillah/05.png']
  },
  {
    id:'deen-over-duniya-white',
    title:'DEEN OVER DUNIYA',
    price:849,
    variant:'White',
    tags:['white', 'all', 'friday'],
    images:['assets/products/white/deen-over-duniya/03.png', 'assets/products/white/deen-over-duniya/01.png', 'assets/products/white/deen-over-duniya/02.png', 'assets/products/white/deen-over-duniya/04.png', 'assets/products/white/deen-over-duniya/05.png']
  },
  {
    id:'fbi-white',
    title:'FBI',
    price:849,
    variant:'White',
    tags:['white', 'all'],
    images:['assets/products/white/fbi/03.png', 'assets/products/white/fbi/01.png', 'assets/products/white/fbi/02.png', 'assets/products/white/fbi/04.png', 'assets/products/white/fbi/05.png']
  },
  {
    id:'habibi-white',
    title:'HABIBI',
    price:849,
    variant:'White',
    tags:['white', 'all'],
    images:['assets/products/white/habibi/03.png', 'assets/products/white/habibi/01.png', 'assets/products/white/habibi/02.png', 'assets/products/white/habibi/04.png', 'assets/products/white/habibi/05.png']
  },
  {
    id:'halal-is-must-white',
    title:'HALAL IS A MUST',
    price:849,
    variant:'White',
    tags:['white', 'all'],
    images:['assets/products/white/halal-is-must/03.png', 'assets/products/white/halal-is-must/01.png', 'assets/products/white/halal-is-must/02.png', 'assets/products/white/halal-is-must/04.png', 'assets/products/white/halal-is-must/05.png']
  },
  {
    id:'halal-mode-on-white',
    title:'HALAL MODE ON',
    price:849,
    variant:'White',
    tags:['white', 'all'],
    images:['assets/products/white/halal-mode-on/03.png', 'assets/products/white/halal-mode-on/01.png', 'assets/products/white/halal-mode-on/02.png', 'assets/products/white/halal-mode-on/04.png', 'assets/products/white/halal-mode-on/05.png']
  },
  {
    id:'haram-is-haram-white',
    title:'HARAM IS HARAM',
    price:849,
    variant:'White',
    tags:['white', 'all'],
    images:['assets/products/white/haram-is-haram/03.png', 'assets/products/white/haram-is-haram/01.png', 'assets/products/white/haram-is-haram/02.png', 'assets/products/white/haram-is-haram/04.png', 'assets/products/white/haram-is-haram/05.png']
  },
  {
    id:'hardship-white',
    title:'HARDSHIP',
    price:849,
    variant:'White',
    tags:['white', 'all'],
    images:['assets/products/white/hardship/03.png', 'assets/products/white/hardship/01.png', 'assets/products/white/hardship/02.png', 'assets/products/white/hardship/04.png', 'assets/products/white/hardship/05.png']
  },
  {
    id:'alhamdulliah-black',
    title:'ALHAMDULLAH',
    price:849,
    variant:'Black',
    tags:['black', 'all', 'friday'],
    images:['assets/products/black/alhamdulliah/05.png', 'assets/products/black/alhamdulliah/01.png', 'assets/products/black/alhamdulliah/02.png', 'assets/products/black/alhamdulliah/03.png', 'assets/products/black/alhamdulliah/04.png']
  },
  {
    id:'bismillah-black',
    title:'BISMILLAH',
    price:849,
    variant:'Black',
    tags:['black', 'all', 'friday'],
    images:['assets/products/black/bismillah/05.png', 'assets/products/black/bismillah/01.png', 'assets/products/black/bismillah/02.png', 'assets/products/black/bismillah/03.png', 'assets/products/black/bismillah/04.png']
  },
  {
    id:'deen-black',
    title:'DEEN OVER DUNIYA',
    price:849,
    variant:'Black',
    tags:['black', 'all', 'friday'],
    images:['assets/products/black/deen/05.png', 'assets/products/black/deen/01.png', 'assets/products/black/deen/02.png', 'assets/products/black/deen/03.png', 'assets/products/black/deen/04.png']
  },
  {
    id:'fbi-black',
    title:'FBI',
    price:849,
    variant:'Black',
    tags:['black', 'all'],
    images:['assets/products/black/fbi/05.png', 'assets/products/black/fbi/01.png', 'assets/products/black/fbi/02.png', 'assets/products/black/fbi/03.png', 'assets/products/black/fbi/04.png']
  },
  {
    id:'habibi-black',
    title:'HABIBI',
    price:849,
    variant:'Black',
    tags:['black', 'all'],
    images:['assets/products/black/habibi/05.png', 'assets/products/black/habibi/01.png', 'assets/products/black/habibi/02.png', 'assets/products/black/habibi/03.png', 'assets/products/black/habibi/04.png']
  },
  {
    id:'halal-is-a-must-black',
    title:'HALAL IS A MUST',
    price:849,
    variant:'Black',
    tags:['black', 'all'],
    images:['assets/products/black/halal-is-a-must/05.png', 'assets/products/black/halal-is-a-must/01.png', 'assets/products/black/halal-is-a-must/02.png', 'assets/products/black/halal-is-a-must/03.png', 'assets/products/black/halal-is-a-must/04.png']
  },
  {
    id:'halal-mode-on-black',
    title:'HALAL MODE ON',
    price:849,
    variant:'Black',
    tags:['black', 'all'],
    images:['assets/products/black/halal-mode-on/05.png', 'assets/products/black/halal-mode-on/01.png', 'assets/products/black/halal-mode-on/02.png', 'assets/products/black/halal-mode-on/03.png', 'assets/products/black/halal-mode-on/04.png']
  },
  {
    id:'haram-is-haram-black',
    title:'HARAM IS HARAM',
    price:849,
    variant:'Black',
    tags:['black', 'all'],
    images:['assets/products/black/haram-is-haram/05.png', 'assets/products/black/haram-is-haram/01.png', 'assets/products/black/haram-is-haram/02.png', 'assets/products/black/haram-is-haram/03.png', 'assets/products/black/haram-is-haram/04.png']
  },
  {
    id:'hardship-black',
    title:'HARDSHIP',
    price:849,
    variant:'Black',
    tags:['black', 'all'],
    images:['assets/products/black/hardship/05.png', 'assets/products/black/hardship/01.png', 'assets/products/black/hardship/02.png', 'assets/products/black/hardship/03.png', 'assets/products/black/hardship/04.png']
  }
];

// Group products by design title so variants can switch
const PRODUCT_GROUPS = {};
PRODUCTS.forEach(p=>{
  const key = (p.title||'').trim();
  if(!PRODUCT_GROUPS[key]) PRODUCT_GROUPS[key] = {};
  PRODUCT_GROUPS[key][p.variant] = p;
});



function cardHTML(p, opts = {}){
  const img = p.images[0];
  const price = p.price ? `₹${p.price} <span class="card__mrp">₹1,199</span> <span class="card__off">(29% OFF)</span>` : 'Coming Soon';
  const variant = p.variant ? `Variant: ${p.variant}` : 'Variant: —';
  const isAvailable = (p.available !== false);
  const ribbon = isAvailable ? '' : `<div class="card__ribbon">NOT AVAILABLE</div>`;
  const waBtn = (!opts.preview && isAvailable)
    ? `<button class="pill pill--wa" type="button" data-wa="${p.id}">WhatsApp</button>`
    : `<button class="pill pill--disabled" type="button" disabled>${opts.preview ? 'Launching Friday' : 'Not Available'}</button>`;
  return `
    <article class="card" data-id="${p.id}">
      ${ribbon}
      <button class="card__imgbtn" type="button" data-open="${p.id}" aria-label="Open ${p.title}">
        <img src="${img}" alt="${p.title}">
      </button>
      <div class="card__body">
        <div class="card__row">
          <div class="card__title">${p.title}</div>
          <div class="card__price">${price}</div>
        </div>
        <div class="card__meta">${variant}</div>
        <div class="card__btns">
          <button class="pill" type="button" data-open="${p.id}">View</button>
          ${waBtn}
        </div>
      </div>
    </article>
  `;
}

function renderRow(trackId, pickFn, opts = {}){
  const track = document.getElementById(trackId);
  let items = PRODUCTS.filter(pickFn);
  if(opts.limit){ items = items.slice(0, opts.limit); }
  track.innerHTML = items.map(p => cardHTML(p, opts)).join('');
}

renderRow('row1Track', p => p.tags.includes('friday'), {limit:1, preview:true});
renderRow('row2Track', p => p.tags.includes('black'));
renderRow('row3Track', p => p.tags.includes('white'));

/* Carousel arrows */
$$('.carousel').forEach(car=>{
  const track = $('.carousel__track', car);
  const left = $('.carousel__arrow--left', car);
  const right = $('.carousel__arrow--right', car);
  const step = () => Math.round(track.clientWidth * 0.9);
  left.addEventListener('click', ()=> track.scrollBy({left:-step(), behavior:'smooth'}));
  right.addEventListener('click', ()=> track.scrollBy({left:step(), behavior:'smooth'}));
});

/* Category filters: show/hide sections + open Friday modal */
function setSectionVisible(id, show){
  const el = document.getElementById(id);
  if(!el) return;
  el.style.display = show ? '' : 'none';
}
function setFilter(f, opts={}){
  currentCategory = f;
  // If user is searching, keep them in results view
  if(typeof uiState !== 'undefined' && normalize(uiState.query)){
    if(f==='black' || f==='white' || f==='all'){
      uiState.qfilter = f;
      $$('#quickFilters .pill').forEach(b=>{
        b.classList.toggle('pill--active', (b.dataset.qfilter||'all')===f);
      });
    }
    renderResults();
    return;
  }

  // active chip
  $$('.cat').forEach(b=> b.classList.remove('cat--active'));
  const active = $(`.cat[data-filter="${f}"]`);
  active?.classList.add('cat--active');

  if(f==='soon'){
    setSectionVisible('comingSoonSection', true);
    setSectionVisible('row1Section', false);
    setSectionVisible('trendingSection', false);
    setSectionVisible('row2Section', false);
    setSectionVisible('festivalSection', false);
    setSectionVisible('row3Section', false);
    if(!opts.noScroll){
    document.querySelector('#comingSoonSection')?.scrollIntoView({behavior:'smooth', block:'start'});
    }
    return;
  }

  setSectionVisible('comingSoonSection', false);

  if(f==='black'){
    setSectionVisible('row1Section', false);
    setSectionVisible('trendingSection', false);
    setSectionVisible('row2Section', true);
    setSectionVisible('festivalSection', false);
    setSectionVisible('row3Section', false);
    if(!opts.noScroll){
    document.querySelector('#row2Section')?.scrollIntoView({behavior:'smooth', block:'start'});
    }
    return;
  }

  if(f==='white'){
    setSectionVisible('row1Section', false);
    setSectionVisible('trendingSection', false);
    setSectionVisible('row2Section', false);
    setSectionVisible('festivalSection', false);
    setSectionVisible('row3Section', true);
    if(!opts.noScroll){
    document.querySelector('#row3Section')?.scrollIntoView({behavior:'smooth', block:'start'});
    }
    return;
  }

  if(f==='all'){
    setSectionVisible('row1Section', false);
    setSectionVisible('trendingSection', true);
    setSectionVisible('row2Section', true);
    setSectionVisible('festivalSection', true);
    setSectionVisible('row3Section', true);
    if(!opts.noScroll){
    document.querySelector('#row2Section')?.scrollIntoView({behavior:'smooth', block:'start'});
    }
    return;
  }

  // friday: open a single drop (preview, no buy)
  const friday = PRODUCTS.find(p=>p.tags?.includes('friday'));
  if(friday){
    openModal(friday.id, {preview:true});
  }
  setSectionVisible('row1Section', true);
  setSectionVisible('trendingSection', true);
  setSectionVisible('row2Section', true);
  setSectionVisible('festivalSection', true);
  setSectionVisible('row3Section', true);
    if(!opts.noScroll){
  document.querySelector('#row1Section')?.scrollIntoView({behavior:'smooth', block:'start'});
    }
}

$$('.cat').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const f = btn.dataset.filter;
    setFilter(f);
  });
});

setFilter('all', {noScroll:true});

/* Search + Sort + Filters */
let currentCategory = 'all';
const uiState = { query:'', sort:'featured', qfilter:'all' };

function normalize(s){ return (s||'').toString().toLowerCase().trim(); }

function applySort(list){
  const mode = uiState.sort;
  const arr = list.slice();
  if(mode === 'price_asc') arr.sort((a,b)=>(a.price||0)-(b.price||0));
  else if(mode === 'price_desc') arr.sort((a,b)=>(b.price||0)-(a.price||0));
  else if(mode === 'title_asc') arr.sort((a,b)=>a.title.localeCompare(b.title));
  else if(mode === 'title_desc') arr.sort((a,b)=>b.title.localeCompare(a.title));
  return arr;
}

function matchesFilters(p){
  const q = normalize(uiState.query);
  if(q && !normalize(p.title).includes(q)) return false;

  const f = uiState.qfilter;
  if(f && f !== 'all' && !(p.tags||[]).includes(f)) return false;

  // if user is in a category view, respect it when search is empty.
  if(!q && currentCategory && currentCategory !== 'all' && currentCategory !== 'friday' && currentCategory !== 'soon'){
    if(!(p.tags||[]).includes(currentCategory)) return false;
  }
  return true;
}

function renderResults(){
  const section = document.getElementById('searchResultsSection');
  const grid = document.getElementById('resultsGrid');
  const count = document.getElementById('resultsCount');
  if(!section || !grid || !count) return;

  const q = normalize(uiState.query);
  const list = applySort(PRODUCTS.filter(matchesFilters));

  count.textContent = `${list.length} item${list.length===1?'':'s'}`;
  grid.innerHTML = list.map(p => cardHTML(p, {})).join('');
  section.style.display = q ? '' : 'none';

  // When searching, hide other sections to avoid confusion
  if(q){
    ['comingSoonSection','row1Section','trendingSection','row2Section','festivalSection','row3Section'].forEach(id=>setSectionVisible(id,false));
  }else{
    // restore by category
    setFilter(currentCategory, {noScroll:true});
  }
}

$('#searchInput')?.addEventListener('input', (e)=>{
  uiState.query = e.target.value || '';
  renderResults();
});

$('#clearSearchBtn')?.addEventListener('click', ()=>{
  const inp = $('#searchInput');
  if(inp) inp.value = '';
  uiState.query = '';
  renderResults();
});

$('#sortSelect')?.addEventListener('change', (e)=>{
  uiState.sort = e.target.value;
  renderResults();
});

$$('#quickFilters .pill').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    $$('#quickFilters .pill').forEach(b=>b.classList.remove('pill--active'));
    btn.classList.add('pill--active');
    uiState.qfilter = btn.dataset.qfilter || 'all';
    renderResults();
  });
});


/* Product Modal */
const modal = $('#productModal');
let currentProduct = null;

function openModal(productId, opts = {}){
  const p = PRODUCTS.find(x=>x.id===productId);
  if(!p) return;
  modal.dataset.preview = opts.preview ? '1' : '';
  renderPdp(p, opts);

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}

function renderPdp(p, opts = {}){
  currentProduct = p;

  $('#pdpTitle').textContent = p.title;
  $('#pdpPrice').textContent = p.price ? `₹${p.price}` : 'Coming Soon';
  $('#qtyVal').value = 1;

  // thumbs
  const thumbs = $('#pdpThumbs');
  const imgs = (p.images||[]);
  const startIdx = Math.min(Math.max(0, parseInt(opts.imageIndex ?? 0, 10) || 0), Math.max(0, imgs.length-1));
  thumbs.innerHTML = '';
  imgs.forEach((src, i)=>{
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'pdp__thumb' + (i===startIdx?' is-active':'');
    b.innerHTML = `<img src="${src}" alt="">`;
    b.addEventListener('click', ()=>{
      $('#pdpMainImg').src = src;
      $$('.pdp__thumb', thumbs).forEach(t=>t.classList.remove('is-active'));
      b.classList.add('is-active');
    });
    thumbs.appendChild(b);
  });
  $('#pdpMainImg').src = imgs[startIdx] ? imgs[startIdx] : '';

  // variants availability (same design title)
  const group = PRODUCT_GROUPS[(p.title||'').trim()] || {};
  $$('#pdpVariant .seg__btn').forEach(btn=>{
    const v = btn.dataset.variant;
    const pv = group[v];
    const ok = !!pv && (pv.available !== false);
    btn.disabled = !ok;
    btn.classList.toggle('seg__btn--disabled', !ok);
    btn.classList.toggle('seg__btn--active', v === p.variant);
  });

  // WhatsApp button state
  const wa = $('#waOrderBtn');
  const isAvailable = (p.available !== false);
  if(opts.preview){
    wa.disabled = true;
    wa.textContent = 'Launching Friday (Preview Only)';
  }else if(!isAvailable){
    wa.disabled = true;
    wa.textContent = 'Not Available';
  }else{
    wa.disabled = false;
    wa.textContent = 'WhatsApp Order';
  }
}
function closeModal(){
  if(typeof closeOrderSheet==='function'){ closeOrderSheet(); }
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}

modal.addEventListener('click', (e)=>{
  if(e.target && e.target.dataset && e.target.dataset.close) closeModal();
});

document.addEventListener('keydown', (e)=>{
  if(e.key==='Escape' && modal.classList.contains('is-open')) closeModal();
});

document.addEventListener('click', (e)=>{
  const openEl = e.target?.closest?.('[data-open]');
  const openId = openEl?.dataset?.open;
  if(openId) openModal(openId);

  const waEl = e.target?.closest?.('[data-wa]');
  const waId = waEl?.dataset?.wa;
  if(waId){
    openModal(waId);
    setTimeout(()=> $('#waOrderBtn')?.click(), 0);
  }
});

/* Quantity buttons */
$('#qtyMinus').addEventListener('click', ()=>{
  const v = Math.max(1, parseInt($('#qtyVal').value||'1',10)-1);
  $('#qtyVal').value = v;
});
$('#qtyPlus').addEventListener('click', ()=>{
  const v = Math.max(1, parseInt($('#qtyVal').value||'1',10)+1);
  $('#qtyVal').value = v;
});

/* Variant / Size selection */
$('#pdpVariant').addEventListener('click', (e)=>{
  const b = e.target.closest('button[data-variant]');
  if(!b || b.disabled || !currentProduct) return;
  const v = b.dataset.variant;
  const group = PRODUCT_GROUPS[(currentProduct.title||'').trim()] || {};
  const next = group[v];
  if(!next) return;
  const preview = modal.dataset.preview === '1';
  // keep same gallery index when switching variants
  const thumbs = $$('#pdpThumbs .pdp__thumb');
  let imgIndex = thumbs.findIndex(t=>t.classList.contains('is-active'));
  if(imgIndex < 0) imgIndex = 0;
  renderPdp(next, {preview, imageIndex: imgIndex});
});
$('#pdpSizes').addEventListener('click', (e)=>{
  const b = e.target.closest('button[data-size]');
  if(!b) return;
  $$('#pdpSizes .size').forEach(x=>x.classList.remove('size--active'));
  b.classList.add('size--active');
});

/* WhatsApp order */
function getSelectedVariant(){
  return $('#pdpVariant .seg__btn--active')?.dataset?.variant || 'White';
}
function getSelectedSize(){
  return $('#pdpSizes .size--active')?.dataset?.size || 'M';
}

const orderSheet = $('#orderSheet');
const orderForm = $('#orderForm');
function openOrderSheet(){
  if(!orderSheet) return;
  orderSheet.classList.add('is-open');
  orderSheet.setAttribute('aria-hidden','false');
  // keep focus sensible on mobile
  setTimeout(()=> $('#custName')?.focus(), 50);
}
function closeOrderSheet(){
  if(!orderSheet) return;
  orderSheet.classList.remove('is-open');
  orderSheet.setAttribute('aria-hidden','true');
}

$('#orderBackBtn')?.addEventListener('click', closeOrderSheet);

$('#waOrderBtn')?.addEventListener('click', ()=>{
  if(!currentProduct) return;
  // If Friday preview modal is open, do not allow ordering
  if(modal?.dataset.preview === '1'){
    alert('This is a preview. Please open product from shop to order.');
    return;
  }
  openOrderSheet();
});

orderForm?.addEventListener('submit', (e)=>{
  e.preventDefault();
  if(!currentProduct) return;

  const variant = $('#pdpVariant .seg__btn--active')?.dataset.variant || currentProduct.variant || '—';
  const size = $('#pdpSizes .size--active')?.dataset.size || '—';
  const qty = parseInt($('#qtyVal')?.value || '1', 10) || 1;

  const name = ($('#custName')?.value || '').trim();
  const phoneNo = ($('#custPhone')?.value || '').trim();
  const address = ($('#custAddress')?.value || '').trim();
  const city = ($('#custCity')?.value || '').trim();
  const state = ($('#custState')?.value || '').trim();
  const pin = ($('#custPin')?.value || '').trim();
  const pay = ($('#custPayment')?.value || 'Prepaid').trim();
  const note = ($('#custNote')?.value || '').trim();

  const digitsPhone = phoneNo.replace(/\D/g,'');
  const digitsPin = pin.replace(/\D/g,'');

  if(!name || digitsPhone.length < 10 || !address || !city || !state || digitsPin.length !== 6){
    alert('Please fill all details correctly (Mobile 10 digits, Pin 6 digits).');
    return;
  }

  // NOTE: Replace with your WhatsApp number (without +)
  const waPhone = '918287578027';

  const firstImg = (currentProduct.images && currentProduct.images[0]) ? `${location.origin}/${currentProduct.images[0]}` : '';

  const msg =
`Assalamualaikum!\n\nOrder Details:\nProduct: ${currentProduct.title}\nVariant: ${variant}\nSize: ${size}\nQty: ${qty}\nPrice: ${currentProduct.price ? '₹'+currentProduct.price : 'Coming Soon'}\nImage: ${firstImg}\n\nCustomer Details:\nName: ${name}\nMobile: ${digitsPhone}\nAddress: ${address}\nCity: ${city}\nState: ${state}\nPin Code: ${digitsPin}\nPayment: ${pay}${note ? `\nNote: ${note}` : ''}\n\nPlease confirm availability.`;

  const url = `https://wa.me/${waPhone}?text=${encodeURIComponent(msg)}`;
  const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
  closeOrderSheet();
  if(isMobile){ window.location.href = url; }
  else { window.open(url, '_blank'); }
});


/* Pincode check (demo) */
$('#pinCheck').addEventListener('click', ()=>{
  const pin = ($('#pinInput').value||'').trim();
  const note = $('#pinNote');
  if(!pin){ note.textContent = 'Please enter a pin code.'; return; }
  if(pin.length < 6){ note.textContent = 'Pin code should be 6 digits.'; return; }
  note.textContent = 'Estimated delivery: 2–5 working days (metros 2–3 days).';
});
