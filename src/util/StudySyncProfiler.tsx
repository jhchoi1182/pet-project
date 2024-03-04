import React, { Profiler } from "react";

export default function StudySyncProfiler({ children, id }: { children: React.ReactNode; id: string }) {
  const onRender = (id: string, phase: string, actualDuration: number, baseDuration: number, startTime: number, commitTime: number) => {
    console.log("id ", id);
    console.log("phase ", phase);
    console.log("actualDuration ", actualDuration);
    console.log("baseDuration ", baseDuration);
    console.log("startTime ", startTime);
    console.log("commitTime ", commitTime);
    console.log("===============");
  };

  return (
    <Profiler id={id} onRender={onRender}>
      {children}
    </Profiler>
  );
}
