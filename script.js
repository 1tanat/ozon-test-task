// задаём параметры
const progressValue = 100;
const size = 300
const strokeWidth = 20;
const color = 'lightblue';

// берём элементы из DOM
const progressBarWrapper = document.querySelector('.progress-wrapper');

// создаём прогресс бар
const progressBarInterface = new ProgressBarInterface(progressBarWrapper, progressValue, size, strokeWidth, color);
