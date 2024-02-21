import React from "react";
import ReactDOM from "react-dom";

export default function ModalPortal({ children }: { children: React.ReactNode }) {
  const element = document.getElementById("portal");
  if (!element) return;
  return ReactDOM.createPortal(children, element);
}
