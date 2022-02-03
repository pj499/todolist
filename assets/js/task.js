function disablePrev() {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
        window.history.go(0);
    }
}
disablePrev();