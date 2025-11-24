const progressValue = 100;
const size = 300
const strokeWidth = 20;
const color = 'lightblue';

const svgElement = document.querySelector('svg');
const circleElement = document.querySelector('circle');

const progressBar = new ProgressBar(svgElement, circleElement, progressValue, size, strokeWidth, color);

const inputElement = document.querySelector('.input');

inputElement.addEventListener('input', (event)  => {
    progressBar.setProgress(event.target.value);
});

progressBar.setStrokeWidth(100);