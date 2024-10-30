document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const errorMessage = document.getElementById('error-message');
    const submitStatus = document.getElementById('submit-status');
    const phoneInput = form.querySelector('input[name="phone"]');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const email = formData.get('email');
        const phone = formData.get('phone');

        hideMessage(errorMessage);
        hideMessage(submitStatus);

        if (!validateEmail(email)) {
            showMessage(errorMessage, 'The email address must contain "@" and "."');
            return;
        }

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

                setTimeout(() => hideMessage(submitStatus), 5000);
            } else {
                showMessage(submitStatus, 'An error occurred, please try again.');
            }
        } catch (error) {
            showMessage(submitStatus, 'An error occurred, please try again.');
        }
    });

    phoneInput.addEventListener('input', () => {
        if (!validatePhone(phoneInput.value)) {
            showMessage(errorMessage, 'The phone number must contain only digits, spaces, dashes, or a leading "+".');
        } else {
            hideMessage(errorMessage);
        }
    });

    function showMessage(element, message) {
        element.textContent = message;
        element.classList.add('visible');
    }

    function hideMessage(element) {
        element.textContent = '';
        element.classList.remove('visible');
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePhone(phone) {
        const phoneRegex = /^[\d\s\-\+]+$/;
        return phoneRegex.test(phone);
    }
});
