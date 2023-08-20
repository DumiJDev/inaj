import React from "react";

import { Send } from "../../types/Send";
import { Pie } from "react-chartjs-2";
import content from "./file.pdf";

import { Chart, ArcElement } from "chart.js";
import { StatisticBlock } from "./components";
Chart.register(ArcElement);

const axios = {
  get: async (url: string): Promise<Array<Send>> => [
    {
      id: "1",
      content: "Oi",
      document: {
        encodedContent: content,
        lastUpdateDate: new Date(),
        name: "CV Java",
        uploadDate: new Date(),
      },
      lastSentDate: new Date(),
      name: "Dev Java Sr",
      periodicity: "dialy",
      sendDates: [new Date()],
      status: "ACTIVE",
    },
    {
      id: "2",
      content: "Oi 2",
      document: {
        encodedContent: content,
        lastUpdateDate: new Date(),
        name: "CV Java",
        uploadDate: new Date(),
      },
      lastSentDate: new Date(),
      name: "Dev Java Jr",
      periodicity: "dialy",
      sendDates: [new Date()],
      status: "ACTIVE",
    },
  ],
};

export default function Dashboard() {
  const [sends, setSends] = React.useState<Send[]>([]);
  const [sendsOk, setSendsOk] = React.useState<Send[]>([]);
  const [sendsFailed, setSendsFailed] = React.useState<Send[]>([]);

  React.useEffect(() => {
    axios.get("").then((data) => {
      setSends(data);
      setSendsFailed([data[0]]);
      setSendsOk([data[1]]);
    });
  }, []);

  return (
    <main style={{ flex: 1, padding: "10px" }}>
      <section
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        <StatisticBlock
          bgColor="#8c0a0a"
          color="#5c0a0a"
          label="Falhos"
          value={sendsFailed.length}
        />
        <StatisticBlock
          bgColor="#2de233"
          color="#07480b"
          label="Sucessos"
          value={sendsOk.length}
        />
      </section>
      <section
        style={{
          maxHeight: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <Pie
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: "bottom",
                labels: {
                  color: "#000",
                },
              },
            },
          }}
          data={{
            datasets: [
              {
                data: [
                  sendsFailed.length + 1000,
                  sendsOk.length + 444,
                ].reverse(),
                backgroundColor: ["#c33434", "#2fae3a"].reverse(),
                hoverBackgroundColor: ["#ff0000", "#00ff15"].reverse(),
                hoverBorderColor: "#fff",
              },
            ],
            labels: ["Falhas", "Sucessos"].reverse(),
          }}
          height={50}
          width={50}
        />
      </section>
    </main>
  );
}
