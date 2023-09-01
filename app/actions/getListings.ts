import prisma from '@/app/libs/prismadb'

export interface IListingParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function (
  params: IListingParams
) {
  try {
    const { userId,
      guestCount,
      roomCount,
      bathroomCount,
      startDate,
      endDate,
      locationValue,
      category, } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId
    }

    if(category) {
      query.category = category;
    }

    if(roomCount){
      query.roomCount = {
        gte: +roomCount, // gte = greater than or equal to 
      }
    }
    if(guestCount){
      query.guestCount = {
        gte: +guestCount, // gte = greater than or equal to 
      }
    }
    if(bathroomCount){
      query.bathroomCount = {
        gte: +bathroomCount, // gte = greater than or equal to. + to make the string a number
      }
    }
    if(locationValue){
      query.locationValue = locationValue;
    }

    if(startDate && endDate){
      query.NOT = {
        reservations: {
          some: {
            OR: [
              { // our startDate is not between someone's startData and endDate.
                endDate: { gte: startDate },
                startDate: {lte: startDate}
              },
              { // our endDate is between someone's dateRange
                startDate: {lte: endDate},
                endDate: {gte: endDate}
              }
            ]
          }
        }
      }
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    })

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString()
    }))

    return safeListings;
  } catch (error: any) {
    // throw new Error(error)
    console.log(error)
    return null;
  }
}