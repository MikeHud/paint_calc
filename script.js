// Jotun paint mixing data
const paintData = {
  "jotamastic-87": {
    name: "Jotamastic 87",
    ratios: {
      standard: 9, // 4:1 ratio
      winter: 6, // 3:1 ratio
    },
    description: "High-build epoxy coating",
  },
  "jotamastic-90": {
    name: "Jotamastic 90",
    ratios: {
      standard: 5.5, // 4:1 ratio
      winter: 5.5, // 3:1 ratio
    },
    description: "High-build epoxy coating",
  },
};

// DOM elements
const paintTypeSelect = document.getElementById("paintType");
const totalWeightInput = document.getElementById("totalWeight");
const hardenerTypeRadios = document.querySelectorAll(
  'input[name="hardenerType"]'
);
const calculateBtn = document.getElementById("calculateBtn");
const resultsDiv = document.getElementById("results");
const errorDiv = document.getElementById("error");
const baseWeightSpan = document.getElementById("baseWeight");
const hardenerWeightSpan = document.getElementById("hardenerWeight");
const mixingRatioSpan = document.getElementById("mixingRatio");
const errorMessageP = document.getElementById("errorMessage");

// Check if running in iframe for embeddable styling
function checkIfEmbedded() {
  if (window.self !== window.top) {
    document.body.classList.add("embeddable");
  }
}

// Calculate mixing ratios
function calculateMixing() {
  const paintType = paintTypeSelect.value;
  const totalWeight = parseFloat(totalWeightInput.value);
  const hardenerType = document.querySelector(
    'input[name="hardenerType"]:checked'
  )?.value;

  // Hide previous results and errors
  resultsDiv.classList.add("hidden");
  errorDiv.classList.add("hidden");

  // Validation
  if (!paintType) {
    showError("Please select a paint type.");
    return;
  }

  if (!totalWeight || totalWeight <= 0) {
    showError("Please enter a valid total weight greater than 0.");
    return;
  }

  if (!hardenerType) {
    showError("Please select a hardener type.");
    return;
  }

  const paint = paintData[paintType];
  if (!paint) {
    showError("Selected paint type not found.");
    return;
  }

  // Get the ratios for the selected hardener type
  const ratios = paint.ratios[hardenerType];

  // Calculate weights
  const baseWeight = (totalWeight * ratios) / (ratios + 1);
  const hardenerWeight = (totalWeight * 1) / (ratios + 1);

  // Display results
  baseWeightSpan.textContent = `${baseWeight.toFixed(0)} g`;
  hardenerWeightSpan.textContent = `${hardenerWeight.toFixed(0)} g`;
  mixingRatioSpan.textContent = `${ratios}:1 (base:hardener)`;

  resultsDiv.classList.remove("hidden");
}

// Show error message
function showError(message) {
  errorMessageP.textContent = message;
  errorDiv.classList.remove("hidden");
}

// Event listeners
calculateBtn.addEventListener("click", calculateMixing);

// Allow Enter key to trigger calculation
totalWeightInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    calculateMixing();
  }
});

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  checkIfEmbedded();

  // Focus on first input for better UX
  paintTypeSelect.focus();
});

// Export for external use (if needed)
window.JotunPaintCalculator = {
  calculateMixing,
  paintData,
};
