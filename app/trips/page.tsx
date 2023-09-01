

import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";

// it's a server component
type Props = {}
const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if(!currentUser){
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
  const reservations = await getReservations({
    userId: currentUser.id
  })

  if(reservations.length <= 0){
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found"
          subtitle="Looks like you haven't reserved any trips."
        />
      </ClientOnly>
    )
  }

  // console.log(reservations)

  return (
    <ClientOnly>
      <TripsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}
export default TripsPage