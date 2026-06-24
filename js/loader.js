async function loadCategory(folder) {

    const questions = [];

    const response = await fetch(`data/${folder}/index.json`);

    const topics = await response.json();

    for (const topic of topics) {

        const fileResponse = await fetch(
            `data/${folder}/${topic.filename}`
        );

        const data = await fileResponse.json();

        questions.push(...data);

    }

    return {
        topics,
        questions
    };

}

async function loadQuestions() {

    const grammar =
        await loadCategory("grammar");

    const functional =
        await loadCategory("functional");

    state.grammarTopics =
        grammar.topics;

    state.functionalTopics =
        functional.topics;

    state.questions = [
        ...grammar.questions,
        ...functional.questions
    ];

}