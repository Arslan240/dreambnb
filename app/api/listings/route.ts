import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'

export async function POST(
  request: Request
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { title, description, imageSrc, category, roomCount, bathroomCount, guestCount, location, price } = body

  // This actually does nothing because the error is thrown at destructuring and body will have keys which are present so we can't check for non existant keys becz they are not there to begin with.
  // Object.keys(body).forEach((value: any) => {
  //   if (!body[value]) {
  //     NextResponse.error();
  //   }
  // })

  const listing = await prisma.listing.create({
    data: {
      title, 
      description, 
      imageSrc, 
      category, 
      roomCount, 
      bathroomCount, 
      locationValue:location.value, 
      price:parseInt(price, 10),
      guestCount,
      userId: currentUser.id
    }
  })

  return NextResponse.json(listing)
}