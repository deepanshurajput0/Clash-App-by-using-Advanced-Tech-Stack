import Navbar from '@/components/base/Navbar';
import { fetchClash } from '@/fetch/clashFetch';
import { ClashType } from '@/types';
import React from 'react';

export default async function ClashItems({ params }: { params: { id: string } }) {
  const clashId = Number(params.id); // No need to await `params`, it's already resolved
  const clash: ClashType | null = await fetchClash(clashId);

  if (!clash) {
    return (
      <div className="container">
        <Navbar />
        <div className="mt-4">
          <h1 className="text-2xl lg:text-4xl font-extrabold">Clash Not Found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Navbar />
      <div className="mt-4">
        <h1 className="text-2xl lg:text-4xl font-extrabold">{clash.title}</h1>
        <p className="text-lg">{clash.description}</p>
      </div>
    </div>
  );
}
