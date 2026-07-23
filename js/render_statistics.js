function renderDataTypeDrag(block) {
  let variableHtml = "";
  block.variables.forEach(function (variable) {
    variableHtml += `
      <div 
        class="data-type-chip"
        draggable="true"
        data-answer="${variable.answer}">
        ${variable.label}
      </div>
    `;
  });

  let categoryHtml = "";
  block.categories.forEach(function (category) {
    categoryHtml += `
      <div 
        class="data-type-dropzone"
        data-category="${category.id}">
        <h4>${category.title}</h4>
        <div class="dropzone-content"></div>
      </div>
    `;
  });

  return `
    <div class="data-type-drag-box">
      <h3>${block.instruction}</h3>

      <div class="data-type-drag-layout">
        <div class="data-type-variable-pool">
          ${variableHtml}
        </div>

        <div class="data-type-dropzone-grid">
          ${categoryHtml}
        </div>
      </div>

      <p class="data-type-feedback"></p>
    </div>
  `;
}

function initStatisticsInteractions(root) {
  setupDataTypeDrag(root);
}

function setupDataTypeDrag(root) {
  const chips = root.querySelectorAll(".data-type-chip");
  const dropzones = root.querySelectorAll(".data-type-dropzone");
  const feedback = root.querySelector(".data-type-feedback");

  chips.forEach(function (chip) {
    chip.addEventListener("dragstart", function (event) {
      event.dataTransfer.setData("text/plain", chip.textContent.trim());
      event.dataTransfer.setData("answer", chip.dataset.answer);
      chip.classList.add("dragging-chip");
    });

    chip.addEventListener("dragend", function () {
      chip.classList.remove("dragging-chip");
    });
  });

  dropzones.forEach(function (dropzone) {
    dropzone.addEventListener("dragover", function (event) {
      event.preventDefault();
    });

    dropzone.addEventListener("drop", function (event) {
      event.preventDefault();

      const answer = event.dataTransfer.getData("answer");
      const target = dropzone.dataset.category;
      const draggingChip = root.querySelector(".dragging-chip");

      if (!draggingChip) {
        return;
      }

      if (answer === target) {
        const content = dropzone.querySelector(".dropzone-content");
        content.appendChild(draggingChip);
        draggingChip.classList.remove("dragging-chip");
        draggingChip.classList.add("correct-chip");

        if (feedback) {
          feedback.textContent = "Correct.";
          feedback.className = "data-type-feedback correct";
        }

        checkAllDataTypeChipsPlaced(root);
      } else {
        if (feedback) {
          feedback.textContent = "Not quite. Try another data type.";
          feedback.className = "data-type-feedback incorrect";
        }
      }
    });
  });
}

function checkAllDataTypeChipsPlaced(root) {
  const remainingChips = root.querySelectorAll(".data-type-variable-pool .data-type-chip");
  const feedback = root.querySelector(".data-type-feedback");

  if (remainingChips.length === 0 && feedback) {
    feedback.textContent = "Good. These variables match the correct data types.";
    feedback.className = "data-type-feedback correct";
  }
}

registerBlockRenderer("dataTypeDrag", renderDataTypeDrag);
registerBlockInitializer(initStatisticsInteractions);