function addBlockEvents() {

  const quizButtons = document.querySelectorAll("[data-quiz-index]");
  quizButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const quizIndex = Number(button.dataset.quizIndex);
      const optionIndex = Number(button.dataset.optionIndex);
      checkQuizAnswer(quizIndex, optionIndex);
    });
  });

  const revealButtons = document.querySelectorAll("[data-reveal-index]");
  revealButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const revealIndex = Number(button.dataset.revealIndex);
      revealAnswer(revealIndex, button);
    });
  });

  const multiCheckButtons = document.querySelectorAll("[data-check-multi-index]");
  multiCheckButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const blockIndex = Number(button.dataset.checkMultiIndex);
      checkMultiSelectAnswer(blockIndex);
    });
  });

  const multiShowButtons = document.querySelectorAll("[data-show-multi-index]");
  multiShowButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const blockIndex = Number(button.dataset.showMultiIndex);
      showMultiSelectAnswer(blockIndex, button);
    });
  });

  setupSamplingActivities();
}

function checkQuizAnswer(blockIndex, selectedOptionIndex) {
  const page = getCurrentPage();
  const block = page.blocks[blockIndex];
  const feedback = document.getElementById(`feedback-${blockIndex}`);

  if (selectedOptionIndex === block.correctAnswer) {
    feedback.textContent = block.feedback;
    feedback.className = "feedback-text correct";
    unlockBlocks(block.unlocks);
    pageIsUnlocked = true;
    updateButtons();

  } else {
    feedback.textContent = "Not quite. Try again.";
    feedback.className = "feedback-text incorrect";
  }
}

function checkMultiSelectAnswer(blockIndex) {
  const page = getCurrentPage();
  const block = page.blocks[blockIndex];
  const feedback = document.getElementById(`feedback-${blockIndex}`);
  const checkboxes = document.querySelectorAll(`[data-multi-index="${blockIndex}"]`);
  let answerIsCorrect = true;

  checkboxes.forEach(function (checkbox, optionIndex) {
    const shouldBeChecked = block.options[optionIndex].correct;
    if (checkbox.checked !== shouldBeChecked) {
      answerIsCorrect = false;
    }
  });

  if (answerIsCorrect) {
    feedback.textContent = block.feedback;
    feedback.className = "feedback-text correct";

    unlockBlocks(block.unlocks);

    pageIsUnlocked = true;
    updateButtons();

  } else {
    feedback.textContent = "Some choices need checking again.";
    feedback.className = "feedback-text incorrect";
  }
}

function showMultiSelectAnswer(blockIndex, button) {
  const page = getCurrentPage();
  const block = page.blocks[blockIndex];
  const checkboxes = document.querySelectorAll(`[data-multi-index="${blockIndex}"]`);

  checkboxes.forEach(function (checkbox, optionIndex) {
    checkbox.checked = block.options[optionIndex].correct;
    checkbox.disabled = true;
  });

  const checkButton = document.querySelector(`[data-check-multi-index="${blockIndex}"]`);
  if (checkButton) {
    checkButton.disabled = true;
  }
  button.disabled = true;

  unlockBlocks([block.answerExplanationBlockId]);
  unlockBlocks(block.unlocks);

  pageIsUnlocked = true;
  updateButtons();
}

function revealAnswer(blockIndex, button) {
  const page = getCurrentPage();
  const block = page.blocks[blockIndex];
  const hiddenAnswer = document.getElementById(`hidden-answer-${blockIndex}`);
  hiddenAnswer.innerHTML = block.hiddenAnswer;

  button.style.display = "none";
  pageIsUnlocked = true;
  updateButtons();
}

function unlockBlocks(blockIds) {
  if (!blockIds) {
    return;
  }

  blockIds.forEach(function (blockId) {
    const blockElement = document.querySelector(`[data-block-id="${blockId}"]`);

    if (blockElement) {
      blockElement.classList.remove("hidden-block");
    }
  });
}

function setupSamplingActivities() {
  const draggableStudents = document.querySelectorAll(".student-chip");
  const dropzones = document.querySelectorAll(".sample-dropzone");
  const studentPools = document.querySelectorAll(".student-pool");

  draggableStudents.forEach(function (student) {
    student.addEventListener("dragstart", function (event) {
      event.dataTransfer.setData("text/plain", student.dataset.studentId);
    });
  });

  dropzones.forEach(function (dropzone) {
    dropzone.addEventListener("dragover", function (event) {
      event.preventDefault();
    });

    dropzone.addEventListener("drop", function (event) {
      event.preventDefault();

      const studentId = event.dataTransfer.getData("text/plain");
      const student = document.querySelector(`[data-student-id="${studentId}"]`);
      const sampleSize = Number(dropzone.dataset.sampleSize);
      if (!student) {
        return;
      }

      const currentCount = dropzone.querySelectorAll(".student-chip").length;
      if (currentCount >= sampleSize) {
        return;
      }

      const placeholder = dropzone.querySelector(".sample-placeholder");
      if (placeholder) {
        placeholder.remove();
      }

      dropzone.appendChild(student);
      updateSampleCount(dropzone);
    });
  });

  studentPools.forEach(function (pool) {
    pool.addEventListener("dragover", function (event) {
      event.preventDefault();
    });

    pool.addEventListener("drop", function (event) {
      event.preventDefault();

      const studentId = event.dataTransfer.getData("text/plain");
      const student = document.querySelector(`[data-student-id="${studentId}"]`);
      if (!student) {
        return;
      }
      pool.appendChild(student);

      const samplingWrapper = pool.closest(".sampling-wrapper");
      const dropzone = samplingWrapper.querySelector(".sample-dropzone");
      if (dropzone.querySelectorAll(".student-chip").length === 0) {
        dropzone.innerHTML = `<p class="sample-placeholder">Drag ${dropzone.dataset.sampleSize} students here</p>`;
      }

      updateSampleCount(dropzone);
    });
  });
}

function updateSampleCount(dropzone) {
  const count = dropzone.querySelectorAll(".student-chip").length;
  const samplingWrapper = dropzone.closest(".sampling-wrapper");
  const countText = samplingWrapper.querySelector(".sample-count");
  const sampleSize = dropzone.dataset.sampleSize;
  countText.textContent = `${count} / ${sampleSize} selected`;
}