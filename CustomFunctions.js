function wait(seconds = 0.001) {
    return new Promise(resolve => {
        setTimeout(resolve, seconds * 1000);
    });
}