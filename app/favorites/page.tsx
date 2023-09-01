import getCurrentUser from "../actions/getCurrentUser"
import getFavoriteListings from "../actions/getFavoriteListings"
import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"
import FavoritesClient from "./FavoritesClient"


type Props = {}
const FavoritesPage = async (props: Props) => {
  const favListings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if(favListings.length <= 0){
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
      </ClientOnly>
    )
  }

  return (
      <ClientOnly>
        <FavoritesClient
          listings={favListings}
          currentUser={currentUser}
        />
      </ClientOnly>
  )

}
export default FavoritesPage