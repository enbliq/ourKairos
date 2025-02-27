"use client";

export default function TreasurePage({
  params: { id: treasureId },
}: {
  params: { id: string };
}) {
  return (
    <>
      <h1>Capsule Viewing Page</h1>
      <div>Current treasure id : {treasureId}</div>
    </>
  );
}
