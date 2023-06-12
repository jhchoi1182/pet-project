import React from "react";

export type TodoSlug = {
  params: {
    slug: string;
  };
};

export const generateMetadata = ({ params: { slug } }: TodoSlug) => {
  return {
    title: `나의 TODO: ${slug}`,
  };
};

export default function DetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
