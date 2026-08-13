// ========================================
// VIDEO CREATOR - VIDEO ENGINE
// ========================================
//
// Creates a browser-playable WebM video
// from the generated storyboard.
//
// This version:
// - Supports 16:9, 9:16 and 1:1
// - Draws the first frame before recording
// - Uses requestAnimationFrame()
// - Records actual canvas frames
// - Produces a Blob URL for preview/download
//
// ========================================


// ========================================
// MAIN VIDEO ENGINE
// ========================================

async function createVideo(
    project,
    scenes,
    onProgress
) {

    console.log(
        "Starting video creation..."
    );


    if (
        !project ||
        !scenes ||
        scenes.length === 0
    ) {

        throw new Error(
            "Invalid project or storyboard."
        );

    }


    // ====================================
    // STEP 1 — PREPARE PROJECT
    // ====================================

    updateEngineProgress(
        onProgress,
        5,
        "Preparing your project..."
    );


    await wait(500);


    const videoData = {

        project:
            project,

        scenes:
            [],

        createdAt:
            new Date().toISOString()

    };


    // ====================================
    // STEP 2 — PREPARE SCENES
    // ====================================

    for (
        let i = 0;
        i < scenes.length;
        i++
    ) {

        const scene =
            scenes[i];


        console.log(
            "Preparing scene:",
            scene.number
        );


        const sceneData = {

            number:
                scene.number,

            title:
                scene.title,

            description:
                scene.description,

            narration:
                scene.narration,

            visualPrompt:
                scene.visualPrompt,

            duration:
                Number(
                    scene.duration
                ) || 5

        };


        videoData.scenes.push(
            sceneData
        );


        const progress =
            10 +
            Math.round(
                (
                    (i + 1) /
                    scenes.length
                ) * 30
            );


        updateEngineProgress(
            onProgress,
            progress,
            `Preparing scene ${i + 1} of ${scenes.length}...`
        );


        await wait(400);

    }


    // ====================================
    // STEP 3 — PREPARE VISUALS
    // ====================================

    updateEngineProgress(
        onProgress,
        45,
        "Preparing visual assets..."
    );


    await wait(800);


    for (
        const scene of
        videoData.scenes
    ) {

        scene.visual = {

            prompt:
                scene.visualPrompt,

            style:
                project.visualStyle,

            aspectRatio:
                project.aspectRatio,

            status:
                "ready"

        };

    }


    // ====================================
    // STEP 4 — PREPARE VOICEOVER
    // ====================================

    updateEngineProgress(
        onProgress,
        60,
        "Preparing narration..."
    );


    await wait(800);


    for (
        const scene of
        videoData.scenes
    ) {

        scene.voiceover = {

            text:
                scene.narration,

            status:
                "ready"

        };

    }


    // ====================================
    // STEP 5 — PREPARE MUSIC
    // ====================================

    updateEngineProgress(
        onProgress,
        72,
        "Preparing background music..."
    );


    await wait(700);


    videoData.music = {

        status:
            "ready",

        type:
            "background"

    };


    // ====================================
    // STEP 6 — PREPARE CAPTIONS
    // ====================================

    updateEngineProgress(
        onProgress,
        82,
        "Preparing captions..."
    );


    await wait(700);


    videoData.captions = {

        enabled:
            true,

        status:
            "ready"

    };


    // ====================================
    // STEP 7 — CREATE VIDEO
    // ====================================

    updateEngineProgress(
        onProgress,
        90,
        "Rendering video..."
    );


    const videoUrl =
        await renderBrowserPreview(
            videoData,
            onProgress
        );


    // ====================================
    // STEP 8 — COMPLETE
    // ====================================

    updateEngineProgress(
        onProgress,
        100,
        "Your video is ready!"
    );


    videoData.videoUrl =
        videoUrl;


    console.log(
        "Video creation complete:",
        videoData
    );


    return videoData;

}


// ========================================
// PROGRESS HELPER
// ========================================

function updateEngineProgress(
    callback,
    progress,
    message
) {

    if (
        typeof callback ===
        "function"
    ) {

        callback(
            progress,
            message
        );

    }

}


// ========================================
// BROWSER VIDEO RENDERER
// ========================================
//
// FIXED VERSION
//
// The important difference is that the
// canvas gets its first frame BEFORE the
// MediaRecorder starts recording.
//
// ========================================

async function renderBrowserPreview(
    videoData,
    onProgress
) {

    return new Promise(
        async (
            resolve,
            reject
        ) => {

            try {

                console.log(
                    "Starting browser video renderer..."
                );


                // ====================================
                // CREATE CANVAS
                // ====================================

                const canvas =
                    document.createElement(
                        "canvas"
                    );


                // ====================================
                // ASPECT RATIO
                // ====================================

                if (
                    videoData.project.aspectRatio ===
                    "9:16"
                ) {

                    canvas.width =
                        720;

                    canvas.height =
                        1280;

                }
                else if (
                    videoData.project.aspectRatio ===
                    "1:1"
                ) {

                    canvas.width =
                        1080;

                    canvas.height =
                        1080;

                }
                else {

                    canvas.width =
                        1280;

                    canvas.height =
                        720;

                }


                const ctx =
                    canvas.getContext(
                        "2d"
                    );


                if (!ctx) {

                    throw new Error(
                        "Could not create canvas context."
                    );

                }


                console.log(
                    "Canvas:",
                    canvas.width,
                    "x",
                    canvas.height
                );


                // ====================================
                // CHECK MEDIARECORDER
                // ====================================

                if (
                    typeof MediaRecorder ===
                    "undefined"
                ) {

                    throw new Error(
                        "MediaRecorder is not supported by this browser."
                    );

                }


                // ====================================
                // GET MIME TYPE
                // ====================================

                const mimeType =
                    getSupportedMimeType();


                if (!mimeType) {

                    throw new Error(
                        "This browser does not support WebM video recording."
                    );

                }


                console.log(
                    "MIME type:",
                    mimeType
                );


                // ====================================
                // DRAW FIRST FRAME
                // ====================================
                //
                // IMPORTANT FOR MOBILE BROWSERS
                //
                // We draw something BEFORE the
                // MediaRecorder starts.
                // ====================================

                if (
                    videoData.scenes.length >
                    0
                ) {

                    drawSceneFrame(
                        ctx,
                        canvas,
                        videoData,
                        videoData.scenes[0],
                        0
                    );

                }


                // Give the browser time to
                // actually paint the canvas.

                await new Promise(
                    resolveFrame => {

                        requestAnimationFrame(
                            () => {

                                resolveFrame();

                            }
                        );

                    }
                );


                // ====================================
                // CREATE STREAM
                // ====================================

                if (
                    typeof canvas.captureStream !==
                    "function"
                ) {

                    throw new Error(
                        "Canvas video recording is not supported by this browser."
                    );

                }


                const stream =
                    canvas.captureStream(
                        30
                    );


                // ====================================
                // CREATE RECORDER
                // ====================================

                const recorder =
                    new MediaRecorder(
                        stream,
                        {
                            mimeType:
                                mimeType
                        }
                    );


                const chunks = [];


                // ====================================
                // DATA AVAILABLE
                // ====================================

                recorder.ondataavailable =
                    event => {

                        console.log(
                            "Recorder data:",
                            event.data.size
                        );


                        if (
                            event.data &&
                            event.data.size >
                            0
                        ) {

                            chunks.push(
                                event.data
                            );

                        }

                    };


                // ====================================
                // ERROR
                // ====================================

                recorder.onerror =
                    event => {

                        console.error(
                            "Recorder error:",
                            event
                        );


                        reject(
                            event.error ||
                            new Error(
                                "Video recording failed."
                            )
                        );

                    };


                // ====================================
                // STOP
                // ====================================

                recorder.onstop =
                    () => {

                        console.log(
                            "Recorder stopped."
                        );


                        if (
                            chunks.length ===
                            0
                        ) {

                            reject(
                                new Error(
                                    "The recorder produced no video data."
                                )
                            );

                            return;

                        }


                        const blob =
                            new Blob(
                                chunks,
                                {
                                    type:
                                        mimeType
                                }
                            );


                        console.log(
                            "Video size:",
                            blob.size,
                            "bytes"
                        );


                        if (
                            blob.size ===
                            0
                        ) {

                            reject(
                                new Error(
                                    "The generated video is empty."
                                )
                            );

                            return;

                        }


                        const url =
                            URL.createObjectURL(
                                blob
                            );


                        console.log(
                            "Video URL:",
                            url
                        );


                        resolve(
                            url
                        );

                    };


                // ====================================
                // START RECORDING
                // ====================================

                recorder.start(
                    1000
                );


                console.log(
                    "MediaRecorder started."
                );


                // ====================================
                // RENDER EVERY SCENE
                // ====================================

                for (
                    let i = 0;
                    i <
                    videoData.scenes.length;
                    i++
                ) {

                    const scene =
                        videoData.scenes[i];


                    console.log(
                        "Rendering scene:",
                        scene.number
                    );


                    await renderScene(
                        ctx,
                        canvas,
                        videoData,
                        scene
                    );


                    const progress =
                        90 +
                        Math.round(
                            (
                                (i + 1) /
                                videoData.scenes.length
                            ) * 9
                        );


                    updateEngineProgress(
                        onProgress,
                        progress,
                        `Rendering scene ${i + 1} of ${videoData.scenes.length}...`
                    );

                }


                // ====================================
                // HOLD FINAL FRAME
                // ====================================

                await wait(
                    500
                );


                // ====================================
                // STOP RECORDING
                // ====================================

                console.log(
                    "Stopping recorder..."
                );


                recorder.stop();

            }
            catch (error) {

                console.error(
                    "Browser renderer error:",
                    error
                );


                reject(
                    error
                );

            }

        }
    );

}


// ========================================
// MIME TYPE
// ========================================

function getSupportedMimeType() {

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
// SCENE RENDERER
// ========================================

async function renderScene(
    ctx,
    canvas,
    videoData,
    scene
) {

    const duration =
        Math.max(
            2,
            Number(
                scene.duration
            ) || 5
        );


    const frameRate =
        30;


    const totalFrames =
        Math.max(
            1,
            Math.floor(
                duration *
                frameRate
            )
        );


    console.log(
        "Rendering scene",
        scene.number,
        "for",
        duration,
        "seconds"
    );


    // ====================================
    // RENDER FRAMES
    // ====================================

    for (
        let frame = 0;
        frame < totalFrames;
        frame++
    ) {

        const progress =
            frame /
            (
                totalFrames -
                1 ||
                1
            );


        drawSceneFrame(
            ctx,
            canvas,
            videoData,
            scene,
            progress
        );


        // ====================================
        // FORCE CANVAS PAINT
        // ====================================

        await new Promise(
            resolve => {

                requestAnimationFrame(
                    () => {

                        resolve();

                    }
                );

            }
        );


        // ====================================
        // FRAME TIMING
        // ====================================

        await wait(
            1000 /
            frameRate
        );

    }


    // ====================================
    // FINAL FRAME
    // ====================================

    drawSceneFrame(
        ctx,
        canvas,
        videoData,
        scene,
        1
    );


    await new Promise(
        resolve => {

            requestAnimationFrame(
                () => {

                    resolve();

                }
            );

        }
    );


    await wait(
        100
    );

}


// ========================================
// DRAW VIDEO FRAME
// ========================================

function drawSceneFrame(
    ctx,
    canvas,
    videoData,
    scene,
    progress
) {

    const width =
        canvas.width;


    const height =
        canvas.height;


    // ====================================
    // BACKGROUND
    // ====================================

    ctx.fillStyle =
        "#101014";


    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    // ====================================
    // BRAND
    // ====================================

    ctx.fillStyle =
        "#ffffff";


    ctx.font =
        "bold 32px Arial";


    ctx.fillText(
        "VideoCreator",
        60,
        70
    );


    // ====================================
    // SCENE NUMBER
    // ====================================

    ctx.font =
        "24px Arial";


    ctx.fillStyle =
        "#aaaaaa";


    ctx.fillText(
        `Scene ${scene.number}`,
        60,
        115
    );


    // ====================================
    // MAIN TITLE
    // ====================================

    ctx.fillStyle =
        "#ffffff";


    ctx.font =
        "bold 58px Arial";


    const title =
        scene.title ||
        "Untitled Scene";


    wrapText(
        ctx,
        title,
        60,
        220,
        width - 120,
        70
    );


    // ====================================
    // DESCRIPTION
    // ====================================

    ctx.font =
        "30px Arial";


    ctx.fillStyle =
        "#dddddd";


    wrapText(
        ctx,
        scene.description ||
        "",
        60,
        370,
        width - 120,
        44
    );


    // ====================================
    // VISUAL PROMPT
    // ====================================

    ctx.font =
        "20px Arial";


    ctx.fillStyle =
        "#888888";


    wrapText(
        ctx,
        scene.visualPrompt ||
        "",
        60,
        560,
        width - 120,
        32
    );


    // ====================================
    // PROGRESS BAR
    // ====================================

    const barWidth =
        width - 120;


    const barHeight =
        8;


    ctx.fillStyle =
        "#333333";


    ctx.fillRect(
        60,
        height - 60,
        barWidth,
        barHeight
    );


    ctx.fillStyle =
        "#ffffff";


    ctx.fillRect(
        60,
        height - 60,
        barWidth *
        progress,
        barHeight
    );

}


// ========================================
// TEXT WRAPPER
// ========================================

function wrapText(
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
        String(text).split(
            " "
        );


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
// WAIT
// ========================================

function wait(
    milliseconds
) {

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                milliseconds
            )
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
                        ? `

                        <video
                            id="generatedVideo"
                            controls
                            playsinline
                            preload="metadata"
                            style="
                                width:100%;
                                max-width:900px;
                                border-radius:16px;
                                display:block;
                                background:#000;
                            "
                        >

                            <source
                                src="${videoUrl}"
                                type="video/webm"
                            >

                            Your browser does not support
                            video playback.

                        </video>

                        `
                        : `

                        <div class="fake-video-player">

                            <div class="play-button">
                                ▶
                            </div>

                            <div class="video-player-label">
                                VideoCreator Preview
                            </div>

                        </div>

                        `
                }


                <div class="preview-controls">

                    ${
                        videoUrl
                            ? `

                            <button
                                id="playPreviewBtn"
                            >
                                ▶ Play Preview
                            </button>

                            `
                            : ""
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

                ${
                    videoUrl
                        ? `

                        <a
                            href="${videoUrl}"
                            download="videocreator-preview.webm"
                            class="continue-btn"
                        >
                            ⬇ Download Video
                        </a>

                        `
                        : ""
                }


                <button
                    class="back-secondary-btn"
                    id="newProjectBtn"
                >
                    + New Project
                </button>

            </div>

        </main>

    `;


    // ====================================
    // BACK
    // ====================================

    const backBtn =
        document.getElementById(
            "backBtn"
        );


    if (backBtn) {

        backBtn.addEventListener(
            "click",
            () => {

                openGenerationScreen(
                    project,
                    scenes
                );

            }
        );

    }


    // ====================================
    // PLAY
    // ====================================

    const playPreviewBtn =
        document.getElementById(
            "playPreviewBtn"
        );


    if (playPreviewBtn) {

        playPreviewBtn.addEventListener(
            "click",
            async () => {

                const video =
                    document.getElementById(
                        "generatedVideo"
                    );


                if (!video) {

                    return;

                }


                try {

                    if (
                        video.paused
                    ) {

                        await video.play();


                        playPreviewBtn.textContent =
                            "⏸ Pause Preview";

                    }
                    else {

                        video.pause();


                        playPreviewBtn.textContent =
                            "▶ Play Preview";

                    }

                }
                catch (error) {

                    console.error(
                        "Video playback error:",
                        error
                    );

                    alert(
                        "The video could not be played."
                    );

                }

            }
        );

    }


    // ====================================
    // EDIT
    // ====================================

    const editVideoBtn =
        document.getElementById(
            "editVideoBtn"
        );


    if (editVideoBtn) {

        editVideoBtn.addEventListener(
            "click",
            () => {

                openStoryboardScreen(
                    project,
                    scenes
                );

            }
        );

    }


    // ====================================
    // NEW PROJECT
    // ====================================

    const newProjectBtn =
        document.getElementById(
            "newProjectBtn"
        );


    if (newProjectBtn) {

        newProjectBtn.addEventListener(
            "click",
            () => {

                openCreateScreen();

            }
        );

    }

}