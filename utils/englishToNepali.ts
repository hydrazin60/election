const vowels: Record<string, string> = {
  a: "अ",
  aa: "आ",
  i: "इ",
  ee: "ई",
  u: "उ",
  oo: "ऊ",
  e: "ए",
  ai: "ऐ",
  o: "ओ",
  au: "औ",
};

const matras: Record<string, string> = {
  a: "",
  aa: "ा",
  i: "ि",
  ee: "ी",
  u: "ु",
  oo: "ू",
  e: "े",
  ai: "ै",
  o: "ो",
  au: "ौ",
};

const consonants: Record<string, string> = {
  k: "क",
  kh: "ख",
  g: "ग",
  gh: "घ",
  ch: "च",
  chh: "छ",
  j: "ज",
  jh: "झ",
  t: "त",
  th: "थ",
  d: "द",
  dh: "ध",
  n: "न",
  p: "प",
  ph: "फ",
  b: "ब",
  bh: "भ",
  m: "म",
  y: "य",
  r: "र",
  l: "ल",
  w: "व",
  v: "व",
  s: "स",
  sh: "श",
  h: "ह",
  gy: "ज्ञ",
  tr: "त्र",
};

const commonNames: Record<string, string> = {
  // Original entries
  arjun: "अर्जुन",
  ram: "राम",
  shyam: "श्याम",
  krishna: "कृष्ण",
  sushant: "सुशान्त",
  ramesh: "रमेश",
  rajesh: "राजेश",
  pandey: "पाण्डे",
  rai: "राई",
  khadka: "खड्का",
  shrestha: "श्रेष्ठ",
  thapa: "थापा",
  adhikari: "अधिकारी",
  bal: "बाल",
  kumari: "कुमारी",
  majhi: "माझी",

  // *** First/Middle Names ***
  bahadur: "बहादुर",
  ganga: "गंगा",
  maya: "माया",
  sari: "सरी",
  kumar: "कुमार",
  prasad: "प्रसाद",
  lal: "लाल",
  chandra: "चन्द्र",
  ganesh: "गणेश",
  shiva: "शिव",
  man: "मान",
  bir: "बिर",
  dil: "दिल",
  naran: "नर",
  dambar: "डम्बर",
  tika: "टिका",
  tek: "टेक",
  gambhir: "गम्भीर",
  hark: "हर्क",
  bhim: "भिम",
  padam: "पदम",
  prem: "प्रेम",
  sharan: "शरण",
  sher: "शेर",
  jit: "जित",
  jivan: "जीवन",
  dipak: "दिपक",
  gopal: "गोपाल",
  govinda: "गोविन्द",
  tanka: "टंक",
  dhan: "धन",
  goma: "गोमा",
  sita: "सिता",
  kamal: "कमल",
  jaya: "जय",
  mangal: "मंगल",
  phul: "फूल",
  ratna: "रत्न",
  hira: "हिरा",
  devi: "देवी",
  nirmala: "निर्मला",
  sunita: "सुनिता",
  ambika: "अम्बिका",
  kalpana: "कल्पना",
  sukh: "सुख",
  birta: "विर्ता",
  aasha: "आशा",
  magar: "मगर",
  karki: "कार्की",
  khatri: "खत्री",
  basnet: "बस्नेत",
  tamang: "तामाङ्ग",
  bhujel: "भुजेल",
  bisht: "बिष्ट",
  biswakarma: "बिश्वकर्मा",
  katwal: "कटुवाल",
  pau: "पौ",
  raut: "राउत",
  gharti: "घर्ती",
  sah: "साह",
  sunuwar: "सुनुवार",
  darji: "दर्जी",
  khapangi: "खापाङ्गी",
  chauhan: "चौहान",
  lamichhane: "लामिछाने",
  pokhrel: "पोख्रेल",
  ghimire: "घिमिरे",
  sapkota: "सापकोटा",
  budhathoki: "बुढाथोकी",
};
function transliterateWord(word: string): string {
  if (commonNames[word]) return commonNames[word];

  let result = "";
  let i = 0;

  while (i < word.length) {
    let cons = "";
    for (let len = 3; len > 0; len--) {
      const part = word.substring(i, i + len);
      if (consonants[part]) {
        cons = part;
        break;
      }
    }

    if (cons) {
      const base = consonants[cons];
      i += cons.length;

      let vowel = "";
      for (let len = 2; len > 0; len--) {
        const v = word.substring(i, i + len);
        if (matras[v] !== undefined) {
          vowel = v;
          break;
        }
      }

      if (vowel) {
        result += base + matras[vowel];
        i += vowel.length;
      } else {
        result += base + "्";
      }
      continue;
    }

    let vowelFound = false;
    for (let len = 2; len > 0; len--) {
      const v = word.substring(i, i + len);
      if (vowels[v]) {
        result += vowels[v];
        i += len;
        vowelFound = true;
        break;
      }
    }

    if (!vowelFound) i++;
  }

  return result.replace(/्$/, "");
}

export function englishToNepali(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .map(transliterateWord)
    .join(" ");
}
