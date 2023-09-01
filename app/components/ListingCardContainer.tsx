
import getCurrentUser from "../actions/getCurrentUser";
import getListings, { IListingParams } from "../actions/getListings"
import ClientOnly from "./ClientOnly";
import EmptyState from "./EmptyState";
import ListingCard from "./listings/ListingCard";

interface Props {
  searchParams: IListingParams
}
const ListingCardContainer = async ({searchParams} : Props) => {

  // return(<div>Hello world</div>)
  const listings = await getListings(searchParams) || [];
  const currentUser = await getCurrentUser();

  if(listings.length <= 0){
    return(
      <ClientOnly>
        <EmptyState/>
      </ClientOnly>
    )
  }

  return (
    <>
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          data={listing}
          currentUser={currentUser}
        />
      ))}
    </>
  )
}
export default ListingCardContainer