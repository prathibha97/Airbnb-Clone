import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById';

import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';

import getReservations from '@/app/actions/getReservations';
import ListingClient from './ListingClient';

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        //@ts-ignore
        listing={listing}
        //@ts-ignore
        currentUser={currentUser}
        //@ts-ignore
        reservations={reservations}
      />
    </ClientOnly>
  );
};

export default ListingPage;
