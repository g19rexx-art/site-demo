
const statusForm = document.getElementById("statusForm");
const referenceInput = document.getElementById("referenceNumber");
const statusResult = document.getElementById("statusResult");

statusForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const referenceNumber = referenceInput.value.trim().toUpperCase();

    if (!referenceNumber) {
        statusResult.innerHTML = `
            <p class="status-error">Please enter your report reference number.</p>
        `;
        return;
    }

    // This prototype does not yet connect to a live report database.
    statusResult.innerHTML = `
        <div class="status-demo-message">
            <h3>Tracking System Prototype</h3>
            <p><strong>Reference entered:</strong> ${escapeHTML(referenceNumber)}</p>
            <p>
                Your reference number has been received by this demonstration
                interface. However, live report records are not yet connected.
            </p>
            <p>
                Please contact the project administrator for assistance
                with an actual report.
            </p>
        </div>
    `;
});

function escapeHTML(value) {
    return value.replace(/[&<>"']/g, function (character) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return entities[character];
    });
}
