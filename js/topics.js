function renderTopics() {
  const topicList = document.getElementById("topic-list");
  topicList.innerHTML = "";

  const topics = [
    ...new Set(
      state.questions
        .filter(q => q.type === state.currentType)
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

  state.currentTopic = topic;

  state.filteredQuestions = state.questions.filter(
    q =>
      q.type === state.currentType &&
      q.topic === topic
  );

  state.currentIndex = 0;

  showCard();

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