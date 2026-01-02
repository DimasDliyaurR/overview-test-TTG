function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const button = field.nextElementSibling;
    const toggleText = button.querySelector('.password-toggle');

    if (field.type === 'password') {
        field.type = 'text';
        toggleText.textContent = 'Sembunyikan';
    } else {
        field.type = 'password';
        toggleText.textContent = 'Lihat';
    }
}