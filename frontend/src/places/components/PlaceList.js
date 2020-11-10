import React from 'react';

import Card from '../../shared/components/UIElements/Card.js';

import './PlaceList.css';
import './PlaceItem';
import PlaceItem from './PlaceItem';

const PlaceList = props => {
    // output a list of places
    if (props.items.length === 0) {
        return <div className="place-list center">
            <Card>
                <h2> No places found. Maybe create one?</h2>
                <button>Share Place</button>
            </Card>
        </div>
    }
    return <ul className='place-list'>
        {props.items.map(place => 
        <PlaceItem key={place.id} 
        id={place.id} 
        image={place.imageUrl} 
        title={place.title} 
        description={place.description} 
        address={place.address} 
        creatorId={place.creator} 
        coordinates={place.location} />)}
    </ul>
}

export default PlaceList;