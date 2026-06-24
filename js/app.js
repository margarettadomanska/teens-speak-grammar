document.addEventListener("DOMContentLoaded", init);

async function init() {

    await loadQuestions();
    
    console.log(getRoute());

    console.log("Loaded", state.questions.length, "questions");

    setupTabs();

    renderTopics();

    openRoute();

    setupUI();

    setupKeyboard();
    
    setupSwipe();

}