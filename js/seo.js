function updateSEO(topic) {

    const title =
        `${topic} Speaking Questions for ESL Teens | Teen Speak Grammar`;

    const description =
        `Free ${topic} speaking questions for ESL teenagers with follow-up prompts. Perfect for classroom speaking practice and pair work.`;

    const path = window.location.pathname;

    // Page title
    document.title = title;

    // Meta description
    const metaDescription = document.querySelector(
        'meta[name="description"]'
    );

    if (metaDescription) {
        metaDescription.setAttribute("content", description);
    }

    // Canonical URL
    const canonical = document.querySelector(
        'link[rel="canonical"]'
    );

    if (canonical) {
        canonical.href =
            `https://teenspeakgrammar.com${path}`;
    }

    // Open Graph title
    const ogTitle = document.querySelector(
        'meta[property="og:title"]'
    );

    if (ogTitle) {
        ogTitle.setAttribute("content", title);
    }

    // Open Graph description
    const ogDescription = document.querySelector(
        'meta[property="og:description"]'
    );

    if (ogDescription) {
        ogDescription.setAttribute("content", description);
    }

    // Open Graph URL
    const ogUrl = document.querySelector(
        'meta[property="og:url"]'
    );

    if (ogUrl) {
        ogUrl.setAttribute(
            "content",
            `https://teenspeakgrammar.com${path}`
        );
    }

    // Twitter title
    const twitterTitle = document.querySelector(
        'meta[name="twitter:title"]'
    );

    if (twitterTitle) {
        twitterTitle.setAttribute("content", title);
    }

    // Twitter description
    const twitterDescription = document.querySelector(
        'meta[name="twitter:description"]'
    );

    if (twitterDescription) {
        twitterDescription.setAttribute(
            "content",
            description
        );
    }
const schema = document.getElementById("schema");

if (schema) {

    schema.textContent = JSON.stringify({

        "@context": "https://schema.org",

        "@type": "LearningResource",

        "name": topic + " Speaking Questions",

        "description": description,

        "url": "https://teenspeakgrammar.com" + path,

        "educationalLevel": "B1",

        "learningResourceType": "Speaking Activity",

        "inLanguage": "en"

    });

}
}
