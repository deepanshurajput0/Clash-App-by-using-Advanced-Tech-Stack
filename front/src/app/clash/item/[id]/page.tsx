import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import Navbar from '@/components/base/Navbar';
import AddClashItems from '@/components/clash/AddClashItems';
import { fetchClash } from '@/fetch/clashFetch';
import { ClashType } from '@/types';
import { getServerSession } from 'next-auth';
import React from 'react';

export default async function ClashItems({ params }: { params: { id: number } }) {
  const { id } = params
  const clash: ClashType | null = await fetchClash(id);
  const session = await getServerSession(authOptions)
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
      <div className=" mt-8 ml-4">
        <h1 className="text-2xl lg:text-4xl font-extrabold">{clash.title}</h1>
        <p className="text-lg">{clash.description}</p>
      </div>
      <AddClashItems token={session?.user?.token!} clashId={id} />
    </div>
  );
}
