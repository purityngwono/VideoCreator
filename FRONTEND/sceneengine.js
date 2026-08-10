function createScene({
    number,
    title,
    description,
    duration,
    narration,
    visualPrompt
}) {
    return {
        number,
        title,
        description,
        duration,
        narration,
        visualPrompt
    };
}


function generateStoryboard(project) {

    const scenes = [];

    const totalDuration = Number(project.duration);

    const sceneCount = Math.max(
        3,
        Math.ceil(totalDuration / 10)
    );

    const sceneDuration = Math.round(
        totalDuration / sceneCount
    );

    for (let i = 1; i <= sceneCount; i++) {

        scenes.push(
            createScene({
                number: i,
                title: `Scene ${i}`,
                description:
                    `Scene ${i} of the video based on: ${project.idea}`,

                duration: sceneDuration,

                narration:
                    `This is the narration for scene ${i}.`,

                visualPrompt:
                    `${project.visualStyle} scene based on: ${project.idea}`
            })
        );
    }

    return scenes;
}