let currentPath = "experiment";
let currentUnitIndex = 0;
let currentPageIndex = 0;
let pageIsUnlocked = true;

const learningSection = document.getElementById("learning-section");
const lessonContent = document.getElementById("lesson-content");

const unitLabel = document.getElementById("unit-label");
const progressLabel = document.getElementById("progress-label");

const startExperimentButton = document.getElementById("start-experiment");
const startStatisticsButton = document.getElementById("start-statistics");
const chapterMenuButton = document.getElementById("chapter-menu-button");
const chapterMenu = document.getElementById("chapter-menu");

const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

function getCurrentUnit() {
  return courseData[currentPath][currentUnitIndex];
}

function getCurrentPage() {
  return getCurrentUnit().pages[currentPageIndex];
}

function pageHasRequiredAction(page) {
  return page.blocks.some(function (block) {
    return block.required === true;
  });
}