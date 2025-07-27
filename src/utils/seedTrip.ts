// utils/seedTrip.ts
import { db } from '../firebase';
import { doc, setDoc, collection } from 'firebase/firestore';

export async function seedSampleTrip(userId: string) {
  const tripId = 'sample-trip-2025';
  const tripRef = doc(db, 'trips', tripId);

  await setDoc(tripRef, {
    title: '巴黎自由行',
    ownerId: userId,
    collaborators: [],
    startDate: new Date('2025-09-22'),
    endDate: new Date('2025-09-24'),
    mode: 'timeline',
    createdAt: new Date(),
    days: ['2025-09-22', '2025-09-23', '2025-09-24']
  });

  const slotsRef = collection(db, `trips/${tripId}/days/2025-09-22/slots`);

  await setDoc(doc(slotsRef, 'morning'), {
    slotType: 'morning',
    options: [
      {
        name: '羅浮宮',
        type: 'spot',
        lat: 48.8606,
        lng: 2.3376,
        googleMapUrl: "https://maps.google.com/?q=Louvre+Museum",
        instagramUrl: 'https://www.instagram.com/explore/tags/louvre/'
      },
      {
        name: '奧賽美術館',
        type: 'spot',
        lat: 48.8600,
        lng: 2.3266,
        googleMapUrl: "https://maps.google.com/?q=Musée+d'Orsay",
        instagramUrl: 'https://www.instagram.com/explore/tags/museedorsay/'
      }
    ]
  });

  await setDoc(doc(slotsRef, 'lunch'), {
    slotType: 'lunch',
    options: [
      {
        name: 'Le Comptoir',
        type: 'meal',
        lat: 48.8519,
        lng: 2.3320,
        googleMapUrl: "https://maps.google.com/?q=Le+Comptoir+Paris",
        instagramUrl: 'https://www.instagram.com/lecomptoirparis/'
      }
    ]
  });

  await setDoc(doc(slotsRef, 'afternoon'), {
    slotType: 'afternoon',
    options: [
      {
        name: '塞納河遊船',
        type: 'spot',
        lat: 48.8584,
        lng: 2.2945,
        googleMapUrl: 'https://maps.google.com/?q=Seine+River+Cruise',
        instagramUrl: 'https://www.instagram.com/explore/tags/seineriver/'
      }
    ]
  });
}
