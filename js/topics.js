function renderTopics() {
  const topicList = document.getElementById("topic-list");
  topicList.innerHTML = "";

const topics = [
  ...new Set(
    state.questions
      .filter(q => q.type === state.currentType)
      .map(q => q.topic)
  )
].sort((a, b) => a.localeCompare(b));

  topics.forEach(topic => {
    const btn = document.createElement("button");
    btn.textContent = topic;
    btn.onclick = () => selectTopic(topic);
    topicList.appendChild(btn);
  });
}

function selectTopic(topic, updateUrl = true) {
  state.currentTopic = topic;

  const topics =
    state.currentType === "Grammar"
      ? state.grammarTopics
      : state.functionalTopics;

  const topicData = topics.find(t => t.title === topic);

  if (topicData) {

    const category =
      state.currentType === "Grammar"
        ? "grammar"
        : "functional";

    const slug = topicData.filename.replace(".json", "");

  if (updateUrl) {

 const url = `/${category}/${slug}`;

if (updateUrl && window.location.pathname !== url) {
  history.pushState({}, "", url);
}

}
  }

  state.filteredQuestions = state.questions.filter(
    q =>
      q.type === state.currentType &&
      q.topic === topic
  );

  state.currentIndex = 0;

  showCard();

updateSEO(topic);

  document
    .getElementById("topic-list")
    .classList.remove("visible");

  document
    .getElementById("change-topic-btn")
    .classList.remove("hidden");

  document
    .querySelector(".tools")
    .classList.add("visible");

  document.body.classList.add("topic-active");

  state.swipeHintVisible = true;

  const hint = document.querySelector(".swipe-indicator");

  if (hint) {
    hint.classList.add("visible");
  }

  showPresentationBanner();

}

function setupTabs() {

  const grammarTab = document.getElementById("grammar-tab");
  const functionalTab = document.getElementById("functional-tab");

  grammarTab.onclick = () => {

    state.currentType = "Grammar";
    state.currentTopic = null;

    grammarTab.classList.add("active-tab");
    functionalTab.classList.remove("active-tab");

    renderTopics();
    resetCard();

    document
      .getElementById("topic-list")
      .classList.add("visible");

  };

  functionalTab.onclick = () => {

    state.currentType = "Functional Language";
    state.currentTopic = null;

    functionalTab.classList.add("active-tab");
    grammarTab.classList.remove("active-tab");

    renderTopics();
    resetCard();

    document
      .getElementById("topic-list")
      .classList.add("visible");

  };

}

function resetCard() {

  document.body.classList.remove("topic-active");

  document
    .querySelector(".tools")
    .classList.remove("visible");

  document.getElementById("card").innerHTML =
    "<h2>Select a topic</h2><p class='hint'>to see a question</p>";

  document.getElementById("card-counter").textContent = "";

}

function openTopic(category, slug) {

  // Select the correct category
  state.currentType =
    category === "grammar"
      ? "Grammar"
      : "Functional Language";

  // Update the active tabs
  document
    .getElementById("grammar-tab")
    .classList.toggle(
      "active-tab",
      state.currentType === "Grammar"
    );

  document
    .getElementById("functional-tab")
    .classList.toggle(
      "active-tab",
      state.currentType === "Functional Language"
    );

  // Render the correct topic buttons
  renderTopics();

  // Choose the correct topic from the index
  const topics =
    state.currentType === "Grammar"
      ? state.grammarTopics
      : state.functionalTopics;

  const topic = topics.find(
    t => t.filename === `${slug}.json`
  );

  if (!topic) {
    console.warn("Topic not found:", slug);
    return;
  }

  // Open it
  selectTopic(topic.title, false);

}