// Bwaise Clean & Safe
// Display environmental reports saved in this browser

const locationsContainer = document.getElementById("reportedLocations");

function displayReportedLocations() {
    if (!locationsContainer) return;

    let savedReports = [];

    try {
        savedReports = JSON.parse(localStorage.getItem("bwaiseReports") || "[]");
        if (!Array.isArray(savedReports)) savedReports = [];
    } catch (error) {
        locationsContainer.textContent = "Unable to load reports saved in this browser.";
        console.error("Location loading error:", error);
        return;
    }

    if (savedReports.length === 0) {
        const emptyMessage = document.createElement("div");
        emptyMessage.className = "location-empty";
        const heading = document.createElement("h3");
        heading.textContent = "No Reports Available Yet";
        const paragraph = document.createElement("p");
        paragraph.textContent = "Environmental reports submitted through this browser will appear here.";
        emptyMessage.append(heading, paragraph);
        locationsContainer.replaceChildren(emptyMessage);
        return;
    }

    locationsContainer.replaceChildren();

    savedReports.forEach(function (report) {
        const card = document.createElement("article");
        card.className = "location-card";

        const heading = document.createElement("h3");
        heading.textContent = report.category || "Environmental Problem";

        const reference = document.createElement("p");
        reference.textContent = "Reference: " + (report.reference || "Not available");

        const location = document.createElement("p");
        location.textContent = "Location: " + (report.location || "Not provided");

        const landmark = document.createElement("p");
        landmark.textContent = "Nearby landmark: " + (report.landmark || "Not provided");

        const description = document.createElement("p");
        description.textContent = "Description: " + (report.description || "Not provided");

        const date = document.createElement("small");
        date.textContent = "Reported: " + (report.date || "Date unavailable");

        card.append(heading, reference, location, landmark, description, date);
        locationsContainer.appendChild(card);
    });
}

displayReportedLocations();
