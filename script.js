let swipeHintVisible = false;
let allQuestions = [];
let filteredQuestions = [];
let currentIndex = 0;

let currentType = "Grammar";
let currentTopic = null;
let presentationMode = false;

/* ---------------- LOAD DATA ---------------- */

async function loadQuestions() {
  try {
    let allData = [];

    // Load original big file
    const mainResponse = await fetch("csvjson.json");
    const mainData = await mainResponse.json();
    allData = allData.concat(mainData);

    // Load passive voice file
    const passiveResponse = await fetch("data/grammar/passive-voice.json");
    const passiveData = await passiveResponse.json();
    allData = allData.concat(passiveData);

    // 🔥 ADD THIS BLOCK HERE
    const adviceResponse = await fetch("data/functional/advice.json");
    const adviceData = await adviceResponse.json();
    allData = allData.concat(adviceData);

    allQuestions = allData;

    renderTopics();

  } catch (error) {
    console.error("JSON load error:", error);
  }
}

/* ---------------- TOPICS ---------------- */

function renderTopics() {
  const topicList = document.getElementById("topic-list");
  topicList.innerHTML = "";

  const topics = [
    ...new Set(
      allQuestions
        .filter(q => q.type === currentType)
        .map(q => q.topic)
    )
  ];

  topics.forEach(topic => {
    const btn = document.createElement("button");
    btn.textContent = topic;
    btn.onclick = () => selectTopic(topic);
    topicList.appendChild(btn);
  });
}

function selectTopic(topic) {
  currentTopic = topic;

  filteredQuestions = allQuestions.filter(
    q => q.type === currentType && q.topic === topic
  );

  currentIndex = 0;
  showCard();

document.querySelector(".tools").classList.add("visible");

  document.body.classList.add("topic-active");

swipeHintVisible = true;
const hint = document.querySelector(".swipe-indicator");
if (hint) {
  hint.classList.add("visible");
}

  showPresentationBanner();

}

/* ---------------- CARD DISPLAY ---------------- */

function showCard() {
  const card = document.getElementById("card");
  const counter = document.getElementById("card-counter");

  if (!filteredQuestions.length) {
    card.innerHTML = "<h2>No questions found</h2>";
    counter.textContent = "";
    return;
  }

  const q = filteredQuestions[currentIndex];

  card.innerHTML = `
    <h2>${q.main_question}</h2>
    <p class="follow-up hidden">${q.follow_up_question}</p>
    <p class="tap-hint">Tap to reveal follow-up</p>
  `;

  counter.textContent = `${currentIndex + 1} / ${filteredQuestions.length}`;

  const followUp = card.querySelector(".follow-up");
  const hint = card.querySelector(".tap-hint");

  card.onclick = () => {
    followUp.classList.toggle("hidden");

    if (followUp.classList.contains("hidden")) {
      hint.textContent = "Tap to reveal follow-up";
    } else {
      hint.textContent = "Tap to hide follow-up";
    }
  };
}

/* ---------------- NAVIGATION ---------------- */


function nextCard() {
  if (!filteredQuestions.length) return;

 if (swipeHintVisible) {
  const hint = document.querySelector(".swipe-indicator");
  if (hint) hint.classList.remove("visible");
  swipeHintVisible = false;
}

  currentIndex = (currentIndex + 1) % filteredQuestions.length;
  showCard();
}

function previousCard() {
  if (!filteredQuestions.length) return;

if (swipeHintVisible) {
  const hint = document.querySelector(".swipe-indicator");
  if (hint) hint.classList.remove("visible");
  swipeHintVisible = false;
}

  currentIndex =
    (currentIndex - 1 + filteredQuestions.length) %
    filteredQuestions.length;

  showCard();
}

function randomCard() {
  if (!filteredQuestions.length) return;

 if (swipeHintVisible) {
  const hint = document.querySelector(".swipe-indicator");
  if (hint) hint.classList.remove("visible");
  swipeHintVisible = false;
}

  currentIndex = Math.floor(Math.random() * filteredQuestions.length);
  showCard();
}

/* ---------------- PRESENTATION MODE ---------------- */

function togglePresentation() {
  presentationMode = !presentationMode;
  document.body.classList.toggle("presentation-mode");

if (window.updateSwipeMode) {
  window.updateSwipeMode();
}
  
if (presentationMode) {
    window.scrollTo(0, 0);
  }

  if (presentationMode) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  const exitBtn = document.getElementById("exit-btn");
  const tools = document.querySelector(".tools");
  const presentationButton = tools.querySelector("button:last-child");

  exitBtn.style.display = presentationMode ? "block" : "none";

  presentationButton.style.display = presentationMode ? "none" : "inline-block";
}


/* ---------------- TABS ---------------- */

function setupTabs() {
  const grammarTab = document.getElementById("grammar-tab");
  const functionalTab = document.getElementById("functional-tab");

  grammarTab.onclick = () => {
    currentType = "Grammar";
    grammarTab.classList.add("active-tab");
    functionalTab.classList.remove("active-tab");
    currentTopic = null;

    renderTopics();
    resetCard();

    document.getElementById("topic-list").classList.add("visible");
  };

  functionalTab.onclick = () => {
    currentType = "Functional Language";
    functionalTab.classList.add("active-tab");
    grammarTab.classList.remove("active-tab");
    currentTopic = null;

    renderTopics();
    resetCard();

    document.getElementById("topic-list").classList.add("visible");
  };
}

  /* ---------------- RESET ---------------- */

  function resetCard() {
document.body.classList.remove("topic-active");
    document.querySelector(".tools").classList.remove("visible");

    document.getElementById("card").innerHTML =
      "<h2>Select a topic</h2><p class='hint'>to see a question</p>";

    document.getElementById("card-counter").textContent = "";
  }


  /* ---------------- SWIPE ---------------- */

function setupSwipe() {
  const card = document.getElementById("card");
  const hammer = new Hammer(card);

  hammer.get("swipe").set({ direction: Hammer.DIRECTION_ALL });

  function hideSwipeHint() {
    if (swipeHintVisible) {
      const hint = document.querySelector(".swipe-indicator");
      if (hint) hint.classList.remove("visible");
      swipeHintVisible = false;
    }
  }

hammer.on("swipeleft", () => {
  hideSwipeHint();
  hidePresentationBanner();
  nextCard();
});

hammer.on("swiperight", () => {
  hideSwipeHint();
  hidePresentationBanner();
  previousCard();
});

hammer.on("swipeup", () => {
  hideSwipeHint();
  hidePresentationBanner();
  nextCard();
});

hammer.on("swipedown", () => {
  hideSwipeHint();
  hidePresentationBanner();
  previousCard();
});

}
  /* ---------------- INIT ---------------- */
document.addEventListener("DOMContentLoaded", async () => {
  await loadQuestions();
  setupTabs();
  setupSwipe();

  /* -------- PRESENTATION BANNER -------- */

  const tryBtn = document.getElementById("try-presentation-btn");
  const closeBanner = document.getElementById("close-banner");

  if (tryBtn && closeBanner) {
    tryBtn.addEventListener("click", () => {
      togglePresentation();
      hidePresentationBanner();
    });

    closeBanner.addEventListener("click", hidePresentationBanner);
  }

  /* -------- HELP MODAL -------- */

  const helpBtn = document.getElementById("help-btn");
  const helpModal = document.getElementById("help-modal");
  const closeHelpBtn = document.getElementById("close-help-btn");

  if (helpBtn && helpModal && closeHelpBtn) {

    helpBtn.addEventListener("click", () => {
      helpModal.classList.remove("hidden");
    });

    closeHelpBtn.addEventListener("click", () => {
      helpModal.classList.add("hidden");
    });

    // ESC closes help (but not presentation)
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !presentationMode) {
        helpModal.classList.add("hidden");
      }
    });

    // Click outside closes help
    helpModal.addEventListener("click", (e) => {
      if (e.target === helpModal) {
        helpModal.classList.add("hidden");
      }
    });
  }
});

/* ---------------- KEYBOARD NAVIGATION ---------------- */

document.addEventListener("keydown", function (event) {

// ESC → Exit presentation mode
if (event.key === "Escape" && presentationMode) {
  togglePresentation();
  return;
}

  // Don't trigger arrows if no topic selected
  if (!currentTopic) return;

  // Prevent scrolling
  if (
    event.key === "ArrowRight" ||
    event.key === "ArrowDown" ||
    event.key === "ArrowLeft" ||
    event.key === "ArrowUp"
  ) {
    event.preventDefault();
  }

  // NEXT → Right or Down
  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    nextCard();
  }

  // PREVIOUS → Left or Up
  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    previousCard();
  }
// SPACE → Reveal / Hide follow-up
if (event.code === "Space") {
  event.preventDefault();
  event.stopPropagation();

  const card = document.getElementById("card");
  const followUp = card.querySelector(".follow-up");
  const hint = card.querySelector(".tap-hint");

  if (followUp) {
    followUp.classList.toggle("hidden");

    if (followUp.classList.contains("hidden")) {
      hint.textContent = "Tap to reveal follow-up";
    } else {
      hint.textContent = "Tap to hide follow-up";
    }
  }
}


});

/* ---------------- HELP MODAL ---------------- */



function isMobile() {
  return window.innerWidth <= 768;
}

function showPresentationBanner() {
  if (!isMobile()) return;

  const lastDismissed = localStorage.getItem("presentationBannerDismissedAt");

  if (lastDismissed) {
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    const now = Date.now();

    if (now - parseInt(lastDismissed) < sevenDays) {
      return; // Still within 7 days → don't show
    }
  }

  const banner = document.getElementById("presentation-banner");
  if (banner) banner.classList.remove("hidden");
}

function hidePresentationBanner() {
  const banner = document.getElementById("presentation-banner");
  if (banner) banner.classList.add("hidden");

  // Save timestamp instead of just "true"
  localStorage.setItem("presentationBannerDismissedAt", Date.now().toString());
}

