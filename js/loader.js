async function loadCategory(folder) {

    const response = await fetch(`data/${folder}/index.json`);
    const topics = await response.json();

    const allQuestions = await Promise.all(

        topics.map(async topic => {

            const response = await fetch(
                `data/${folder}/${topic.filename}`
            );

            return response.json();

        })

    );

    return {

        topics,

        questions: allQuestions.flat()

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
