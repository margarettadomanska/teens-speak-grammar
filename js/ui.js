function setupUI() {

    // Instant Question
    document
        .getElementById("instant-btn")
        .addEventListener("click", instantQuestion);

    // Random
    document
        .getElementById("random-btn")
        .addEventListener("click", randomCard);

    // Presentation
    document
        .getElementById("presentation-btn")
        .addEventListener("click", togglePresentation);

    // Exit presentation
    document
        .getElementById("exit-btn")
        .addEventListener("click", togglePresentation);

    // Change topic
    document
        .getElementById("change-topic-btn")
        .addEventListener("click", changeTopic);

    // Help
    document
        .getElementById("help-btn")
        .addEventListener("click", openHelp);

document
    .getElementById("close-share-btn")
    .addEventListener("click", () => {


        document
            .getElementById("share-modal")
            .classList.add("hidden");

        showCard();

    });

document
    .getElementById("revision-btn")
    .addEventListener("click", openRevisionBuilder);

    document
        .getElementById("close-help-btn")
        .addEventListener("click", closeHelp);

    // Timer
    document
        .getElementById("timer30")
        .addEventListener("click", () => startTimer(30));

    document
        .getElementById("timer60")
        .addEventListener("click", () => startTimer(60));

    document
        .getElementById("timer120")
        .addEventListener("click", () => startTimer(120));

    document
    .getElementById("try-presentation-btn")
    .addEventListener("click", () => {

        hidePresentationBanner();
        togglePresentation();

    });

document
    .getElementById("close-banner")
    .addEventListener("click", hidePresentationBanner);

document
    .getElementById("logo")
    .addEventListener("click", goHome);

}

function openHelp() {

    document
        .getElementById("help-modal")
        .classList.remove("hidden");

}

function closeHelp() {

    document
        .getElementById("help-modal")
        .classList.add("hidden");

}

function changeTopic() {

    state.currentTopic = null;
    state.filteredQuestions = [];
    state.currentIndex = 0;

    resetCard();

    document
        .getElementById("topic-list")
        .classList.add("visible");

    document
        .getElementById("change-topic-btn")
        .classList.add("hidden");

}

function goHome() {

    // Go back to the home URL
    history.pushState({}, "", "/");

    // Reset state
    state.currentTopic = null;
    state.filteredQuestions = [];
    state.currentIndex = 0;

    // Exit revision mode if open
    document
        .getElementById("card")
        .classList.remove("revision-mode");

    state.selectedRevisionTopics = [];
    state.revisionQuestionCount = null;

    // Hide tools
    document
        .querySelector(".tools")
        .classList.remove("visible");

    document
        .getElementById("change-topic-btn")
        .classList.add("hidden");

    // Show welcome screen
    renderWelcomeScreen();

    // Show topic buttons
    document
        .getElementById("topic-list")
        .classList.add("visible");

    // Remove topic styling
    document.body.classList.remove("topic-active");

}

function setupKeyboard() {

    document.addEventListener("keydown", function (event) {

        // ESC → Exit presentation
        if (event.key === "Escape" && state.presentationMode) {
            togglePresentation();
            return;
        }

        // No topic selected
        if (!state.currentTopic) return;

        if (
            event.key === "ArrowRight" ||
            event.key === "ArrowDown" ||
            event.key === "ArrowLeft" ||
            event.key === "ArrowUp"
        ) {
            event.preventDefault();
        }

        if (
            event.key === "ArrowRight" ||
            event.key === "ArrowDown"
        ) {
            nextCard();
        }

        if (
            event.key === "ArrowLeft" ||
            event.key === "ArrowUp"
        ) {
            previousCard();
        }

        if (event.code === "Space") {

            event.preventDefault();

            const card = document.getElementById("card");
            const followUp = card.querySelector(".follow-up");
            const hint = card.querySelector(".tap-hint");

            if (!followUp) return;

            followUp.classList.toggle("hidden");

            hint.textContent =
                followUp.classList.contains("hidden")
                ? "Tap to reveal follow-up"
                : "Tap to hide follow-up";

        }

    });

}

function setupSwipe() {

    const card = document.getElementById("card");

    const hammer = new Hammer(card);

    hammer.get("swipe").set({
        direction: Hammer.DIRECTION_ALL
    });

    hammer.on("swipeleft", nextCard);

    hammer.on("swiperight", previousCard);

    hammer.on("swipeup", nextCard);

    hammer.on("swipedown", previousCard);

}

function openRevisionBuilder() {

    document
        .getElementById("card")
        .classList.add("revision-mode");

    renderRevisionBuilder();

}

function renderRevisionBuilder() {

    const card = document.getElementById("card");

    // Get unique topics for the current type
    const topics = [
        ...new Set(
            state.questions
                .filter(question => question.type === state.currentType)
                .map(question => question.topic)
        )
    ].sort();

    card.innerHTML = `
    <h2>Create Revision</h2>

    <p class="hint">
        Choose one or more topics.
    </p>

    <div id="revision-topics"></div>

    <h3>Questions</h3>

    <div id="revision-question-count"></div>

<div id="revision-summary"></div>

<button id="start-revision-btn" disabled>
    Start Revision
</button>

<button id="cancel-revision-btn">
    Cancel
</button>

`;

    const topicContainer = document.getElementById("revision-topics");
const questionContainer = document.getElementById("revision-question-count");
const summary =
    document.getElementById("revision-summary");

const availableQuestions = state.questions.filter(question =>

    question.type === state.currentType &&
    state.selectedRevisionTopics.includes(question.topic)

).length;

summary.innerHTML = `
    <strong>${state.selectedRevisionTopics.length}</strong>
    topic${state.selectedRevisionTopics.length === 1 ? "" : "s"} selected
    &nbsp;&nbsp;•&nbsp;&nbsp;
    <strong>${availableQuestions}</strong>
    questions available
`;

const startButton = document.getElementById("start-revision-btn");

startButton.disabled = !(
    state.selectedRevisionTopics.length > 0 &&
    state.revisionQuestionCount !== null
);

topics.forEach(topic => {

    const button = document.createElement("button");

    button.textContent = topic;

    if (state.selectedRevisionTopics.includes(topic)) {
        button.classList.add("active-topic");
    }

    button.addEventListener("click", () => {

        if (state.selectedRevisionTopics.includes(topic)) {

            state.selectedRevisionTopics =
                state.selectedRevisionTopics.filter(t => t !== topic);

        } else {

            state.selectedRevisionTopics.push(topic);

        }

        renderRevisionBuilder();

    });

    topicContainer.appendChild(button);

});

[10, 20, 30, 50].forEach(number => {

    const button = document.createElement("button");

    button.textContent = number;

    if (state.revisionQuestionCount === number) {
        button.classList.add("active-topic");
    }

    button.addEventListener("click", () => {

        state.revisionQuestionCount = number;

        renderRevisionBuilder();

    });

    questionContainer.appendChild(button);

});        
         document
        .getElementById("cancel-revision-btn")
        .addEventListener("click", closeRevisionBuilder);

         document
        .getElementById("start-revision-btn")
        .addEventListener("click", startRevision);

}

function closeRevisionBuilder() {

    document
        .getElementById("card")
        .classList.remove("revision-mode");

    state.selectedRevisionTopics = [];
    state.revisionQuestionCount = null;

    renderWelcomeScreen();

}

function renderWelcomeScreen() {

    const card = document.getElementById("card");

    card.innerHTML = `
        <h2>Select a topic</h2>
        <p class="hint">to see a question</p>
    `;

}

function startRevision() {

    const selectedQuestions = state.questions.filter(question =>

        question.type === state.currentType &&
        state.selectedRevisionTopics.includes(question.topic)

    );

const questionsByTopic = {};

selectedQuestions.forEach(question => {

    if (!questionsByTopic[question.topic]) {
        questionsByTopic[question.topic] = [];
    }

    questionsByTopic[question.topic].push(question);

});

const topicNames = Object.keys(questionsByTopic);

const totalQuestions = state.revisionQuestionCount;

const questionsPerTopic = Math.floor(
    totalQuestions / topicNames.length
);

const remainingQuestions =
    totalQuestions % topicNames.length;

const revisionQuestions = [];

topicNames.forEach(topic => {

    const topicQuestions = [...questionsByTopic[topic]];

    topicQuestions.sort(() => Math.random() - 0.5);

    revisionQuestions.push(
        ...topicQuestions.slice(0, questionsPerTopic)
    );

});

const shuffledTopics = [...topicNames];

shuffledTopics.sort(() => Math.random() - 0.5);

for (let i = 0; i < remainingQuestions; i++) {

    const topic = shuffledTopics[i];

    const topicQuestions = questionsByTopic[topic];

    const alreadyChosen = revisionQuestions.filter(
        question => question.topic === topic
    ).length;

    if (topicQuestions[alreadyChosen]) {
        revisionQuestions.push(topicQuestions[alreadyChosen]);
    }

}

    revisionQuestions.sort(() => Math.random() - 0.5);

state.currentRevision = [...revisionQuestions];

state.currentRevisionSettings = {
    type: state.currentType,
    topics: [...state.selectedRevisionTopics],
    count: state.revisionQuestionCount
};

state.filteredQuestions = revisionQuestions;

state.currentTopic = "Revision";

state.currentIndex = 0;

document
    .querySelector(".tools")
    .classList.add("visible");

document
    .getElementById("change-topic-btn")
    .classList.remove("hidden");

document.body.classList.add("topic-active");

closeRevisionBuilder();

if (state.openingSharedRevision) {

    state.openingSharedRevision = false;

    showCard();

} else {

    generateRevisionLink();

    document
        .getElementById("share-modal")
        .classList.remove("hidden");

}

}

function generateRevisionLink() {

    const settings = state.currentRevisionSettings;

    if (!settings) return;

    const params = new URLSearchParams();

    params.set("type", settings.type);
    params.set("topics", settings.topics.join(","));
    params.set("count", settings.count);

    const url =
        window.location.origin +
        "/?" +
        params.toString();

history.pushState({}, "", "/?" + params.toString());

    const result =
        document.getElementById("share-result");

    result.classList.remove("hidden");

    result.innerHTML = `
        <p><strong>Share with Students</strong></p>

        <div class="share-link-row">

            <input
                id="share-link"
                type="text"
                readonly
                value="${url}">

            <button id="copy-link-btn">
                📋 Copy
            </button>

        </div>

        <div id="qr-container"></div>
    `;

    document
        .getElementById("copy-link-btn")
        .addEventListener("click", () => {

            navigator.clipboard.writeText(url);

            document
                .getElementById("copy-link-btn")
                .textContent = "✅ Copied";

        });

const qrContainer =
    document.getElementById("qr-container");

qrContainer.innerHTML = "";

new QRCode(qrContainer, {
    text: url,
    width: 180,
    height: 180
});

}

function openSharedRevision() {

    const params = new URLSearchParams(window.location.search);

    const type = params.get("type");
    const topics = params.get("topics");
    const count = parseInt(params.get("count"));

    if (!type || !topics || !count) {
        return false;
    }

    state.currentType = type;

    // Update tabs
    document
        .getElementById("grammar-tab")
        .classList.toggle(
            "active-tab",
            type === "Grammar"
        );

    document
        .getElementById("functional-tab")
        .classList.toggle(
            "active-tab",
            type === "Functional Language"
        );

    renderTopics();

    state.selectedRevisionTopics =
    topics
        .split(",")
        .map(topic => topic.trim());

state.revisionQuestionCount = count

state.openingSharedRevision = true;

startRevision();

    return true;

}
