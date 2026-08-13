// ========================================
// VIDEO CREATOR — STORY ENGINE
// ========================================
//
// Creates structured, story-aware scenes
// for the storyboard stage.
//
// This version is local/mock.
// No API or AI credits are required.
// ========================================


// ========================================
// CREATE A SINGLE SCENE
// ========================================

function createScene({
    number,
    title,
    storyBeat,
    description,
    duration,
    narration,
    visualPrompt,
    suggestions
}) {

    return {

        // Basic information
        number,
        title,

        // Story information
        storyBeat,
        description,

        // Timing
        duration,

        // Audio
        narration,

        // Visual generation information
        visualPrompt,

        // Creative suggestions shown to the user
        suggestions,

        // Future image-generation fields
        visualOptions: [],

        selectedVisual: null,

        // User approval
        approved: false,

        // Generation state
        status: "ready",

        progress: 0

    };

}


// ========================================
// STORY TEMPLATES
// ========================================

const STORY_TEMPLATES = {

    story: [

        {
            title: "The Beginning",
            beat: "Introduce the main character and world.",
            suggestions: [
                "🌅 Sunrise setting",
                "🎬 Cinematic opening",
                "👀 Character close-up",
                "✨ Magical atmosphere"
            ]
        },

        {
            title: "The Discovery",
            beat: "The character discovers something interesting.",
            suggestions: [
                "🔍 Add something mysterious",
                "🌳 Explore the environment",
                "😮 Show a surprised reaction",
                "✨ Add magical details"
            ]
        },

        {
            title: "The Adventure",
            beat: "The character begins an exciting adventure.",
            suggestions: [
                "🏃 Add movement",
                "🌈 Make the environment colourful",
                "🗺️ Add a new location",
                "🎥 Use a wide camera shot"
            ]
        },

        {
            title: "The Challenge",
            beat: "The character faces a small challenge.",
            suggestions: [
                "⚡ Add dramatic lighting",
                "😮 Show emotion",
                "🌧️ Change the weather",
                "🎬 Add a dramatic camera angle"
            ]
        },

        {
            title: "The Solution",
            beat: "The character finds a way to solve the problem.",
            suggestions: [
                "💡 Show the character thinking",
                "🤝 Add a friend helping",
                "✨ Add a creative solution",
                "😊 Make the moment uplifting"
            ]
        },

        {
            title: "The Ending",
            beat: "The story ends with a satisfying moment.",
            suggestions: [
                "🌅 Sunset ending",
                "😊 Happy ending",
                "🎉 Celebration",
                "🎬 Cinematic final shot"
            ]
        }

    ],


    kids: [

        {
            title: "Meet Our Friend",
            beat: "Introduce the main character in a fun and colourful environment.",
            suggestions: [
                "🐰 Character close-up",
                "🌸 Colourful garden",
                "☀️ Sunny morning",
                "✨ Magical atmosphere"
            ]
        },

        {
            title: "A New Friend",
            beat: "The main character meets another friendly character.",
            suggestions: [
                "🐿️ Add a squirrel friend",
                "🐻 Add a bear friend",
                "🐦 Add a bird",
                "👋 Friendly greeting"
            ]
        },

        {
            title: "Let's Explore",
            beat: "The characters explore their colourful world together.",
            suggestions: [
                "🌳 Explore a forest",
                "🌈 Add a rainbow",
                "🦋 Add butterflies",
                "🌼 Add colourful flowers"
            ]
        },

        {
            title: "Something Fun",
            beat: "The characters take part in a playful activity.",
            suggestions: [
                "⚽ Add a game",
                "🎈 Add balloons",
                "🎵 Add dancing",
                "🏃 Add playful movement"
            ]
        },

        {
            title: "Learning Moment",
            beat: "The characters discover or learn something together.",
            suggestions: [
                "🔢 Add numbers",
                "🔤 Add letters",
                "🎨 Add colours",
                "🌱 Add a nature lesson"
            ]
        },

        {
            title: "Happy Ending",
            beat: "Everyone finishes the adventure together in a cheerful moment.",
            suggestions: [
                "🎉 Celebration",
                "🌅 Sunset",
                "😊 Happy characters",
                "✨ Magical ending"
            ]
        }

    ],


    short: [

        {
            title: "The Hook",
            beat: "Open with an attention-grabbing moment.",
            suggestions: [
                "⚡ Start with action",
                "❓ Ask a question",
                "😱 Create surprise",
                "👀 Use a dramatic close-up"
            ]
        },

        {
            title: "The Setup",
            beat: "Quickly establish the situation.",
            suggestions: [
                "🎬 Establish the location",
                "👤 Introduce the subject",
                "📝 Add text overlay",
                "🎥 Use a wide shot"
            ]
        },

        {
            title: "The Main Moment",
            beat: "Deliver the main idea or action.",
            suggestions: [
                "🔥 Increase energy",
                "🎥 Add camera movement",
                "💥 Add visual emphasis",
                "✨ Highlight the key point"
            ]
        },

        {
            title: "The Twist",
            beat: "Add an unexpected or interesting development.",
            suggestions: [
                "😮 Add a surprise",
                "🔄 Change perspective",
                "⚡ Speed up the action",
                "❗ Add dramatic text"
            ]
        },

        {
            title: "The Payoff",
            beat: "Deliver the main payoff of the video.",
            suggestions: [
                "💡 Reveal the answer",
                "🎯 Highlight the takeaway",
                "🔥 Strong visual",
                "👏 Reaction shot"
            ]
        },

        {
            title: "The Ending",
            beat: "Finish with a memorable final moment.",
            suggestions: [
                "🎬 Cinematic ending",
                "💬 Add a call to action",
                "✨ Final reveal",
                "🔁 Create a loop"
            ]
        }

    ],


    education: [

        {
            title: "The Question",
            beat: "Introduce the question or topic being explained.",
            suggestions: [
                "❓ Big question on screen",
                "👀 Attention-grabbing visual",
                "📚 Classroom setting",
                "🎬 Cinematic introduction"
            ]
        },

        {
            title: "The Basics",
            beat: "Introduce the fundamental concept.",
            suggestions: [
                "📖 Add simple diagrams",
                "🧠 Highlight key terms",
                "✏️ Add handwritten notes",
                "💡 Use visual examples"
            ]
        },

        {
            title: "Example",
            beat: "Show a practical example of the concept.",
            suggestions: [
                "🔢 Add numbers",
                "📊 Add a chart",
                "🧪 Show an experiment",
                "🌍 Use a real-world example"
            ]
        },

        {
            title: "Going Deeper",
            beat: "Explain an important detail or deeper concept.",
            suggestions: [
                "🔬 Zoom into the concept",
                "🧠 Add a diagram",
                "📈 Show progression",
                "💡 Highlight the key idea"
            ]
        },

        {
            title: "The Takeaway",
            beat: "Summarize the most important lesson.",
            suggestions: [
                "✅ Show key points",
                "📝 Add summary text",
                "💡 Highlight the answer",
                "🎯 Focus on the main idea"
            ]
        },

        {
            title: "Final Recap",
            beat: "End with a concise recap of what was learned.",
            suggestions: [
                "📚 Quick recap",
                "✅ Three key points",
                "🧠 Memory trick",
                "🎯 Final takeaway"
            ]
        }

    ]

};


// ========================================
// DEFAULT TEMPLATE
// ========================================

const DEFAULT_TEMPLATE = STORY_TEMPLATES.story;


// ========================================
// GET TEMPLATE
// ========================================

function getStoryTemplate(type) {

    if (
        STORY_TEMPLATES[type] &&
        STORY_TEMPLATES[type].length > 0
    ) {

        return STORY_TEMPLATES[type];

    }

    return DEFAULT_TEMPLATE;

}


// ========================================
// CREATE VISUAL PROMPT
// ========================================

function createVisualPrompt(
    project,
    scene
) {

    return [

        project.visualStyle,

        "high quality video scene",

        scene.title,

        scene.beat,

        project.idea,

        "consistent characters",

        "cohesive visual style"

    ].join(", ");

}


// ========================================
// CREATE NARRATION
// ========================================

function createNarration(
    project,
    scene
) {

    return `${scene.beat} This scene is part of a video about ${project.idea}.`;

}


// ========================================
// GENERATE STORYBOARD
// ========================================

function generateStoryboard(project) {

    const scenes = [];


    // ------------------------------------
    // Calculate scene count
    // ------------------------------------

    const totalDuration =
        Number(project.duration) || 60;


    const template =
        getStoryTemplate(
            project.type
        );


    const sceneCount =
        Math.min(
            template.length,
            Math.max(
                3,
                Math.ceil(
                    totalDuration / 10
                )
            )
        );


    const sceneDuration =
        Math.max(
            5,
            Math.round(
                totalDuration / sceneCount
            )
        );


    // ------------------------------------
    // Generate scenes
    // ------------------------------------

    for (
        let i = 0;
        i < sceneCount;
        i++
    ) {

        const templateScene =
            template[i];


        const scene =
            createScene({

                number:
                    i + 1,

                title:
                    templateScene.title,

                storyBeat:
                    templateScene.beat,

                description:
                    `${templateScene.beat} The scene should naturally connect to the story: ${project.idea}.`,

                duration:
                    sceneDuration,

                narration:
                    createNarration(
                        project,
                        templateScene
                    ),

                visualPrompt:
                    createVisualPrompt(
                        project,
                        templateScene
                    ),

                suggestions:
                    [
                        ...templateScene.suggestions
                    ]

            });


        scenes.push(scene);

    }


    return scenes;

}


// ========================================
// ADD A SUGGESTION TO A SCENE
// ========================================

function applySceneSuggestion(
    scene,
    suggestion
) {

    if (!scene) {
        return scene;
    }


    if (!suggestion) {
        return scene;
    }


    // Remove emoji from the suggestion
    // when adding it to the prompt.

    const cleanSuggestion =
        suggestion
            .replace(
                /^[^\w]+/u,
                ""
            )
            .trim();


    scene.visualPrompt =
        `${scene.visualPrompt}, ${cleanSuggestion}`;


    scene.selectedVisual =
        null;


    scene.status =
        "ready";


    scene.approved =
        false;


    return scene;

}


// ========================================
// RESET SCENE VISUAL
// ========================================

function resetSceneVisual(scene) {

    if (!scene) {
        return scene;
    }


    scene.selectedVisual =
        null;


    scene.visualOptions =
        [];


    scene.approved =
        false;


    scene.status =
        "ready";


    scene.progress =
        0;


    return scene;

}


// ========================================
// GENERATE MOCK VISUAL OPTIONS
// ========================================
//
// These are placeholders for now.
//
// Later these objects will contain
// real AI-generated image URLs.
//

function generateMockVisualOptions(
    scene
) {

    if (!scene) {
        return [];
    }


    const options = [

        {
            id: `${scene.number}-A`,

            label: "Option A",

            prompt:
                scene.visualPrompt,

            image:
                null
        },


        {
            id: `${scene.number}-B`,

            label: "Option B",

            prompt:
                `${scene.visualPrompt}, cinematic camera angle`,

            image:
                null
        },


        {
            id: `${scene.number}-C`,

            label: "Option C",

            prompt:
                `${scene.visualPrompt}, colourful detailed environment`,

            image:
                null
        }

    ];


    scene.visualOptions =
        options;


    scene.status =
        "review";


    scene.progress =
        100;


    return options;

}


// ========================================
// SELECT VISUAL
// ========================================

function selectSceneVisual(
    scene,
    optionId
) {

    if (!scene) {
        return scene;
    }


    const option =
        scene.visualOptions.find(
            item =>
                item.id === optionId
        );


    if (!option) {
        return scene;
    }


    scene.selectedVisual =
        option;


    return scene;

}


// ========================================
// APPROVE SCENE
// ========================================

function approveScene(scene) {

    if (!scene) {
        return scene;
    }


    if (!scene.selectedVisual) {

        console.warn(
            "A visual must be selected before approving the scene."
        );

        return scene;

    }


    scene.approved =
        true;


    scene.status =
        "approved";


    return scene;

}