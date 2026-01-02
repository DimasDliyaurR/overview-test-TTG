
document.getElementById('password').addEventListener('input', function () {

    // Value password
    const strength = this.value.length;

    // Progress bar
    const fill = document.getElementById('progress-bar');
    const text = document.getElementById('strengthText');
    const percent = Math.min((strength / 8) * 100, 100);

    fill.style.width = percent + '%';

    if (strength < 4) {
        fill.style.backgroundColor = '#ff4444';
        text.textContent = 'Lemah';
    } else if (strength < 8) {
        fill.style.backgroundColor = '#ffaa00';
        text.textContent = 'Sedang';
    } else {
        fill.style.backgroundColor = '#36a936ff';
        text.textContent = 'Kuat';
    }
});