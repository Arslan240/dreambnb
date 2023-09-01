import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb'

interface IParams {
  reservationId?: string
}

export async function DELETE(
  request: Request,
  {params} : {params: IParams}
){
  const currentUser = await getCurrentUser();
  
  if(!currentUser){
    return NextResponse.error();
  } 

  const {reservationId} = params;

  if(!reservationId || typeof reservationId !== 'string'){
    throw new Error('Invalid ID');
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [ // here it means either house owner or customer who made the reservation can delete the reservation.
        { userId: currentUser.id },
        {listing: { userId: currentUser.id }}
      ]
    },

  });

  return NextResponse.json(reservation);
}