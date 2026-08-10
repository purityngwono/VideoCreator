const newVideoBtn = document.getElementById("newVideoBtn");
const createBtn = document.getElementById("createBtn");


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


                <button
                    class="video-type"
                    data-type="story"
                >

                    <span class="type-icon">
                        🎬
                    </span>

                    <span>

                        <strong>
                            Story / Short Film
                        </strong>

                        <small>
                            Create cinematic stories and short films.
                        </small>

                    </span>

                </button>


                <button
                    class="video-type"
                    data-type="short"
                >

                    <span class="type-icon">
                        📱
                    </span>

                    <span>

                        <strong>
                            Short-form Video
                        </strong>

                        <small>
                            Create videos for TikTok, Shorts and Reels.
                        </small>

                    </span>

                </button>


                <button
                    class="video-type"
                    data-type="kids"
                >

                    <span class="type-icon">
                        🧸
                    </span>

                    <span>

                        <strong>
                            Kids / Animation
                        </strong>

                        <small>
                            Create children's stories, rhymes and animations.
                        </small>

                    </span>

                </button>


                <button
                    class="video-type"
                    data-type="education"
                >

                    <span class="type-icon">
                        📚
                    </span>

                    <span>

                        <strong>
                            Educational
                        </strong>

                        <small>
                            Turn lessons and ideas into engaging videos.
                        </small>

                    </span>

                </button>


                <button
                    class="video-type"
                    data-type="music"
                >

                    <span class="type-icon">
                        🎵
                    </span>

                    <span>

                        <strong>
                            Music / Lyrics
                        </strong>

                        <small>
                            Create lyric and music-focused videos.
                        </small>

                    </span>

                </button>


                <button
                    class="video-type"
                    data-type="promo"
                >

                    <span class="type-icon">
                        📢
                    </span>

                    <span>

                        <strong>
                            Promo / Marketing
                        </strong>

                        <small>
                            Create promotional videos for products or brands.
                        </small>

                    </span>

                </button>


                <button
                    class="video-type"
                    data-type="other"
                >

                    <span class="type-icon">
                        ✨
                    </span>

                    <span>

                        <strong>
                            Something Else
                        </strong>

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

        openDescriptionScreen(selectedType);

    });


    backBtn.addEventListener("click", () => {

        location.reload();

    });

}


// ========================================
// DESCRIPTION SCREEN
// ========================================

function openDescriptionScreen(videoType) {

    document.body.innerHTML = `

        <header class="navbar">

            <div class="logo">
                VideoCreator
            </div>

            <button class="back-btn" id="backBtn">
                ← Back
            </button>

        </header>


        <main class="description-container">


            <section class="description-header">

                <span class="step-label">
                    Step 2 of 3
                </span>

                <h1>
                    Describe your video
                </h1>

                <p>
                    Tell VideoCreator what you want to make.
                    You can be as simple or detailed as you want.
                </p>

            </section>


            <section class="description-card">

                <label for="videoIdea">
                    Your video idea
                </label>


                <textarea
                    id="videoIdea"
                    placeholder="Example: A cute bunny learns to count from 1 to 10 while exploring a colourful garden..."
                ></textarea>


                <div class="character-count">

                    <span id="characterCount">
                        0
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
                    id="backToTypes"
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

    setupDescriptionScreen(videoType);
}


// ========================================
// DESCRIPTION SCREEN LOGIC
// ========================================

function setupDescriptionScreen(videoType) {

    const videoIdea =
        document.getElementById("videoIdea");

    const characterCount =
        document.getElementById("characterCount");

    const generatePlanBtn =
        document.getElementById("generatePlanBtn");

    const backBtn =
        document.getElementById("backBtn");

    const backToTypes =
        document.getElementById("backToTypes");


    videoIdea.addEventListener("input", () => {

        const length =
            videoIdea.value.length;


        characterCount.textContent =
            length;


        generatePlanBtn.disabled =
            videoIdea.value.trim().length === 0;

    });


    generatePlanBtn.addEventListener("click", () => {

        const projectData = {

            type: videoType,

            idea: videoIdea.value.trim(),

            duration:
                document.getElementById("duration").value,

            aspectRatio:
                document.getElementById("aspectRatio").value,

            visualStyle:
                document.getElementById("visualStyle").value

        };


        const scenes =
            generateStoryboard(projectData);


        console.log(
            "Project:",
            projectData
        );


        console.log(
            "Storyboard:",
            scenes
        );


        openStoryboardScreen(
            projectData,
            scenes
        );

    });


    backBtn.addEventListener("click", () => {

        location.reload();

    });


    backToTypes.addEventListener("click", () => {

        openCreateScreen();

    });

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
                    Step 3 of 3
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

                    <span>
                        Type
                    </span>

                    <strong>
                        ${project.type}
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
        .addEventListener("click", () => {

            location.reload();

        });


    document
        .getElementById("editProjectBtn")
        .addEventListener("click", () => {

            openDescriptionScreen(
                project.type
            );

        });


    document
        .getElementById("continueToGeneration")
        .addEventListener("click", () => {

            alert(
                "Generation engine coming next! 🎬"
            );

        });

}


// ========================================
// INITIAL BUTTONS
// ========================================

newVideoBtn.addEventListener(
    "click",
    openCreateScreen
);


createBtn.addEventListener(
    "click",
    openCreateScreen
);