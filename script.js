document.addEventListener("DOMContentLoaded", function () {
    const uploadForm = document.getElementById("uploadForm");
    const pdfFile = document.getElementById("pdfFile");
    const pdfList = document.getElementById("pdfList");

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

        // Clear the file input
        uploadForm.reset();
    });
});
