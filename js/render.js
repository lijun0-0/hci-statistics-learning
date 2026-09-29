const blockRenderers = {};
const blockInitializers = [];

function registerBlockRenderer(type, renderFunction) {
  blockRenderers[type] = renderFunction;
}

function registerBlockInitializer(initFunction) {
  blockInitializers.push(initFunction);
}

function renderPage() {
  const unit = getCurrentUnit();
  const page = getCurrentPage();
  pageIsUnlocked = !pageHasRequiredAction(page);

  unitLabel.textContent = unit.unitTitle;
  progressLabel.textContent = `${currentPageIndex + 1} / ${unit.pages.length}`;

  let html = `<h2 class="${page.titleClass || ""}">${page.title}</h2>`;
  page.blocks.forEach(function (block, index) {
    html += renderBlock(block, index);
  });

  lessonContent.innerHTML = html;
  addBlockEvents();
  blockInitializers.forEach(function (initFunction) {
    initFunction(lessonContent);
  });
  updateButtons();

  if (typeof updateChapterMenuActive === "function") {
    updateChapterMenuActive();
  }
}

function renderBlock(block, index) {
  if (blockRenderers[block.type]) {
    return blockRenderers[block.type](block, index);
  }

  if (block.type === "imagePlaceholder") {
    return `
      <div class="image-placeholder">
        <p>Image placeholder</p>
        <small>${block.alt}</small>
      </div>
    `;
  }

  if (block.type === "text") {
    return `
      <p class="story-text">${block.text}</p>
    `;
  }

  if (block.type === "image") {
    return renderImage(block);
  }

  if (block.type === "simpleTable") {
    return renderSimpleTable(block);
  }

  if (block.type === "infoBox") {
    return `
      <div
        class="info-box ${getHiddenClass(block)}"
        ${getBlockIdAttribute(block)}>
        <p>${block.text}</p>
      </div>
    `;
  }

  if (block.type === "phoneComparison") {
    return `
      <div class="phone-comparison">
        <div class="phone-card-wrap">
          <div class="phone-card">
            <div class="phone-screen">
              ${renderPhoneImage(block.leftImageSrc, block.leftImageAlt)}
            </div>
          </div>
          <div class="phone-label">${block.leftLabel}</div>
        </div>

        <div class="vs-mark">vs</div>

        <div class="phone-card-wrap">
          <div class="phone-card">
            <div class="phone-screen">
              ${renderPhoneImage(block.rightImageSrc, block.rightImageAlt)}
            </div>
          </div>
          <div class="phone-label">${block.rightLabel}</div>
        </div>
      </div>
    `;
  }

  if (block.type === "researchQuestion") {
    return `
      <div class="research-question-box">
        <strong>Research question:</strong>
        <p>${block.text}</p>
      </div>
    `;
  }

  if (block.type === "dialogue") {
    return renderDialogue(block);
  }

  if (block.type === "conceptBox") {
    return `
      <div
        class="concept-box ${getHiddenClass(block)}"
        ${getBlockIdAttribute(block)}>
        <h3>${block.title}</h3>
        <p>${block.text}</p>
      </div>
    `;
  }

  if (block.type === "quiz") {
    return renderQuiz(block, index);
  }

  if (block.type === "multiSelectQuiz") {
    return renderMultiSelectQuiz(block, index);
  }

  if (block.type === "reveal") {
    return `
      <div class="reveal-box">
        <p>${block.prompt}</p>

        <button class="blank-answer" data-reveal-index="${index}">
          Click here to reveal the answer
        </button>
        <p class="hidden-answer" id="hidden-answer-${index}"></p>
      </div>
    `;
  }

  if (block.type === "tips") {
    return renderListBox("tips-box", "Tips", block.items);
  }

  if (block.type === "summary") {
    return renderListBox("summary-box", "Summary", block.items);
  }

  if (block.type === "samplingActivity") {
    return renderSamplingActivity(block, index);
  }

  if (block.type === "designFlow") {
    return renderDesignFlow(block);
  }

  return "";
}

function getHiddenClass(block) {
  if (block.initiallyHidden === true) {
    return "hidden-block";
  }
  return "";
}

function getBlockIdAttribute(block) {
  if (block.blockId) {
    return `data-block-id="${block.blockId}"`;
  }
  return "";
}

function renderPhoneImage(imageSrc, imageAlt) {
  if (!imageSrc) {
    return `
      <div class="mini-image-placeholder">
        <small>${imageAlt || ""}</small>
      </div>
    `;
  }

  return `
    <img 
      class="phone-screen-image" 
      src="${imageSrc}" 
      alt="${imageAlt || ""}">
  `;
}

function renderDialogue(block) {
  const avatarMap = {
    Teacher: "assets/image/T-avatar.jpg",
    Student: "assets/image/S-avatar.jpg",
    Alice: "assets/image/Alice-avatar.jpg",
    Bob: "assets/image/Bob-avatar.jpg"
  };
  let html = `<div class="dialogue-box">`;

  block.lines.forEach(function(line) {
    const avatarSrc = avatarMap[line.speaker] || "assets/image/S-avatar.jpg";
    html += `
      <div class="chat-row ${line.side}">
        <div class="avatar">
          <img src="${avatarSrc}" alt="${line.speaker}">
        </div>
        <div class="chat-bubble">
          <strong>${line.speaker}</strong>
          <p>${line.text}</p>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  return html;
}

function renderQuiz(block, blockIndex) {
  let html = `
    <div class="quiz-box">
      <h3>${block.question}</h3>
      <div class="answer-options">
  `;

  block.options.forEach(function(option, optionIndex) {
    html += `
      <button 
        class="answer-button"
        data-quiz-index="${blockIndex}"
        data-option-index="${optionIndex}">
        ${option}
      </button>
    `;
  });

  html += `
      </div>
      <p class="feedback-text" id="feedback-${blockIndex}"></p>
    </div>
  `;

  return html;
}

function renderMultiSelectQuiz(block, blockIndex) {
  let html = `
    <div class="quiz-box">
      <h3>${block.question}</h3>
      <p>${block.instruction}</p>
      <div class="multi-select-options">
  `;

  block.options.forEach(function (option, optionIndex) {
    html += `
      <label class="multi-select-option">
        <input 
          type="checkbox"
          data-multi-index="${blockIndex}"
          data-option-index="${optionIndex}">
        ${option.text}
      </label>
    `;
  });

  html += `
      </div>
      <div class="multi-select-actions">
        <button class="check-answer-button" data-check-multi-index="${blockIndex}">
          Check answer
        </button>
        ${block.showAnswer ? `
          <button class="show-answer-button" data-show-multi-index="${blockIndex}">
            Show the answer
          </button>
        ` : ""}
      </div>
      <p class="feedback-text" id="feedback-${blockIndex}"></p>
    </div>
  `;

  return html;
}

function renderListBox(className, title, items) {
  let html = `
    <div class="${className}">
      <h3>${title}</h3>
      <ul>
  `;

  items.forEach(function (item) {
    html += `<li>${item}</li>`;
  });

  html += `
      </ul>
    </div>
  `;
  return html;
}

function renderSamplingActivity(block, blockIndex) {
  let studentsHTML = "";

  block.students.forEach(function (student, studentIndex) {
    studentsHTML += `
      <div
        class="student-chip"
        draggable="true"
        data-student-id="${blockIndex}-${studentIndex}">
        ${student}
      </div>
    `;
  });

  return `
    <div class="sampling-wrapper">
      <div class="sampling-area">

        <div class="population-panel">
          <h3>${block.populationTitle}</h3>

          <div class="student-pool">
            ${studentsHTML}
          </div>

          <p>${block.populationNote}</p>
        </div>

        <div class="sample-panel">
          <h3>${block.sampleTitle}</h3>

          <div
            class="sample-dropzone"
            data-sample-size="${block.sampleSize}">
            <p class="sample-placeholder">
              Drag ${block.sampleSize} students here
            </p>
          </div>

          <p class="sample-count">
            0 / ${block.sampleSize} selected
          </p>
        </div>

      </div>
    </div>
  `;
}

function renderDesignFlow(block) {
  let html = `<div class="design-flow">`;

  block.rows.forEach(function (row) {
    html += `
      <div class="design-flow-row">
        <div class="design-flow-label">${row.label}</div>
        <div class="design-flow-steps">
    `;

    row.steps.forEach(function (step, stepIndex) {
      html += `
        <div class="flow-node ${step.type}">
          ${step.text}
        </div>
      `;

      if (stepIndex < row.steps.length - 1) {
        html += `<div class="flow-arrow">→</div>`;
      }
    });

    html += `
        </div>
      </div>
    `;
  });

  html += `</div>`;

  return html;
}

function renderImage(block) {
  return `
    <figure 
      class="content-image-block ${getHiddenClass(block)}"
      ${getBlockIdAttribute(block)}>
      <img src="${block.src}" alt="${block.alt || ""}">
      ${block.caption ? `<figcaption>${block.caption}</figcaption>` : ""}
    </figure>
  `;
}

function renderSimpleTable(block) {
  let headerHtml = "";
  block.headers.forEach(function (header) {
    headerHtml += `<th>${header}</th>`;
  });

  let rowsHtml = "";
  block.rows.forEach(function (row) {
    let cellsHtml = "";

    row.forEach(function (cell) {
      cellsHtml += `<td>${cell}</td>`;
    });

    rowsHtml += `<tr>${cellsHtml}</tr>`;
  });

  return `
    <div 
      class="simple-table-wrapper ${block.tableClass || ""} ${getHiddenClass(block)}"
      ${getBlockIdAttribute(block)}>

      ${block.title ? `<h3>${block.title}</h3>` : ""}

      <table class="simple-data-table">
        <thead>
          <tr>${headerHtml}</tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>
  `;
}