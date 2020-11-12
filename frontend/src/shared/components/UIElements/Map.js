import React, { useRef, useEffect } from 'react';
// use Ref can be used to create references 
// get a reference of a real DOM node
import "./Map.css";

const Map = props => {
    const mapRef = useRef(); // a empty connection
    
    const { center, zoom } = props; 
    useEffect(() => {
        const map = new window.google.maps.Map(mapRef.current, {
            center: center,
            zoom: zoom
        });
        // create a new marker in the center of the map
        new window.google.maps.Marker({ position: center, map: map});    
    }, [center, zoom]);
    
    return (<div 
    ref={mapRef} // where connection is established
    className={`map ${props.className}`} 
    style={props.style}></div>);
};

export default Map;