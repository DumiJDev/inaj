import { useParams } from "react-router-dom";
import React from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import pdf from "../Dashboard/file.pdf";
import { IconButton, CircularProgress } from "@mui/material";
import { SkipNext, SkipPrevious } from "@mui/icons-material";

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
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        flex: 1,
      }}
    >
      <div
        style={{
          width: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Document
          options={options}
          file={pdf}
          loading={<CircularProgress />}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page height={600} pageNumber={pageNumber} />
        </Document>
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
          <IconButton disabled={pageNumber < 2 } onClick={() => setPageNumber(prev => prev - 1)}>
            <SkipPrevious />
          </IconButton>
          <IconButton disabled={pageNumber === numPages} onClick={() => setPageNumber(prev => prev + 1)}>
            <SkipNext />
          </IconButton>
        </div>
        <p style={{ textAlign: "end" }}>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    </main>
  );
}
