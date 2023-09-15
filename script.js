document.addEventListener("DOMContentLoaded", function () {
    const uploadForm = document.getElementById("uploadForm");
    const pdfFile = document.getElementById("pdfFile");
    const pdfList = document.getElementById("pdfList");

    // Define your authorized username here
    const authorizedUsername = '4[}MZ7Y,`M#a!bIu6__w5->fNb@o_tryJx]:a!Wbf-aw_F,H2'; // Replace 'YourAuthorizedUsername' with your actual authorized username

    // Prompt the user for their username
    const userEnteredUsername = prompt("Enter your username:");

    // Check if the entered username matches the authorized username
    if (userEnteredUsername !== authorizedUsername) {
        alert("You are not authorized to upload notes.");
        uploadForm.style.display = "none"; // Hide the upload form
    }

    // Retrieve previously uploaded PDFs from localStorage
    let storedPDFs = JSON.parse(localStorage.getItem("uploadedPDFs")) || [];

    // Function to display uploaded PDFs
    function displayPDFs() {
        pdfList.innerHTML = "";

        if (storedPDFs.length === 0) {
            pdfList.innerHTML = "<p>No uploaded PDFs yet.</p>";
        } else {
            storedPDFs.forEach((pdf, index) => {
                const listItem = document.createElement("li");
                const pdfLink = document.createElement("a");
                pdfLink.textContent = pdf.name;
                pdfLink.href = pdf.url;
                pdfLink.target = "_blank";

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.addEventListener("click", () => {
                    // Remove the PDF from the storedPDFs array
                    storedPDFs.splice(index, 1);
                    // Update localStorage
                    localStorage.setItem("uploadedPDFs", JSON.stringify(storedPDFs));
                    // Re-display the PDFs
                    displayPDFs();
                });

                listItem.appendChild(pdfLink);
                listItem.appendChild(deleteButton);
                pdfList.appendChild(listItem);
            });
        }
    }

    // Initial display of uploaded PDFs
    displayPDFs();

    uploadForm.addEventListener("submit", function (e) {
        e.preventDefault();

        if (userEnteredUsername === authorizedUsername) {
            const file = pdfFile.files[0];

            if (file) {
                if (file.type === "application/pdf") {
                    // Store the uploaded PDF in localStorage
                    storedPDFs.push({ name: file.name, url: URL.createObjectURL(file) });
                    localStorage.setItem("uploadedPDFs", JSON.stringify(storedPDFs));

                    // Display the updated PDF list
                    displayPDFs();
                } else {
                    alert("Please select a PDF file.");
                }
            } else {
                alert("Please choose a file to upload.");
            }
        } else {
            alert("You are not authorized to upload notes.");
        }

        // Clear the file input
        uploadForm.reset();
    });
});
