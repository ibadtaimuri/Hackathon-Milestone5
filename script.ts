// Declare html2pdf.js to prevent TypeScript errors
declare const html2pdf: any;

// Global counter for dynamically added fields
let educationCount = 0;
let workCount = 0;

// Form and display elements
const resumeForm = document.getElementById('resume-form') as HTMLFormElement;
const educationContainer = document.getElementById('education-container')!;
const workContainer = document.getElementById('work-container')!;
const personalInfo = document.getElementById('personalInfo')!;
const educationInfo = document.getElementById('educationInfo')!;
const workExperienceInfo = document.getElementById('workExperienceInfo')!;
const skillsInfo = document.getElementById('skillsInfo')!;

// Function to add new Education form fields dynamically
function addEducation() {
    educationCount++;
    const educationDiv = document.createElement('div');
    educationDiv.innerHTML = `
        <h3>Education ${educationCount}</h3>
        <label for="degree-${educationCount}">Degree:</label>
        <input type="text" id="degree-${educationCount}" required>
        <label for="institution-${educationCount}">Institution:</label>
        <input type="text" id="institution-${educationCount}" required>
        <label for="year-${educationCount}">Year of Graduation:</label>
        <input type="number" id="year-${educationCount}" required>
    `;
    educationContainer.appendChild(educationDiv);
}

// Function to add new Work Experience form fields dynamically
function addWorkExperience() {
    workCount++;
    const workDiv = document.createElement('div');
    workDiv.innerHTML = `
        <h3>Work Experience ${workCount}</h3>
        <label for="jobTitle-${workCount}">Job Title:</label>
        <input type="text" id="jobTitle-${workCount}" required>
        <label for="company-${workCount}">Company:</label>
        <input type="text" id="company-${workCount}" required>
        <label for="startYear-${workCount}">Start Year:</label>
        <input type="number" id="startYear-${workCount}" required>
        <label for="endYear-${workCount}">End Year:</label>
        <input type="number" id="endYear-${workCount}" required>
        <label for="jobDescription-${workCount}">Job Description:</label>
        <textarea id="jobDescription-${workCount}" required></textarea>
    `;
    workContainer.appendChild(workDiv);
}

// Function to generate and display the resume
function generateResume() {
    // Get form input values
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const profilePic = (document.getElementById('profilePic') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',');

    // Set the resume title dynamically
    const resumeTitle = document.getElementById('resume-title');
    if (resumeTitle) {
        resumeTitle.textContent = name;  // Set name as the title
    }

    // Populate personal information section
    personalInfo.innerHTML = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Profile Picture:</strong> <img src="${profilePic}" alt="Profile Picture" width="100"></p>
    `;

    // Populate education section
    educationInfo.innerHTML = "<h2>Education</h2>";
    for (let i = 1; i <= educationCount; i++) {
        const degree = (document.getElementById(`degree-${i}`) as HTMLInputElement).value;
        const institution = (document.getElementById(`institution-${i}`) as HTMLInputElement).value;
        const year = (document.getElementById(`year-${i}`) as HTMLInputElement).value;
        educationInfo.innerHTML += `
            <p><strong>Degree:</strong> ${degree}</p>
            <p><strong>Institution:</strong> ${institution}</p>
            <p><strong>Year of Graduation:</strong> ${year}</p>
        `;
    }

    // Populate work experience section
    workExperienceInfo.innerHTML = "<h2>Work Experience</h2>";
    for (let i = 1; i <= workCount; i++) {
        const jobTitle = (document.getElementById(`jobTitle-${i}`) as HTMLInputElement).value;
        const company = (document.getElementById(`company-${i}`) as HTMLInputElement).value;
        const startYear = (document.getElementById(`startYear-${i}`) as HTMLInputElement).value;
        const endYear = (document.getElementById(`endYear-${i}`) as HTMLInputElement).value;
        const jobDescription = (document.getElementById(`jobDescription-${i}`) as HTMLTextAreaElement).value;
        workExperienceInfo.innerHTML += `
            <p><strong>Job Title:</strong> ${jobTitle}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Duration:</strong> ${startYear} - ${endYear}</p>
            <p><strong>Description:</strong> ${jobDescription}</p>
        `;
    }

    // Populate skills section
    skillsInfo.innerHTML = "<h2>Skills</h2><p>" + skills.join(", ") + "</p>";

    // Show the resume display section
    document.getElementById('resume-display')!.style.display = 'block';
}

// Function to generate a unique resume link based on the user's name
function generateUniqueURL(): string {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const username = name.toLowerCase().replace(/\s+/g, '');  // Remove spaces
    const uniqueURL = `${window.location.origin}/${username}-resume`;
    return uniqueURL;
}

// Function to copy the resume link to clipboard
function shareResume() {
    const uniqueURL = generateUniqueURL();
    navigator.clipboard.writeText(uniqueURL).then(() => {
        alert(`Resume link copied to clipboard: ${uniqueURL}`);
    }).catch(err => {
        console.error('Failed to copy link: ', err);
    });
}

// Function to download the resume as a PDF
function downloadResume() {
    const resumeDisplay = document.getElementById('resume-display');
    const noPrintElements = document.querySelectorAll('.no-print');

    // Temporarily hide .no-print elements (like buttons) for PDF download
    noPrintElements.forEach(el => (el as HTMLElement).style.display = 'none');

    if (resumeDisplay) {
        const options = {
            margin: 0.5,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().from(resumeDisplay).set(options).save().then(() => {
            // After PDF generation, restore the buttons
            noPrintElements.forEach(el => (el as HTMLElement).style.display = 'block');
        });
    }
}

// Event listener for form submission to generate the resume
resumeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    generateResume();
});