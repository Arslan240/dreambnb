
// page is a server component so we can't use useRouter to get the params from url directly. But we can use actions becz it directly communicates with db. Nextjs passes params as props to page.tsx for all routes. So params will have url parameters automatically.

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById"
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface IParams {
  listingId?: string
}
const page = async ({params}: {params: IParams}) => {

  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);

  if(!listing){
    return (
      <ClientOnly>
        <EmptyState/>
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ListingClient 
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientOnly>
  )
}
export default page