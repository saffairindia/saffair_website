import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core'; // Make sure you have @react-pdf-viewer/core installed
import '@react-pdf-viewer/core/lib/styles/index.css';

const PDFViewer = ({ pdfUrl }) => {
  return (
    <div className="w-full h-72 object-cover">
      <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.174/pdf.worker.min.js">
        <Viewer
          fileUrl={pdfUrl}
          defaultScale={1.5}
        />
      </Worker>
    </div>
  );
};

export default PDFViewer;
