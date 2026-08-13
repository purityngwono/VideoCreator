// ========================================
// GENERATION STATE ENGINE
// ========================================

const GENERATION_STAGES = [
    {
        id: "script",
        name: "Script",
        description: "Create and refine the video script."
    },

    {
        id: "storyboard",
        name: "Storyboard",
        description: "Turn the script into scenes."
    },

    {
        id: "characters",
        name: "Characters & Style",
        description: "Choose the characters and visual identity."
    },

    {
        id: "scene_images",
        name: "Scene Images",
        description: "Generate the visual for every scene."
    },

    {
        id: "animation",
        name: "Animation",
        description: "Turn approved scenes into moving video."
    },

    {
        id: "voice",
        name: "Voice & Narration",
        description: "Generate and review narration."
    },

    {
        id: "music",
        name: "Music & Sound",
        description: "Add music and sound effects."
    },

    {
        id: "final_video",
        name: "Final Video",
        description: "Assemble and export the finished video."
    }
];


// ========================================
// CREATE INITIAL PROJECT STATE
// ========================================

function createGenerationState(project) {

    const stages = {};

    GENERATION_STAGES.forEach((stage, index) => {

        stages[stage.id] = {

            id: stage.id,

            name: stage.name,

            description: stage.description,

            status: index === 0
                ? "ready"
                : "locked",

            approved: false,

            generated: false,

            progress: 0,

            results: []

        };

    });


    return {

        project: project,

        currentStage: "script",

        stages: stages,

        createdAt: new Date().toISOString(),

        updatedAt: new Date().toISOString()

    };
}


// ========================================
// GET STAGE
// ========================================

function getStage(state, stageId) {

    return state.stages[stageId];

}


// ========================================
// START GENERATION
// ========================================

function startStageGeneration(state, stageId) {

    const stage = getStage(
        state,
        stageId
    );


    if (!stage) {

        console.error(
            `Stage "${stageId}" does not exist.`
        );

        return state;

    }


    if (
        stage.status === "locked"
    ) {

        console.warn(
            `Stage "${stageId}" is locked.`
        );

        return state;

    }


    stage.status = "generating";

    stage.progress = 0;

    state.currentStage = stageId;

    state.updatedAt =
        new Date().toISOString();


    return state;

}


// ========================================
// UPDATE GENERATION PROGRESS
// ========================================

function updateStageProgress(
    state,
    stageId,
    progress
) {

    const stage = getStage(
        state,
        stageId
    );


    if (!stage) {
        return state;
    }


    stage.progress =
        Math.min(
            100,
            Math.max(0, progress)
        );


    return state;

}


// ========================================
// COMPLETE GENERATION
// ========================================

function completeStageGeneration(
    state,
    stageId,
    results = []
) {

    const stage = getStage(
        state,
        stageId
    );


    if (!stage) {
        return state;
    }


    stage.status = "review";

    stage.progress = 100;

    stage.generated = true;

    stage.results = results;

    state.updatedAt =
        new Date().toISOString();


    return state;

}


// ========================================
// APPROVE STAGE
// ========================================

function approveStage(
    state,
    stageId
) {

    const stage = getStage(
        state,
        stageId
    );


    if (!stage) {
        return state;
    }


    if (!stage.generated) {

        console.warn(
            `Cannot approve "${stageId}" before generation.`
        );

        return state;

    }


    stage.status = "approved";

    stage.approved = true;


    unlockNextStage(
        state,
        stageId
    );


    state.updatedAt =
        new Date().toISOString();


    return state;

}


// ========================================
// UNLOCK NEXT STAGE
// ========================================

function unlockNextStage(
    state,
    currentStageId
) {

    const currentIndex =
        GENERATION_STAGES.findIndex(
            stage => stage.id === currentStageId
        );


    if (
        currentIndex === -1 ||
        currentIndex === GENERATION_STAGES.length - 1
    ) {

        return state;

    }


    const nextStage =
        GENERATION_STAGES[
            currentIndex + 1
        ];


    const nextState =
        getStage(
            state,
            nextStage.id
        );


    if (
        nextState &&
        nextState.status === "locked"
    ) {

        nextState.status = "ready";

    }

}


// ========================================
// CHECK WHETHER A STAGE IS UNLOCKED
// ========================================

function isStageUnlocked(
    state,
    stageId
) {

    const stage =
        getStage(
            state,
            stageId
        );


    return stage &&
        stage.status !== "locked";

}


// ========================================
// GET NEXT STAGE
// ========================================

function getNextStage(
    state,
    stageId
) {

    const currentIndex =
        GENERATION_STAGES.findIndex(
            stage => stage.id === stageId
        );


    if (
        currentIndex === -1 ||
        currentIndex === GENERATION_STAGES.length - 1
    ) {

        return null;

    }


    return GENERATION_STAGES[
        currentIndex + 1
    ];

}


// ========================================
// CHECK WHETHER PROJECT IS COMPLETE
// ========================================

function isProjectComplete(state) {

    return GENERATION_STAGES.every(
        stage =>
            state.stages[stage.id].approved
    );

}


// ========================================
// GET OVERALL PROGRESS
// ========================================

function getOverallProgress(state) {

    const total =
        GENERATION_STAGES.length;


    const approved =
        GENERATION_STAGES.filter(
            stage =>
                state.stages[stage.id].approved
        ).length;


    return Math.round(
        (approved / total) * 100
    );

}


// ========================================
// DEBUG HELPER
// ========================================

function printGenerationState(state) {

    console.table(

        GENERATION_STAGES.map(stage => {

            const current =
                state.stages[stage.id];

            return {

                Stage: stage.name,

                Status:
                    current.status,

                Generated:
                    current.generated,

                Approved:
                    current.approved,

                Progress:
                    `${current.progress}%`

            };

        })

    );

}