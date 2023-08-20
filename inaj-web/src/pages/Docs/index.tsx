import { Autocomplete, Button, TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const axios = {
  get: async (url: string) => [
    { name: "CV - Java" },
    { name: "CV - Python" },
    { name: "CV - JS" },
    { name: "CV - TS" },
    { name: "CV - Go" },
    { name: "CV - DevOps" },
    { name: "CV - C#" },
    { name: "CV - Kotlin" },
    { name: "CV - React" },
    { name: "CV - Vue" },
    { name: "CV - Angular" },
    { name: "CV - Express" },
  ],
};

export default function Docs() {
  const [docs, setDocs] = React.useState<any[]>([]);
  const [docsTips, setDocsTips] = React.useState<{ label: string }[]>([]);
  const [btTitle, setBtTitle] = React.useState<string>("Ver mais");

  const handleFilter = (
    event: React.SyntheticEvent<Element, Event>,
    value: {
      label: string;
    } | null
  ) => {
    event.preventDefault();

    docs.filter((doc) => doc.name.includes(value ? value.label : ""));
  };

  const handleLoadMore = () => {
    setBtTitle("Carregando...");

    setTimeout(() => {
      setBtTitle("Ver mais");
      axios.get("http://localhost:8080/api/v1/users/xxx/docs").then((data) => {
        setDocs(data);

        setDocsTips(data.map(({ name }) => ({ label: name })));
      });
    }, 2000);
  };

  React.useEffect(() => {
    axios.get("http://localhost:8080/api/v1/users/xxx/docs").then((data) => {
      setDocs(data.filter((_, i) => i < 5));

      setDocsTips(
        data.filter((_, i) => i < 5).map(({ name }) => ({ label: name }))
      );
    });
  }, []);

  return (
    <main style={{ flex: 1, padding: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={docsTips}
          sx={{ width: 300 }}
          onChange={handleFilter}
          renderInput={(params) => <TextField {...params} label="Documentos" />}
        />
      </div>
      <section
        style={{
          width: "100%",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          {docs.map((doc, index) => (
            <Link key={doc.name} to={`/app/docs/${index}`}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <img
                  src="https://storage.googleapis.com/images.uiclap.com/capa/ua35024.jpg"
                  alt={doc.name}
                  width={160}
                  height={200}
                  style={{ borderRadius: "15px", marginBottom: "5px" }}
                />
                <span>
                  {index + 1} - {doc.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
        <Button onClick={handleLoadMore}>{btTitle}</Button>
      </section>
    </main>
  );
}
