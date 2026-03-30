const paintData = {
  "jotamastic-87": {
    name: "Jotamastic 87",
    ratios: {
      standard: 8.94,
      winter: 5.96,
    },
  },
  "jotamastic-90": {
    name: "Jotamastic 90",
    ratios: {
      standard: 5.5,
      winter: 5.5,
    },
  },
};

const paintTypeSelect = document.getElementById("paintType");
const totalWeightInput = document.getElementById("totalWeight");
const resultsDiv = document.getElementById("results");
const baseWeightSpan = document.getElementById("baseWeight");
const hardenerWeightSpan = document.getElementById("hardenerWeight");
const baseBar = document.getElementById("baseBar");
const hardenerBar = document.getElementById("hardenerBar");
const ratioLabel = document.getElementById("ratioLabel");
const copyBtn = document.getElementById("copyBtn");

function checkIfEmbedded() {
  if (window.self !== window.top) {
    document.body.classList.add("embeddable");
  }
}

function getSelectedHardener() {
  return document.querySelector('input[name="hardenerType"]:checked')?.value;
}

function calculate() {
  const paintType = paintTypeSelect.value;
  const totalWeight = parseFloat(totalWeightInput.value);
  const hardenerType = getSelectedHardener();

  if (!totalWeightInput.value || totalWeight <= 0) {
    resultsDiv.classList.add("hidden");
    return;
  }

  const ratio = paintData[paintType].ratios[hardenerType];
  const baseWeight = ((totalWeight * ratio) / (ratio + 1)).toFixed(1);
  const hardenerWeight = (totalWeight / (ratio + 1)).toFixed(1);

  baseWeightSpan.textContent = baseWeight;
  hardenerWeightSpan.textContent = hardenerWeight;

  const basePercent = (ratio / (ratio + 1)) * 100;
  baseBar.style.width = `${basePercent.toFixed(1)}%`;
  hardenerBar.style.width = `${(100 - basePercent).toFixed(1)}%`;
  ratioLabel.textContent = `${ratio}:1 mix ratio (base : hardener)`;

  resultsDiv.classList.remove("hidden");
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

paintTypeSelect.addEventListener("change", calculate);
document.querySelectorAll('input[name="hardenerType"]').forEach((r) => {
  r.addEventListener("change", calculate);
});
totalWeightInput.addEventListener("input", calculate);
copyBtn.addEventListener("click", copyResults);

document.addEventListener("DOMContentLoaded", () => {
  checkIfEmbedded();
  totalWeightInput.focus();
});

window.JotunPaintCalculator = { calculate, paintData };
