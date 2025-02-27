"use client";

import React from 'react';
import { useCapsuleStore } from '@/app/_store/capsuleStore';

export default function CraftPage(): JSX.Element {
  const { addCapsule } = useCapsuleStore();
  
  const handleCreateCapsule = () => {
    const newCapsule = {
      id: Date.now().toString(),
      title: "New Capsule",
      content: "",
      createdAt: new Date().toISOString(),
      openAt: new Date().toISOString()
    };
    addCapsule(newCapsule);
  };

  return (
    <>
      <h1>Capsule Creation Page</h1>
      <button onClick={handleCreateCapsule}>Create Capsule</button>
    </>
  );
}
