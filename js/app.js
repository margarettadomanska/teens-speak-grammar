document.addEventListener("DOMContentLoaded", init);

async function init() {

    await loadQuestions();
    
    setupTabs();

    renderTopics();

setupUI();

if (!openSharedRevision()) {
    openRoute();
}

    setupKeyboard();
    
    setupSwipe();
window.addEventListener("popstate", () => {
    openRoute();
});

}