import React from "react";

export type TodoId = {
  params: {
    id: string;
  };
};

export const generateMetadata = ({ params: { id } }: TodoId) => {
  return {
    title: `나의 TODO: ${id}`,
  };
};

export default function DetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
