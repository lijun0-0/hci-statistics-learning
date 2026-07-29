function scrollToLessonStart() {
  const topNav = document.querySelector(".top-nav");
  const topNavHeight = topNav ? topNav.offsetHeight : 0;

  const targetY = learningSection.offsetTop - topNavHeight - 12;

  window.scrollTo({
    top: targetY,
    behavior: "smooth"
  });
}

function updateButtons() {
  const unit = getCurrentUnit();
  const page = getCurrentPage();

  const isFirstPageOfCourse =
    currentPath === "experiment" &&
    currentUnitIndex === 0 &&
    currentPageIndex === 0;

  const isLastPageOfCourse =
    currentPath === "statistics" &&
    currentUnitIndex === courseData.statistics.length - 1 &&
    currentPageIndex === unit.pages.length - 1;

  const isCourseCompletion = page.isCourseCompletion === true;

  prevButton.disabled = isFirstPageOfCourse;
  nextButton.textContent = isCourseCompletion ? "Learn again" : "Next";
  nextButton.disabled =
    (isLastPageOfCourse && !isCourseCompletion) ||
    pageIsUnlocked === false;
}

function goToNextPage() {
  const units = courseData[currentPath];
  const unit = getCurrentUnit();
  const page = getCurrentPage();

  if (page.isCourseCompletion === true) {
    switchPath("experiment");
    return;
  }

  if (currentPageIndex < unit.pages.length - 1) {
    currentPageIndex = currentPageIndex + 1;
  } else if (currentUnitIndex < units.length - 1) {
    currentUnitIndex = currentUnitIndex + 1;
    currentPageIndex = 0;
  } else if (currentPath === "experiment") {
    currentPath = "statistics";
    currentUnitIndex = 0;
    currentPageIndex = 0;
  }
  renderPage();
  scrollToLessonStart();
}

function goToPreviousPage() {
  if (currentPageIndex > 0) {
    currentPageIndex = currentPageIndex - 1;

  } else if (currentUnitIndex > 0) {
    currentUnitIndex = currentUnitIndex - 1;

    const previousUnit = getCurrentUnit();
    currentPageIndex = previousUnit.pages.length - 1;

  } else if (currentPath === "statistics") {
    currentPath = "experiment";
    currentUnitIndex = courseData.experiment.length - 1;

    const previousUnit = getCurrentUnit();
    currentPageIndex = previousUnit.pages.length - 1;
  }
    renderPage();
    scrollToLessonStart();
}

function switchPath(pathName) {
  currentPath = pathName;
  currentUnitIndex = 0;
  currentPageIndex = 0;
  renderPage();
  scrollToLessonStart();
}

function jumpToUnit(pathName, unitIndex) {
  currentPath = pathName;
  currentUnitIndex = unitIndex;
  currentPageIndex = 0;
  renderPage();
  scrollToLessonStart();
}

function setupNavigationEvents() {
  startExperimentButton.addEventListener("click", function () {
    switchPath("experiment");
  });

  startStatisticsButton.addEventListener("click", function () {
    switchPath("statistics");
  });

  nextButton.addEventListener("click", function () {
    goToNextPage();
  });

  prevButton.addEventListener("click", function () {
    goToPreviousPage();
  });

  setupChapterMenu();
}

function setupChapterMenu() {
  renderChapterMenu();

  chapterMenuButton.addEventListener("click", function (event) {
    event.stopPropagation();
    chapterMenu.classList.toggle("hidden-block");
  });

  chapterMenu.addEventListener("click", function (event) {
    const chapterButton = event.target.closest("[data-chapter-path]");

    if (!chapterButton) {
      return;
    }

    const pathName = chapterButton.dataset.chapterPath;
    const unitIndex = Number(chapterButton.dataset.unitIndex);

    jumpToUnit(pathName, unitIndex);
    chapterMenu.classList.add("hidden-block");
  });

  document.addEventListener("click", function () {
    chapterMenu.classList.add("hidden-block");
  });
}

function renderChapterMenu() {
  let html = "";

  html += `
    <div class="chapter-group">
      <p class="chapter-group-title">Experiment Design</p>
  `;

  courseData.experiment.forEach(function (unit, unitIndex) {
    html += `
      <button 
        class="chapter-item"
        data-chapter-path="experiment"
        data-unit-index="${unitIndex}">
        ${unit.unitTitle}
      </button>
    `;
  });

  html += `</div>`;

  html += `
    <div class="chapter-group">
      <p class="chapter-group-title">Statistics</p>
  `;

  courseData.statistics.forEach(function (unit, unitIndex) {
    html += `
      <button 
        class="chapter-item"
        data-chapter-path="statistics"
        data-unit-index="${unitIndex}">
        ${unit.unitTitle}
      </button>
    `;
  });

  html += `</div>`;

  chapterMenu.innerHTML = html;
}

function updateChapterMenuActive() {
  const chapterItems = document.querySelectorAll(".chapter-item");

  chapterItems.forEach(function (item) {
    const samePath = item.dataset.chapterPath === currentPath;
    const sameUnit = Number(item.dataset.unitIndex) === currentUnitIndex;

    if (samePath && sameUnit) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}
