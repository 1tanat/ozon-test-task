const progressValue = 100;
const size = 300
const strokeWidth = 20;
const color = 'lightblue';
const progressBar = new ProgressBar(progressValue, size, strokeWidth, color);

const inputElement = document.querySelector('.input');

inputElement.addEventListener('input', (event)  => {
    progressBar.setProgress(event.target.value);
});