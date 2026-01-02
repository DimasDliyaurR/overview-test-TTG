/**
 * Core Function of submit logic
 * 
 * @param {*} event 
 */
function submitForm(event) {
    event.preventDefault()

    // bunch of element input
    let nama_lengkap = document.getElementById("nama_lengkap")
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    let password_confirmation = document.getElementById("password_confirmation")

    // bunch of value element input
    let namaValue = nama_lengkap.value.trim()
    let emailValue = email.value.trim().toLowerCase()
    let passwordValue = password.value
    let confirmValue = password_confirmation.value

    // Reference element
    let elmPasswordRef = document.getElementById("password_ref")
    let elmPasswordConfirmationRef = document.getElementById("password_confirmation_ref")

    // Validation
    let emailError = validateEmail(emailValue)
    let passwordError = validatePassword(passwordValue)
    let confirmError = confirmationPassword(passwordValue, confirmValue)

    if (namaValue === "") {
        generateErrorMessage(event, nama_lengkap, "Nama lengkap tidak boleh kosong!")
    } else {
        removeErrorMessage(event, nama_lengkap)
    }

    if (emailValue === "") {
        generateErrorMessage(event, email, "Email tidak boleh kosong!")
    } else {
        removeErrorMessage(event, email)
        if (emailError) {
            generateErrorMessage(event, email, emailError)
        } else {
            removeErrorMessage(event, email)
        }
    }

    if (passwordValue === "") {
        generateErrorMessage(event, password, "Password tidak boleh kosong!", elmPasswordRef)
    } else {
        removeErrorMessage(event, password, elmPasswordRef)
        if (passwordError) {
            generateErrorMessage(event, password, passwordError, elmPasswordRef)
        } else {
            removeErrorMessage(event, password, elmPasswordRef)
        }
    }

    if (confirmError && password !== "") {
        generateErrorMessage(event, password_confirmation, confirmError, elmPasswordConfirmationRef)
    } else {
        removeErrorMessage(event, password_confirmation, elmPasswordConfirmationRef)
    }

    // Accumulation
    if (emailError == null && passwordError == null && confirmError == null) {
        alert("Berhasil")
    }
}

/**
 * Generate error message
 * 
 * @param {*} event 
 * @param {*} elm 
 * @param {*} message 
 * @param {*} elm_ref use if have error element otherwise ignore it
 */
function generateErrorMessage(event, elm, message, elm_ref = null) {
    event.preventDefault()

    if (elm_ref === null) {
        let errorMessage = document.createElement("span")
        errorMessage.className = "error"
        errorMessage.textContent = message

        let nextElement = elm.nextElementSibling

        if (nextElement != null) {
            nextElement.textContent = message
        } else {
            elm.after(errorMessage)
        }
    } else {
        elm_ref.innerText = message
    }
}

/**
 * Remove the error message
 * 
 * @param {*} event 
 * @param {*} elm 
 * @param {*} elm_ref use if have error element it self otherwise ignore it
 */
function removeErrorMessage(event, elm, elm_ref = null) {
    event.preventDefault()

    if (elm_ref === null) {
        if (elm.nextElementSibling) {
            elm.nextElementSibling.remove()
        }
    } else {
        elm_ref.innerText = ""
    }
}

/**
 * Validation email
 * 
 * @see https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript#:~:text=78%20Answers,val();%20$result.
 * @param {*} email 
 * @returns
 */
function validateEmail(email) {
    const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!pattern.test(email)) {
        return "Email tidak valid !"
    }

    return null
}

/**
 * Validation Password
 * 
 * @param {*} password 
 * @returns 
 */
function validatePassword(password) {
    const pattern = /^.{8,}$/;

    if (!pattern.test(password)) {
        return "Password harus minimal 8 karakter !"
    }

    return null
}
/**
 * Confirmation Password
 * 
 * @param {*} password 
 * @param {*} confirmation 
 * @returns 
 */
function confirmationPassword(password, confirmation) {

    if (password !== confirmation) {
        return "Konfirmasi Password tidak valid !"
    }

    return null
}