function togglePresentation() {

  state.presentationMode = !state.presentationMode;

  document.body.classList.toggle("presentation-mode");

  if (isMobile()) {

    if (state.presentationMode) {

      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }

    } else {

      if (document.fullscreenElement) {
        document.exitFullscreen();
      }

    }

  }

  if (window.updateSwipeMode) {
    window.updateSwipeMode();
  }

  if (state.presentationMode) {
    window.scrollTo(0, 0);
  }

  document.body.style.overflow =
    state.presentationMode ? "hidden" : "auto";

  const exitBtn =
    document.getElementById("exit-btn");

  const tools =
    document.querySelector(".tools");

  const presentationButton =
    tools.querySelector("button:last-child");

  exitBtn.style.display =
    state.presentationMode ? "block" : "none";

  presentationButton.style.display =
    state.presentationMode ? "none" : "inline-block";

}

function isMobile() {
  return window.innerWidth <= 768;
}

function showPresentationBanner() {

  if (!isMobile()) return;

  const lastDismissed =
    localStorage.getItem(
      "presentationBannerDismissedAt"
    );

  if (lastDismissed) {

    const sevenDays =
      7 * 24 * 60 * 60 * 1000;

    if (
      Date.now() - parseInt(lastDismissed)
      < sevenDays
    ) {
      return;
    }

  }

  document
    .getElementById("presentation-banner")
    .classList.remove("hidden");

}

function hidePresentationBanner() {

  document
    .getElementById("presentation-banner")
    .classList.add("hidden");

  localStorage.setItem(
    "presentationBannerDismissedAt",
    Date.now().toString()
  );

}