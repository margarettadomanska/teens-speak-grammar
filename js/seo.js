function updateSEO(topic) {

    document.title =
        `${topic} Speaking Questions | Teen Speak Grammar`;

    const description = document.querySelector(
        'meta[name="description"]'
    );

    if (description) {

        description.setAttribute(
            "content",
            `Free ${topic} speaking questions for ESL teenagers. Includes follow-up questions and classroom discussion prompts.`
        );

    }

}