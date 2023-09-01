

import getCurrentUser from "../actions/getCurrentUser"
import getListings from "../actions/getListings";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";

// it's a server component
type Props = {}
const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    )
  }

  // reservations made by this user.
  const listings = await getListings({
    userId: currentUser.id
  }) || []

  if (listings.length <= 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="Looks like you have no properties."
        />
      </ClientOnly>
    )
  }

  // console.log(listings)

  return (
    <ClientOnly>
      <PropertiesClient
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}
export default PropertiesPage