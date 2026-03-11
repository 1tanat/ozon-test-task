const progressApi = ProgressApi.init('.progress-wrapper', {
    value: 100,
    size: 300,
    strokeWidth: 20,
    color: '#005bff',
});

if (typeof window !== 'undefined') {
    window.progressApi = progressApi;
}
