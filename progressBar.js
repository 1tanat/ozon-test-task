class ProgressBar {
    constructor(svgElement, circleElement, progressValue = 100, size = 200, strokeWidth = 5, color = 'black') {
        this.svgElement = svgElement;
        this.circleElement = circleElement;

        this.svgSize = size;
        this.strokeWidth = strokeWidth;
        this.progressValue = progressValue;
        this.state = 'normal';

        this.radius = this.calculateRadius();
        this.circumference = this.calculateCircumference();
        this.color = color;
        this.offset = this.calculateOffset();

        this.updateSize();
        this.updateRadius();
        this.updateStrokeWidth();
        this.updateStrokeColor();
        this.updateProgress();
        this.updateState();

    }

    setProgressValue(value) {
        if (value < 0) value = 0;
        if (value > 100) value = 100;
        this.progressValue = value;
        
        this.offset = this.calculateOffset();
        this.updateProgress();
    }

    setState(state) {
        this.state = state;
        this.updateState();
    }
    updateState() {
        this.svgElement.classList.remove('progressbar-hide');
        this.svgElement.classList.remove('progressbar-animate');

        if (this.state === 'hidden') {
            this.svgElement.classList.add('progressbar-hide');
        } 
        
        if (this.state === 'animate') {
            this.svgElement.classList.add('progressbar-animate');
        }
    }
    
    setOffset(offset) {
        this.offset = offset;
        this.updateProgress();
    }

    calculateOffset() {
        return this.circumference - (this.progressValue * this.circumference) / 100;
    }

    setSize(size) {
        this.svgSize = size;

        this.setRadius(this.calculateRadius());
        this.setCircumference(this.calculateCircumference());
        this.setOffset(this.calculateOffset());

        this.updateStrokeWidth();
        this.updateSize();
        this.updateProgress();
    }

    setStrokeColor(color) {
        this.color = color;
        this.updateStrokeColor();
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

    updateStrokeColor() {
        this.circleElement.setAttribute('stroke', this.color);
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