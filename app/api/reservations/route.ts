import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'


export async function POST(
  request: Request
){
  const currentUser = await getCurrentUser();

  if(!currentUser){
    return NextResponse.error();
  }

  const body = await request.json();
  console.log(body.startDate)

  const {listingId, startDate, endDate, totalPrice} = body;

  if(!listingId || !startDate || !endDate || !totalPrice){
    return NextResponse.error();
  }

  const listingAdnReservation = await prisma.listing.update({
    where:{
      id: listingId
    },
    data:{
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice
        }
      }
    }
  })
  console.log(listingAdnReservation)
  return NextResponse.json(listingAdnReservation);

}