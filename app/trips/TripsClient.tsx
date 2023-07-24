'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useState } from 'react';
import Container from '../components/Container';
import Heading from '../components/Heading';
import { toast } from '../hooks/use-toast';
import { SafeReservation, SafeUser } from '../types';
import ListingCard from '../components/listings/ListingCard';

interface TripsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

const TripsClient: FC<TripsClientProps> = ({ reservations, currentUser }) => {
  const router = useRouter()

  const [deletingId, setDeletingId] = useState('')

  const onCancel = useCallback((id:string)=>{
    setDeletingId(id)

    axios.delete(`/api/reservations/${id}`)
    .then(()=>{
      toast({
        title: 'Reservation cancelled'
      })
      router.refresh()
    })
    .catch((error)=>{
      toast({
        title: 'Uh-Oh something went wrong',
        description: error?.response?.data?.error,
        variant: 'destructive'
      });
    })
    .finally(()=>{
      setDeletingId('')
    })
  },[router])
  return (
    <Container>
      <Heading title='Trips' subtitle="Where you've been and you've going" />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel='Cancel reservation'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
