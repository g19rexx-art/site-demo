
// Bwaise Clean & Safe
// Waste Collection Request Form

const collectionForm = document.getElementById("collectionForm");

const customerPhone = document.getElementById("customerPhone");
const customerEmail = document.getElementById("customerEmail");

const collectionDate = document.getElementById("collectionDate");

const collectionSuccess = document.getElementById("collectionSuccess");
const collectionReference = document.getElementById("collectionReference");
const collectionSubmissionDate = document.getElementById("collectionSubmissionDate");

const newCollectionRequest = document.getElementById("newCollectionRequest");

// Set the earliest preferred collection date to today.
const today = new Date();
const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

collectionDate.min = localToday;

// Require at least one contact method.
function validateCollectionContact() {
    const phone = customerPhone.value.trim();
    const email = customerEmail.value.trim();

    if (phone === "" && email === "") {
        customerPhone.setCustomValidity(
            "Please provide a phone number or email address."
        );
        customerEmail.setCustomValidity(
            "Please provide a phone number or email address."
        );
    } else {
        customerPhone.setCustomValidity("");
        customerEmail.setCustomValidity("");
    }
}

customerPhone.addEventListener("input", validateCollectionContact);
customerEmail.addEventListener("input", validateCollectionContact);

// Process a demonstration collection request.
collectionForm.addEventListener("submit", function(event) {
    event.preventDefault();

    validateCollectionContact();

    if (!collectionForm.reportValidity()) {
        return;
    }

    const reference = "BCS-WC-" +
        Date.now().toString().slice(-8);

    const submissionTime = new Date();

    const formattedDate = submissionTime.toLocaleString("en-UG", {
        dateStyle: "long",
        timeStyle: "short"
    });

    collectionReference.textContent = reference;
    collectionSubmissionDate.textContent = formattedDate;

    collectionForm.hidden = true;
    collectionSuccess.hidden = false;

    collectionSuccess.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});

// Allow the user to prepare another request.
newCollectionRequest.addEventListener("click", function() {
    collectionForm.reset();

    customerPhone.setCustomValidity("");
    customerEmail.setCustomValidity("");

    collectionSuccess.hidden = true;
    collectionForm.hidden = false;

    collectionForm.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});
