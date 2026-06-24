function getRoute() {

    const path = window.location.pathname;

    const parts = path.split("/").filter(Boolean);

    if (parts.length !== 2) {
        return null;
    }

    return {
        category: parts[0],
        slug: parts[1]
    };

}

function slugToTitle(slug) {

    return slug
        .split("-")
        .map(word =>
            word.charAt(0).toUpperCase() +
            word.slice(1)
        )
        .join(" ");

}

function openRoute() {

    const route = getRoute();

    if (!route) return;

    const topics =
        route.category === "grammar"
            ? state.grammarTopics
            : state.functionalTopics;

    const topic = topics.find(
        t => t.filename === `${route.slug}.json`
    );

    if (!topic) {
        console.warn("Topic not found:", route.slug);
        return;
    }

     openTopic(route.category, route.slug);

}