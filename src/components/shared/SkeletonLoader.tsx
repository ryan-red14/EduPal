"use client";

import React from "react";

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="w-full space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="border-b border-border-default/20 pb-4 space-y-2">
        <div className="h-8 w-48 bg-surface/80 rounded-lg" />
        <div className="h-4 w-96 bg-surface/50 rounded-lg" />
      </div>

      {/* Grid of Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="h-24 rounded-xl border border-border-default bg-surface/50 p-5 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="h-3 w-16 bg-surface/80 rounded" />
              <div className="h-6 w-24 bg-surface rounded" />
            </div>
            <div className="self-end h-8 w-8 bg-surface rounded-lg" />
          </div>
        ))}
      </div>

      {/* Main split sections skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 rounded-xl border border-border-default bg-surface/50 p-6 space-y-4 h-64" />
        <div className="lg:col-span-2 rounded-xl border border-border-default bg-surface/50 p-6 space-y-4 h-64" />
      </div>
    </div>
  );
};
