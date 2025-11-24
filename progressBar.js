class ProgressBar {
    constructor(progress = 100, size = 200, strokeWidth = 5, color = 'black') {
        this.svgElement = document.querySelector('svg');
        this.circleElement = document.querySelector('circle');
        this.inputElement = document.querySelector('.input');

        this.svgSize = size;
        this.strokeWidth = strokeWidth;
        this.progress = progress;

        this.radius = this.calculateRadius();
        this.circumference = this.calculateCircumference();
        this.color = color;

        this.updateSize();
        this.updateRadius();
        this.updateStrokeWidth();
        this.updateStrokeColor(color);
        this.updateProgress();

        this.inputElement.addEventListener('input', this.handleInput.bind(this));
    }

    setProgress(value) {
        if (value < 0) value = 0;
        if (value > 100) value = 100;
        this.progress = value;
        
        this.offset = this.circumference - (this.progress * this.circumference) / 100;
        this.updateProgress();
    }

    handleInput(event) {
        const value = event.target.value;
        this.setProgress(value);
    }

    setSize(size) {
        this.svgSize = size;

        this.updateRadius();
        this.updateCircumference();
        this.updateStrokeWidth();
        this.updateSize();
    }

    setStrokeColor(color) {
        this.color = color;
        this.updateStrokeColor(color);
    }

    updateStrokeColor() {
        this.circleElement.setAttribute('stroke', this.color);
    }

    setStrokeWidth(strokeWidth) {
        this.strokeWidth = strokeWidth;
        this.calculateRadius();
        this.calculateCircumference();

        this.updateRadius();
        this.updateStrokeWidth();
    }

    setRadius(radius) {
        this.radius = radius;
        this.updateRadius();
    }

    setCirciumference(circumference) {
        this.circumference = circumference;
    }

    calculateRadius() {
        return (this.svgSize - this.strokeWidth) / 2;
    }

    calculateCircumference() {
        return 2 * Math.PI * this.radius;
    }

    updateSize() {
        this.svgElement.setAttribute('width', this.svgSize);
        this.svgElement.setAttribute('height', this.svgSize);
        this.circleElement.setAttribute('cx', this.svgSize / 2);
        this.circleElement.setAttribute('cy', this.svgSize / 2 );
    }

    updateRadius() {
        this.circleElement.setAttribute('r', this.radius);
    }

    updateStrokeWidth() {
        this.circleElement.setAttribute('stroke-width', this.strokeWidth);
    }

    updateProgress() {
        this.circleElement.setAttribute('stroke-dasharray', this.circumference);
        this.circleElement.setAttribute('stroke-dashoffset', this.offset);
    }

    getRadius() {
        return this.radius;
    }
}