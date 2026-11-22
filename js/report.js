
// Bwaise Clean & Safe
// Environmental Report Form

const reportForm = document.getElementById("problemReportForm");

const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const photoInput = document.getElementById("photo");

const successSection = document.getElementById("reportSuccess");
const referenceNumber = document.getElementById("referenceNumber");
const submissionDate = document.getElementById("submissionDate");
const newReportButton = document.getElementById("newReportButton");

// Require at least one contact method.
function validateContactDetails() {
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();

    if (phone === "" && email === "") {
        phoneInput.setCustomValidity(
            "Please provide a phone number or an email address."
        );
        emailInput.setCustomValidity(
            "Please provide a phone number or an email address."
        );
    } else {
        phoneInput.setCustomValidity("");
        emailInput.setCustomValidity("");
    }
}

phoneInput.addEventListener("input", validateContactDetails);
emailInput.addEventListener("input", validateContactDetails);

// Process and save a demonstration report.
reportForm.addEventListener("submit", function(event) {
    event.preventDefault();

    validateContactDetails();

    if (!reportForm.reportValidity()) {
        return;
    }

    // Confirm that the uploaded file is an image.
    const photo = photoInput.files[0];

    if (!photo || !photo.type.startsWith("image/")) {
        alert("Please upload a valid photograph of the problem.");
        return;
    }

    // Generate a demonstration reference number.
    const reference = "BCS-" + Date.now().toString().slice(-8);

    // Automatically record the submission date and time.
    const dateTime = new Date();

    const formattedDate = dateTime.toLocaleString("en-UG", {
        dateStyle: "long",
        timeStyle: "short"
    });

    // Collect public report information.
    const newReport = {
        reference: reference,
        category: document.getElementById("problemType").value,
        location: document.getElementById("location").value.trim(),
        landmark: document.getElementById("landmark").value.trim(),
        description: document.getElementById("description").value.trim(),
        date: formattedDate,
        submittedAt: dateTime.toISOString()
    };

    // Retrieve existing reports from browser storage.
    let savedReports = [];

    try {
        savedReports = JSON.parse(
            localStorage.getItem("bwaiseReports")
        ) || [];

        if (!Array.isArray(savedReports)) {
            savedReports = [];
        }

        // Add the new report to the collection.
        savedReports.push(newReport);

        // Save all reports in this browser.
        localStorage.setItem(
            "bwaiseReports",
            JSON.stringify(savedReports)
        );

    } catch (error) {
        alert(
            "The report could not be saved in this browser. Please try again."
        );
        console.error("Report storage error:", error);
        return;
    }

    // Display confirmation information.
    referenceNumber.textContent = reference;
    submissionDate.textContent = formattedDate;

    // Hide the form and show the confirmation.
    reportForm.hidden = true;
    successSection.hidden = false;

    successSection.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});

// Allow another demonstration report to be prepared.
newReportButton.addEventListener("click", function() {
    reportForm.reset();

    phoneInput.setCustomValidity("");
    emailInput.setCustomValidity("");

    successSection.hidden = true;
    reportForm.hidden = false;

    reportForm.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});
