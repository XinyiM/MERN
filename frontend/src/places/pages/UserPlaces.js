import React from 'react';
// import PlaceItem from '../components/PlaceItem';
import { useParams } from 'react-router-dom';
import PlaceList from '../components/PlaceList';

const DUMMY_PLACES = [
    {
      id: 'p1',
      title: 'Empire State Building',
      description: 'One of the most famous sky scrapers in the world!',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
      address: '20 W 34th St, New York, NY 10001',
      location: {
        lat: 40.7484405,
        lng: -73.9878584
      },
      creator: 'u1'
    },
    {
      id: 'p2',
      title: 'Empire State Building',
      description: 'One of the most famous sky scrapers in the world!',
      imageUrl: 'https://i.pinimg.com/originals/93/59/bd/9359bdc175e79914cad10e2105ee2e07.jpg',
      address: '20 W 34th St, New York, NY 10001',
      location: {
        lat: 40.7484405,
        lng: -73.9878584
      },
      creator: 'u4'
    }
  ];

const UserPlaces = () => {
    // access the userId encoded in the url
    const userId = useParams().userId;
    // console.log(userId);
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId); 
    return <PlaceList items={loadedPlaces}/>

}

export default UserPlaces;