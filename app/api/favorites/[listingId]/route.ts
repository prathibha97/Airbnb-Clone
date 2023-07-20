import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/lib/prismaDb';
import { NextResponse } from 'next/server';

interface IParams {
  listingId?: string;
}

export async function POST(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid Id');
  }

  let favoritesId = [...(currentUser.favoritesId || [])];

  favoritesId.push(listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoritesId,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid Id');
  }

  let favoritesId = [...(currentUser.favoritesId || [])];

  favoritesId = favoritesId.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoritesId,
    },
  });
  return NextResponse.json(user);
}
