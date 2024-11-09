// Global counter for dynamically added fields
var educationCount = 0;
var workCount = 0;
// Form and display elements
var resumeForm = document.getElementById('resume-form');
var educationContainer = document.getElementById('education-container');
var workContainer = document.getElementById('work-container');
var personalInfo = document.getElementById('personalInfo');
var educationInfo = document.getElementById('educationInfo');
var workExperienceInfo = document.getElementById('workExperienceInfo');
var skillsInfo = document.getElementById('skillsInfo');
// Function to add new Education form fields dynamically
function addEducation() {
    educationCount++;
    var educationDiv = document.createElement('div');
    educationDiv.innerHTML = "\n        <h3>Education ".concat(educationCount, "</h3>\n        <label for=\"degree-").concat(educationCount, "\">Degree:</label>\n        <input type=\"text\" id=\"degree-").concat(educationCount, "\" required>\n        <label for=\"institution-").concat(educationCount, "\">Institution:</label>\n        <input type=\"text\" id=\"institution-").concat(educationCount, "\" required>\n        <label for=\"year-").concat(educationCount, "\">Year of Graduation:</label>\n        <input type=\"number\" id=\"year-").concat(educationCount, "\" required>\n    ");
    educationContainer.appendChild(educationDiv);
}
// Function to add new Work Experience form fields dynamically
function addWorkExperience() {
    workCount++;
    var workDiv = document.createElement('div');
    workDiv.innerHTML = "\n        <h3>Work Experience ".concat(workCount, "</h3>\n        <label for=\"jobTitle-").concat(workCount, "\">Job Title:</label>\n        <input type=\"text\" id=\"jobTitle-").concat(workCount, "\" required>\n        <label for=\"company-").concat(workCount, "\">Company:</label>\n        <input type=\"text\" id=\"company-").concat(workCount, "\" required>\n        <label for=\"startYear-").concat(workCount, "\">Start Year:</label>\n        <input type=\"number\" id=\"startYear-").concat(workCount, "\" required>\n        <label for=\"endYear-").concat(workCount, "\">End Year:</label>\n        <input type=\"number\" id=\"endYear-").concat(workCount, "\" required>\n        <label for=\"jobDescription-").concat(workCount, "\">Job Description:</label>\n        <textarea id=\"jobDescription-").concat(workCount, "\" required></textarea>\n    ");
    workContainer.appendChild(workDiv);
}
// Function to generate and display the resume
function generateResume() {
    // Get form input values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var profilePic = document.getElementById('profilePic').value;
    var skills = document.getElementById('skills').value.split(',');
    // Set the resume title dynamically
    var resumeTitle = document.getElementById('resume-title');
    if (resumeTitle) {
        resumeTitle.textContent = name; // Set name as the title
    }
    // Populate personal information section
    personalInfo.innerHTML = "\n        <p><strong>Name:</strong> ".concat(name, "</p>\n        <p><strong>Email:</strong> ").concat(email, "</p>\n        <p><strong>Profile Picture:</strong> <img src=\"").concat(profilePic, "\" alt=\"Profile Picture\" width=\"100\"></p>\n    ");
    // Populate education section
    educationInfo.innerHTML = "<h2>Education</h2>";
    for (var i = 1; i <= educationCount; i++) {
        var degree = document.getElementById("degree-".concat(i)).value;
        var institution = document.getElementById("institution-".concat(i)).value;
        var year = document.getElementById("year-".concat(i)).value;
        educationInfo.innerHTML += "\n            <p><strong>Degree:</strong> ".concat(degree, "</p>\n            <p><strong>Institution:</strong> ").concat(institution, "</p>\n            <p><strong>Year of Graduation:</strong> ").concat(year, "</p>\n        ");
    }
    // Populate work experience section
    workExperienceInfo.innerHTML = "<h2>Work Experience</h2>";
    for (var i = 1; i <= workCount; i++) {
        var jobTitle = document.getElementById("jobTitle-".concat(i)).value;
        var company = document.getElementById("company-".concat(i)).value;
        var startYear = document.getElementById("startYear-".concat(i)).value;
        var endYear = document.getElementById("endYear-".concat(i)).value;
        var jobDescription = document.getElementById("jobDescription-".concat(i)).value;
        workExperienceInfo.innerHTML += "\n            <p><strong>Job Title:</strong> ".concat(jobTitle, "</p>\n            <p><strong>Company:</strong> ").concat(company, "</p>\n            <p><strong>Duration:</strong> ").concat(startYear, " - ").concat(endYear, "</p>\n            <p><strong>Description:</strong> ").concat(jobDescription, "</p>\n        ");
    }
    // Populate skills section
    skillsInfo.innerHTML = "<h2>Skills</h2><p>" + skills.join(", ") + "</p>";
    // Show the resume display section
    document.getElementById('resume-display').style.display = 'block';
}
// Function to generate a unique resume link based on the user's name
function generateUniqueURL() {
    var name = document.getElementById('name').value;
    var username = name.toLowerCase().replace(/\s+/g, ''); // Remove spaces
    var uniqueURL = "".concat(window.location.origin, "/").concat(username, "-resume");
    return uniqueURL;
}
// Function to copy the resume link to clipboard
function shareResume() {
    var uniqueURL = generateUniqueURL();
    navigator.clipboard.writeText(uniqueURL).then(function () {
        alert("Resume link copied to clipboard: ".concat(uniqueURL));
    }).catch(function (err) {
        console.error('Failed to copy link: ', err);
    });
}
// Function to download the resume as a PDF
function downloadResume() {
    var resumeDisplay = document.getElementById('resume-display');
    var noPrintElements = document.querySelectorAll('.no-print');
    // Temporarily hide .no-print elements (like buttons) for PDF download
    noPrintElements.forEach(function (el) { return el.style.display = 'none'; });
    if (resumeDisplay) {
        var options = {
            margin: 0.5,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().from(resumeDisplay).set(options).save().then(function () {
            // After PDF generation, restore the buttons
            noPrintElements.forEach(function (el) { return el.style.display = 'block'; });
        });
    }
}
// Event listener for form submission to generate the resume
resumeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    generateResume();
});
