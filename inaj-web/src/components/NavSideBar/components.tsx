import { Link, useLocation } from "react-router-dom";

export const SidebarLink = ({
  to,
  label,
  icon,
  showLabel,
}: {
  to: string;
  label: string;
  icon: JSX.Element;
  showLabel: boolean;
}) => {
  const location = useLocation();

  return (
    <li
      style={{
        background: location.pathname === to ? "#fff" : "transparent",
      }}
    >
      <Link
        style={{
          color: location.pathname === to ? "#5c33f6" : "#fff",
        }}
        to={to}
      >
        {icon}
        {showLabel && <span style={{ marginLeft: "10px" }}>{label}</span>}
      </Link>
    </li>
  );
};
