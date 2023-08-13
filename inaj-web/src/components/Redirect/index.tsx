import React from "react";
import { Navigate } from "react-router-dom";

export default function Redirect({ to }: { to: string }) {
  return <Navigate to={to}></Navigate>;
}
