const newVideoBtn = document.getElementById("newVideoBtn");
const createBtn = document.getElementById("createBtn");

function openCreateScreen() {
    document.body.innerHTML = `
        <header class="navbar">
            <div class="logo">VideoCreator</div>

            <button class="back-btn" id="backBtn">
                ← Back
            </button>
        </header>

        <main class="create-container">

            <section class="create-header">
                <h1>What do you want to create?</h1>

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
                        <small>Create cinematic stories and short films.</small>
                    </span>
                </button>

                <button class="video-type" data-type="short">
                    <span class="type-icon">📱</span>
                    <span>
                        <strong>Short-form Video</strong>
                        <small>Create videos for TikTok, Shorts and Reels.</small>
                    </span>
                </button>

                <button class="video-type" data-type="kids">
                    <span class="type-icon">🧸</span>
                    <span>
                        <strong>Kids / Animation</strong>
                        <small>Create children's stories, rhymes and animations.</small>
                    </span>
                </button>

                <button class="video-type" data-type="education">
                    <span class="type-icon">📚</span>
                    <span>
                        <strong>Educational</strong>
                        <small>Turn lessons and ideas into engaging videos.</small>
                    </span>
                </button>

                <button class="video-type" data-type="music">
                    <span class="type-icon">🎵</span>
                    <span>
                        <strong>Music / Lyrics</strong>
                        <small>Create lyric and music-focused videos.</small>
                    </span>
                </button>

                <button class="video-type" data-type="promo">
                    <span class="type-icon">📢</span>
                    <span>
                        <strong>Promo / Marketing</strong>
                        <small>Create promotional videos for products or brands.</small>
                    </span>
                </button>

                <button class="video-type" data-type="other">
                    <span class="type-icon">✨</span>
                    <span>
                        <strong>Something Else</strong>
                        <small>Start with your own idea.</small>
                    </span>
                </button>

            </section>

            <div class="continue-area">
                <button class="continue-btn" id="continueBtn" disabled>
                    Continue →
                </button>
            </div>

        </main>
    `;

    setupCreateScreen();
}

function setupCreateScreen() {

    const typeButtons = document.querySelectorAll(".video-type");
    const continueBtn = document.getElementById("continueBtn");
    const backBtn = document.getElementById("backBtn");

    let selectedType = null;

    typeButtons.forEach(button => {

        button.addEventListener("click", () => {

            typeButtons.forEach(item => {
                item.classList.remove("selected");
            });

            button.classList.add("selected");

            selectedType = button.dataset.type;

            continueBtn.disabled = false;
        });

    });

    continueBtn.addEventListener("click", () => {

        console.log("Selected video type:", selectedType);

        alert(
            `You selected: ${selectedType}\n\nThe next screen will let you describe your video.`
        );

    });

    backBtn.addEventListener("click", () => {
        location.reload();
    });
}

newVideoBtn.addEventListener("click", openCreateScreen);
createBtn.addEventListener("click", openCreateScreen);