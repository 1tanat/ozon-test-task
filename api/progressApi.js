const ProgressApi = (function () {
    const instances = new WeakMap();

    function getInterface(element) {
        return instances.get(element) || null;
    }

    return {
        init(selectorOrElement, options = {}) {
            const el =
                typeof selectorOrElement === 'string'
                    ? document.querySelector(selectorOrElement)
                    : selectorOrElement;
            if (!el) return null;

            const value = options.value ?? 100;
            const size = options.size ?? 300;
            const strokeWidth = options.strokeWidth ?? 20;
            const color = options.color ?? '#005bff';

            const iface = new ProgressBarInterface(el, value, size, strokeWidth, color);
            const api = {
                setValue(v) {
                    iface.progressBar.setProgressValue(v);
                    if (iface.inputElement) iface.inputElement.value = v;
                },
                getValue() {
                    return iface.progressBar.progressValue;
                },
                setState(state) {
                    iface.progressBar.setState(state);
                    if (iface.checkboxAnimate) iface.checkboxAnimate.checked = state === 'animate';
                    if (iface.checkboxHidden) iface.checkboxHidden.checked = state === 'hidden';
                },
                getState() {
                    return iface.progressBar.state;
                },
                setSize(size) {
                    iface.progressBar.setSize(size);
                },
                setColor(color) {
                    iface.progressBar.setStrokeColor(color);
                },
                getInterface() {
                    return iface;
                },
            };
            instances.set(el, api);
            return api;
        },

        get(element) {
            return getInterface(element);
        },
    };
})();
