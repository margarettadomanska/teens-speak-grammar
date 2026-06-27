function showCard() {

  const card = document.getElementById("card");
  const counter = document.getElementById("card-counter");

  if (!state.filteredQuestions.length) {

    card.innerHTML = "<h2>No questions found</h2>";
    counter.textContent = "";

    return;

  }

  const q = state.filteredQuestions[state.currentIndex];

  card.innerHTML = `
    <h2>${q.main_question}</h2>
    <p class="follow-up hidden">${q.follow_up_question}</p>
    <p class="tap-hint">Tap to reveal follow-up</p>
  `;

  counter.textContent =
    `${state.currentIndex + 1} / ${state.filteredQuestions.length}`;

  const followUp = card.querySelector(".follow-up");
  const hint = card.querySelector(".tap-hint");

  card.onclick = () => {

    followUp.classList.toggle("hidden");

    hint.textContent =
      followUp.classList.contains("hidden")
      ? "Tap to reveal follow-up"
      : "Tap to hide follow-up";

  };

}

function nextCard() {

  if (!state.filteredQuestions.length) return;

  if (state.swipeHintVisible) {

    const hint = document.querySelector(".swipe-indicator");

    if (hint) hint.classList.remove("visible");

    state.swipeHintVisible = false;

  }

  state.currentIndex =
    (state.currentIndex + 1) %
    state.filteredQuestions.length;

  showCard();

}

function previousCard() {

  if (!state.filteredQuestions.length) return;

  if (state.swipeHintVisible) {

    const hint = document.querySelector(".swipe-indicator");

    if (hint) hint.classList.remove("visible");

    state.swipeHintVisible = false;

  }

  state.currentIndex =
    (state.currentIndex - 1 + state.filteredQuestions.length) %
    state.filteredQuestions.length;

  showCard();

}

function randomCard() {

  if (!state.filteredQuestions.length) return;

  state.currentIndex =
    Math.floor(Math.random() * state.filteredQuestions.length);

  showCard();

}

function instantQuestion() {

  if (!state.questions.length) return;

  state.filteredQuestions = [...state.questions]
    .sort(() => Math.random() - 0.5);

  state.currentIndex = 0;
  state.currentTopic = "Instant";

  showCard();

  document.querySelector(".tools").classList.add("visible");
  document.body.classList.add("topic-active");

}