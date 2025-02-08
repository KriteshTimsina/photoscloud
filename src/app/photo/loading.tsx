import React from "react";

export default function Loading() {
  return (
    <div className="container">
      <div className="flex items-center justify-between">
        <h1 className="h-8 w-32 animate-pulse rounded-md bg-slate-600/40 text-2xl font-bold"></h1>
        <div className="h-8 w-32 animate-pulse rounded-md bg-slate-600/40"></div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="aspect-square animate-pulse rounded-lg bg-slate-600/40"
          />
        ))}
      </div>
    </div>
  );
}
