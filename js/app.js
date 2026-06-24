document.addEventListener("DOMContentLoaded", init);

async function init() {

    await loadQuestions();

    console.log("Loaded", state.questions.length, "questions");

    setupTabs();

    renderTopics();

    setupUI();

    setupKeyboard();
    
    setupSwipe();

}