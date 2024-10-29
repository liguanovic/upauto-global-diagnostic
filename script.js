document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const errorMessage = document.getElementById('error-message');
    const submitStatus = document.getElementById('submit-status');
    const phoneInput = form.querySelector('input[name="phone"]'); // Sélectionne le champ de téléphone

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const email = formData.get('email');
        const phone = formData.get('phone');

        // Cache les messages d'erreur et de statut au départ
        hideMessage(errorMessage);
        hideMessage(submitStatus);

        // Validation de l'email
        if (!validateEmail(email)) {
            showMessage(errorMessage, 'The email address must contain "@" and "."');
            return;
        }

        // Validation du numéro de téléphone
        if (!validatePhone(phone)) {
            showMessage(errorMessage, 'The phone number must contain only digits, spaces, dashes, or a leading "+".');
            return;
        }

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
            });

            if (response.ok) {
                showMessage(submitStatus, 'Your message has been sent successfully!');
                form.reset();

                // Masquer le message de succès après 5 secondes
                setTimeout(() => hideMessage(submitStatus), 5000);
            } else {
                showMessage(submitStatus, 'An error occurred, please try again.');
            }
        } catch (error) {
            showMessage(submitStatus, 'An error occurred, please try again.');
        }
    });

    // Écouteur d'événement pour afficher une erreur si le numéro de téléphone est incorrect
    phoneInput.addEventListener('input', () => {
        if (!validatePhone(phoneInput.value)) {
            showMessage(errorMessage, 'The phone number must contain only digits, spaces, dashes, or a leading "+".');
        } else {
            hideMessage(errorMessage); // Cache le message si le numéro est valide
        }
    });

    // Fonction pour afficher un message
    function showMessage(element, message) {
        element.textContent = message;
        element.classList.add('visible');
    }

    // Fonction pour cacher un message
    function hideMessage(element) {
        element.textContent = '';
        element.classList.remove('visible');
    }

    // Validation d'email
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validation de numéro de téléphone (accepte chiffres, espaces, "-", et "+")
    function validatePhone(phone) {
        const phoneRegex = /^[\d\s\-\+]+$/;
        return phoneRegex.test(phone);
    }
});
