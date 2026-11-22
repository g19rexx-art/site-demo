
// Bwaise Clean & Safe
// Automatically display submitted problem locations

const locationsContainer = document.getElementById("reportedLocations");

function displayReportedLocations() {
    const savedReports = JSON.parse(
        localStorage.getItem("bwaiseReports")
    ) || [];

    // Display a message when no reports exist.
    if (savedReports.length === 0) {
        locationsContainer.innerHTML = `
            <div class="location-empty">
                <h3>No Reports Available Yet</h3>
                <p>Submitted environmental reports will appear here.</p>
            </div>
        `;
        return;
    }

    // Clear the existing content.
    locationsContainer.innerHTML = "";

    // Loop through every saved report.
    savedReports.forEach(function(report) {
        const reportCard = document.createElement("article");
        reportCard.className = "location-card";

        const heading = document.createElement("h3");
        heading.textContent = report.category;

        const location = document.createElement("p");
        location.textContent = "Location: " + report.location;

        const landmark = document.createElement("p");
        landmark.textContent = "Nearby landmark: " + report.landmark;

        const description = document.createElement("p");
        description.textContent = "Description: " + report.description;

        const date = document.createElement("small");
        date.textContent = "Reported: " + report.date;

        reportCard.append(
            heading,
            location,
            landmark,
            description,
            date
        );

        locationsContainer.appendChild(reportCard);
    });
}

// Display saved locations when the page loads.
displayReportedLocations();
