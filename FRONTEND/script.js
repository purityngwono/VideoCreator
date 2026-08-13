const newVideoBtn = document.getElementById("newVideoBtn");
const createBtn = document.getElementById("createBtn");

let suggestionPage = 0;


// ========================================
// CREATE SCREEN
// ========================================

function openCreateScreen() {

    document.body.innerHTML = `

        <header class="navbar">

            <div class="logo">
                VideoCreator
            </div>

            <button class="back-btn" id="backBtn">
                ← Back
            </button>

        </header>


        <main class="create-container">

            <section class="create-header">

                <h1>
                    What do you want to create?
                </h1>

                <p>
                    Choose a starting point for your video.
                    You can customize everything later.
                </p>

            </section>


            <section class="video-types">

                <button class="video-type" data-type="story">

                    <span class="type-icon">🎬</span>

                    <span>
                        <strong>Story / Short Film</strong>

                        <small>
                            Create cinematic stories and short films.
                        </small>
                    </span>

                </button>


                <button class="video-type" data-type="short">

                    <span class="type-icon">📱</span>

                    <span>
                        <strong>Short-form Video</strong>

                        <small>
                            Create videos for TikTok, Shorts and Reels.
                        </small>
                    </span>

                </button>


                <button class="video-type" data-type="kids">

                    <span class="type-icon">🧸</span>

                    <span>
                        <strong>Kids / Animation</strong>

                        <small>
                            Create children's stories, rhymes and animations.
                        </small>
                    </span>

                </button>


                <button class="video-type" data-type="education">

                    <span class="type-icon">📚</span>

                    <span>
                        <strong>Educational</strong>

                        <small>
                            Turn lessons and ideas into engaging videos.
                        </small>
                    </span>

                </button>


                <button class="video-type" data-type="music">

                    <span class="type-icon">🎵</span>

                    <span>
                        <strong>Music / Lyrics</strong>

                        <small>
                            Create lyric and music-focused videos.
                        </small>
                    </span>

                </button>


                <button class="video-type" data-type="promo">

                    <span class="type-icon">📢</span>

                    <span>
                        <strong>Promo / Marketing</strong>

                        <small>
                            Create promotional videos for products or brands.
                        </small>
                    </span>

                </button>


                <button class="video-type" data-type="other">

                    <span class="type-icon">✨</span>

                    <span>
                        <strong>Something Else</strong>

                        <small>
                            Start with your own idea.
                        </small>
                    </span>

                </button>

            </section>


            <div class="continue-area">

                <button
                    class="continue-btn"
                    id="continueBtn"
                    disabled
                >
                    Continue →
                </button>

            </div>

        </main>
    `;

    setupCreateScreen();
}


// ========================================
// CREATE SCREEN LOGIC
// ========================================

function setupCreateScreen() {

    const typeButtons =
        document.querySelectorAll(".video-type");

    const continueBtn =
        document.getElementById("continueBtn");

    const backBtn =
        document.getElementById("backBtn");

    let selectedType = null;


    typeButtons.forEach(button => {

        button.addEventListener("click", () => {

            typeButtons.forEach(item => {

                item.classList.remove("selected");

            });


            button.classList.add("selected");


            selectedType =
                button.dataset.type;


            continueBtn.disabled = false;

        });

    });


    continueBtn.addEventListener("click", () => {

        suggestionPage = 0;

        openSuggestionsScreen(
            selectedType
        );

    });


    backBtn.addEventListener("click", () => {

        location.reload();

    });

}


// ========================================
// SUGGESTIONS SCREEN
// ========================================

function openSuggestionsScreen(videoType) {

    const allSuggestions =
        generateSuggestions(videoType);


    const start =
        suggestionPage * 4;


    let suggestions =
        allSuggestions.slice(
            start,
            start + 4
        );


    if (suggestions.length === 0) {

        suggestionPage = 0;

        suggestions =
            allSuggestions.slice(0, 4);

    }


    document.body.innerHTML = `

        <header class="navbar">

            <div class="logo">
                VideoCreator
            </div>

            <button class="back-btn" id="backBtn">
                ← Back
            </button>

        </header>


        <main class="suggestions-container">

            <section class="suggestions-header">

                <span class="step-label">
                    Step 2 of 4
                </span>

                <h1>
                    Let's create something amazing ✨
                </h1>

                <p>
                    Here are some ideas to get you started.
                    Choose one or create your own.
                </p>

            </section>


            <section class="suggestions-grid">

                ${suggestions.map((suggestion, index) => `

                    <button
                        class="suggestion-card"
                        data-suggestion-index="${start + index}"
                    >

                        <div class="suggestion-icon">
                            ${suggestion.icon}
                        </div>

                        <div class="suggestion-content">

                            <h3>
                                ${suggestion.title}
                            </h3>

                            <p>
                                ${suggestion.description}
                            </p>

                        </div>

                        <span class="suggestion-arrow">
                            →
                        </span>

                    </button>

                `).join("")}

            </section>


            <section class="suggestions-actions">

                <button
                    class="secondary-action-btn"
                    id="generateMoreBtn"
                >
                    ✨ Generate More
                </button>


                <button
                    class="outline-action-btn"
                    id="ownIdeaBtn"
                >
                    ✏️ I have my own idea
                </button>

            </section>

        </main>
    `;


    setupSuggestionsScreen(
        videoType,
        allSuggestions
    );

}


// ========================================
// SUGGESTIONS DATA
// ========================================

function generateSuggestions(videoType) {

    const suggestions = {

        story: [

            {
                icon: "🌲",
                title: "The Forest That Came Alive",
                description:
                    "A young explorer discovers that the animals and trees in a mysterious forest can talk."
            },

            {
                icon: "🚀",
                title: "The Last Little Astronaut",
                description:
                    "A child accidentally launches into space and discovers a strange planet nobody has ever seen."
            },

            {
                icon: "🕰️",
                title: "The Clock That Stopped Time",
                description:
                    "A mysterious old clock gives a teenager the ability to freeze time for ten seconds."
            },

            {
                icon: "🐉",
                title: "The Dragon Next Door",
                description:
                    "A normal family discovers that their quiet new neighbour is secretly a friendly dragon."
            },

            {
                icon: "🏚️",
                title: "The House at the End of the Road",
                description:
                    "A teenager discovers that an abandoned house appears in a different location every night."
            },

            {
                icon: "🌊",
                title: "The City Beneath the Sea",
                description:
                    "A young diver discovers an ancient underwater city that seems to still be alive."
            },

            {
                icon: "🪞",
                title: "The Mirror World",
                description:
                    "A mysterious mirror transports a girl into a world where everything is the opposite of reality."
            },

            {
                icon: "🗝️",
                title: "The Key With No Door",
                description:
                    "A strange key appears in a boy's pocket and leads him on a journey to discover what it unlocks."
            }

        ],


        short: [

            {
                icon: "😱",
                title: "You Won't Believe What Happens Next",
                description:
                    "A fast-paced short built around a surprising twist that keeps viewers watching."
            },

            {
                icon: "🧠",
                title: "One Fact That Changes Everything",
                description:
                    "Reveal a fascinating fact through a quick visual story designed for short-form audiences."
            },

            {
                icon: "😂",
                title: "When Your Brain Has Had Enough",
                description:
                    "A relatable comedy sketch about the ridiculous things people do when they are exhausted."
            },

            {
                icon: "👀",
                title: "The Mystery Nobody Could Explain",
                description:
                    "A strange event happens on camera and viewers are challenged to figure out what really happened."
            },

            {
                icon: "⏰",
                title: "You Have 10 Seconds",
                description:
                    "A character receives a mysterious countdown and must figure out what it means before time runs out."
            },

            {
                icon: "📸",
                title: "The Photo That Changed Overnight",
                description:
                    "Someone notices that a photograph in their room keeps changing every time they look at it."
            },

            {
                icon: "💰",
                title: "What Would You Do?",
                description:
                    "Present viewers with a difficult decision and reveal the unexpected consequences of each choice."
            },

            {
                icon: "🕵️",
                title: "The Internet Mystery",
                description:
                    "A strange online discovery leads to a mystery that viewers can try to solve themselves."
            }

        ],


        kids: [

            {
                icon: "🐰",
                title: "Bunny's Magical Garden",
                description:
                    "A cute little bunny discovers a magical garden where every flower has a different surprise."
            },

            {
                icon: "🦊",
                title: "The Fox Who Couldn't Sleep",
                description:
                    "A young fox travels through the forest looking for the perfect place to finally fall asleep."
            },

            {
                icon: "🐻",
                title: "Bear's First Day at School",
                description:
                    "A nervous little bear discovers that school can be full of friendship, games and adventure."
            },

            {
                icon: "🐢",
                title: "The Tortoise Who Wanted to Fly",
                description:
                    "A determined little tortoise finds a creative way to experience the sky."
            },

            {
                icon: "🐧",
                title: "Penguin's Big Adventure",
                description:
                    "A curious little penguin leaves home for the first time and discovers a world full of surprises."
            },

            {
                icon: "🦁",
                title: "Leo Learns to Share",
                description:
                    "A young lion learns that sharing his favourite things can lead to unexpected friendships."
            },

            {
                icon: "🐸",
                title: "The Frog Who Found a Star",
                description:
                    "A little frog discovers a glowing star in the pond and sets out to return it to the sky."
            },

            {
                icon: "🐘",
                title: "Ellie's Tiny Problem",
                description:
                    "A young elephant discovers that being different can actually become her greatest strength."
            }

        ],


        education: [

            {
                icon: "🔬",
                title: "Science in Everyday Life",
                description:
                    "Explain fascinating science concepts using simple examples from things children see every day."
            },

            {
                icon: "🌍",
                title: "A Journey Around the World",
                description:
                    "Take viewers on a colourful tour of different countries, cultures and landmarks."
            },

            {
                icon: "🧮",
                title: "Math Made Simple",
                description:
                    "Turn a difficult mathematical concept into an easy and entertaining visual lesson."
            },

            {
                icon: "🧠",
                title: "How Your Brain Works",
                description:
                    "Explain the basics of the human brain using simple animations and memorable examples."
            },

            {
                icon: "🌌",
                title: "Why Is the Sky Blue?",
                description:
                    "Explain the science behind the colour of the sky using simple visuals and an easy-to-understand story."
            },

            {
                icon: "⚡",
                title: "Where Does Electricity Come From?",
                description:
                    "Follow electricity from where it is generated to how it reaches the devices we use every day."
            },

            {
                icon: "🧬",
                title: "The Amazing Human Cell",
                description:
                    "Take viewers inside the microscopic world of cells and explain how they keep our bodies alive."
            },

            {
                icon: "🌱",
                title: "How Plants Make Food",
                description:
                    "Show how plants use sunlight, water and carbon dioxide to create the energy they need to grow."
            }

        ],


        music: [

            {
                icon: "🎤",
                title: "Dream Big",
                description:
                    "An uplifting music video about chasing your dreams despite the obstacles."
            },

            {
                icon: "🌙",
                title: "Midnight Thoughts",
                description:
                    "A moody visual story built around late-night thoughts, memories and emotions."
            },

            {
                icon: "❤️",
                title: "First Love",
                description:
                    "A cinematic music video following the excitement and uncertainty of falling in love."
            },

            {
                icon: "🔥",
                title: "Never Give Up",
                description:
                    "An energetic motivational visualizer about overcoming setbacks and pushing forward."
            },

            {
                icon: "🌃",
                title: "City Lights",
                description:
                    "A cinematic night-time music video following someone wandering through a glowing city."
            },

            {
                icon: "☁️",
                title: "Lost in a Dream",
                description:
                    "A surreal visual journey through memories, dreams and emotions."
            },

            {
                icon: "🌅",
                title: "New Beginning",
                description:
                    "A hopeful music video about leaving the past behind and starting over."
            },

            {
                icon: "⚡",
                title: "Electric Energy",
                description:
                    "A fast-paced visual experience filled with movement, lights and energetic transitions."
            }

        ],


        promo: [

            {
                icon: "🚀",
                title: "Product Launch",
                description:
                    "Create an exciting launch video that introduces a product and highlights why people need it."
            },

            {
                icon: "✨",
                title: "Before & After",
                description:
                    "Show the transformation created by a product or service in a visually satisfying way."
            },

            {
                icon: "📱",
                title: "Social Media Ad",
                description:
                    "Create a short attention-grabbing advertisement designed for TikTok, Reels and Shorts."
            },

            {
                icon: "💡",
                title: "Problem → Solution",
                description:
                    "Start with a common problem and show how your product provides the perfect solution."
            },

            {
                icon: "🎯",
                title: "Why Choose Us?",
                description:
                    "Create a persuasive video explaining what makes a brand different from its competitors."
            },

            {
                icon: "⭐",
                title: "Customer Success Story",
                description:
                    "Tell the story of how a customer used a product or service to achieve a meaningful result."
            },

            {
                icon: "🔥",
                title: "Limited-Time Offer",
                description:
                    "Create an energetic promotional video designed to make viewers act before an offer expires."
            },

            {
                icon: "💎",
                title: "Premium Brand Story",
                description:
                    "Build a polished cinematic video that communicates the identity and values of a premium brand."
            }

        ],


        other: [

            {
                icon: "🌟",
                title: "A Story Nobody Has Seen Before",
                description:
                    "Start with a completely original concept and let VideoCreator help turn it into a story."
            },

            {
                icon: "🎭",
                title: "Something Unexpected",
                description:
                    "Combine unusual characters, places and ideas into a story with an unpredictable ending."
            },

            {
                icon: "🌌",
                title: "Enter Another World",
                description:
                    "Create a visual adventure in a world completely different from our own."
            },

            {
                icon: "💭",
                title: "Bring Your Imagination to Life",
                description:
                    "Start with a simple thought and transform it into a complete visual concept."
            },

            {
                icon: "🌀",
                title: "What If Everything Changed?",
                description:
                    "Imagine a world where one ordinary rule suddenly stopped working."
            },

            {
                icon: "🎲",
                title: "The Random Adventure",
                description:
                    "Let unexpected characters, locations and events collide to create a completely unpredictable story."
            },

            {
                icon: "🌠",
                title: "A Message From Tomorrow",
                description:
                    "Someone receives a mysterious message from their future self and must decide whether to follow it."
            },

            {
                icon: "🚪",
                title: "The Door That Shouldn't Exist",
                description:
                    "A strange door appears in an ordinary place and leads somewhere nobody expected."
            }

        ]

    };


    return (
        suggestions[videoType] ||
        suggestions.other
    );

}


// ========================================
// SUGGESTIONS LOGIC
// ========================================

function setupSuggestionsScreen(
    videoType,
    allSuggestions
) {

    const cards =
        document.querySelectorAll(
            ".suggestion-card"
        );

    const generateMoreBtn =
        document.getElementById(
            "generateMoreBtn"
        );

    const ownIdeaBtn =
        document.getElementById(
            "ownIdeaBtn"
        );

    const backBtn =
        document.getElementById(
            "backBtn"
        );


    cards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const index =
                    Number(
                        card.dataset
                            .suggestionIndex
                    );


                const selected =
                    allSuggestions[index];


                openDescriptionScreen(
                    videoType,
                    selected
                );

            }
        );

    });


    generateMoreBtn.addEventListener(
        "click",
        () => {

            suggestionPage++;

            openSuggestionsScreen(
                videoType
            );

        }
    );


    ownIdeaBtn.addEventListener(
        "click",
        () => {

            openDescriptionScreen(
                videoType
            );

        }
    );


    backBtn.addEventListener(
        "click",
        () => {

            openCreateScreen();

        }
    );

}


// ========================================
// DESCRIPTION SCREEN
// ========================================

function openDescriptionScreen(
    videoType,
    selectedSuggestion = null
) {

    document.body.innerHTML = `

        <header class="navbar">

            <div class="logo">
                VideoCreator
            </div>

            <button
                class="back-btn"
                id="backBtn"
            >
                ← Back
            </button>

        </header>


        <main class="description-container">


            <section class="description-header">

                <span class="step-label">
                    Step 3 of 4
                </span>

                <h1>
                    Describe your video
                </h1>

                <p>
                    Tell VideoCreator what you want to make.
                    You can be as simple or detailed as you want.
                </p>

            </section>


            ${
                selectedSuggestion
                    ? `

                        <section class="selected-suggestion">

                            <span>
                                ✨ Selected idea
                            </span>

                            <h3>
                                ${selectedSuggestion.title}
                            </h3>

                            <p>
                                ${selectedSuggestion.description}
                            </p>

                        </section>

                    `
                    : ""
            }


            <section class="description-card">

                <label for="videoIdea">
                    Your video idea
                </label>

                <textarea
                    id="videoIdea"
                    placeholder="Example: A mysterious traveller discovers a hidden city beneath the ocean..."
                >${
                    selectedSuggestion
                        ? selectedSuggestion.description
                        : ""
                }</textarea>


                <div class="character-count">

                    <span id="characterCount">
                        ${
                            selectedSuggestion
                                ? selectedSuggestion.description.length
                                : 0
                        }
                    </span>

                    characters

                </div>

            </section>


            <section class="settings-grid">


                <div class="setting">

                    <label for="duration">
                        Duration
                    </label>

                    <select id="duration">

                        <option value="30">
                            30 seconds
                        </option>

                        <option value="60">
                            60 seconds
                        </option>

                        <option value="90">
                            90 seconds
                        </option>

                        <option value="120">
                            2 minutes
                        </option>

                        <option value="300">
                            5 minutes
                        </option>

                    </select>

                </div>


                <div class="setting">

                    <label for="aspectRatio">
                        Aspect ratio
                    </label>

                    <select id="aspectRatio">

                        <option value="9:16">
                            9:16 — Vertical
                        </option>

                        <option value="16:9">
                            16:9 — Landscape
                        </option>

                        <option value="1:1">
                            1:1 — Square
                        </option>

                    </select>

                </div>


                <div class="setting">

                    <label for="visualStyle">
                        Visual style
                    </label>

                    <select id="visualStyle">

                        <option value="cinematic">
                            Cinematic
                        </option>

                        <option value="animated">
                            Animated
                        </option>

                        <option value="cartoon">
                            Cartoon
                        </option>

                        <option value="realistic">
                            Realistic
                        </option>

                        <option value="anime">
                            Anime
                        </option>

                        <option value="minimal">
                            Minimal
                        </option>

                    </select>

                </div>

            </section>


            <div class="description-actions">

                <button
                    class="back-secondary-btn"
                    id="backToSuggestions"
                >
                    ← Previous
                </button>


                <button
                    class="continue-btn"
                    id="generatePlanBtn"
                    disabled
                >
                    Continue →
                </button>

            </div>


        </main>
    `;


    setupDescriptionScreen(
        videoType,
        selectedSuggestion
    );

}


// ========================================
// DESCRIPTION LOGIC
// ========================================

function setupDescriptionScreen(
    videoType,
    selectedSuggestion = null
) {

    const videoIdea =
        document.getElementById(
            "videoIdea"
        );

    const characterCount =
        document.getElementById(
            "characterCount"
        );

    const generatePlanBtn =
        document.getElementById(
            "generatePlanBtn"
        );

    const backBtn =
        document.getElementById(
            "backBtn"
        );

    const backToSuggestions =
        document.getElementById(
            "backToSuggestions"
        );


    function updateCharacterCount() {

        characterCount.textContent =
            videoIdea.value.length;


        generatePlanBtn.disabled =
            videoIdea.value.trim().length === 0;

    }


    videoIdea.addEventListener(
        "input",
        updateCharacterCount
    );


    updateCharacterCount();


    generatePlanBtn.addEventListener(
        "click",
        () => {

            const projectData = {

                type:
                    videoType,

                idea:
                    videoIdea.value.trim(),

                duration:
                    document.getElementById(
                        "duration"
                    ).value,

                aspectRatio:
                    document.getElementById(
                        "aspectRatio"
                    ).value,

                visualStyle:
                    document.getElementById(
                        "visualStyle"
                    ).value

            };


            const scenes =
                generateStoryboard(
                    projectData
                );


            openStoryboardScreen(
                projectData,
                scenes
            );

        }
    );


    backBtn.addEventListener(
        "click",
        () => {

            openSuggestionsScreen(
                videoType
            );

        }
    );


    backToSuggestions.addEventListener(
        "click",
        () => {

            openSuggestionsScreen(
                videoType
            );

        }
    );

}


// ========================================
// STORYBOARD SCREEN
// ========================================

function openStoryboardScreen(
    project,
    scenes
) {

    document.body.innerHTML = `

        <header class="navbar">

            <div class="logo">
                VideoCreator
            </div>


            <button
                class="back-btn"
                id="backBtn"
            >
                ← Back
            </button>

        </header>


        <main class="storyboard-container">


            <section class="storyboard-header">

                <span class="step-label">
                    Step 4 of 4
                </span>


                <h1>
                    Your Storyboard
                </h1>


                <p>
                    Here's the structure VideoCreator created
                    for your video.
                </p>

            </section>


            <section class="project-summary">

                <div>
                    <span>Type</span>
                    <strong>${project.type}</strong>
                </div>


                <div>
                    <span>Duration</span>
                    <strong>${project.duration}s</strong>
                </div>


                <div>
                    <span>Format</span>
                    <strong>${project.aspectRatio}</strong>
                </div>


                <div>
                    <span>Style</span>
                    <strong>${project.visualStyle}</strong>
                </div>

            </section>


            <section class="scenes">

                ${scenes.map(scene => `

                    <article class="scene-card">

                        <div class="scene-number">
                            ${scene.number}
                        </div>


                        <div class="scene-content">

                            <h3>
                                ${scene.title}
                            </h3>


                            <p>
                                ${scene.description}
                            </p>


                            <div class="scene-details">

                                <div>

                                    <span>
                                        Duration
                                    </span>

                                    <strong>
                                        ${scene.duration}s
                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        Narration
                                    </span>

                                    <strong>
                                        ${scene.narration}
                                    </strong>

                                </div>

                            </div>


                            <div class="visual-prompt">

                                <span>
                                    Visual prompt
                                </span>

                                <p>
                                    ${scene.visualPrompt}
                                </p>

                            </div>

                        </div>

                    </article>

                `).join("")}

            </section>


            <div class="storyboard-actions">

                <button
                    class="back-secondary-btn"
                    id="editProjectBtn"
                >
                    ← Edit
                </button>


                <button
                    class="continue-btn"
                    id="continueToGeneration"
                >
                    Continue to Generation →
                </button>

            </div>


        </main>
    `;


    document
        .getElementById("backBtn")
        .addEventListener(
            "click",
            () => {

                openDescriptionScreen(
                    project.type
                );

            }
        );


    document
        .getElementById("editProjectBtn")
        .addEventListener(
            "click",
            () => {

                openDescriptionScreen(
                    project.type
                );

            }
        );


    document
        .getElementById("continueToGeneration")
        .addEventListener(
            "click",
            () => {

                openGenerationScreen(
                    project,
                    scenes
                );

            }
        );

}


// ========================================
// GENERATION SCREEN
// ========================================

function openGenerationScreen(
    project,
    scenes
) {

    document.body.innerHTML = `

        <header class="navbar">

            <div class="logo">
                VideoCreator
            </div>

        </header>


        <main class="generation-container">


            <section class="generation-header">

                <span class="step-label">
                    Creating your video
                </span>


                <h1>
                    Bringing your idea to life ✨
                </h1>


                <p>
                    VideoCreator is preparing your
                    actual video.
                </p>

            </section>


            <section class="generation-progress-card">


                <div class="generation-progress-top">

                    <div>

                        <span>
                            Overall progress
                        </span>

                        <strong id="overallPercent">
                            0%
                        </strong>

                    </div>

                </div>


                <div class="progress-track">

                    <div
                        class="progress-fill"
                        id="overallProgress"
                        style="width:0%"
                    ></div>

                </div>


                <p id="generationStatus">
                    Preparing your project...
                </p>

            </section>


            <section class="generation-tasks">


                <div
                    class="generation-task"
                    id="taskScenes"
                >

                    <div class="task-icon">
                        🎬
                    </div>

                    <div class="task-info">

                        <strong>
                            Preparing scenes
                        </strong>

                        <span>
                            Organising your storyboard
                        </span>

                    </div>

                    <div
                        class="task-status"
                        id="statusScenes"
                    >
                        Waiting
                    </div>

                </div>


                <div
                    class="generation-task"
                    id="taskVisuals"
                >

                    <div class="task-icon">
                        🖼️
                    </div>

                    <div class="task-info">

                        <strong>
                            Creating visuals
                        </strong>

                        <span>
                            Preparing visual scenes
                        </span>

                    </div>

                    <div
                        class="task-status"
                        id="statusVisuals"
                    >
                        Waiting
                    </div>

                </div>


                <div
                    class="generation-task"
                    id="taskVoice"
                >

                    <div class="task-icon">
                        🎙️
                    </div>

                    <div class="task-info">

                        <strong>
                            Creating voiceover
                        </strong>

                        <span>
                            Preparing narration
                        </span>

                    </div>

                    <div
                        class="task-status"
                        id="statusVoice"
                    >
                        Waiting
                    </div>

                </div>


                <div
                    class="generation-task"
                    id="taskMusic"
                >

                    <div class="task-icon">
                        🎵
                    </div>

                    <div class="task-info">

                        <strong>
                            Creating music
                        </strong>

                        <span>
                            Preparing background music
                        </span>

                    </div>

                    <div
                        class="task-status"
                        id="statusMusic"
                    >
                        Waiting
                    </div>

                </div>


                <div
                    class="generation-task"
                    id="taskCaptions"
                >

                    <div class="task-icon">
                        💬
                    </div>

                    <div class="task-info">

                        <strong>
                            Creating captions
                        </strong>

                        <span>
                            Preparing subtitles
                        </span>

                    </div>

                    <div
                        class="task-status"
                        id="statusCaptions"
                    >
                        Waiting
                    </div>

                </div>


            </section>


            <section class="generation-scenes">

                <h2>
                    Scene progress
                </h2>


                <div id="sceneProgressList">

                    ${scenes.map(scene => `

                        <div
                            class="scene-progress-item"
                            data-scene="${scene.number}"
                        >

                            <div class="scene-progress-number">
                                ${scene.number}
                            </div>

                            <div class="scene-progress-info">

                                <strong>
                                    ${scene.title}
                                </strong>

                                <span>
                                    Waiting to generate
                                </span>

                            </div>

                            <div class="scene-progress-status">
                                Waiting
                            </div>

                        </div>

                    `).join("")}

                </div>

            </section>


            <div
                class="generation-complete"
                id="generationComplete"
                style="display:none"
            >

                <div class="complete-icon">
                    ✓
                </div>

                <h2>
                    Your video is ready! 🎉
                </h2>

                <p>
                    The video has been rendered in your browser.
                </p>

                <button
                    class="continue-btn"
                    id="previewVideoBtn"
                >
                    Preview Video →
                </button>

            </div>


        </main>
    `;


    startRealGeneration(
        project,
        scenes
    );

}


// ========================================
// REAL VIDEO GENERATION
// ========================================

async function startRealGeneration(
    project,
    scenes
) {

    const overallProgress =
        document.getElementById(
            "overallProgress"
        );

    const overallPercent =
        document.getElementById(
            "overallPercent"
        );

    const generationStatus =
        document.getElementById(
            "generationStatus"
        );


    try {

        // --------------------------------
        // PREPARE SCENES
        // --------------------------------

        setTaskActive("Scenes");


        for (
            let i = 0;
            i < scenes.length;
            i++
        ) {

            const scene =
                scenes[i];


            const sceneElement =
                document.querySelector(
                    `[data-scene="${scene.number}"]`
                );


            if (sceneElement) {

                const status =
                    sceneElement.querySelector(
                        ".scene-progress-status"
                    );

                const info =
                    sceneElement.querySelector(
                        ".scene-progress-info span"
                    );


                if (status) {
                    status.textContent =
                        "Generating...";
                }


                if (info) {
                    info.textContent =
                        "Preparing scene...";
                }


                sceneElement.classList.add(
                    "active"
                );

            }


            const progress =
                5 +
                Math.round(
                    ((i + 1) / scenes.length) * 25
                );


            updateProgress(
                progress,
                `Preparing scene ${i + 1} of ${scenes.length}...`
            );


            await wait(500);


            if (sceneElement) {

                const status =
                    sceneElement.querySelector(
                        ".scene-progress-status"
                    );

                const info =
                    sceneElement.querySelector(
                        ".scene-progress-info span"
                    );


                if (status) {
                    status.textContent =
                        "Complete";
                }


                if (info) {
                    info.textContent =
                        "Scene ready";
                }


                sceneElement.classList.remove(
                    "active"
                );

                sceneElement.classList.add(
                    "complete"
                );

            }

        }


        setTaskComplete("Scenes");


        // --------------------------------
        // VISUALS
        // --------------------------------

        setTaskActive("Visuals");


        updateProgress(
            40,
            "Preparing visual assets..."
        );


        await wait(1000);


        setTaskComplete("Visuals");


        // --------------------------------
        // VOICE
        // --------------------------------

        setTaskActive("Voice");


        updateProgress(
            55,
            "Preparing narration..."
        );


        await wait(1000);


        setTaskComplete("Voice");


        // --------------------------------
        // MUSIC
        // --------------------------------

        setTaskActive("Music");


        updateProgress(
            70,
            "Preparing background music..."
        );


        await wait(1000);


        setTaskComplete("Music");


        // --------------------------------
        // CAPTIONS
        // --------------------------------

        setTaskActive("Captions");


        updateProgress(
            82,
            "Preparing captions..."
        );


        await wait(1000);


        setTaskComplete("Captions");


        // --------------------------------
        // ACTUAL VIDEO
        // --------------------------------

        updateProgress(
            90,
            "Rendering your video..."
        );


        const videoUrl =
            await renderBrowserVideo(
                project,
                scenes,
                progress => {

                    updateProgress(
                        90 +
                        Math.round(
                            progress * 0.1
                        ),
                        `Rendering video... ${Math.round(progress)}%`
                    );

                }
            );


        updateProgress(
            100,
            "Everything is ready!"
        );


        window.generatedVideoUrl =
            videoUrl;


        const complete =
            document.getElementById(
                "generationComplete"
            );


        if (complete) {

            complete.style.display =
                "block";

        }


        const previewButton =
            document.getElementById(
                "previewVideoBtn"
            );


        if (previewButton) {

            previewButton.addEventListener(
                "click",
                () => {

                    openPreviewScreen(
                        project,
                        scenes,
                        videoUrl
                    );

                }
            );

        }

    }
    catch (error) {

        console.error(
            "Video generation error:",
            error
        );


        generationStatus.textContent =
            "Something went wrong while rendering the video.";

        alert(
            "Video generation failed. Open the browser console to see the error."
        );

    }

}


// ========================================
// PROGRESS
// ========================================

function updateProgress(
    progress,
    message
) {

    const bar =
        document.getElementById(
            "overallProgress"
        );

    const percent =
        document.getElementById(
            "overallPercent"
        );

    const status =
        document.getElementById(
            "generationStatus"
        );


    if (bar) {

        bar.style.width =
            progress + "%";

    }


    if (percent) {

        percent.textContent =
            progress + "%";

    }


    if (status) {

        status.textContent =
            message;

    }

}


// ========================================
// TASK STATUS
// ========================================

function setTaskActive(
    name
) {

    const task =
        document.getElementById(
            "task" + name
        );

    const status =
        document.getElementById(
            "status" + name
        );


    if (task) {

        task.classList.add(
            "active"
        );

    }


    if (status) {

        status.textContent =
            "Generating...";

    }

}


function setTaskComplete(
    name
) {

    const task =
        document.getElementById(
            "task" + name
        );

    const status =
        document.getElementById(
            "status" + name
        );


    if (task) {

        task.classList.remove(
            "active"
        );

        task.classList.add(
            "complete"
        );

    }


    if (status) {

        status.textContent =
            "Complete";

    }

}


// ========================================
// BROWSER VIDEO RENDERER
// ========================================

async function renderBrowserVideo(
    project,
    scenes,
    onProgress
) {

    return new Promise(
        async (resolve, reject) => {

            try {

                const canvas =
                    document.createElement(
                        "canvas"
                    );


                // --------------------------------
                // VIDEO SIZE
                // --------------------------------

                if (
                    project.aspectRatio ===
                    "9:16"
                ) {

                    canvas.width = 720;
                    canvas.height = 1280;

                }
                else if (
                    project.aspectRatio ===
                    "1:1"
                ) {

                    canvas.width = 720;
                    canvas.height = 720;

                }
                else {

                    canvas.width = 1280;
                    canvas.height = 720;

                }


                const ctx =
                    canvas.getContext(
                        "2d"
                    );


                const stream =
                    canvas.captureStream(
                        30
                    );


                const mimeType =
                    getSupportedVideoMimeType();


                const recorder =
                    mimeType
                        ? new MediaRecorder(
                            stream,
                            {
                                mimeType
                            }
                        )
                        : new MediaRecorder(
                            stream
                        );


                const chunks = [];


                recorder.ondataavailable =
                    event => {

                        if (
                            event.data &&
                            event.data.size > 0
                        ) {

                            chunks.push(
                                event.data
                            );

                        }

                    };


                recorder.onerror =
                    event => {

                        reject(
                            event.error ||
                            new Error(
                                "Video recording failed."
                            )
                        );

                    };


                recorder.onstop =
                    () => {

                        const blob =
                            new Blob(
                                chunks,
                                {
                                    type:
                                        recorder.mimeType ||
                                        "video/webm"
                                }
                            );


                        const url =
                            URL.createObjectURL(
                                blob
                            );


                        resolve(
                            url
                        );

                    };


                recorder.start();


                // --------------------------------
                // RENDER SCENES
                // --------------------------------

                for (
                    let i = 0;
                    i < scenes.length;
                    i++
                ) {

                    const scene =
                        scenes[i];


                    await renderScene(
                        ctx,
                        canvas,
                        project,
                        scene
                    );


                    const progress =
                        (
                            (i + 1) /
                            scenes.length
                        ) * 100;


                    if (
                        typeof onProgress ===
                        "function"
                    ) {

                        onProgress(
                            progress
                        );

                    }

                }


                recorder.stop();

            }
            catch (error) {

                reject(
                    error
                );

            }

        }
    );

}


// ========================================
// RENDER ONE SCENE
// ========================================

async function renderScene(
    ctx,
    canvas,
    project,
    scene
) {

    const duration =
        Math.max(
            2,
            Number(
                scene.duration
            ) || 5
        );


    const fps = 30;


    const totalFrames =
        duration *
        fps;


    for (
        let frame = 0;
        frame < totalFrames;
        frame++
    ) {

        const progress =
            frame /
            totalFrames;


        drawSceneFrame(
            ctx,
            canvas,
            project,
            scene,
            progress
        );


        await wait(
            1000 / fps
        );

    }

}


// ========================================
// DRAW SCENE
// ========================================

function drawSceneFrame(
    ctx,
    canvas,
    project,
    scene,
    progress
) {

    const width =
        canvas.width;

    const height =
        canvas.height;


    // --------------------------------
    // BACKGROUND
    // --------------------------------

    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            width,
            height
        );


    gradient.addColorStop(
        0,
        "#111111"
    );


    gradient.addColorStop(
        1,
        "#252525"
    );


    ctx.fillStyle =
        gradient;


    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    // --------------------------------
    // TOP BRAND
    // --------------------------------

    ctx.fillStyle =
        "#ffffff";


    ctx.font =
        "bold 28px Arial";


    ctx.fillText(
        "VideoCreator",
        50,
        60
    );


    // --------------------------------
    // SCENE NUMBER
    // --------------------------------

    ctx.fillStyle =
        "#aaaaaa";


    ctx.font =
        "20px Arial";


    ctx.fillText(
        `Scene ${scene.number}`,
        50,
        95
    );


    // --------------------------------
    // TITLE
    // --------------------------------

    ctx.fillStyle =
        "#ffffff";


    ctx.font =
        "bold 48px Arial";


    drawWrappedText(
        ctx,
        scene.title ||
            "Untitled Scene",
        50,
        190,
        width - 100,
        60
    );


    // --------------------------------
    // DESCRIPTION
    // --------------------------------

    ctx.fillStyle =
        "#dddddd";


    ctx.font =
        "25px Arial";


    drawWrappedText(
        ctx,
        scene.description ||
            "",
        50,
        340,
        width - 100,
        40
    );


    // --------------------------------
    // VISUAL PROMPT
    // --------------------------------

    ctx.fillStyle =
        "#888888";


    ctx.font =
        "18px Arial";


    drawWrappedText(
        ctx,
        scene.visualPrompt ||
            "",
        50,
        height - 180,
        width - 100,
        30
    );


    // --------------------------------
    // NARRATION
    // --------------------------------

    ctx.fillStyle =
        "#ffffff";


    ctx.font =
        "italic 20px Arial";


    drawWrappedText(
        ctx,
        scene.narration ||
            "",
        50,
        height - 100,
        width - 100,
        30
    );


    // --------------------------------
    // PROGRESS BAR
    // --------------------------------

    const barWidth =
        width - 100;


    ctx.fillStyle =
        "#333333";


    ctx.fillRect(
        50,
        height - 40,
        barWidth,
        6
    );


    ctx.fillStyle =
        "#ffffff";


    ctx.fillRect(
        50,
        height - 40,
        barWidth * progress,
        6
    );

}


// ========================================
// TEXT WRAPPING
// ========================================

function drawWrappedText(
    ctx,
    text,
    x,
    y,
    maxWidth,
    lineHeight
) {

    if (!text) {
        return;
    }


    const words =
        String(text).split(" ");


    let line =
        "";


    for (
        let i = 0;
        i < words.length;
        i++
    ) {

        const testLine =
            line +
            words[i] +
            " ";


        const metrics =
            ctx.measureText(
                testLine
            );


        if (
            metrics.width >
                maxWidth &&
            i > 0
        ) {

            ctx.fillText(
                line,
                x,
                y
            );


            line =
                words[i] +
                " ";


            y +=
                lineHeight;

        }
        else {

            line =
                testLine;

        }

    }


    ctx.fillText(
        line,
        x,
        y
    );

}


// ========================================
// VIDEO MIME TYPE
// ========================================

function getSupportedVideoMimeType() {

    const types = [

        "video/webm;codecs=vp9",

        "video/webm;codecs=vp8",

        "video/webm"

    ];


    for (
        const type of types
    ) {

        if (
            MediaRecorder.isTypeSupported(
                type
            )
        ) {

            return type;

        }

    }


    return "";

}


// ========================================
// WAIT
// ========================================

function wait(
    milliseconds
) {

    return new Promise(
        resolve => {

            setTimeout(
                resolve,
                milliseconds
            );

        }
    );

}


// ========================================
// PREVIEW SCREEN
// ========================================

function openPreviewScreen(
    project,
    scenes,
    videoUrl = null
) {

    document.body.innerHTML = `

        <header class="navbar">

            <div class="logo">
                VideoCreator
            </div>

            <button
                class="back-btn"
                id="backBtn"
            >
                ← Back
            </button>

        </header>


        <main class="preview-container">


            <section class="preview-header">

                <span class="step-label">
                    Video Ready
                </span>

                <h1>
                    Your video is ready 🎉
                </h1>

                <p>
                    Here's your generated video.
                </p>

            </section>


            <section class="video-preview-card">


                ${
                    videoUrl
                        ?

                    `

                        <video
                            id="realVideo"
                            controls
                            playsinline
                            style="
                                width:100%;
                                max-width:1000px;
                                display:block;
                                margin:auto;
                                border-radius:16px;
                                background:#000;
                            "
                        >

                            <source
                                src="${videoUrl}"
                                type="video/webm"
                            >

                            Your browser does not
                            support video playback.

                        </video>

                    `

                        :

                    `

                        <div class="fake-video-player">

                            <div class="play-button">
                                ▶
                            </div>

                            <div class="video-player-label">
                                Video unavailable
                            </div>

                        </div>

                    `
                }


                <div class="preview-controls">


                    ${
                        videoUrl
                            ?

                        `

                            <a
                                href="${videoUrl}"
                                download="videocreator-video.webm"
                                class="continue-btn"
                                style="
                                    text-decoration:none;
                                    display:inline-block;
                                "
                            >
                                ⬇ Download Video
                            </a>

                        `

                            :
                            ""
                    }


                    <button
                        id="editVideoBtn"
                    >
                        ✏️ Edit Video
                    </button>

                </div>


            </section>


            <section class="preview-summary">


                <div>

                    <span>
                        Scenes
                    </span>

                    <strong>
                        ${scenes.length}
                    </strong>

                </div>


                <div>

                    <span>
                        Duration
                    </span>

                    <strong>
                        ${project.duration}s
                    </strong>

                </div>


                <div>

                    <span>
                        Format
                    </span>

                    <strong>
                        ${project.aspectRatio}
                    </strong>

                </div>


                <div>

                    <span>
                        Style
                    </span>

                    <strong>
                        ${project.visualStyle}
                    </strong>

                </div>


            </section>


            <div class="preview-actions">

                <button
                    class="back-secondary-btn"
                    id="newProjectBtn"
                >
                    + New Project
                </button>

            </div>


        </main>
    `;


    document
        .getElementById("backBtn")
        .addEventListener(
            "click",
            () => {

                openGenerationScreen(
                    project,
                    scenes
                );

            }
        );


    document
        .getElementById("editVideoBtn")
        .addEventListener(
            "click",
            () => {

                openStoryboardScreen(
                    project,
                    scenes
                );

            }
        );


    document
        .getElementById("newProjectBtn")
        .addEventListener(
            "click",
            () => {

                openCreateScreen();

            }
        );

}


// ========================================
// INITIAL BUTTONS
// ========================================

if (newVideoBtn) {

    newVideoBtn.addEventListener(
        "click",
        openCreateScreen
    );

}


if (createBtn) {

    createBtn.addEventListener(
        "click",
        openCreateScreen
    );

}