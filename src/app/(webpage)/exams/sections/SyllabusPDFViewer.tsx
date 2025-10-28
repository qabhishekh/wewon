import React, { useState } from "react";
import { FileText, Download, ExternalLink, AlertCircle } from "lucide-react";

interface SyllabusPDFViewerProps {
  pdfUrl?: string;
  title?: string;
  onDownload?: () => void;
}

export default function SyllabusPDFViewer({
  pdfUrl,
  title = "Syllabus",
  onDownload,
}: SyllabusPDFViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "syllabus.pdf";
      link.click();
    }
    if (onDownload) {
      onDownload();
    }
  };

  const openInNewTab = () => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank");
    }
  };

  return (
    <div
      className="w-full pt-16"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ color: "var(--primary)" }}
          >
            {title}
          </h2>

          {pdfUrl && (
            <div className="flex gap-3">
              <button
                onClick={openInNewTab}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium"
                style={{ color: "var(--primary)" }}
              >
                <ExternalLink className="w-4 h-4" />
                Open
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white hover:opacity-90 transition-opacity text-sm font-medium"
                style={{ backgroundColor: "var(--primary)" }}
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          )}
        </div>

        {/* PDF Viewer Container */}
        <div
          className="rounded-3xl overflow-hidden relative"
          style={{
            backgroundColor: "#6B7A8F",
            minHeight: "600px",
            height: "80vh",
          }}
        >
          {pdfUrl ? (
            <>
              {/* {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white">
                  <div className="text-center">
                    <div
                      className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"
                      style={{
                        borderColor: "var(--primary)",
                        borderTopColor: "transparent",
                      }}
                    ></div>
                    <p className="text-gray-600 font-medium">Loading PDF...</p>
                  </div>
                </div>
              )} */}

              {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-white">
                  <div className="text-center max-w-md px-6">
                    <AlertCircle
                      className="w-16 h-16 mx-auto mb-4"
                      style={{ color: "var(--primary)" }}
                    />
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ color: "var(--primary)" }}
                    >
                      Unable to Load PDF
                    </h3>
                    <p className="text-gray-600 mb-6">
                      The PDF viewer encountered an error. Please try
                      downloading the file or opening it in a new tab.
                    </p>
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={openInNewTab}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium"
                        style={{ color: "var(--primary)" }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Open in New Tab
                      </button>
                      <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white hover:opacity-90 transition-opacity text-sm font-medium"
                        style={{ backgroundColor: "var(--primary)" }}
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <iframe
                src={`${pdfUrl}#view=FitH`}
                className="w-full h-full"
                style={{ border: "none", minHeight: "600px" }}
                onLoad={handleLoad}
                onError={handleError}
                title="PDF Viewer"
              />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <div className="text-center max-w-md px-6">
                <FileText className="w-20 h-20 mx-auto mb-4 text-gray-400" />
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ color: "var(--primary)" }}
                >
                  No PDF Available
                </h3>
                <p className="text-gray-600">
                  Please provide a PDF URL to display the syllabus document.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
