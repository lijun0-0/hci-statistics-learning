function encodeUnit09Data(data) {
  return encodeURIComponent(JSON.stringify(data));
}

function decodeUnit09Data(data) {
  return JSON.parse(decodeURIComponent(data));
}

function formatUnit09Number(value, digits) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "—";
  }

  const precision = digits !== undefined ? digits : 1;

  if (Math.abs(value - Math.round(value)) < 0.0001) {
    return String(Math.round(value));
  }

  return Number(value).toFixed(precision);
}

function calculateMeanUnit09(values) {
  if (!values || values.length === 0) {
    return null;
  }

  const sum = values.reduce(function (total, value) {
    return total + Number(value);
  }, 0);

  return sum / values.length;
}

function calculateSampleSDUnit09(values) {
  if (!values || values.length < 2) {
    return 0;
  }

  const meanValue = calculateMeanUnit09(values);
  const squaredSum = values.reduce(function (total, value) {
    const deviation = Number(value) - meanValue;
    return total + deviation * deviation;
  }, 0);

  return Math.sqrt(squaredSum / (values.length - 1));
}

function randomSampleWithoutReplacementUnit09(values, sampleSize) {
  const pool = values.slice();
  const sample = [];
  const targetSize = Math.min(sampleSize, pool.length);

  for (let i = 0; i < targetSize; i += 1) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    sample.push(pool[randomIndex]);
    pool.splice(randomIndex, 1);
  }

  return sample;
}

function buildDotPlotSvgUnit09(values, options) {
  const width = options.width || 500;
  const height = options.height || 190;
  const padding = 36;
  const axisY = height - 42;
  const topY = 28;
  const suffix = options.valueSuffix || "";
  const pointClass = options.pointClass || "unit09-point";

  if (!values || values.length === 0) {
    return `
      <svg class="unit09-svg" viewBox="0 0 ${width} ${height}" aria-hidden="true">
        <line class="unit09-axis" x1="${padding}" y1="${axisY}" x2="${width - padding}" y2="${axisY}"></line>
        <text class="unit09-empty-text" x="${width / 2}" y="${height / 2}" text-anchor="middle">No data yet</text>
      </svg>
    `;
  }

  let minValue = options.min !== undefined ? Number(options.min) : Math.min.apply(null, values);
  let maxValue = options.max !== undefined ? Number(options.max) : Math.max.apply(null, values);

  if (options.meanValue !== undefined && options.meanValue !== null) {
    minValue = Math.min(minValue, Number(options.meanValue));
    maxValue = Math.max(maxValue, Number(options.meanValue));
  }

  if (options.leftBound !== undefined && options.leftBound !== null) {
    minValue = Math.min(minValue, Number(options.leftBound));
  }

  if (options.rightBound !== undefined && options.rightBound !== null) {
    maxValue = Math.max(maxValue, Number(options.rightBound));
  }

  if (minValue === maxValue) {
    minValue -= 1;
    maxValue += 1;
  }

  const usableWidth = width - padding * 2;

  function scale(value) {
    return padding + ((value - minValue) / (maxValue - minValue)) * usableWidth;
  }

  let svg = `
    <svg class="unit09-svg" viewBox="0 0 ${width} ${height}" aria-hidden="true">
      <line class="unit09-axis" x1="${padding}" y1="${axisY}" x2="${width - padding}" y2="${axisY}"></line>
      <line class="unit09-tick" x1="${padding}" y1="${axisY - 6}" x2="${padding}" y2="${axisY + 6}"></line>
      <line class="unit09-tick" x1="${width - padding}" y1="${axisY - 6}" x2="${width - padding}" y2="${axisY + 6}"></line>
      <text class="unit09-tick-label" x="${padding}" y="${axisY + 22}" text-anchor="middle">${formatUnit09Number(minValue)}${suffix}</text>
      <text class="unit09-tick-label" x="${width - padding}" y="${axisY + 22}" text-anchor="middle">${formatUnit09Number(maxValue)}${suffix}</text>
  `;

  if (options.leftBound !== undefined && options.rightBound !== undefined) {
    const boundX1 = scale(Number(options.leftBound));
    const boundX2 = scale(Number(options.rightBound));
    svg += `
      <rect class="unit09-ci-band" x="${boundX1}" y="${topY + 18}" width="${Math.max(1, boundX2 - boundX1)}" height="${axisY - topY - 16}"></rect>
    `;
  }

  if (options.showPopulationMean === true && options.meanValue !== undefined && options.meanValue !== null) {
    const meanX = scale(Number(options.meanValue));
    svg += `
      <line class="unit09-population-mean-line" x1="${meanX}" y1="${topY}" x2="${meanX}" y2="${axisY}"></line>
      <text class="unit09-population-mean-label" x="${meanX}" y="${topY - 8}" text-anchor="middle">μ = ${formatUnit09Number(options.meanValue)}${suffix}</text>
    `;
  }

  if (options.showSampleMean === true && options.sampleMean !== undefined && options.sampleMean !== null) {
    const meanX = scale(Number(options.sampleMean));
    svg += `
      <line class="unit09-sample-mean-line" x1="${meanX}" y1="${topY}" x2="${meanX}" y2="${axisY}"></line>
      <text class="unit09-sample-mean-label" x="${meanX}" y="${topY + 12}" text-anchor="middle">x̄ = ${formatUnit09Number(options.sampleMean)}${suffix}</text>
    `;
  }

  const stackMap = {};
  values
    .slice()
    .sort(function (a, b) {
      return a - b;
    })
    .forEach(function (value) {
      const key = Number(value).toFixed(2);
      if (!stackMap[key]) {
        stackMap[key] = 0;
      }
      const stackIndex = stackMap[key];
      stackMap[key] += 1;

      const x = scale(Number(value));
      const y = axisY - 16 - stackIndex * 12;
      svg += `<circle class="${pointClass}" cx="${x}" cy="${y}" r="5"></circle>`;
    });

  if (options.xLabel) {
    svg += `<text class="unit09-x-label" x="${width / 2}" y="${height - 8}" text-anchor="middle">${options.xLabel}</text>`;
  }

  svg += `</svg>`;
  return svg;
}

function buildNormalCurveSvgUnit09(meanValue, sdValue, config) {
  const width = 560;
  const height = 260;
  const padding = 44;
  const baselineY = height - 44;
  const topY = 26;
  const minX = Number(config.minX);
  const maxX = Number(config.maxX);
  const usableWidth = width - padding * 2;
  const usableHeight = baselineY - topY;

  function scaleX(value) {
    return padding + ((value - minX) / (maxX - minX)) * usableWidth;
  }

  function density(value) {
    const exponent = -0.5 * Math.pow((value - meanValue) / sdValue, 2);
    return (1 / (sdValue * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
  }

  let maxDensity = density(meanValue);
  if (maxDensity === 0) {
    maxDensity = 1;
  }

  function scaleY(value) {
    return baselineY - (value / maxDensity) * usableHeight;
  }

  let pathData = "";
  const steps = 120;
  for (let i = 0; i <= steps; i += 1) {
    const xValue = minX + ((maxX - minX) / steps) * i;
    const x = scaleX(xValue);
    const y = scaleY(density(xValue));
    pathData += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
  }

  const meanX = scaleX(meanValue);

  return `
    <svg class="unit09-svg" viewBox="0 0 ${width} ${height}" aria-hidden="true">
      <line class="unit09-axis" x1="${padding}" y1="${baselineY}" x2="${width - padding}" y2="${baselineY}"></line>
      <path class="unit09-normal-curve" d="${pathData}"></path>

      <line class="unit09-mean-line" x1="${meanX}" y1="${topY + 16}" x2="${meanX}" y2="${baselineY}"></line>
      <text class="unit09-curve-label" x="${meanX}" y="${topY - 8}" text-anchor="middle">mean = ${formatUnit09Number(meanValue)}</text>

      <line class="unit09-tick" x1="${scaleX(minX)}" y1="${baselineY - 6}" x2="${scaleX(minX)}" y2="${baselineY + 6}"></line>
      <line class="unit09-tick" x1="${scaleX(maxX)}" y1="${baselineY - 6}" x2="${scaleX(maxX)}" y2="${baselineY + 6}"></line>
      <line class="unit09-tick" x1="${meanX}" y1="${baselineY - 6}" x2="${meanX}" y2="${baselineY + 6}"></line>

      <text class="unit09-tick-label" x="${scaleX(minX)}" y="${baselineY + 24}" text-anchor="middle">${formatUnit09Number(minX)}</text>
      <text class="unit09-tick-label" x="${meanX}" y="${baselineY + 24}" text-anchor="middle">${formatUnit09Number(meanValue)}</text>
      <text class="unit09-tick-label" x="${scaleX(maxX)}" y="${baselineY + 24}" text-anchor="middle">${formatUnit09Number(maxX)}</text>
      <text class="unit09-x-label" x="${width / 2}" y="${height - 8}" text-anchor="middle">${config.xLabel || "Observed value"}</text>
      <text class="unit09-y-label" x="16" y="${height / 2}" text-anchor="middle" transform="rotate(-90 16 ${height / 2})">Probability density</text>
    </svg>
  `;
}

function renderNormalCurvePlayground(block) {
  return `
    <div class="normal-curve-playground"
      data-min-x="${block.minX}"
      data-max-x="${block.maxX}"
      data-default-mean="${block.defaultMean}"
      data-default-sd="${block.defaultSD}"
      data-mean-range="${encodeUnit09Data(block.meanRange)}"
      data-sd-range="${encodeUnit09Data(block.sdRange)}"
      data-x-label="${block.xLabel || "Observed value"}">

      <div class="normal-curve-controls">
        <div class="normal-curve-control">
          <label for="unit09-mean-slider">Mean</label>
          <input id="unit09-mean-slider" class="unit09-mean-slider" type="range">
          <div class="normal-curve-value">μ = <span class="mean-value"></span></div>
        </div>

        <div class="normal-curve-control">
          <label for="unit09-sd-slider">Standard deviation</label>
          <input id="unit09-sd-slider" class="unit09-sd-slider" type="range">
          <div class="normal-curve-value">σ = <span class="sd-value"></span></div>
        </div>
      </div>

      <div class="normal-curve-svg-area"></div>
    </div>
  `;
}

function renderSamplingPlayground(block) {
  return `
    <div class="sampling-playground"
      data-mode="${block.mode}"
      data-title="${block.title || ""}"
      data-sample-size="${block.sampleSize || 10}"
      data-max-samples="${block.maxSamples || 10}"
      data-min-sample-size="${block.minSampleSize || 5}"
      data-max-sample-size="${block.maxSampleSize || 30}"
      data-value-suffix="${block.valueSuffix || ""}"
      data-population-image-src="${block.populationImageSrc || ""}"
      data-population-image-alt="${encodeUnit09Data(block.populationImageAlt || "")}"
      data-population-caption="${encodeUnit09Data(block.populationCaption || "")}"
      data-population-description="${encodeUnit09Data(block.populationDescription || "")}"
      data-population-values="${encodeUnit09Data(block.populationValues || [])}">

      ${block.title ? `<h3>${block.title}</h3>` : ""}

      <div class="sampling-population-card">
        <h4>Population distribution</h4>
        <div class="population-svg-area"></div>
        <p class="sampling-small-note population-description"></p>
      </div>

      <div class="sampling-controls"></div>

      <div class="sampling-result-layout">
        <div class="sampling-current-card">
          <h4>Current sample</h4>
          <div class="current-sample-values"></div>
          <p class="current-sample-mean"></p>
        </div>

        <div class="sampling-history-card"></div>
        <div class="sampling-extra-card"></div>
      </div>
    </div>
  `;
}

function setupNormalCurvePlaygroundsUnit09(root) {
  const blocks = root.querySelectorAll(".normal-curve-playground");

  blocks.forEach(function (playground) {
    const meanRange = decodeUnit09Data(playground.dataset.meanRange);
    const sdRange = decodeUnit09Data(playground.dataset.sdRange);
    const meanSlider = playground.querySelector(".unit09-mean-slider");
    const sdSlider = playground.querySelector(".unit09-sd-slider");
    const meanValueText = playground.querySelector(".mean-value");
    const sdValueText = playground.querySelector(".sd-value");
    const svgArea = playground.querySelector(".normal-curve-svg-area");

    meanSlider.min = Number(meanRange[0]);
    meanSlider.max = Number(meanRange[1]);
    meanSlider.step = 1;
    meanSlider.value = Number(playground.dataset.defaultMean);

    sdSlider.min = Number(sdRange[0]);
    sdSlider.max = Number(sdRange[1]);
    sdSlider.step = 1;
    sdSlider.value = Number(playground.dataset.defaultSD);

    function renderState() {
      const meanValue = Number(meanSlider.value);
      const sdValue = Number(sdSlider.value);
      meanValueText.textContent = formatUnit09Number(meanValue, 0);
      sdValueText.textContent = formatUnit09Number(sdValue, 0);
      svgArea.innerHTML = buildNormalCurveSvgUnit09(meanValue, sdValue, {
        minX: Number(playground.dataset.minX),
        maxX: Number(playground.dataset.maxX),
        xLabel: playground.dataset.xLabel
      });
    }

    meanSlider.addEventListener("input", renderState);
    sdSlider.addEventListener("input", renderState);

    renderState();
  });
}

function setupSamplingPlaygroundsUnit09(root) {
  const blocks = root.querySelectorAll(".sampling-playground");

  blocks.forEach(function (playground) {
    const mode = playground.dataset.mode;
    const populationValues = decodeUnit09Data(playground.dataset.populationValues).map(Number);
    const suffix = playground.dataset.valueSuffix || "";
    const minValue = Math.min.apply(null, populationValues);
    const maxValue = Math.max.apply(null, populationValues);
    const populationMean = calculateMeanUnit09(populationValues);
    const populationSvgArea = playground.querySelector(".population-svg-area");
    const controls = playground.querySelector(".sampling-controls");

    const populationImageSrc = playground.dataset.populationImageSrc;
    const populationImageAlt = decodeUnit09Data(playground.dataset.populationImageAlt);
    const populationCaption = decodeUnit09Data(playground.dataset.populationCaption);
    const populationDescription = decodeUnit09Data(playground.dataset.populationDescription);
    const populationDescriptionText = playground.querySelector(".population-description");
    const maxSamples = Number(playground.dataset.maxSamples || 10);

    const currentSampleValues = playground.querySelector(".current-sample-values");
    const currentSampleMean = playground.querySelector(".current-sample-mean");
    const historyCard = playground.querySelector(".sampling-history-card");
    const extraCard = playground.querySelector(".sampling-extra-card");

    if (populationDescriptionText) {
      populationDescriptionText.innerHTML = populationDescription;
    }

    if (populationImageSrc) {
      populationSvgArea.innerHTML = `
        <figure class="sampling-population-image">
          <img src="${populationImageSrc}" alt="${populationImageAlt}">
          ${populationCaption ? `<figcaption>${populationCaption}</figcaption>` : ""}
        </figure>
      `;
    } else {
      populationSvgArea.innerHTML = buildDotPlotSvgUnit09(populationValues, {
        min: minValue,
        max: maxValue,
        meanValue: populationMean,
        showPopulationMean: true,
        valueSuffix: suffix,
        xLabel: "Observed value"
      });
    }

    let sampleSize = Number(playground.dataset.sampleSize || 8);
    let sampleHistory = [];
    let latestSample = [];
    let latestMean = null;

    function updateCurrentSampleCard() {
      if (sampleHistory.length === 0) {
        currentSampleValues.innerHTML = `<p class="sampling-empty">No sample yet.</p>`;
        currentSampleMean.textContent = "";
        return;
      }

      if (mode === "sampleVariability") {
        const rowsHtml = sampleHistory
          .map(function (entry, index) {
            const valuesText = entry.values
              .map(function (value) {
                return `${formatUnit09Number(value)}${suffix}`;
              })
              .join(", ");

            return `
              <tr>
                <td>Sample ${index + 1}</td>
                <td>${valuesText}</td>
                <td>${formatUnit09Number(entry.mean, 2)}${suffix}</td>
              </tr>
            `;
          })
          .join("");

        currentSampleValues.innerHTML = `
          <div class="unit09-sample-table-wrapper">
            <table class="unit09-mini-table unit09-sample-table">
              <thead>
                <tr>
                  <th>Sample</th>
                  <th>Values</th>
                  <th>x̄</th>
                </tr>
              </thead>
              <tbody>
                ${rowsHtml}
              </tbody>
            </table>
          </div>
        `;

        currentSampleMean.innerHTML = `${sampleHistory.length} / ${maxSamples} samples shown`;
        return;
      }

      currentSampleValues.innerHTML = latestSample
        .map(function (value) {
          return `<span class="sampling-value-chip">${formatUnit09Number(value)}${suffix}</span>`;
        })
        .join("");

      currentSampleMean.innerHTML = `Latest sample mean <strong>x̄ = ${formatUnit09Number(latestMean, 2)}${suffix}</strong>`;
    }

    function takeOneSample() {
      if (mode === "sampleVariability" && sampleHistory.length >= maxSamples) {
        updateState();
        return;
      }

      latestSample = randomSampleWithoutReplacementUnit09(populationValues, sampleSize);
      latestMean = calculateMeanUnit09(latestSample);
      sampleHistory.push({
        values: latestSample.slice(),
        mean: latestMean
      });
      updateState();
    }

    function resetSamples() {
      sampleHistory = [];
      latestSample = [];
      latestMean = null;
      updateState();
    }

    function renderVariabilityHistory() {
      historyCard.innerHTML = `
        <h4>What to notice</h4>
        <p>Even when we sample from the same population, the sample mean can change.</p>
        <p>Click <strong>Take a sample</strong> several times. Each row is one sample, and each row has its own sample mean <strong>x̄</strong>.</p>
        <p class="sampling-small-note">To keep the table readable, this demo shows up to ${maxSamples} samples.</p>
      `;

      extraCard.innerHTML = "";
    }

    function updateState() {
      updateCurrentSampleCard();

      const takeButton = controls.querySelector(".take-sample-button");
      if (takeButton) {
        const maximumReached = sampleHistory.length >= maxSamples;
        takeButton.disabled = maximumReached;
        takeButton.textContent = maximumReached ? "Maximum reached" : "Take a sample";
      }

      renderVariabilityHistory();
    }

    if (mode === "sampleVariability") {
      controls.innerHTML = `
      <div class="sampling-control-row">
        <p class="sampling-control-label">Sample size per row: <strong>${sampleSize}</strong></p>
        <button type="button" class="unit09-action-button take-sample-button">Take a sample</button>
        <button type="button" class="unit09-action-button secondary reset-samples-button">Reset</button>
      </div>
    `;

      controls.querySelector(".take-sample-button").addEventListener("click", takeOneSample);
      controls.querySelector(".reset-samples-button").addEventListener("click", resetSamples);
    }

    updateState();
  });
}

function initUnit09StatisticsInteractions(root) {
  setupNormalCurvePlaygroundsUnit09(root);
  setupSamplingPlaygroundsUnit09(root);
}

registerBlockRenderer("normalCurvePlayground", renderNormalCurvePlayground);
registerBlockRenderer("samplingPlayground", renderSamplingPlayground);
registerBlockInitializer(initUnit09StatisticsInteractions);
