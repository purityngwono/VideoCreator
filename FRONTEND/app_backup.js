// ============================================================
// VIDEO CREATOR
// MAIN APPLICATION
// ============================================================
//
// 5-stage video creation workflow:
//
// 1. Category
// 2. Your Idea
// 3. Suggestions
// 4. Character & Style
// 5. Storyboard
//
// Generation is currently virtual/local.
// No API credits are required.
//
// Existing storyboard functions are supplied by:
// sceneengine.js
//
// ============================================================


// ============================================================
// APPLICATION STATE
// ============================================================

let currentStep = 1;

let currentProject = {
    category: "",
    idea: "",
    suggestion: "",
    duration: 60,
    character: "",
    visualStyle: "",
    aspectRatio: "16:9"
};

let scenes = [];

let generatedCharacterOptions = [];

let selectedCharacter = null;


// ============================================================
// CATEGORY DATA
// ============================================================

const categories = [
    {
        id: "kids",
        icon: "🧸",
        name: "Kids",
        description:
            "Nursery rhymes, children's stories, cartoons and fun adventures."
    },

    {
        id: "education",
        icon: "📚",
        name: "Education",
        description:
            "Lessons, explainers, tutorials and educational content."
    },

    {
        id: "comedy",
        icon: "😂",
        name: "Comedy",
        description:
            "Funny stories, skits, jokes, memes and entertaining videos."
    },

    {
        id: "music",
        icon: "🎵",
        name: "Music",
        description:
            "Music videos, lyric videos, visualizers and performances."
    },

    {
        id: "film",
        icon: "🎬",
        name: "Story / Film",
        description:
            "Short films, cinematic stories and fictional adventures."
    },

    {
        id: "social",
        icon: "📱",
        name: "Social Media",
        description:
            "TikToks, YouTube Shorts, Reels and other short-form videos."
    },

    {
        id: "other",
        icon: "✨",
        name: "Other",
        description:
            "Something completely different? Start from your own idea."
    }
];


// ============================================================
// SUGGESTION DATA
// ============================================================

const suggestionData = {

    kids: [
        "A cute bunny discovers a magical garden.",
        "Three animal friends go on a fun adventure.",
        "A little bear learns how to share.",
        "A group of animals prepare for a big party.",
        "A magical bedtime story about friendship."
    ],

    education: [
        "Explain photosynthesis using a simple story.",
        "Teach children how the solar system works.",
        "Explain mathematics using everyday objects.",
        "Create a fun science experiment explanation.",
        "Explain an important historical event."
    ],

    comedy: [
        "A character tries to become famous overnight.",
        "Two friends compete over something completely silly.",
        "A normal day turns into complete chaos.",
        "A character keeps making hilariously bad decisions.",
        "A funny misunderstanding gets out of control."
    ],

    music: [
        "A colourful music video about friendship.",
        "A magical musical journey through different worlds.",
        "An upbeat dance video with animated characters.",
        "A dreamy visualizer with changing environments.",
        "A children's song with colourful animated scenes."
    ],

    film: [
        "A mysterious stranger arrives in a small town.",
        "A young hero discovers a hidden secret.",
        "Two friends go searching for a lost treasure.",
        "A character wakes up in a world they don't recognize.",
        "A cinematic adventure begins after a strange discovery."
    ],

    social: [
        "A fast-paced story with an unexpected ending.",
        "A surprising fact presented as a short story.",
        "A funny relatable situation.",
        "A motivational transformation story.",
        "A mysterious event that makes viewers curious."
    ],

    other: [
        "A completely original story.",
        "A short animated adventure.",
        "A cinematic visual experiment.",
        "A creative concept you've never seen before.",
        "Something unexpected and imaginative."
    ]
};


// ============================================================
// CHARACTER OPTIONS
// ============================================================

const characterOptions = {

    kids: [
        {
            id: "bunny",
            name: "Friendly Bunny",
            description: "Cute, expressive and playful cartoon bunny."
        },

        {
            id: "bear",
            name: "Happy Bear",
            description: "Warm, friendly and child-safe cartoon bear."
        },

        {
            id: "fox",
            name: "Curious Fox",
            description: "Playful fox with a curious personality."
        },

        {
            id: "custom",
            name: "Create Your Own",
            description: "Design a completely original character."
        }
    ],

    education: [
        {
            id: "teacher",
            name: "Friendly Teacher",
            description: "Approachable animated educational character."
        },

        {
            id: "student",
            name: "Curious Student",
            description: "Young animated learner who asks questions."
        },

        {
            id: "robot",
            name: "Learning Robot",
            description: "Friendly robot designed for explanations."
        },

        {
            id: "custom",
            name: "Create Your Own",
            description: "Design a custom educational character."
        }
    ],

    comedy: [
        {
            id: "comedian",
            name: "Funny Character",
            description: "Expressive cartoon character built for comedy."
        },

        {
            id: "animal",
            name: "Chaotic Animal",
            description: "An animated animal with exaggerated reactions."
        },

        {
            id: "person",
            name: "Everyday Person",
            description: "Relatable character for everyday situations."
        },

        {
            id: "custom",
            name: "Create Your Own",
            description: "Design your own comedic character."
        }
    ],

    music: [
        {
            id: "singer",
            name: "Animated Singer",
            description: "Stylized performer for animated music videos."
        },

        {
            id: "band",
            name: "Animated Band",
            description: "Group of characters performing together."
        },

        {
            id: "dancer",
            name: "Animated Dancer",
            description: "Expressive character built for movement."
        },

        {
            id: "custom",
            name: "Create Your Own",
            description: "Create your own music-video character."
        }
    ],

    film: [
        {
            id: "hero",
            name: "The Hero",
            description: "Cinematic protagonist for your story."
        },

        {
            id: "detective",
            name: "The Detective",
            description: "Mystery-focused cinematic character."
        },

        {
            id: "adventurer",
            name: "The Adventurer",
            description: "Explorer ready for an epic journey."
        },

        {
            id: "custom",
            name: "Create Your Own",
            description: "Create a completely original character."
        }
    ],

    social: [
        {
            id: "creator",
            name: "Content Creator",
            description: "Modern character designed for social content."
        },

        {
            id: "avatar",
            name: "Animated Avatar",
            description: "Stylized avatar for short-form videos."
        },

        {
            id: "character",
            name: "Original Character",
            description: "Flexible character for viral stories."
        },

        {
            id: "custom",
            name: "Create Your Own",
            description: "Create your own social-media character."
        }
    ],

    other: [
        {
            id: "original",
            name: "Original Character",
            description: "A completely original visual identity."
        },

        {
            id: "abstract",
            name: "Abstract Style",
            description: "Experimental visual concept."
        },

        {
            id: "custom",
            name: "Create Your Own",
            description: "Design anything you imagine."
        }
    ]
};


// ============================================================
// VISUAL STYLES
// ============================================================

const visualStyles = [
    {
        id: "3d",
        name: "3D Animation",
        icon: "🧊",
        description: "Modern colourful 3D animated look."
    },

    {
        id: "2d",
        name: "2D Cartoon",
        icon: "🎨",
        description: "Clean expressive 2D animation."
    },

    {
        id: "anime",
        name: "Anime",
        icon: "✨",
        description: "Stylized anime-inspired visuals."
    },

    {
        id: "cinematic",
        name: "Cinematic",
        icon: "🎥",
        description: "Film-like lighting and composition."
    },

    {
        id: "storybook",
        name: "Storybook",
        icon: "📖",
        description: "Illustrated children's-book aesthetic."
    },

    {
        id: "realistic",
        name: "Realistic",
        icon: "📷",
        description: "More realistic visual direction."
    }
];


// ============================================================
// DOM READY
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        injectWizardStyles();

        initializeApplication();

    }
);


// ============================================================
// INITIALIZE
// ============================================================

function initializeApplication() {

    currentStep = 1;

    renderApplication();

}


// ============================================================
// MAIN RENDER
// ============================================================

function renderApplication() {

    const app =
        document.getElementById("app");

    if (!app) {

        console.error(
            "Could not find #app element."
        );

        return;
    }


    if (currentStep < 5) {

        renderWizard();

        return;
    }


    renderStoryboard();

}


// ============================================================
// WIZARD RENDER
// ============================================================

function renderWizard() {

    const app =
        document.getElementById("app");


    app.innerHTML = `

        <div class="wizard-app">

            ${renderWizardHeader()}

            ${renderStepProgress()}

            <main class="wizard-main">

                ${renderCurrentStep()}

            </main>

        </div>

    `;


    attachWizardListeners();

}


// ============================================================
// HEADER
// ============================================================

function renderWizardHeader() {

    return `

        <header class="wizard-header">

            <div class="wizard-brand">

                <div class="brand-mark">
                    ▶
                </div>

                <div>

                    <div class="brand-name">
                        VideoCreator
                    </div>

                    <div class="brand-subtitle">
                        Create videos your way
                    </div>

                </div>

            </div>


            <div class="header-badge">
                ✨ Virtual Generation
            </div>

        </header>

    `;
}


// ============================================================
// STEP PROGRESS
// ============================================================

function renderStepProgress() {

    const steps = [

        {
            number: 1,
            name: "Category"
        },

        {
            number: 2,
            name: "Your Idea"
        },

        {
            number: 3,
            name: "Suggestions"
        },

        {
            number: 4,
            name: "Character & Style"
        },

        {
            number: 5,
            name: "Storyboard"
        }

    ];


    return `

        <section class="wizard-progress">

            <div class="wizard-progress-inner">

                ${steps
                    .map(
                        step => `

                            <div
                                class="
                                    wizard-step
                                    ${
                                        step.number === currentStep
                                            ? "active"
                                            : ""
                                    }
                                    ${
                                        step.number < currentStep
                                            ? "complete"
                                            : ""
                                    }
                                "
                            >

                                <div class="step-circle">

                                    ${
                                        step.number < currentStep
                                            ? "✓"
                                            : step.number
                                    }

                                </div>

                                <span>
                                    ${step.name}
                                </span>

                            </div>

                            ${
                                step.number < 5
                                    ? `
                                        <div
                                            class="
                                                step-line
                                                ${
                                                    step.number <
                                                    currentStep
                                                        ? "complete"
                                                        : ""
                                                }
                                            "
                                        ></div>
                                    `
                                    : ""
                            }

                        `
                    )
                    .join("")}

            </div>

        </section>

    `;
}


// ============================================================
// CURRENT STEP
// ============================================================

function renderCurrentStep() {

    switch (currentStep) {

        case 1:
            return renderCategoryStep();

        case 2:
            return renderIdeaStep();

        case 3:
            return renderSuggestionsStep();

        case 4:
            return renderCharacterStep();

        default:
            return renderStoryboard();

    }

}


// ============================================================
// STEP 1 — CATEGORY
// ============================================================

function renderCategoryStep() {

    return `

        <section class="wizard-card">

            <div class="step-heading">

                <span class="eyebrow">
                    STEP 1
                </span>

                <h1>
                    What kind of video are you creating?
                </h1>

                <p>
                    Choose a category so VideoCreator can
                    tailor the creative process to your video.
                </p>

            </div>


            <div class="category-grid">

                ${categories
                    .map(
                        category => `

                            <button
                                class="
                                    category-card
                                    ${
                                        currentProject.category ===
                                        category.id
                                            ? "selected"
                                            : ""
                                    }
                                "
                                data-category="${category.id}"
                            >

                                <div class="category-icon">
                                    ${category.icon}
                                </div>

                                <div class="category-content">

                                    <h3>
                                        ${category.name}
                                    </h3>

                                    <p>
                                        ${category.description}
                                    </p>

                                </div>

                                <div class="category-check">
                                    ${
                                        currentProject.category ===
                                        category.id
                                            ? "✓"
                                            : ""
                                    }
                                </div>

                            </button>

                        `
                    )
                    .join("")}

            </div>


            <div class="wizard-actions">

                <div></div>

                <button
                    class="wizard-primary"
                    id="categoryContinue"
                    ${
                        currentProject.category
                            ? ""
                            : "disabled"
                    }
                >
                    Continue
                    <span>→</span>
                </button>

            </div>

        </section>

    `;
}


// ============================================================
// STEP 2 — IDEA
// ============================================================

function renderIdeaStep() {

    const category =
        getCurrentCategory();


    return `

        <section class="wizard-card">

            <div class="step-heading">

                <span class="eyebrow">
                    STEP 2
                </span>

                <h1>
                    What's your video about?
                </h1>

                <p>
                    Tell VideoCreator what you want to make.
                    You can be as simple or detailed as you like.
                </p>

            </div>


            <div class="selected-category-banner">

                <span>
                    ${category.icon}
                </span>

                <div>

                    <strong>
                        ${category.name}
                    </strong>

                    <small>
                        ${category.description}
                    </small>

                </div>

                <button
                    id="changeCategory"
                    class="text-button"
                >
                    Change
                </button>

            </div>


            <div class="idea-area">

                <label>
                    Your idea
                </label>

                <textarea
                    id="ideaInput"
                    placeholder="Example: A cute white bunny goes on an adventure through a magical forest..."
                >${escapeHTML(
                    currentProject.idea
                )}</textarea>

                <div class="input-footer">

                    <span>
                        Don't worry about making it perfect.
                        We'll help develop it.
                    </span>

                    <span id="characterCount">
                        ${
                            currentProject.idea.length
                        } characters
                    </span>

                </div>

            </div>


            <div class="quick-ideas">

                <span>
                    Need inspiration?
                </span>

                <button
                    data-quick-idea="random"
                >
                    ✨ Surprise me
                </button>

                <button
                    data-quick-idea="simple"
                >
                    💡 Simple idea
                </button>

            </div>


            <div class="wizard-actions">

                <button
                    class="wizard-secondary"
                    id="ideaBack"
                >
                    ← Back
                </button>

                <button
                    class="wizard-primary"
                    id="ideaContinue"
                    ${
                        currentProject.idea.trim()
                            ? ""
                            : "disabled"
                    }
                >
                    Continue
                    <span>→</span>
                </button>

            </div>

        </section>

    `;
}


// ============================================================
// STEP 3 — SUGGESTIONS
// ============================================================

function renderSuggestionsStep() {

    const suggestions =
        suggestionData[
            currentProject.category
        ] ||
        suggestionData.other;


    return `

        <section class="wizard-card">

            <div class="step-heading">

                <span class="eyebrow">
                    STEP 3
                </span>

                <h1>
                    Let's make your idea better.
                </h1>

                <p>
                    Here are some creative directions.
                    Pick one, combine ideas, or keep your original concept.
                </p>

            </div>


            <div class="idea-preview">

                <span class="preview-label">
                    YOUR IDEA
                </span>

                <p>
                    ${escapeHTML(
                        currentProject.idea
                    )}
                </p>

            </div>


            <div class="suggestions-heading">

                <div>

                    <h2>
                        Creative suggestions
                    </h2>

                    <p>
                        Inspired by your selected category.
                    </p>

                </div>

                <span class="suggestions-ai">
                    ✨ AI-inspired
                </span>

            </div>


            <div class="idea-suggestions">

                ${suggestions
                    .map(
                        (suggestion, index) => `

                            <button
                                class="
                                    idea-suggestion
                                    ${
                                        currentProject.suggestion ===
                                        suggestion
                                            ? "selected"
                                            : ""
                                    }
                                "
                                data-suggestion="${escapeAttribute(
                                    suggestion
                                )}"
                            >

                                <span class="suggestion-number">
                                    ${index + 1}
                                </span>

                                <span class="suggestion-text">
                                    ${suggestion}
                                </span>

                                <span class="suggestion-arrow">
                                    →
                                </span>

                            </button>

                        `
                    )
                    .join("")}

            </div>


            <div class="custom-direction">

                <span>
                    💭
                </span>

                <div>

                    <strong>
                        Prefer your original idea?
                    </strong>

                    <p>
                        That's completely fine. You don't have
                        to use any of these suggestions.
                    </p>

                </div>

                <button
                    id="keepOriginal"
                    class="
                        ${
                            !currentProject.suggestion
                                ? "selected"
                                : ""
                        }
                    "
                >
                    Keep original
                </button>

            </div>


            <div class="wizard-actions">

                <button
                    class="wizard-secondary"
                    id="suggestionsBack"
                >
                    ← Back
                </button>

                <button
                    class="wizard-primary"
                    id="suggestionsContinue"
                >
                    Continue
                    <span>→</span>
                </button>

            </div>

        </section>

    `;
}


// ============================================================
// STEP 4 — CHARACTER & STYLE
// ============================================================

function renderCharacterStep() {

    const category =
        currentProject.category || "other";


    const options =
        characterOptions[category] ||
        characterOptions.other;


    return `

        <section class="wizard-card wizard-card-wide">

            <div class="step-heading">

                <span class="eyebrow">
                    STEP 4
                </span>

                <h1>
                    Who or what is in your video?
                </h1>

                <p>
                    Choose the visual identity of your video.
                    You'll be able to review the generated options before continuing.
                </p>

            </div>


            <div class="character-section">

                <div class="section-title-row">

                    <div>

                        <h2>
                            Character
                        </h2>

                        <p>
                            Choose a starting character.
                        </p>

                    </div>

                    <span class="virtual-badge">
                        ⚡ Virtual generation
                    </span>

                </div>


                <div class="character-grid">

                    ${options
                        .map(
                            option => `

                                <button
                                    class="
                                        character-card
                                        ${
                                            selectedCharacter &&
                                            selectedCharacter.id ===
                                                option.id
                                                ? "selected"
                                                : ""
                                        }
                                    "
                                    data-character="${option.id}"
                                >

                                    <div class="character-preview">

                                        <span>
                                            ${
                                                option.id ===
                                                "bunny"
                                                    ? "🐰"
                                                    : option.id ===
                                                      "bear"
                                                    ? "🐻"
                                                    : option.id ===
                                                      "fox"
                                                    ? "🦊"
                                                    : option.id ===
                                                      "robot"
                                                    ? "🤖"
                                                    : option.id ===
                                                      "teacher"
                                                    ? "👩‍🏫"
                                                    : option.id ===
                                                      "student"
                                                    ? "🧑‍🎓"
                                                    : option.id ===
                                                      "singer"
                                                    ? "🎤"
                                                    : option.id ===
                                                      "band"
                                                    ? "🎸"
                                                    : option.id ===
                                                      "dancer"
                                                    ? "💃"
                                                    : option.id ===
                                                      "detective"
                                                    ? "🕵️"
                                                    : option.id ===
                                                      "adventurer"
                                                    ? "🧭"
                                                    : option.id ===
                                                      "creator"
                                                    ? "📱"
                                                    : option.id ===
                                                      "avatar"
                                                    ? "👾"
                                                    : option.id ===
                                                      "animal"
                                                    ? "🐵"
                                                    : "✨"
                                            }
                                        </span>

                                    </div>

                                    <div class="character-info">

                                        <strong>
                                            ${option.name}
                                        </strong>

                                        <p>
                                            ${option.description}
                                        </p>

                                    </div>

                                    <div class="character-selected">

                                        ${
                                            selectedCharacter &&
                                            selectedCharacter.id ===
                                                option.id
                                                ? "✓ Selected"
                                                : "Select"
                                        }

                                    </div>

                                </button>

                            `
                        )
                        .join("")}

                </div>

            </div>


            <div class="style-section">

                <div class="section-title-row">

                    <div>

                        <h2>
                            Visual style
                        </h2>

                        <p>
                            What should your video look like?
                        </p>

                    </div>

                </div>


                <div class="style-grid">

                    ${visualStyles
                        .map(
                            style => `

                                <button
                                    class="
                                        style-card
                                        ${
                                            currentProject.visualStyle ===
                                            style.id
                                                ? "selected"
                                                : ""
                                        }
                                    "
                                    data-style="${style.id}"
                                >

                                    <span class="style-icon">
                                        ${style.icon}
                                    </span>

                                    <strong>
                                        ${style.name}
                                    </strong>

                                    <small>
                                        ${style.description}
                                    </small>

                                </button>

                            `
                        )
                        .join("")}

                </div>

            </div>


            <div class="generation-panel">

                <div>

                    <span class="generation-icon">
                        ✨
                    </span>

                    <div>

                        <strong>
                            Generate a preview
                        </strong>

                        <p>
                            VideoCreator will create virtual visual
                            options so you can choose your favourite.
                        </p>

                    </div>

                </div>


                <button
                    class="generate-character-btn"
                    id="generateCharacter"
                    ${
                        selectedCharacter &&
                        currentProject.visualStyle
                            ? ""
                            : "disabled"
                    }
                >
                    Generate Preview
                    →
                </button>

            </div>


            ${
                generatedCharacterOptions.length > 0
                    ? renderGeneratedCharacterOptions()
                    : ""
            }


            <div class="wizard-actions">

                <button
                    class="wizard-secondary"
                    id="characterBack"
                >
                    ← Back
                </button>

                <button
                    class="wizard-primary"
                    id="characterContinue"
                    ${
                        selectedCharacter &&
                        currentProject.visualStyle &&
                        generatedCharacterOptions.length > 0
                            ? ""
                            : "disabled"
                    }
                >
                    Continue to Storyboard
                    <span>→</span>
                </button>

            </div>

        </section>

    `;
}


// ============================================================
// GENERATED CHARACTER OPTIONS
// ============================================================

function renderGeneratedCharacterOptions() {

    return `

        <div class="generated-section">

            <div class="generated-header">

                <div>

                    <span class="eyebrow">
                        PREVIEW GENERATED
                    </span>

                    <h2>
                        Choose your favourite direction
                    </h2>

                    <p>
                        This is a virtual preview for now.
                        Real image generation will plug into this stage later.
                    </p>

                </div>

                <span class="review-badge">
                    Ready for review
                </span>

            </div>


            <div class="generated-grid">

                ${generatedCharacterOptions
                    .map(
                        option => `

                            <button
                                class="
                                    generated-option
                                    ${
                                        selectedCharacter &&
                                        selectedCharacter.generatedId ===
                                            option.id
                                            ? "selected"
                                            : ""
                                    }
                                "
                                data-generated="${option.id}"
                            >

                                <div class="generated-image">

                                    <div class="generated-art">

                                        ${
                                            option.emoji
                                        }

                                    </div>

                                    <span>
                                        Virtual preview
                                    </span>

                                </div>

                                <div class="generated-footer">

                                    <strong>
                                        ${option.name}
                                    </strong>

                                    <small>
                                        ${option.description}
                                    </small>

                                    <span>
                                        ${
                                            selectedCharacter &&
                                            selectedCharacter.generatedId ===
                                                option.id
                                                ? "✓ Selected"
                                                : "Select"
                                        }
                                    </span>

                                </div>

                            </button>

                        `
                    )
                    .join("")}

            </div>

        </div>

    `;
}


// ============================================================
// STORYBOARD
// ============================================================

function renderStoryboard() {

    const app =
        document.getElementById("app");


    if (!scenes.length) {

        scenes =
            generateStoryboard(
                currentProject
            );

    }


    app.innerHTML = `

        <div class="video-app">

            ${renderStoryboardHeader()}

            ${renderProgress()}

            <main class="storyboard">

                ${scenes
                    .map(
                        scene =>
                            renderScene(
                                scene
                            )
                    )
                    .join("")}

            </main>

            ${renderFooter()}

        </div>

    `;


    attachEventListeners();

}


// ============================================================
// STORYBOARD HEADER
// ============================================================

function renderStoryboardHeader() {

    return `

        <header class="app-header">

            <div>

                <div class="brand">
                    VideoCreator
                </div>

                <div class="subtitle">
                    AI Video Storyboard
                </div>

            </div>


            <div class="project-info">

                <span>
                    ${escapeHTML(
                        currentProject.idea
                    )}
                </span>

            </div>

        </header>

    `;
}


// ============================================================
// STORYBOARD PROGRESS
// ============================================================

function renderProgress() {

    const approved =
        scenes.filter(
            scene =>
                scene.approved
        ).length;


    const percentage =
        scenes.length === 0
            ? 0
            : Math.round(
                (
                    approved /
                    scenes.length
                ) * 100
            );


    return `

        <section class="progress-section">

            <div class="progress-header">

                <div>

                    <h2>
                        Storyboard
                    </h2>

                    <p>
                        Review each scene and choose
                        the visual direction.
                    </p>

                </div>


                <div class="progress-count">

                    ${approved}
                    /
                    ${scenes.length}

                    approved

                </div>

            </div>


            <div class="progress-bar">

                <div
                    class="progress-fill"
                    style="
                        width: ${percentage}%;
                    "
                ></div>

            </div>

        </section>

    `;

}


// ============================================================
// SCENE
// ============================================================

function renderScene(scene) {

    const statusClass =
        getStatusClass(
            scene.status
        );


    const statusText =
        getStatusText(
            scene.status
        );


    return `

        <article
            class="
                scene-card
                ${statusClass}
            "
            data-scene-id="${scene.number}"
        >

            <div class="scene-header">

                <div class="scene-number">
                    ${scene.number}
                </div>


                <div class="scene-heading">

                    <div class="scene-title-row">

                        <h3>
                            ${escapeHTML(
                                scene.title
                            )}
                        </h3>

                        <span
                            class="
                                scene-status
                                ${statusClass}
                            "
                        >
                            ${statusText}
                        </span>

                    </div>


                    <p class="scene-beat">

                        ${escapeHTML(
                            scene.storyBeat
                        )}

                    </p>

                </div>

            </div>


            <div class="scene-details">

                <div class="detail">

                    <span class="detail-label">
                        Duration
                    </span>

                    <strong>
                        ${scene.duration}s
                    </strong>

                </div>


                <div class="detail narration">

                    <span class="detail-label">
                        Narration
                    </span>

                    <span>

                        ${escapeHTML(
                            scene.narration
                        )}

                    </span>

                </div>

            </div>


            <div class="story-description">

                <span class="detail-label">
                    Story direction
                </span>

                <p>

                    ${escapeHTML(
                        scene.description
                    )}

                </p>

            </div>


            <div class="visual-prompt">

                <span class="detail-label">
                    Visual direction
                </span>

                <p>

                    ${escapeHTML(
                        scene.visualPrompt
                    )}

                </p>

            </div>


            <div class="suggestions-section">

                <div class="suggestions-header">

                    <div>

                        <span class="detail-label">
                            Creative suggestions
                        </span>

                        <p>
                            Choose an idea to influence this scene.
                        </p>

                    </div>

                </div>


                <div class="suggestions">

                    ${scene.suggestions
                        .map(
                            suggestion => `

                                <button
                                    class="suggestion-btn"
                                    data-action="suggestion"
                                    data-scene="${scene.number}"
                                    data-value="${escapeAttribute(
                                        suggestion
                                    )}"
                                >

                                    ${escapeHTML(
                                        suggestion
                                    )}

                                </button>

                            `
                        )
                        .join("")}

                </div>

            </div>


            ${renderVisualOptions(scene)}


            <div class="scene-actions">

                <button
                    class="secondary-btn"
                    data-action="generate"
                    data-scene="${scene.number}"
                >
                    🎨 Generate Visuals
                </button>


                <button
                    class="primary-btn"
                    data-action="approve"
                    data-scene="${scene.number}"
                    ${
                        scene.selectedVisual
                            ? ""
                            : "disabled"
                    }
                >
                    ✓ Approve Scene
                </button>

            </div>

        </article>

    `;

}


// ============================================================
// VISUAL OPTIONS
// ============================================================

function renderVisualOptions(scene) {

    if (
        !scene.visualOptions ||
        scene.visualOptions.length === 0
    ) {

        return "";

    }


    return `

        <div class="visual-options">

            <div class="visual-options-header">

                <div>

                    <span class="detail-label">
                        Visual options
                    </span>

                    <p>
                        Choose the direction you like best.
                    </p>

                </div>

                <span class="review-badge">
                    Ready for review
                </span>

            </div>


            <div class="visual-grid">

                ${scene.visualOptions
                    .map(
                        option =>
                            renderVisualOption(
                                scene,
                                option
                            )
                    )
                    .join("")}

            </div>

        </div>

    `;

}


// ============================================================
// SINGLE VISUAL OPTION
// ============================================================

function renderVisualOption(
    scene,
    option
) {

    const selected =
        scene.selectedVisual &&
        scene.selectedVisual.id ===
            option.id;


    return `

        <button
            class="
                visual-option
                ${
                    selected
                        ? "selected"
                        : ""
                }
            "
            data-action="select-visual"
            data-scene="${scene.number}"
            data-option="${option.id}"
        >

            <div class="visual-placeholder">

                <div class="placeholder-icon">
                    🎬
                </div>

                <span>
                    ${option.label}
                </span>

                <small>
                    AI visual preview
                </small>

            </div>


            <div class="visual-option-footer">

                <span>

                    ${
                        selected
                            ? "✓ Selected"
                            : "Select"
                    }

                </span>

            </div>

        </button>

    `;

}


// ============================================================
// STORYBOARD FOOTER
// ============================================================

function renderFooter() {

    const allApproved =
        scenes.length > 0 &&
        scenes.every(
            scene =>
                scene.approved
        );


    return `

        <footer class="app-footer">

            <div>

                ${
                    allApproved
                        ? `
                            <strong>
                                🎉 Storyboard complete!
                            </strong>

                            <span>
                                All scenes have been approved.
                            </span>
                        `
                        : `
                            <strong>
                                Review your scenes
                            </strong>

                            <span>
                                Generate visuals, choose your
                                favourites, then approve each scene.
                            </span>
                        `
                }

            </div>


            <button
                class="continue-btn"
                ${
                    allApproved
                        ? ""
                        : "disabled"
                }
                id="storyboardContinue"
            >
                Continue to Character & Style
                →
            </button>

        </footer>

    `;

}


// ============================================================
// WIZARD EVENT LISTENERS
// ============================================================

function attachWizardListeners() {


    // --------------------------------------------------------
    // CATEGORY
    // --------------------------------------------------------

    document
        .querySelectorAll(
            "[data-category]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        currentProject.category =
                            button.dataset.category;

                        currentProject.suggestion =
                            "";

                        selectedCharacter =
                            null;

                        generatedCharacterOptions =
                            [];

                        renderApplication();

                    }
                );

            }
        );


    const categoryContinue =
        document.getElementById(
            "categoryContinue"
        );


    if (categoryContinue) {

        categoryContinue.addEventListener(
            "click",
            () => {

                if (
                    !currentProject.category
                ) {
                    return;
                }

                currentStep = 2;

                renderApplication();

            }
        );

    }


    // --------------------------------------------------------
    // IDEA
    // --------------------------------------------------------

    const ideaInput =
        document.getElementById(
            "ideaInput"
        );


    if (ideaInput) {

        ideaInput.addEventListener(
            "input",
            event => {

                currentProject.idea =
                    event.target.value;

                const count =
                    document.getElementById(
                        "characterCount"
                    );

                if (count) {

                    count.textContent =
                        `${event.target.value.length} characters`;

                }

                const button =
                    document.getElementById(
                        "ideaContinue"
                    );

                if (button) {

                    button.disabled =
                        !event.target.value.trim();

                }

            }
        );

    }


    const ideaContinue =
        document.getElementById(
            "ideaContinue"
        );


    if (ideaContinue) {

        ideaContinue.addEventListener(
            "click",
            () => {

                if (
                    !currentProject.idea.trim()
                ) {
                    return;
                }

                currentStep = 3;

                renderApplication();

            }
        );

    }


    const ideaBack =
        document.getElementById(
            "ideaBack"
        );


    if (ideaBack) {

        ideaBack.addEventListener(
            "click",
            () => {

                currentStep = 1;

                renderApplication();

            }
        );

    }


    const changeCategory =
        document.getElementById(
            "changeCategory"
        );


    if (changeCategory) {

        changeCategory.addEventListener(
            "click",
            () => {

                currentStep = 1;

                renderApplication();

            }
        );

    }


    // --------------------------------------------------------
    // QUICK IDEAS
    // --------------------------------------------------------

    document
        .querySelectorAll(
            "[data-quick-idea]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const type =
                            button.dataset.quickIdea;

                        const suggestions =
                            suggestionData[
                                currentProject.category
                            ] ||
                            suggestionData.other;


                        if (
                            type ===
                            "random"
                        ) {

                            const random =
                                suggestions[
                                    Math.floor(
                                        Math.random() *
                                        suggestions.length
                                    )
                                ];

                            currentProject.idea =
                                random;

                        } else {

                            currentProject.idea =
                                suggestions[0];

                        }

                        renderApplication();

                    }
                );

            }
        );


    // --------------------------------------------------------
    // SUGGESTIONS
    // --------------------------------------------------------

    document
        .querySelectorAll(
            "[data-suggestion]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        currentProject.suggestion =
                            button.dataset.suggestion;

                        renderApplication();

                    }
                );

            }
        );


    const keepOriginal =
        document.getElementById(
            "keepOriginal"
        );


    if (keepOriginal) {

        keepOriginal.addEventListener(
            "click",
            () => {

                currentProject.suggestion =
                    "";

                renderApplication();

            }
        );

    }


    const suggestionsContinue =
        document.getElementById(
            "suggestionsContinue"
        );


    if (suggestionsContinue) {

        suggestionsContinue.addEventListener(
            "click",
            () => {

                currentStep = 4;

                renderApplication();

            }
        );

    }


    const suggestionsBack =
        document.getElementById(
            "suggestionsBack"
        );


    if (suggestionsBack) {

        suggestionsBack.addEventListener(
            "click",
            () => {

                currentStep = 2;

                renderApplication();

            }
        );

    }


    // --------------------------------------------------------
    // CHARACTER
    // --------------------------------------------------------

    document
        .querySelectorAll(
            "[data-character]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            button.dataset.character;

                        const options =
                            characterOptions[
                                currentProject.category
                            ] ||
                            characterOptions.other;

                        const option =
                            options.find(
                                item =>
                                    item.id ===
                                    id
                            );

                        if (!option) {
                            return;
                        }

                        selectedCharacter =
                            {
                                ...option
                            };

                        generatedCharacterOptions =
                            [];

                        renderApplication();

                    }
                );

            }
        );


    // --------------------------------------------------------
    // STYLE
    // --------------------------------------------------------

    document
        .querySelectorAll(
            "[data-style]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        currentProject.visualStyle =
                            button.dataset.style;

                        renderApplication();

                    }
                );

            }
        );


    // --------------------------------------------------------
    // GENERATE CHARACTER
    // --------------------------------------------------------

    const generateCharacter =
        document.getElementById(
            "generateCharacter"
        );


    if (generateCharacter) {

        generateCharacter.addEventListener(
            "click",
            generateCharacterPreview
        );

    }


    // --------------------------------------------------------
    // GENERATED CHARACTER SELECTION
    // --------------------------------------------------------

    document
        .querySelectorAll(
            "[data-generated]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            button.dataset.generated;

                        const option =
                            generatedCharacterOptions.find(
                                item =>
                                    item.id ===
                                    id
                            );

                        if (!option) {
                            return;
                        }

                        selectedCharacter = {
                            ...selectedCharacter,
                            generatedId:
                                option.id,
                            generatedName:
                                option.name
                        };

                        renderApplication();

                    }
                );

            }
        );


    // --------------------------------------------------------
    // CHARACTER BACK
    // --------------------------------------------------------

    const characterBack =
        document.getElementById(
            "characterBack"
        );


    if (characterBack) {

        characterBack.addEventListener(
            "click",
            () => {

                currentStep = 3;

                renderApplication();

            }
        );

    }


    // --------------------------------------------------------
    // CHARACTER CONTINUE
    // --------------------------------------------------------

    const characterContinue =
        document.getElementById(
            "characterContinue"
        );


    if (characterContinue) {

        characterContinue.addEventListener(
            "click",
            () => {

                if (
                    !selectedCharacter ||
                    !currentProject.visualStyle ||
                    !generatedCharacterOptions.length
                ) {
                    return;
                }


                const chosen =
                    generatedCharacterOptions.find(
                        option =>
                            option.id ===
                            selectedCharacter.generatedId
                    );


                currentProject.character =
                    chosen
                        ? chosen.name
                        : selectedCharacter.name;


                currentStep = 5;

                scenes = [];

                renderApplication();

            }
        );

    }

}


// ============================================================
// VIRTUAL CHARACTER GENERATION
// ============================================================

function generateCharacterPreview() {

    const button =
        document.getElementById(
            "generateCharacter"
        );


    if (!button) {
        return;
    }


    button.disabled = true;

    button.textContent =
        "Generating...";


    setTimeout(
        () => {

            const base =
                selectedCharacter
                    ? selectedCharacter.name
                    : "Original Character";


            generatedCharacterOptions = [

                {
                    id: "visual-1",
                    name: `${base} — Version A`,
                    description:
                        "Friendly expression with a clean visual design.",
                    emoji:
                        getCharacterEmoji()
                },

                {
                    id: "visual-2",
                    name: `${base} — Version B`,
                    description:
                        "More expressive pose with a stronger personality.",
                    emoji:
                        getCharacterEmoji()
                },

                {
                    id: "visual-3",
                    name: `${base} — Version C`,
                    description:
                        "Stylized variation designed for storytelling.",
                    emoji:
                        getCharacterEmoji()
                }

            ];


            renderApplication();

        },
        1200
    );

}


// ============================================================
// CHARACTER EMOJI
// ============================================================

function getCharacterEmoji() {

    if (
        !selectedCharacter
    ) {
        return "✨";
    }


    const id =
        selectedCharacter.id;


    const map = {

        bunny: "🐰",

        bear: "🐻",

        fox: "🦊",

        robot: "🤖",

        teacher: "👩‍🏫",

        student: "🧑‍🎓",

        singer: "🎤",

        band: "🎸",

        dancer: "💃",

        detective: "🕵️",

        adventurer: "🧭",

        creator: "📱",

        avatar: "👾",

        animal: "🐵"

    };


    return map[id] || "✨";

}


// ============================================================
// STORYBOARD EVENT LISTENERS
// ============================================================

function attachEventListeners() {

    const buttons =
        document.querySelectorAll(
            "[data-action]"
        );


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                handleAction
            );

        }
    );


    const continueButton =
        document.getElementById(
            "storyboardContinue"
        );


    if (continueButton) {

        continueButton.addEventListener(
            "click",
            handleContinue
        );

    }

}


// ============================================================
// STORYBOARD ACTION HANDLER
// ============================================================

function handleAction(event) {

    const button =
        event.currentTarget;


    const action =
        button.dataset.action;


    const sceneNumber =
        Number(
            button.dataset.scene
        );


    const scene =
        scenes.find(
            item =>
                item.number ===
                sceneNumber
        );


    if (!scene) {
        return;
    }


    // --------------------------------------------------------
    // SUGGESTION
    // --------------------------------------------------------

    if (
        action ===
        "suggestion"
    ) {

        const suggestion =
            button.dataset.value;


        applySceneSuggestion(
            scene,
            suggestion
        );


        renderApplication();


        scrollToScene(
            scene.number
        );


        return;

    }


    // --------------------------------------------------------
    // GENERATE
    // --------------------------------------------------------

    if (
        action ===
        "generate"
    ) {

        generateVisuals(
            scene
        );

        return;

    }


    // --------------------------------------------------------
    // SELECT VISUAL
    // --------------------------------------------------------

    if (
        action ===
        "select-visual"
    ) {

        const optionId =
            button.dataset.option;


        selectSceneVisual(
            scene,
            optionId
        );


        renderApplication();


        scrollToScene(
            scene.number
        );


        return;

    }


    // --------------------------------------------------------
    // APPROVE
    // --------------------------------------------------------

    if (
        action ===
        "approve"
    ) {

        approveScene(
            scene
        );


        renderApplication();


        scrollToScene(
            scene.number
        );


        return;

    }

}


// ============================================================
// GENERATE SCENE VISUALS
// ============================================================

function generateVisuals(scene) {

    scene.status =
        "generating";


    scene.progress =
        0;


    renderApplication();


    scrollToScene(
        scene.number
    );


    let progress =
        0;


    const interval =
        setInterval(
            () => {

                progress += 25;

                scene.progress =
                    progress;


                if (
                    progress >=
                    100
                ) {

                    clearInterval(
                        interval
                    );


                    generateMockVisualOptions(
                        scene
                    );


                    renderApplication();


                    scrollToScene(
                        scene.number
                    );


                    return;

                }


                renderApplication();


                scrollToScene(
                    scene.number
                );

            },
            300
        );

}


// ============================================================
// CONTINUE
// ============================================================

function handleContinue() {

    alert(
        "Storyboard complete! Character & Style will be the next stage."
    );

}


// ============================================================
// STATUS CLASS
// ============================================================

function getStatusClass(status) {

    switch (status) {

        case "generating":
            return "status-generating";

        case "review":
            return "status-review";

        case "approved":
            return "status-approved";

        default:
            return "status-ready";

    }

}


// ============================================================
// STATUS TEXT
// ============================================================

function getStatusText(status) {

    switch (status) {

        case "generating":
            return "Generating...";

        case "review":
            return "Review";

        case "approved":
            return "Approved";

        default:
            return "Ready";

    }

}


// ============================================================
// SCROLL TO SCENE
// ============================================================

function scrollToScene(
    sceneNumber
) {

    setTimeout(
        () => {

            const scene =
                document.querySelector(
                    `[data-scene-id="${sceneNumber}"]`
                );


            if (scene) {

                scene.scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "center"

                });

            }

        },
        50
    );

}


// ============================================================
// GET CURRENT CATEGORY
// ============================================================

function getCurrentCategory() {

    return (
        categories.find(
            category =>
                category.id ===
                currentProject.category
        ) ||
        categories[categories.length - 1]
    );

}


// ============================================================
// HTML ESCAPING
// ============================================================

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


// ============================================================
// ATTRIBUTE ESCAPING
// ============================================================

function escapeAttribute(value) {

    return escapeHTML(
        value
    )
    .replace(
        /\n/g,
        " "
    );

}


// ============================================================
// WIZARD STYLES
// ============================================================
//
// These styles are injected here so the wizard works even
// if style.css currently contains the older storyboard styles.
//
// ============================================================

function injectWizardStyles() {

    if (
        document.getElementById(
            "videocreator-wizard-styles"
        )
    ) {

        return;

    }


    const style =
        document.createElement(
            "style"
        );


    style.id =
        "videocreator-wizard-styles";


    style.textContent = `

        .wizard-app {

            min-height: 100vh;

            background:
                radial-gradient(
                    circle at 50% -20%,
                    rgba(124,92,255,.18),
                    transparent 45%
                ),
                #090b10;

            color: white;

        }


        .wizard-header {

            height: 76px;

            padding:
                0 42px;

            display:
                flex;

            align-items:
                center;

            justify-content:
                space-between;

            border-bottom:
                1px solid
                rgba(255,255,255,.08);

            background:
                rgba(9,11,16,.82);

            backdrop-filter:
                blur(20px);

        }


        .wizard-brand {

            display:
                flex;

            align-items:
                center;

            gap: 12px;

        }


        .brand-mark {

            width: 38px;

            height: 38px;

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            border-radius:
                11px;

            background:
                linear-gradient(
                    135deg,
                    #7c5cff,
                    #9a7cff
                );

            font-size:
                15px;

        }


        .brand-name {

            font-size:
                18px;

            font-weight:
                800;

        }


        .brand-subtitle {

            margin-top:
                2px;

            font-size:
                11px;

            color:
                #8e96a8;

        }


        .header-badge {

            padding:
                8px 12px;

            border-radius:
                999px;

            background:
                rgba(124,92,255,.1);

            border:
                1px solid
                rgba(124,92,255,.25);

            color:
                #b6a7ff;

            font-size:
                11px;

            font-weight:
                700;

        }


        .wizard-progress {

            width:
                min(1100px, calc(100% - 40px));

            margin:
                34px auto 0;

        }


        .wizard-progress-inner {

            display:
                flex;

            align-items:
                center;

        }


        .wizard-step {

            display:
                flex;

            align-items:
                center;

            gap: 9px;

            color:
                #737b8d;

            font-size:
                12px;

            font-weight:
                700;

            white-space:
                nowrap;

        }


        .wizard-step.active {

            color:
                white;

        }


        .wizard-step.complete {

            color:
                #9f91ff;

        }


        .step-circle {

            width:
                30px;

            height:
                30px;

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            border-radius:
                50%;

            background:
                #1a1e28;

            border:
                1px solid
                rgba(255,255,255,.08);

        }


        .wizard-step.active
        .step-circle {

            background:
                #7c5cff;

            border-color:
                #7c5cff;

            box-shadow:
                0 0 25px
                rgba(124,92,255,.3);

        }


        .wizard-step.complete
        .step-circle {

            background:
                rgba(124,92,255,.18);

            border-color:
                rgba(124,92,255,.35);

        }


        .step-line {

            height:
                1px;

            flex:
                1;

            min-width:
                25px;

            margin:
                0 12px;

            background:
                rgba(255,255,255,.08);

        }


        .step-line.complete {

            background:
                rgba(124,92,255,.5);

        }


        .wizard-main {

            width:
                min(1100px, calc(100% - 40px));

            margin:
                30px auto 80px;

        }


        .wizard-card {

            padding:
                42px;

            border-radius:
                26px;

            border:
                1px solid
                rgba(255,255,255,.08);

            background:
                linear-gradient(
                    145deg,
                    rgba(21,25,35,.96),
                    rgba(12,15,22,.96)
                );

            box-shadow:
                0 30px 80px
                rgba(0,0,0,.28);

        }


        .wizard-card-wide {

            padding:
                38px;

        }


        .step-heading {

            max-width:
                760px;

            margin-bottom:
                32px;

        }


        .eyebrow {

            color:
                #9b8cff;

            font-size:
                11px;

            font-weight:
                800;

            letter-spacing:
                .12em;

        }


        .step-heading h1 {

            margin-top:
                10px;

            font-size:
                clamp(32px, 5vw, 48px);

            line-height:
                1.05;

            letter-spacing:
                -1.8px;

        }


        .step-heading p {

            margin-top:
                14px;

            color:
                #929aaa;

            line-height:
                1.7;

        }


        .category-grid {

            display:
                grid;

            grid-template-columns:
                repeat(2, 1fr);

            gap:
                14px;

        }


        .category-card {

            position:
                relative;

            min-height:
                150px;

            padding:
                24px;

            display:
                flex;

            align-items:
                flex-start;

            gap:
                18px;

            text-align:
                left;

            color:
                white;

            background:
                rgba(255,255,255,.025);

            border:
                1px solid
                rgba(255,255,255,.07);

            border-radius:
                18px;

            cursor:
                pointer;

            transition:
                .2s ease;

        }


        .category-card:hover {

            transform:
                translateY(-2px);

            background:
                rgba(124,92,255,.08);

            border-color:
                rgba(124,92,255,.35);

        }


        .category-card.selected {

            background:
                rgba(124,92,255,.11);

            border-color:
                #7c5cff;

            box-shadow:
                0 0 0 2px
                rgba(124,92,255,.12);

        }


        .category-icon {

            width:
                54px;

            height:
                54px;

            flex-shrink:
                0;

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            border-radius:
                15px;

            background:
                rgba(255,255,255,.06);

            font-size:
                28px;

        }


        .category-content h3 {

            font-size:
                17px;

        }


        .category-content p {

            margin-top:
                7px;

            color:
                #8e96a8;

            font-size:
                12px;

            line-height:
                1.55;

        }


        .category-check {

            position:
                absolute;

            top:
                17px;

            right:
                17px;

            width:
                23px;

            height:
                23px;

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            border-radius:
                50%;

            background:
                #7c5cff;

            font-size:
                12px;

        }


        .wizard-actions {

            margin-top:
                34px;

            display:
                flex;

            align-items:
                center;

            justify-content:
                space-between;

            gap:
                15px;

        }


        .wizard-primary,
        .wizard-secondary {

            min-height:
                46px;

            padding:
                0 20px;

            border-radius:
                12px;

            font-weight:
                750;

            cursor:
                pointer;

        }


        .wizard-primary {

            border:
                none;

            background:
                #7c5cff;

            color:
                white;

            box-shadow:
                0 8px 25px
                rgba(124,92,255,.22);

        }


        .wizard-primary span {

            margin-left:
                8px;

        }


        .wizard-secondary {

            border:
                1px solid
                rgba(255,255,255,.1);

            background:
                rgba(255,255,255,.04);

            color:
                white;

        }


        .wizard-primary:disabled {

            opacity:
                .35;

            cursor:
                not-allowed;

            box-shadow:
                none;

        }


        .text-button {

            margin-left:
                auto;

            border:
                none;

            background:
                none;

            color:
                #a797ff;

            cursor:
                pointer;

        }


        .selected-category-banner {

            display:
                flex;

            align-items:
                center;

            gap:
                14px;

            padding:
                15px 17px;

            border:
                1px solid
                rgba(255,255,255,.07);

            background:
                rgba(255,255,255,.025);

            border-radius:
                15px;

        }


        .selected-category-banner > span {

            font-size:
                25px;

        }


        .selected-category-banner div {

            display:
                flex;

            flex-direction:
                column;

            gap:
                3px;

        }


        .selected-category-banner small {

            color:
                #858d9e;

        }


        .idea-area {

            margin-top:
                25px;

        }


        .idea-area label {

            display:
                block;

            margin-bottom:
                10px;

            font-size:
                13px;

            font-weight:
                700;

        }


        .idea-area textarea {

            width:
                100%;

            min-height:
                190px;

            resize:
                vertical;

            padding:
                18px;

            border-radius:
                15px;

            border:
                1px solid
                rgba(255,255,255,.08);

            outline:
                none;

            background:
                #0d1017;

            color:
                white;

            font:
                inherit;

            line-height:
                1.6;

        }


        .idea-area textarea:focus {

            border-color:
                rgba(124,92,255,.65);

            box-shadow:
                0 0 0 3px
                rgba(124,92,255,.1);

        }


        .input-footer {

            display:
                flex;

            justify-content:
                space-between;

            margin-top:
                8px;

            color:
                #6f7788;

            font-size:
                11px;

        }


        .quick-ideas {

            display:
                flex;

            align-items:
                center;

            gap:
                9px;

            margin-top:
                16px;

            color:
                #858d9e;

            font-size:
                12px;

        }


        .quick-ideas button {

            border:
                1px solid
                rgba(255,255,255,.08);

            border-radius:
                999px;

            padding:
                7px 11px;

            background:
                rgba(255,255,255,.03);

            color:
                #d8dbe3;

            cursor:
                pointer;

        }


        .idea-preview {

            padding:
                20px;

            border-radius:
                16px;

            background:
                rgba(124,92,255,.07);

            border:
                1px solid
                rgba(124,92,255,.18);

        }


        .preview-label {

            color:
                #9a8cff;

            font-size:
                10px;

            font-weight:
                800;

            letter-spacing:
                .1em;

        }


        .idea-preview p {

            margin-top:
                8px;

            color:
                #e0e2e8;

            line-height:
                1.6;

        }


        .suggestions-heading {

            margin-top:
                30px;

            display:
                flex;

            justify-content:
                space-between;

            align-items:
                flex-end;

        }


        .suggestions-heading h2 {

            font-size:
                20px;

        }


        .suggestions-heading p {

            margin-top:
                4px;

            color:
                #81899a;

            font-size:
                12px;

        }


        .suggestions-ai {

            padding:
                7px 10px;

            border-radius:
                999px;

            background:
                rgba(124,92,255,.1);

            color:
                #a89bff;

            font-size:
                10px;

            font-weight:
                700;

        }


        .idea-suggestions {

            margin-top:
                15px;

            display:
                grid;

            gap:
                10px;

        }


        .idea-suggestion {

            display:
                flex;

            align-items:
                center;

            gap:
                14px;

            padding:
                15px;

            border:
                1px solid
                rgba(255,255,255,.07);

            border-radius:
                14px;

            background:
                rgba(255,255,255,.025);

            color:
                white;

            text-align:
                left;

            cursor:
                pointer;

            transition:
                .2s ease;

        }


        .idea-suggestion:hover,
        .idea-suggestion.selected {

            border-color:
                rgba(124,92,255,.5);

            background:
                rgba(124,92,255,.08);

        }


        .suggestion-number {

            width:
                30px;

            height:
                30px;

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            border-radius:
                9px;

            background:
                rgba(255,255,255,.06);

            color:
                #a89bff;

            font-weight:
                800;

            font-size:
                11px;

        }


        .suggestion-text {

            flex:
                1;

            line-height:
                1.45;

        }


        .suggestion-arrow {

            color:
                #747c8e;

        }


        .custom-direction {

            margin-top:
                18px;

            display:
                flex;

            align-items:
                center;

            gap:
                13px;

            padding:
                15px;

            border-radius:
                14px;

            background:
                rgba(255,255,255,.02);

            border:
                1px solid
                rgba(255,255,255,.06);

        }


        .custom-direction > span {

            font-size:
                22px;

        }


        .custom-direction div {

            flex:
                1;

        }


        .custom-direction p {

            margin-top:
                3px;

            color:
                #7e8697;

            font-size:
                11px;

        }


        .custom-direction button {

            padding:
                9px 12px;

            border-radius:
                10px;

            border:
                1px solid
                rgba(255,255,255,.08);

            background:
                rgba(255,255,255,.04);

            color:
                white;

            cursor:
                pointer;

        }


        .custom-direction button.selected {

            border-color:
                #7c5cff;

            color:
                #b3a6ff;

        }


        .character-section,
        .style-section {

            margin-top:
                25px;

        }


        .section-title-row {

            display:
                flex;

            align-items:
                center;

            justify-content:
                space-between;

        }


        .section-title-row h2 {

            font-size:
                19px;

        }


        .section-title-row p {

            margin-top:
                4px;

            color:
                #81899a;

            font-size:
                12px;

        }


        .virtual-badge {

            padding:
                7px 10px;

            border-radius:
                999px;

            background:
                rgba(53,212,154,.08);

            color:
                #4de0aa;

            font-size:
                10px;

            font-weight:
                700;

        }


        .character-grid {

            display:
                grid;

            grid-template-columns:
                repeat(4, 1fr);

            gap:
                12px;

            margin-top:
                15px;

        }


        .character-card {

            overflow:
                hidden;

            padding:
                0;

            text-align:
                left;

            border:
                1px solid
                rgba(255,255,255,.07);

            border-radius:
                15px;

            background:
                #10131a;

            color:
                white;

            cursor:
                pointer;

        }


        .character-card.selected {

            border-color:
                #7c5cff;

            box-shadow:
                0 0 0 2px
                rgba(124,92,255,.1);

        }


        .character-preview {

            height:
                145px;

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            background:
                radial-gradient(
                    circle,
                    rgba(124,92,255,.16),
                    transparent 65%
                );

            font-size:
                62px;

        }


        .character-info {

            padding:
                13px;

        }


        .character-info strong {

            font-size:
                13px;

        }


        .character-info p {

            margin-top:
                5px;

            color:
                #7e8697;

            font-size:
                10px;

            line-height:
                1.45;

        }


        .character-selected {

            padding:
                9px 13px;

            border-top:
                1px solid
                rgba(255,255,255,.06);

            color:
                #878fa0;

            font-size:
                10px;

        }


        .character-card.selected
        .character-selected {

            color:
                #a99cff;

        }


        .style-grid {

            margin-top:
                15px;

            display:
                grid;

            grid-template-columns:
                repeat(6, 1fr);

            gap:
                9px;

        }


        .style-card {

            min-height:
                125px;

            display:
                flex;

            flex-direction:
                column;

            align-items:
                center;

            justify-content:
                center;

            padding:
                12px;

            border:
                1px solid
                rgba(255,255,255,.07);

            border-radius:
                14px;

            background:
                rgba(255,255,255,.025);

            color:
                white;

            cursor:
                pointer;

            text-align:
                center;

        }


        .style-card.selected {

            border-color:
                #7c5cff;

            background:
                rgba(124,92,255,.09);

        }


        .style-icon {

            font-size:
                27px;

            margin-bottom:
                8px;

        }


        .style-card strong {

            font-size:
                11px;

        }


        .style-card small {

            margin-top:
                4px;

            color:
                #747c8d;

            font-size:
                9px;

            line-height:
                1.3;

        }


        .generation-panel {

            margin-top:
                28px;

            padding:
                17px;

            display:
                flex;

            align-items:
                center;

            justify-content:
                space-between;

            gap:
                15px;

            border:
                1px solid
                rgba(124,92,255,.18);

            border-radius:
                16px;

            background:
                rgba(124,92,255,.06);

        }


        .generation-panel > div {

            display:
                flex;

            align-items:
                center;

            gap:
                12px;

        }


        .generation-icon {

            width:
                38px;

            height:
                38px;

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            border-radius:
                11px;

            background:
                rgba(124,92,255,.15);

        }


        .generation-panel strong {

            font-size:
                13px;

        }


        .generation-panel p {

            margin-top:
                3px;

            color:
                #858d9e;

            font-size:
                10px;

        }


        .generate-character-btn {

            padding:
                11px 16px;

            border:
                none;

            border-radius:
                10px;

            background:
                #7c5cff;

            color:
                white;

            font-weight:
                700;

            cursor:
                pointer;

        }


        .generate-character-btn:disabled {

            opacity:
                .35;

            cursor:
                not-allowed;

        }


        .generated-section {

            margin-top:
                30px;

        }


        .generated-header {

            display:
                flex;

            align-items:
                flex-end;

            justify-content:
                space-between;

            gap:
                20px;

        }


        .generated-header h2 {

            margin-top:
                5px;

            font-size:
                21px;

        }


        .generated-header p {

            margin-top:
                5px;

            color:
                #81899a;

            font-size:
                11px;

        }


        .generated-grid {

            margin-top:
                15px;

            display:
                grid;

            grid-template-columns:
                repeat(3, 1fr);

            gap:
                13px;

        }


        .generated-option {

            overflow:
                hidden;

            padding:
                0;

            border:
                1px solid
                rgba(255,255,255,.07);

            border-radius:
                16px;

            background:
                #10131a;

            color:
                white;

            text-align:
                left;

            cursor:
                pointer;

        }


        .generated-option.selected {

            border-color:
                #7c5cff;

            box-shadow:
                0 0 0 2px
                rgba(124,92,255,.12);

        }


        .generated-image {

            height:
                220px;

            display:
                flex;

            flex-direction:
                column;

            align-items:
                center;

            justify-content:
                center;

            gap:
                8px;

            background:
                radial-gradient(
                    circle,
                    rgba(124,92,255,.16),
                    transparent 65%
                );

        }


        .generated-art {

            font-size:
                82px;

        }


        .generated-image span {

            color:
                #6f7788;

            font-size:
                10px;

        }


        .generated-footer {

            padding:
                14px;

            border-top:
                1px solid
                rgba(255,255,255,.06);

        }


        .generated-footer strong {

            display:
                block;

            font-size:
                12px;

        }


        .generated-footer small {

            display:
                block;

            margin-top:
                5px;

            color:
                #777f90;

            font-size:
                10px;

        }


        .generated-footer span {

            display:
                block;

            margin-top:
                10px;

            color:
                #a99cff;

            font-size:
                10px;

            font-weight:
                700;

        }


        @media (max-width: 850px) {

            .wizard-header {

                padding:
                    0 18px;

            }


            .wizard-progress {

                width:
                    calc(100% - 24px);

            }


            .wizard-main {

                width:
                    calc(100% - 24px);

            }


            .wizard-card {

                padding:
                    25px;

            }


            .category-grid {

                grid-template-columns:
                    1fr;

            }


            .character-grid {

                grid-template-columns:
                    repeat(2, 1fr);

            }


            .style-grid {

                grid-template-columns:
                    repeat(3, 1fr);

            }


            .generated-grid {

                grid-template-columns:
                    1fr;

            }


            .wizard-step span {

                display:
                    none;

            }

        }


        @media (max-width: 550px) {

            .wizard-progress-inner {

                gap:
                    3px;

            }


            .step-line {

                margin:
                    0 3px;

            }


            .wizard-card {

                padding:
                    20px;

            }


            .character-grid {

                grid-template-columns:
                    1fr;

            }


            .style-grid {

                grid-template-columns:
                    repeat(2, 1fr);

            }


            .generation-panel {

                align-items:
                    flex-start;

                flex-direction:
                    column;

            }


            .generate-character-btn {

                width:
                    100%;

            }

        }

    `;


    document.head.appendChild(
        style
    );

}