import React, { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Box } from '@mui/material';

const useStyles = {
    mapStyles: {
        width: "100%", 
        height: "550px",
        borderRadius: "20px"
    }
}

declare global {
    interface Window {
        google: any;
    }
}

interface IParkingLotMap {
    locationDetails: any;
    setLocationDetails: (val: any) => void;
}

const ParkingLotMap: React.FC<IParkingLotMap> = ({locationDetails, setLocationDetails}) => {

    useEffect(() => {
        const loader = new Loader({
            apiKey: 'AIzaSyCDOKhVpr0TkHSbzVMU2r2JIG6KdZTGkTg',
        });

        loader
        .importLibrary('maps')
        .then(({Map}) => {
            initMap(Map);
        });
    }, []);

    const initMap = (Map: typeof google.maps.Map) => {
        const map = new Map(document.getElementById("google-map")!, {
            center: { lat: 33.30898917179678, lng: -111.67290639333699 },
            zoom: 10,
            mapTypeId: window.google.maps.MapTypeId.ROADMAP
        });

        const directions = new window.google.maps.DirectionsService();

        const renderer = new window.google.maps.DirectionsRenderer({
            map: map,
            panel: document.getElementById('directions-panel')
        });

        const lineCoordinates = [
            { lat: 33.308639057073734, lng: -111.67237008832493 },
            { lat: 33.30910671489029, lng: -111.67236209425023 },
            { lat: 33.3091061169168, lng: -111.67272728498723 },
            { lat: 33.309333636578835, lng: -111.67272728498672 },
            { lat: 33.30934036128903, lng: -111.6729874592612 },
            { lat: 33.30938070953797, lng: -111.67298611815662 },
            { lat: 33.30938, lng: -111.67336 },
            { lat: 33.30933, lng: -111.67336 },
            { lat: 33.30934098739088, lng: -111.67350852699946 },
            { lat: 33.30874970560407, lng: -111.67351853665872 },
            { lat: 33.30870263230671, lng: -111.67352255998867 },
            { lat: 33.308697028341314, lng: -111.67287078318411 },
            { lat: 33.308607364834764, lng: -111.67286407766883 },
            { lat: 33.30857149940743, lng: -111.67283189115884 },
            { lat: 33.30855692907336, lng: -111.67280641017177 },
            { lat: 33.30854460032724, lng: -111.6727514248839 },
            { lat: 33.30854123794164, lng: -111.67249259170914 },
            { lat: 33.30853227157938, lng: -111.67239603217921 },
        ];

        const line = new window.google.maps.Polyline({
            path: lineCoordinates,
            geodesic: true,
            strokeColor: '#808080',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        line.setMap(map);

        // Start tracking user's location
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    const userLatLng = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    map.setCenter(userLatLng);
                    calculateAndDisplayRoute(userLatLng, directions, renderer);
                    console.log('agdvfsdbgf');
                },
                (error) => {
                    console.error('Error getting location:', error);
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    };

    const calculateAndDisplayRoute = (userLatLng: any, directions: any, renderer: any) => {
        directions.route({
            origin: userLatLng,
            destination: { lat: 33.30935854018332, lng: -111.673350662735 },
            travelMode: 'DRIVING'
        }, (response: any, status: any) => {
            if (status === 'OK') {
                renderer.setDirections(response);
                setLocationDetails(response.routes[0].legs[0]);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    };

    return (
        <div>
            <Box id="google-map" style={useStyles.mapStyles}></Box>
        </div>
    );
};

export default ParkingLotMap;
