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