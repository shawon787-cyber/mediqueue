"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => null,
});

function subscribe(cb) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

function getSnapshot() {
  return document.documentElement.getAttribute("data-theme") === "dark";
}

function getServerSnapshot() {
  return false;
}

export default function DarkBackground() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!isDark) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
    >
      <Scene />
      <div className="absolute inset-0 bg-[#0675C1]/[0.04] blur-[100px]" />
    </div>
  );
}
