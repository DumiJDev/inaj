import { Aside } from "./styles";
import { Home, Person, Description, Email, BarChart } from "@mui/icons-material";
import React from "react";
import { SidebarLink } from "./components";

export default function NavSideBar() {
  const links = [
    { to: "/app", label: "Dashboard", icon: <Home /> },
    { to: "/app/profile", label: "Meu perfil", icon: <Person  /> },
    { to: "/app/docs", label: "Meus Documentos", icon: <Description /> },
    { to: "/app/sends", label: "Agendar emails", icon: <Email /> },
    { to: "/app/regs", label: "Relatórios", icon: <BarChart /> },
  ];

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Aside>
      <ul>
        {links.map((link) => (
          <SidebarLink showLabel={windowWidth >= 400} key={link.to} {...link} />
        ))}
      </ul>
    </Aside>
  );
}
