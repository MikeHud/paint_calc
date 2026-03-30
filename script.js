const paintData = {
  "jotamastic-87": {
    name: "Jotamastic 87",
    ratios: {
      standard: 8.94,
      winter: 5.96,
    },
    // Theoretical spreading rate (m²/l) at minimum recommended DFT, from TDS
    // Density 1.4 kg/l → grams/m² = 1400 / TSR
    tsr: {
      standard: 5.5,  // at 150 μm DFT
      winter: 4.9,    // at 150 μm DFT
    },
    potLife: {
      standard: "2 hrs at 23°C (allow 10 min induction before applying)",
      winter: "1 hr at 23°C",
    },
  },
  "jotamastic-90": {
    name: "Jotamastic 90",
    ratios: {
      standard: 5.5,
      winter: 5.5,
    },
    // Theoretical spreading rate (m²/l) at minimum recommended DFT, from TDS
    tsr: {
      standard: 8.0,  // at 100 μm DFT
      winter: 8.0,    // at 100 μm DFT
    },
    potLife: {
      standard: "2 hrs at 23°C",
      winter: "45 min at 23°C",
    },
  },
};

const DENSITY_G_PER_L = 1400;

const paintTypeSelect = document.getElementById("paintType");
const totalWeightInput = document.getElementById("totalWeight");
const resultsDiv = document.getElementById("results");
const baseWeightSpan = document.getElementById("baseWeight");
const hardenerWeightSpan = document.getElementById("hardenerWeight");
const baseBar = document.getElementById("baseBar");
const hardenerBar = document.getElementById("hardenerBar");
const ratioLabel = document.getElementById("ratioLabel");
const potLifeNote = document.getElementById("potLifeNote");
const copyBtn = document.getElementById("copyBtn");

const coverageToggle = document.getElementById("coverageToggle");
const coverageCalc = document.getElementById("coverageCalc");
const surfaceAreaInput = document.getElementById("surfaceArea");
const coverageResult = document.getElementById("coverageResult");
const coverageGramsSpan = document.getElementById("coverageGrams");
const useCoverageBtn = document.getElementById("useCoverageBtn");

function checkIfEmbedded() {
  if (window.self !== window.top) {
    document.body.classList.add("embeddable");
  }
}

function notifyParentHeight() {
  if (window.self !== window.top) {
    window.parent.postMessage({ iframeHeight: document.documentElement.scrollHeight }, "*");
  }
}

function getSelectedHardener() {
  return document.querySelector('input[name="hardenerType"]:checked')?.value;
}

function getNumCoats() {
  return parseInt(document.querySelector('input[name="numCoats"]:checked')?.value || "1");
}

function calculate() {
  const paintType = paintTypeSelect.value;
  const totalWeight = parseFloat(totalWeightInput.value);
  const hardenerType = getSelectedHardener();

  if (!totalWeightInput.value || totalWeight <= 0) {
    resultsDiv.classList.add("hidden");
    return;
  }

  const paint = paintData[paintType];
  const ratio = paint.ratios[hardenerType];
  const baseWeight = ((totalWeight * ratio) / (ratio + 1)).toFixed(1);
  const hardenerWeight = (totalWeight / (ratio + 1)).toFixed(1);

  baseWeightSpan.textContent = baseWeight;
  hardenerWeightSpan.textContent = hardenerWeight;

  const basePercent = (ratio / (ratio + 1)) * 100;
  baseBar.style.width = `${basePercent.toFixed(1)}%`;
  hardenerBar.style.width = `${(100 - basePercent).toFixed(1)}%`;
  ratioLabel.textContent = `${ratio}:1 mix ratio (base : hardener)`;

  potLifeNote.textContent = `Pot life: ${paint.potLife[hardenerType]}`;

  resultsDiv.classList.remove("hidden");
  notifyParentHeight();
}

function calculateCoverage() {
  const paintType = paintTypeSelect.value;
  const hardenerType = getSelectedHardener();
  const area = parseFloat(surfaceAreaInput.value);
  const coats = getNumCoats();

  if (!surfaceAreaInput.value || area <= 0) {
    coverageResult.classList.add("hidden");
    return;
  }

  const tsr = paintData[paintType].tsr[hardenerType];
  const gramsPerM2 = DENSITY_G_PER_L / tsr;
  const totalGrams = Math.ceil(area * coats * gramsPerM2);

  coverageGramsSpan.textContent = totalGrams;
  coverageResult.classList.remove("hidden");
  notifyParentHeight();
}

function copyResults() {
  const paintType = paintTypeSelect.value;
  const hardenerType = getSelectedHardener();
  const paint = paintData[paintType];
  const totalWeight = parseFloat(totalWeightInput.value);
  const ratio = paint.ratios[hardenerType];
  const baseWeight = ((totalWeight * ratio) / (ratio + 1)).toFixed(1);
  const hardenerWeight = (totalWeight / (ratio + 1)).toFixed(1);
  const hardenerLabel = hardenerType === "winter" ? "Winter Grade" : "Standard";

  const text = [
    `${paint.name} — ${hardenerLabel} hardener`,
    `Base:     ${baseWeight}g`,
    `Hardener: ${hardenerWeight}g`,
    `Total:    ${totalWeight}g`,
  ].join("\n");

  navigator.clipboard.writeText(text).then(() => {
    copyBtn.textContent = "Copied!";
    setTimeout(() => (copyBtn.textContent = "Copy Results"), 2000);
  }).catch(() => {
    copyBtn.textContent = "Copy failed";
    setTimeout(() => (copyBtn.textContent = "Copy Results"), 2000);
  });
}

// Coverage toggle
coverageToggle.addEventListener("click", () => {
  const isHidden = coverageCalc.classList.toggle("hidden");
  coverageToggle.textContent = isHidden
    ? "▸ How do I know how much paint I need?"
    : "▾ How do I know how much paint I need?";
  if (!isHidden) surfaceAreaInput.focus();
  notifyParentHeight();
});

// Use coverage amount
useCoverageBtn.addEventListener("click", () => {
  totalWeightInput.value = coverageGramsSpan.textContent;
  coverageCalc.classList.add("hidden");
  coverageToggle.textContent = "▸ How do I know how much paint I need?";
  calculate();
  resultsDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

// Recalculate coverage when product or hardener changes
function onProductChange() {
  calculate();
  calculateCoverage();
}

paintTypeSelect.addEventListener("change", onProductChange);
document.querySelectorAll('input[name="hardenerType"]').forEach((r) => {
  r.addEventListener("change", onProductChange);
});
totalWeightInput.addEventListener("input", calculate);
surfaceAreaInput.addEventListener("input", calculateCoverage);
document.querySelectorAll('input[name="numCoats"]').forEach((r) => {
  r.addEventListener("change", calculateCoverage);
});
copyBtn.addEventListener("click", copyResults);

document.addEventListener("DOMContentLoaded", () => {
  checkIfEmbedded();
  totalWeightInput.focus();
});

window.JotunPaintCalculator = { calculate, paintData };
