
const contactForm = document.getElementById("contactForm");
const contactResult = document.getElementById("contactResult");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const subject = document.getElementById("contactSubject").value;
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !subject || !message) {
        contactResult.innerHTML = `
            <p class="contact-error">Please complete all required fields.</p>
        `;
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        contactResult.innerHTML = `
            <p class="contact-error">Please enter a valid email address.</p>
        `;
        return;
    }

    const emailSubject = encodeURIComponent(subject);
    const emailBody = encodeURIComponent(
        "Name: " + name + "\n" +
        "Email: " + email + "\n\n" +
        "Message:\n" + message
    );

    contactResult.innerHTML = `
        <div class="contact-success">
            <h3>Your Message Is Ready</h3>
            <p>
                Your enquiry has been prepared. Choose the button below
                to open your email application and send it.
            </p>
            <a
                href="mailto:?subject=${emailSubject}&body=${emailBody}"
                class="btn btn-primary"
            >
                Open Email Application
            </a>
            <p class="contact-demo-note">
                This prototype does not send or store messages directly.
                An official project email address must be configured
                before publication.
            </p>
        </div>
    `;
});
