class ProgressBar {
    constructor(svgElement, circleElement, progress = 100, size = 200, strokeWidth = 5, color = 'black') {
        this.svgElement = svgElement;
        this.circleElement = circleElement;

        this.svgSize = size;
        this.strokeWidth = strokeWidth;
        this.progress = progress;

        this.radius = this.calculateRadius();
        this.circumference = this.calculateCircumference();
        this.color = color;
        this.offset = this.calculateOffset();

        this.updateSize();
        this.updateRadius();
        this.updateStrokeWidth();
        this.updateStrokeColor();
        this.updateProgress();

    }

    setProgress(value) {
        if (value < 0) value = 0;
        if (value > 100) value = 100;
        this.progress = value;
        
        this.offset = this.circumference - (this.progress * this.circumference) / 100;
        this.updateProgress();
    }

    setOffset(offset) {
        this.offset = offset;
        this.updateProgress();
    }

    calculateOffset() {
        return this.circumference - (this.progress * this.circumference) / 100;
    }

    setSize(size) {
        this.svgSize = size;

        this.setRadius(this.calculateRadius());
        this.setCircumference(this.calculateCircumference());
        this.updateSize();
    }

    setStrokeColor(color) {
        this.color = color;
        this.updateStrokeColor(this.color);
    }

    updateStrokeColor() {
        this.circleElement.setAttribute('stroke', this.color);
    }

    setStrokeWidth(strokeWidth) {
        this.strokeWidth = strokeWidth;
        this.setRadius(this.calculateRadius());
        this.setCircumference(this.calculateCircumference());
        this.setOffset(this.calculateOffset());

        this.updateRadius();
        this.updateStrokeWidth();
        this.updateProgress(); 
    }

    setRadius(radius) {
        this.radius = radius;
        this.updateRadius();
    }

    setCircumference(circumference) {
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
        this.circleElement.setAttribute('cy', this.svgSize / 2);
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