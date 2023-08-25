// Dentro de la función updateProgress, desestructurar las propiedades necesarias
function updateProgress({ highPriority, mediumPriority, lowPriority, highPriorityDone, mediumPriorityDone, lowPriorityDone }) {
    const progressHighElement = document.getElementById('progressHigh');
    const progressMediumElement = document.getElementById('progressMedium');
    const progressLowElement = document.getElementById('progressLow');

    progressHighElement.max = highPriority;
    progressMediumElement.max = mediumPriority;
    progressLowElement.max = lowPriority;

    progressHighElement.value = Math.min(highPriorityDone, highPriority);
    progressMediumElement.value = Math.min(mediumPriorityDone, mediumPriority);
    progressLowElement.value = Math.min(lowPriorityDone, lowPriority);

    const progressHighTextElement = document.getElementById('progressHighText');
    const progressMediumTextElement = document.getElementById('progressMediumText');
    const progressLowTextElement = document.getElementById('progressLowText');

    const progressHighText = `${highPriorityDone}/${highPriority}`;
    const progressMediumText = `${mediumPriorityDone}/${mediumPriority}`;
    const progressLowText = `${lowPriorityDone}/${lowPriority}`;

    progressHighTextElement.textContent = progressHighText;
    progressMediumTextElement.textContent = progressMediumText;
    progressLowTextElement.textContent = progressLowText;
}