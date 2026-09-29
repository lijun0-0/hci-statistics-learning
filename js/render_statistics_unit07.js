function normaliseNumberArray(values) {
  return values
    .map(function (value) {
      return Number(value);
    })
    .filter(function (value) {
      return Number.isNaN(value) === false;
    });
}

function formatUnit07Number(value) {
  if (value === null || value === undefined) {
    return "—";
  }

  if (Math.abs(value - Math.round(value)) < 0.0001) {
    return String(Math.round(value));
  }

  return value.toFixed(1);
}

function formatSignedUnit07Number(value) {
  if (value > 0) {
    return `+${formatUnit07Number(value)}`;
  }
  return formatUnit07Number(value);
}

function calculateMeanUnit07(values) {
  if (values.length === 0) {
    return null;
  }

  const sum = values.reduce(function (total, value) {
    return total + value;
  }, 0);

  return sum / values.length;
}

function calculateRangeUnit07(values) {
  if (values.length === 0) {
    return null;
  }

  return Math.max.apply(null, values) - Math.min.apply(null, values);
}

function calculateSampleSDUnit07(values) {
  if (values.length < 2) {
    return 0;
  }

  const mean = calculateMeanUnit07(values);

  const squaredSum = values.reduce(function (total, value) {
    const deviation = value - mean;
    return total + deviation * deviation;
  }, 0);

  const variance = squaredSum / (values.length - 1);
  return Math.sqrt(variance);
}

function calculateAverageDeviationUnit07(values, meanValue) {
  if (values.length === 0) {
    return null;
  }

  const total = values.reduce(function (sum, value) {
    return sum + Math.abs(value - meanValue);
  }, 0);

  return total / values.length;
}

function buildNumberLineSummary(values, config) {
  if (!config.summaryItems || config.summaryItems.length === 0) {
    return "";
  }

  const meanValue =
    config.meanValue !== undefined
      ? Number(config.meanValue)
      : calculateMeanUnit07(values);

  const rangeValue = calculateRangeUnit07(values);
  const sdValue = calculateSampleSDUnit07(values);
  const suffix = config.valueSuffix || "";

  let html = `<div class="number-line-summary">`;

  config.summaryItems.forEach(function (item) {
    if (item === "mean") {
      html += `<span class="number-line-chip">Mean = ${formatUnit07Number(meanValue)}${suffix}</span>`;
    }

    if (item === "range") {
      html += `<span class="number-line-chip">Range = ${formatUnit07Number(rangeValue)}${suffix}</span>`;
    }

    if (item === "sd") {
      html += `<span class="number-line-chip">SD = ${formatUnit07Number(sdValue)}${suffix}</span>`;
    }

    if (item === "n") {
      html += `<span class="number-line-chip">n = ${values.length}</span>`;
    }
  });

  html += `</div>`;
  return html;
}

function buildNumberLineSvg(config) {
  const values = normaliseNumberArray(config.values);

  if (values.length === 0) {
    return `<p>No data.</p>`;
  }

  const width = 460;
  const height = 180;
  const padding = 36;
  const axisY = 122;
  const topY = 38;

  let minValue =
    config.min !== undefined ? Number(config.min) : Math.min.apply(null, values);
  let maxValue =
    config.max !== undefined ? Number(config.max) : Math.max.apply(null, values);

  if (config.focusValue !== undefined && config.focusValue !== null) {
    minValue = Math.min(minValue, Number(config.focusValue));
    maxValue = Math.max(maxValue, Number(config.focusValue));
  }

  if (config.meanValue !== undefined && config.meanValue !== null) {
    minValue = Math.min(minValue, Number(config.meanValue));
    maxValue = Math.max(maxValue, Number(config.meanValue));
  }

  if (minValue === maxValue) {
    minValue = minValue - 1;
    maxValue = maxValue + 1;
  }

  const usableWidth = width - padding * 2;

  function scale(value) {
    return padding + ((value - minValue) / (maxValue - minValue)) * usableWidth;
  }

  let svg = `
    <svg class="number-line-svg" viewBox="0 0 ${width} ${height}" aria-hidden="true">
      <line class="number-line-axis" x1="${padding}" y1="${axisY}" x2="${width - padding}" y2="${axisY}"></line>

      <line class="number-line-tick" x1="${padding}" y1="${axisY - 8}" x2="${padding}" y2="${axisY + 8}"></line>
      <line class="number-line-tick" x1="${width - padding}" y1="${axisY - 8}" x2="${width - padding}" y2="${axisY + 8}"></line>

      <text class="number-line-tick-label" x="${padding}" y="${axisY + 24}" text-anchor="middle">${formatUnit07Number(minValue)}${config.valueSuffix || ""}</text>
      <text class="number-line-tick-label" x="${width - padding}" y="${axisY + 24}" text-anchor="middle">${formatUnit07Number(maxValue)}${config.valueSuffix || ""}</text>
  `;

  if (config.highlightRange === true) {
    const dataMin = Math.min.apply(null, values);
    const dataMax = Math.max.apply(null, values);

    svg += `
      <line
        class="number-line-range-line"
        x1="${scale(dataMin)}"
        y1="${axisY + 14}"
        x2="${scale(dataMax)}"
        y2="${axisY + 14}">
      </line>
    `;
  }

  const stackedCount = {};

  values
    .slice()
    .sort(function (a, b) {
      return a - b;
    })
    .forEach(function (value) {
      const key = String(value);
      if (!stackedCount[key]) {
        stackedCount[key] = 0;
      }

      const stackIndex = stackedCount[key];
      stackedCount[key] = stackIndex + 1;

      const x = scale(value);
      const y = axisY - 18 - stackIndex * 18;

      svg += `<circle class="number-line-point" cx="${x}" cy="${y}" r="6"></circle>`;
    });

  if (config.showMean === true || config.meanValue !== undefined) {
    const meanValue =
      config.meanValue !== undefined
        ? Number(config.meanValue)
        : calculateMeanUnit07(values);

    const meanX = scale(meanValue);

    svg += `
      <line class="number-line-mean-line" x1="${meanX}" y1="${topY}" x2="${meanX}" y2="${axisY}"></line>
      <text class="number-line-mean-label" x="${meanX}" y="${topY - 8}" text-anchor="middle">
        Mean ${formatUnit07Number(meanValue)}${config.valueSuffix || ""}
      </text>
    `;
  }

  if (config.focusValue !== undefined && config.focusValue !== null) {
    const focusX = scale(Number(config.focusValue));
    const focusY = topY + 8;

    svg += `
      <circle class="number-line-focus-point" cx="${focusX}" cy="${focusY}" r="7"></circle>
      <text class="number-line-focus-label" x="${focusX}" y="${focusY - 12}" text-anchor="middle">
        ${config.focusLabel || formatUnit07Number(config.focusValue)}
      </text>
    `;
  }

  svg += `</svg>`;
  return svg;
}

function renderNumberLineCard(config) {
  const values = normaliseNumberArray(config.values);

  return `
    <div class="number-line-card">
      ${config.title ? `<h4>${config.title}</h4>` : ""}
      ${config.caption ? `<p class="number-line-caption">${config.caption}</p>` : ""}
      <div class="number-line-svg-wrapper">
        ${buildNumberLineSvg(config)}
      </div>
      ${buildNumberLineSummary(values, config)}
    </div>
  `;
}

function renderNumberLineComparison(block) {
  return `
    <div class="number-line-comparison">
      ${renderNumberLineCard({
        title: block.leftTitle,
        caption: block.leftCaption,
        values: block.leftValues,
        min: block.min,
        max: block.max,
        valueSuffix: block.valueSuffix,
        showMean: block.showMean,
        meanValue: block.leftMeanValue,
        focusValue: block.leftFocusValue,
        focusLabel: block.leftFocusLabel,
        highlightRange: block.highlightRange,
        summaryItems: block.summaryItems
      })}

      ${renderNumberLineCard({
        title: block.rightTitle,
        caption: block.rightCaption,
        values: block.rightValues,
        min: block.min,
        max: block.max,
        valueSuffix: block.valueSuffix,
        showMean: block.showMean,
        meanValue: block.rightMeanValue,
        focusValue: block.rightFocusValue,
        focusLabel: block.rightFocusLabel,
        highlightRange: block.highlightRange,
        summaryItems: block.summaryItems
      })}
    </div>
  `;
}

function renderDeviationDemo(block) {
  const values = normaliseNumberArray(block.values).sort(function (a, b) {
    return a - b;
  });

  const meanValue =
    block.meanValue !== undefined
      ? Number(block.meanValue)
      : calculateMeanUnit07(values);

  let headerHtml = `
    <tr>
      <th>Value</th>
      <th>Deviation (xᵢ − x̄)</th>
  `;

  if (block.showAbsolute === true) {
    headerHtml += `<th>|xᵢ − x̄|</th>`;
  }

  headerHtml += `</tr>`;

  let rowsHtml = "";
  const absoluteValues = [];

  values.forEach(function (value) {
    const deviation = value - meanValue;
    const absDeviation = Math.abs(deviation);
    absoluteValues.push(absDeviation);

    rowsHtml += `
      <tr>
        <td>${formatUnit07Number(value)}${block.valueSuffix || ""}</td>
        <td>${formatSignedUnit07Number(deviation)}${block.valueSuffix || ""}</td>
    `;

    if (block.showAbsolute === true) {
      rowsHtml += `<td>${formatUnit07Number(absDeviation)}${block.valueSuffix || ""}</td>`;
    }

    rowsHtml += `</tr>`;
  });

  let extraNote = "";

  if (block.showAverageAbsolute === true) {
    const adValue = calculateAverageDeviationUnit07(values, meanValue);

    extraNote = `
      <p class="deviation-note">
        Average deviation (AD) = ${formatUnit07Number(adValue)}${block.valueSuffix || ""}
      </p>
    `;
  }

  return `
    <div class="deviation-demo">
      ${block.title ? `<h3>${block.title}</h3>` : ""}
      ${block.text ? `<p class="story-text">${block.text}</p>` : ""}

      <div class="number-line-svg-wrapper">
        ${buildNumberLineSvg({
          values: values,
          min: block.min,
          max: block.max,
          valueSuffix: block.valueSuffix,
          meanValue: meanValue,
          showMean: true
        })}
      </div>

      <p class="deviation-note">Mean = ${formatUnit07Number(meanValue)}${block.valueSuffix || ""}</p>

      <div class="deviation-table-wrapper">
        <table class="deviation-table">
          <thead>
            ${headerHtml}
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>

      ${extraNote}
    </div>
  `;
}

registerBlockRenderer("numberLineComparison", renderNumberLineComparison);
registerBlockRenderer("deviationDemo", renderDeviationDemo);