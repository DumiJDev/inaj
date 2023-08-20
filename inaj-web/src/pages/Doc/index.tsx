import { useParams } from "react-router-dom";
import { Document, Page } from "react-pdf";
import React from "react";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import pdf from "../Dashboard/file.pdf";

const options = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
};

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export default function Doc() {
  const { docId } = useParams();

  //const [doc, setDoc] = React.useState<any>(null);
  const [pageNumber, setPageNumber] = React.useState<number>(0);
  const [numPages, setNumPages] = React.useState<number>(0);

  React.useEffect(() => {}, [docId]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);

    if (numPages) setPageNumber(1);
  }

  return (
    <main>
      <Document
        options={options}
        file={pdf}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </main>
  );
}
