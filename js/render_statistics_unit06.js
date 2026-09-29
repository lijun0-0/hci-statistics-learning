function renderDistributionPlayground(block, blockIndex) {
  const presets = block.presets || [
    {
      id: "default",
      label: "Default",
      data: block.data || []
    }
  ];

  const defaultPreset = block.defaultPreset || presets[0].id;
  const encodedPresets = encodeURIComponent(JSON.stringify(presets));
  const encodedLines = encodeURIComponent(JSON.stringify(block.showLines || ["mean", "median", "mode"]));

  let presetButtonsHtml = "";
  presets.forEach(function (preset) {
    presetButtonsHtml += `
      <button 
        type="button"
        class="distribution-preset-button"
        data-preset-id="${preset.id}">
        ${preset.label}
      </button>
    `;
  });

  return `
    <div 
      class="distribution-playground"
      data-presets="${encodedPresets}"
      data-default-preset="${defaultPreset}"
      data-show-lines="${encodedLines}">

      <div class="distribution-header">
        <h3>Distribution playground</h3>
        <p>${block.instruction || "Change the data and watch the summary values."}</p>
      </div>

      <div class="distribution-preset-buttons">
        ${presetButtonsHtml}
      </div>

      <div class="distribution-layout">
        <div class="distribution-data-panel">
          <h4>Data values</h4>
          <p class="distribution-small-note">Use ✓ / × to include or skip a value.</p>
          <div class="distribution-data-list"></div>
        </div>

        <div class="distribution-plot-panel">
          <div class="distribution-svg-area"></div>
          <div class="distribution-legend">
            <span><span class="legend-line mean-line"></span>Mean</span>
            <span><span class="legend-line median-line"></span>Median</span>
            <span><span class="legend-line mode-line"></span>Mode</span>
          </div>
        </div>
      </div>

      <div class="distribution-stats"></div>
    </div>
  `;
}

function setupDistributionPlaygrounds(root) {
  const playgrounds = root.querySelectorAll(".distribution-playground");

  playgrounds.forEach(function (playground) {
    const presets = JSON.parse(decodeURIComponent(playground.dataset.presets));
    const showLines = JSON.parse(decodeURIComponent(playground.dataset.showLines));
    const defaultPresetId = playground.dataset.defaultPreset;

    let currentValues = [];

    function loadPreset(presetId) {
      const selectedPreset = presets.find(function (preset) {
        return preset.id === presetId;
      }) || presets[0];

      currentValues = selectedPreset.data.map(function (value, valueIndex) {
        return {
          id: valueIndex,
          value: Number(value),
          active: true
        };
      });

      const buttons = playground.querySelectorAll(".distribution-preset-button");
      buttons.forEach(function (button) {
        if (button.dataset.presetId === selectedPreset.id) {
          button.classList.add("active");
        } else {
          button.classList.remove("active");
        }
      });

      renderDistributionState();
    }

    function renderDistributionState() {
      renderDistributionInputs(playground, currentValues, renderDistributionState);
      renderDistributionPlot(playground, currentValues, showLines);
      renderDistributionStats(playground, currentValues);
    }

    const buttons = playground.querySelectorAll(".distribution-preset-button");
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        loadPreset(button.dataset.presetId);
      });
    });

    loadPreset(defaultPresetId);
  });
}

function renderDistributionInputs(playground, values, onChange) {
  const list = playground.querySelector(".distribution-data-list");
  let html = "";

  values.forEach(function (item, itemIndex) {
    const activeClass = item.active ? "" : "inactive";
    const buttonText = item.active ? "✓" : "×";

    html += `
      <div class="distribution-value-chip ${activeClass}">
        <button 
          type="button"
          class="distribution-toggle-button"
          data-value-index="${itemIndex}">
          ${buttonText}
        </button>
        <input 
          type="number"
          value="${item.value}"
          data-value-index="${itemIndex}">
        <span>s</span>
      </div>
    `;
  });

  list.innerHTML = html;

  const toggleButtons = list.querySelectorAll(".distribution-toggle-button");
  toggleButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const valueIndex = Number(button.dataset.valueIndex);
      values[valueIndex].active = !values[valueIndex].active;
      onChange();
    });
  });

  const inputs = list.querySelectorAll("input");
  inputs.forEach(function (input) {
    input.addEventListener("change", function () {
      const valueIndex = Number(input.dataset.valueIndex);
      values[valueIndex].value = Number(input.value);
      onChange();
    });
  });
}

function getActiveDistributionValues(values) {
  return values
    .filter(function (item) {
      return item.active === true && Number.isFinite(item.value);
    })
    .map(function (item) {
      return item.value;
    });
}

function calculateMean(values) {
  if (values.length === 0) {
    return null;
  }

  const total = values.reduce(function (sum, value) {
    return sum + value;
  }, 0);

  return total / values.length;
}

function calculateMedian(values) {
  if (values.length === 0) {
    return null;
  }

  const sorted = values.slice().sort(function (a, b) {
    return a - b;
  });

  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 1) {
    return sorted[middle];
  }

  return (sorted[middle - 1] + sorted[middle]) / 2;
}

function calculateModes(values) {
  if (values.length === 0) {
    return [];
  }

  const counts = {};
  values.forEach(function (value) {
    const key = String(value);
    counts[key] = (counts[key] || 0) + 1;
  });

  let maxCount = 0;
  Object.keys(counts).forEach(function (key) {
    if (counts[key] > maxCount) {
      maxCount = counts[key];
    }
  });

  if (maxCount <= 1) {
    return [];
  }

  return Object.keys(counts)
    .filter(function (key) {
      return counts[key] === maxCount;
    })
    .map(function (key) {
      return Number(key);
    })
    .sort(function (a, b) {
      return a - b;
    });
}

function renderDistributionStats(playground, values) {
  const statsBox = playground.querySelector(".distribution-stats");
  const activeValues = getActiveDistributionValues(values);
  const mean = calculateMean(activeValues);
  const median = calculateMedian(activeValues);
  const modes = calculateModes(activeValues);

  const modeText = modes.length > 0
    ? modes.map(formatDistributionNumber).join(", ") + "s"
    : "No clear mode";

  statsBox.innerHTML = `
    <div class="stat-card">
      <strong>n</strong>
      <span>${activeValues.length}</span>
    </div>
    <div class="stat-card">
      <strong>Mean</strong>
      <span>${mean === null ? "—" : formatDistributionNumber(mean) + "s"}</span>
    </div>
    <div class="stat-card">
      <strong>Median</strong>
      <span>${median === null ? "—" : formatDistributionNumber(median) + "s"}</span>
    </div>
    <div class="stat-card">
      <strong>Mode</strong>
      <span>${modeText}</span>
    </div>
  `;
}

function renderDistributionPlot(playground, values, showLines) {
  const plotArea = playground.querySelector(".distribution-svg-area");
  const activeValues = getActiveDistributionValues(values);

  if (activeValues.length === 0) {
    plotArea.innerHTML = `<p class="distribution-empty-message">No active values.</p>`;
    return;
  }

  const mean = calculateMean(activeValues);
  const median = calculateMedian(activeValues);
  const modes = calculateModes(activeValues);

  const importantValues = activeValues.slice();
  if (mean !== null) importantValues.push(mean);
  if (median !== null) importantValues.push(median);
  modes.forEach(function (mode) {
    importantValues.push(mode);
  });

  let minValue = Math.min.apply(null, importantValues);
  let maxValue = Math.max.apply(null, importantValues);

  if (minValue === maxValue) {
    minValue = minValue - 5;
    maxValue = maxValue + 5;
  } else {
    const padding = (maxValue - minValue) * 0.08;
    minValue = minValue - padding;
    maxValue = maxValue + padding;
  }

  const width = 760;
  const height = 280;
  const left = 52;
  const right = 40;
  const top = 30;
  const baseline = 218;
  const plotWidth = width - left - right;

  function xScale(value) {
    return left + ((value - minValue) / (maxValue - minValue)) * plotWidth;
  }

  const sortedValues = activeValues.slice().sort(function (a, b) {
    return a - b;
  });

  const stacks = {};
  let dotsHtml = "";
  sortedValues.forEach(function (value) {
    const key = String(value);
    stacks[key] = stacks[key] || 0;
    const stackIndex = stacks[key];
    stacks[key] = stacks[key] + 1;

    const cx = xScale(value);
    const cy = baseline - stackIndex * 16;
    dotsHtml += `<circle class="distribution-dot" cx="${cx}" cy="${cy}" r="6"></circle>`;
  });

  let linesHtml = "";
  if (showLines.includes("mean") && mean !== null) {
    linesHtml += renderDistributionLine(xScale(mean), top, baseline, "mean", "Mean");
  }
  if (showLines.includes("median") && median !== null) {
    linesHtml += renderDistributionLine(xScale(median), top + 8, baseline, "median", "Median");
  }
  if (showLines.includes("mode") && modes.length > 0) {
    modes.forEach(function (mode, modeIndex) {
      linesHtml += renderDistributionLine(xScale(mode), top + 16 + modeIndex * 8, baseline, "mode", "Mode");
    });
  }

  const tickCount = 5;
  let ticksHtml = "";
  for (let tickIndex = 0; tickIndex < tickCount; tickIndex++) {
    const tickValue = minValue + ((maxValue - minValue) * tickIndex) / (tickCount - 1);
    const tickX = xScale(tickValue);
    ticksHtml += `
      <line class="distribution-tick" x1="${tickX}" y1="${baseline}" x2="${tickX}" y2="${baseline + 6}"></line>
      <text class="distribution-axis-label" x="${tickX}" y="${baseline + 24}">${formatDistributionNumber(tickValue)}s</text>
    `;
  }

  plotArea.innerHTML = `
    <svg class="distribution-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Dot plot with mean, median, and mode lines">
      <line class="distribution-axis" x1="${left}" y1="${baseline}" x2="${width - right}" y2="${baseline}"></line>
      ${ticksHtml}
      ${linesHtml}
      ${dotsHtml}
    </svg>
  `;
}

function renderDistributionLine(x, top, bottom, className, label) {
  return `
    <g class="distribution-centre-line ${className}-centre-line">
      <line x1="${x}" y1="${top}" x2="${x}" y2="${bottom}"></line>
      <text x="${x + 6}" y="${top + 12}">${label}</text>
    </g>
  `;
}

function formatDistributionNumber(value) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  if (Math.abs(value - Math.round(value)) < 0.05) {
    return String(Math.round(value));
  }

  return value.toFixed(1);
}

function initUnit06StatisticsInteractions(root) {
  setupDistributionPlaygrounds(root);
}

registerBlockRenderer("distributionPlayground", renderDistributionPlayground);
registerBlockInitializer(initUnit06StatisticsInteractions);