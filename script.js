(function () {
  "use strict";

  const U = (id, w) => `https://images.unsplash.com/photo-${id}?fm=jpg&q=70&w=${w || 800}&auto=format&fit=crop`;
  const P = (id, who, handle, w) => ({
    img: U(id, w),
    credit: `Photo by ${who} on Unsplash`,
    creditHref: `https://unsplash.com/@${handle}`
  });

  const DATA = [
    { key: "KAHVALTILAR", items: [
      { name: "FIRST DATE SERPME", price: "780,00 ₺", desc: "Köy yumurtası, 12 çeşit meze, sıcak ekmek sepeti, demlik çay ile. (İki kişilik)", tags: ["İki kişilik", "Demlik çay dahil", "Vejetaryen"], ...P("1633040243823-6bf8d4edb0ec", "Ömer Haktan Bulut", "omerhaktan") },
      { name: "FRANSIZ KAHVALTISI", price: "360,00 ₺", desc: "1 kruvasan, labne, tereyağı, fıstık ezmesi, ev reçelleri", tags: ["Tek kişilik", "Fırından günlük"], ...P("1664192579000-fe65c5692d22", "Alice Pasqual", "stri_khedonia") },
      { name: "ÇILBIR FRANKFURTER", price: "680,00 ₺", desc: "2 çılbır yumurta, dana sosis, özel harman süzme yoğurt, Kars kaşarı, zeytin, domates söğüş, kırmızı yağ, kekik, 1 çay", tags: ["Sıcak", "Acı seçeneği var"], ...P("1715194288597-cd4df523776e", "Alexandra Tran", "alexgoesglobal") },
      { name: "SMOOTHIE BOWL", price: "340,00 ₺", desc: "Çilekli yoğurt, badem sütü, chia, yulaf ezmesi, granola, muz, orman meyveleri", tags: ["Glutensiz", "Şeker ilavesiz"], ...P("1661685452870-e89b6e8c14fa", "Igor Sporynin", "igorharrier") },
      { name: "MENEMEN FIRST DATE", price: "290,00 ₺", desc: "Tereyağında domates, yeşil biber, köy yumurtası, taze kekik, bol ekmek", tags: ["Sıcak", "Vejetaryen"], ...P("1635432877848-9c86755eb2f9", "Victoria Morgan", "camerasimagination") }
    ]},
    { key: "TATLILAR", items: [
      { name: "SAN SEBASTIAN", price: "260,00 ₺", desc: "Bask usulü yanık cheesecake, tuz karamel sos", tags: ["Günlük", "Fırından"], ...P("1617806501599-f21ee9e8b189", "Ömer Haktan Bulut", "omerhaktan") },
      { name: "TAHİNLİ İRMİK HELVASI", price: "180,00 ₺", desc: "Tereyağlı irmik, tahin, çam fıstığı, yanında kaymak", tags: ["Sıcak servis"], ...P("1617806501370-de538e4bbaca", "Ömer Haktan Bulut", "omerhaktan") },
      { name: "PORTAKALLI REVANİ", price: "170,00 ₺", desc: "Portakal şerbetli revani, süzme yoğurt dondurma", tags: ["Vejetaryen"], ...P("1555148484-324aae683a86", "Salih Akyürek", "salihakyurek") },
      { name: "ÇİKOLATALI FONDAN", price: "240,00 ₺", desc: "Akışkan bitter çikolata, vanilya dondurma, fındık kırıkları", tags: ["Sıcak", "Glutensiz değil"], ...P("1550946715-c2d98d2f5c74", "Maria Teneva", "miteneva") }
    ]},
    { key: "SICAK İÇECEKLER", items: [
      { name: "FİLTRE KAHVE V60", price: "150,00 ₺", desc: "Etiyopya Yirgacheffe, tek kaynak, günlük kavrum", tags: ["Tek kaynak", "Sade"], ...P("1661685249298-3d2dbe68d309", "Igor Sporynin", "igorharrier") },
      { name: "FLAT WHITE", price: "160,00 ₺", desc: "Çift shot espresso, ipek dokulu süt", tags: ["Sütlü", "Laktozsuz seçenek"], ...P("1661685249316-a06e692e1cb2", "Igor Sporynin", "igorharrier") },
      { name: "TÜRK KAHVESİ", price: "120,00 ₺", desc: "Bakır cezvede, yanında lokum ve su", tags: ["Cezve", "Şeker seçmeli"], ...P("1690063860120-3521cead6c1c", "Büşra Salkım", "busgram") }
    ]},
    { key: "SOĞUK İÇECEKLER", items: [
      { name: "ICE AMERICANO", price: "170,00 ₺", desc: "Çift shot espresso, bol buz, soğuk su", tags: ["Soğuk", "Sade"], img: "images/soguk-demleme.jpg" },
      { name: "ICE LATTE", price: "180,00 ₺", desc: "Buzlu süt üzerine katmanlı espresso servis", tags: ["Sütlü", "Soğuk"], img: "images/iced-latte.jpg" }
    ]}
  ];

  const TILES = [
    { label: "KAHVALTILAR", cat: 0, ...P("1580069491658-8220b0e8722d", "Aram Sabah", "aramsabah") },
    { label: "TATLILAR", cat: 1, ...P("1762808626413-2a18e7e63655", "Recepcan Kazanc", "kazancdesign") },
    { label: "SICAK İÇECEKLER", cat: 2, ...P("1647772809729-7afb10f80766", "Lala Azizli", "lazizli") },
    { label: "SOĞUK İÇECEKLER", cat: 3, img: "images/soguk-demleme.jpg" }
  ];

  const el = (sel) => document.querySelector(sel);
  const screenHome = el("#screen-home");
  const screenMenu = el("#screen-menu");
  const tilesEl = el("#tiles");
  const catsEl = el("#cats");
  const itemsEl = el("#items");
  const activeLabelEl = el("#active-label");
  const overlay = el("#overlay");
  const sheet = el("#sheet");

  let activeCat = 0;

  function showScreen(name) {
    screenHome.hidden = name !== "home";
    screenMenu.hidden = name !== "menu";
    if (name === "menu") renderMenu();
    window.scrollTo(0, 0);
  }

  function renderTiles() {
    tilesEl.innerHTML = "";
    TILES.forEach((t) => {
      const btn = document.createElement("button");
      btn.className = "tile";
      btn.innerHTML = `<img src="${t.img}" alt="${t.label}" /><div class="tile__label">${t.label}</div>`;
      btn.addEventListener("click", () => {
        activeCat = t.cat;
        showScreen("menu");
      });
      tilesEl.appendChild(btn);
    });
  }

  function renderCats() {
    catsEl.innerHTML = "";
    DATA.forEach((c, i) => {
      const btn = document.createElement("button");
      btn.className = "cat" + (i === activeCat ? " active" : "");
      btn.textContent = c.key;
      btn.addEventListener("click", () => {
        activeCat = i;
        renderMenu();
      });
      catsEl.appendChild(btn);
    });
  }

  function renderItems() {
    const cat = DATA[activeCat];
    activeLabelEl.textContent = cat.key;
    itemsEl.innerHTML = "";
    cat.items.forEach((it) => {
      const btn = document.createElement("button");
      btn.className = "item";
      btn.innerHTML = `
        <div class="item__body">
          <div class="item__name">${it.name}</div>
          <div class="item__price">${it.price}</div>
          <div class="item__desc">${it.desc}</div>
        </div>
        <div class="item__img"><img src="${it.img}" alt="${it.name}" /></div>
      `;
      btn.addEventListener("click", () => openItem(it));
      itemsEl.appendChild(btn);
    });
  }

  function renderMenu() {
    renderCats();
    renderItems();
  }

  function openItem(it) {
    el("#sheet-img").src = it.img;
    el("#sheet-img").alt = it.name;
    el("#sheet-name").textContent = it.name;
    el("#sheet-price").textContent = it.price;
    el("#sheet-desc").textContent = it.desc;
    const tagsEl = el("#sheet-tags");
    tagsEl.innerHTML = "";
    it.tags.forEach((tag) => {
      const span = document.createElement("span");
      span.textContent = tag;
      tagsEl.appendChild(span);
    });
    overlay.hidden = false;
    sheet.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeItem() {
    overlay.hidden = true;
    sheet.hidden = true;
    document.body.style.overflow = "";
  }

  document.addEventListener("click", (e) => {
    const target = e.target.closest("[data-goto]");
    if (target) showScreen(target.dataset.goto);
  });

  overlay.addEventListener("click", closeItem);
  el("#sheet-close").addEventListener("click", closeItem);

  renderTiles();
  showScreen("home");
})();
