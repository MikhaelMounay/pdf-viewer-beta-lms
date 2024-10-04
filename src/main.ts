import "./assets/styles/index.css";

const CLIENT_ID = "client_id_here"
const BASE_URL_PDF = "https://mikhaelmounay.github.io/generic-pdf-viewer-adobe/pdfs/"

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pdfFileURL = urlParams.get("file");
const pdfFileTitle = urlParams.get("title");

if (pdfFileURL) {
    // Initializing the Adobe PDF Embed SDK
    document.addEventListener("adobe_dc_view_sdk.ready", function () {
        // @ts-ignore
        var adobeDCView = new AdobeDC.View({ clientId: CLIENT_ID, divId: "adobe-dc-view" });
        adobeDCView.previewFile(
            {
                content: {
                    location: { url: `${BASE_URL_PDF}${pdfFileURL}` },
                },
                metaData: { fileName: pdfFileTitle || pdfFileURL?.split("/")[pdfFileURL?.split("/").length - 1] },
            },
            {
                embedMode: "FULL_WINDOW",
                defaultViewMode: "FIT_WIDTH",
                focusOnRendering: true,
                showDownloadPDF: false,
                showPrintPDF: false,
                showAnnotationTools: false,
                enableLinearization: true,
            }
        );
    });
} else {
    document.getElementById("error-container")!.innerText =
        "Error 404: File not found! Please provide a valid PDF file URL in the query parameter 'file'.";
}

if (pdfFileTitle) {
    document.title = `${pdfFileTitle} | Beta LMS PDF Viewer`;
}
