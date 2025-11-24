class ProgressBarInterface {
    constructor(progressBarWrapper, progressValue = 100, size = 200, strokeWidth = 5, color = 'black') {
        this.progressBarWrapper = progressBarWrapper;
        this.svgElement = progressBarWrapper.querySelector('svg');
        this.circleElement = progressBarWrapper.querySelector('circle');
        this.inputElement = progressBarWrapper.querySelector('.input');
        this.checkboxAnimate = progressBarWrapper.querySelector('.checkbox-animate');
        this.checkboxHidden = progressBarWrapper.querySelector('.checkbox-hidden');

        this.progressBar = new ProgressBar(this.svgElement, this.circleElement, progressValue, size, strokeWidth, color);

        this.updateState();

        if (this.checkboxAnimate) {
            this.checkboxAnimate.addEventListener('change', () => {
                this.updateState();
            });
        }

        if (this.checkboxHidden) {
            this.checkboxHidden.addEventListener('change', () => {
                this.updateState();
            });
        }

        this.inputElement.addEventListener('input', (event)  => {
            this.progressBar.setProgress(event.target.value);
        });
    }

    updateState() {
        if (this.checkboxHidden && this.checkboxHidden.checked) {
            this.progressBar.setState('hidden');
        } else if (this.checkboxAnimate && this.checkboxAnimate.checked) {
            this.progressBar.setState('animate');
        } else {
            this.progressBar.setState('normal');
        }
    }
}