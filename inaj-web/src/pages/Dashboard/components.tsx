// Componente para exibir as estatísticas
export const StatisticBlock = ({
  label,
  value,
  color,
  bgColor,
}: {
  label: string;
  value: number;
  color: string;
  bgColor: string;
}) => (
  <div
    style={{
      background: bgColor,
      color: "#fff",
      height: "250px",
      minWidth: "250px",
      width: "40%",
      display: "grid",
      gridTemplateRows: "10% 70% 20%",
      textAlign: "center",
      marginBottom: "20px"
    }}
  >
    <div style={{ textAlign: "center", fontWeight: "bolder" }}>{label}</div>
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "44pt",
        fontWeight: "bolder",
      }}
    >
      {value}
    </div>
    <div
      style={{
        background: color,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {new Date().toDateString()}
    </div>
  </div>
);
