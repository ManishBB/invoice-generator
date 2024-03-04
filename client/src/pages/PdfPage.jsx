import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import conf from "../config/config";

function PdfPage({ products, totalWithGst }) {
    const [loading, setLoading] = useState(false);
    const [pdfData, setPdfData] = useState(null);
    const [currentPage, setCurrentPage] = useState("generatePdf"); // 'form', 'generatePdf', 'showPdf'
    const location = useLocation();

    useEffect(() => {
        setPdfData(location?.state);
    }, []);

    console.log(pdfData);

    const generatePDF = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${conf.baseUrl}/invoice/create-invoice`,
                { pdfData },
                { responseType: "blob" }
            );
            const pdfBlob = new Blob([response.data], {
                type: "application/pdf",
            });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            setPdfData(pdfUrl);
            setCurrentPage("showPdf");
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                {currentPage === "generatePdf" && (
                    <div>
                        <h3 className="text-2xl font-bold text-center mb-5">
                            Generate PDF
                        </h3>
                        <button
                            onClick={generatePDF}
                            className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                        >
                            Generate PDF
                        </button>
                        {loading && <p>Loading...</p>}
                    </div>
                )}
                {currentPage === "showPdf" && (
                    <div>
                        <h3 className="text-2xl font-bold text-center mb-5">
                            PDF Preview
                        </h3>
                        <iframe
                            src={pdfData}
                            width="100%"
                            height="500px"
                        ></iframe>
                        <a
                            href={pdfData}
                            download="products-list.pdf"
                            className="px-6 py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-900"
                        >
                            Download PDF
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PdfPage;