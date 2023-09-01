
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb'

interface IParams {
  listingId?: string;
}

export async function POST(
  request: Request,
  {params} : {params: IParams}
){
  const curretnUser = await getCurrentUser();

  if(!curretnUser) return NextResponse.error();

  const {listingId} = params;

  if(!listingId || typeof listingId !== 'string'){
    throw new Error('Invalid ID');
  }

  let favoriteIds = [...(curretnUser.favoriteIds || [])]

  favoriteIds.push(listingId);

  const updatedUser = await prisma.user.update({
    where: {
      id: curretnUser.id
    },
    data: {
      favoriteIds
    }
  })

  return NextResponse.json(updatedUser)
}

export async function DELETE(
  request: Request,
  {params} : {params: IParams}
){
  const curretnUser = await getCurrentUser();

  if(!curretnUser) return NextResponse.error();

  const {listingId} = params;

  if(!listingId || typeof listingId !== 'string'){
    throw new Error('Invalid ID');
  }

  let favoriteIds = [...(curretnUser.favoriteIds || [])]
  favoriteIds = favoriteIds.filter((id) => id !== listingId)

  const updatedUser = await prisma.user.update({
    where: {
      id: curretnUser.id
    },
    data: {
      favoriteIds
    }
  })

  return NextResponse.json(updatedUser)
}