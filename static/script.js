// sindi koifan 211657481 alon cohen 319039707

document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('email');
    const submitButton = document.getElementById('submit-btn');
    const form = document.querySelector('form');

    emailInput.addEventListener('blur', checkEmailExists);

    async function checkEmailExists() {
        const email = emailInput.value.trim();
        if (!email) return;

        try {
            const response = await fetch(`/check-email?email=${email}`);
            const result = await response.json();
            
            if (result.exists) {
                emailInput.setCustomValidity('Email already exists');
                submitButton.disabled = true;
            } else {
                emailInput.setCustomValidity('');
                submitButton.disabled = false;
            }
        } catch (error) {
            console.error('Error checking email existence:', error);
            emailInput.setCustomValidity('Error checking email existence');
            submitButton.disabled = true;
        }
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm()) {
            submitButton.disabled = true;
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            fetch('/submit.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    alert('Registration successful!');
                    form.reset();
                } else {
                    alert('Error: ' + result.message);
                }
            })
            .catch(error => {
                console.error('Error registering:', error);
                alert('Error registering. Please try again later.');
            })
            .finally(() => {
                submitButton.disabled = false;
            });
        }
    });

    function validateForm() {
        let errorMessage = "";
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirm_password = document.getElementById('confirm_password').value;
        const phone = document.getElementById('phone').value.trim();
        const fname = document.getElementById('fname').value.trim();
        const lname = document.getElementById('lname').value.trim();

        if (email === "" || password === "" || confirm_password === "" || phone === "" || fname === "" || lname === "") {
            errorMessage += "יש למלא את כל השדות החובה\n";
            markFieldInvalid(email === "", "email");
            markFieldInvalid(password === "", "password");
            markFieldInvalid(confirm_password === "", "confirm_password");
            markFieldInvalid(phone === "", "phone");
            markFieldInvalid(fname === "", "fname");
            markFieldInvalid(lname === "", "lname");
        }

        if (password.length < 8) {
            errorMessage += "הסיסמא חייבת להכיל לפחות 8 תווים\n";
            markFieldInvalid(true, "password");
        }

        if (password !== confirm_password) {
            errorMessage += "הסיסמאות אינן תואמות\n";
            markFieldInvalid(true, "password");
            markFieldInvalid(true, "confirm_password");
        }

        if (!phone.match(/^\d{9,10}$/)) {
            errorMessage += "מספר הטלפון חייב להיות בין 9 ל-10 ספרות\n";
            markFieldInvalid(true, "phone");
        }

        showAlert(errorMessage);
        return errorMessage === "";
    }

    function markFieldInvalid(isInvalid, fieldId) {
        const field = document.getElementById(fieldId);
        if (isInvalid) {
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    }

    function showAlert(errorMessage) {
        if (errorMessage !== "") {
            alert(errorMessage);
        }
    }
});
