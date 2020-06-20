import React, { useState, useEffect } from 'react'
import { GoogleMap,  Marker, InfoWindow, useLoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api'
import * as kazanData from "./data/map-kazan.json"
import mapStyles from "./mapStyles"

export default () => {
    const [selectedKazan, setSelectedKazan] = useState(null)
    const [res, setRes] = useState(null)
    const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY })

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedKazan(null)
      }
    }
    window.addEventListener("keydown", listener)

    return () => {
      window.removeEventListener("keydown", listener)
    }
  }, [])



    const  directionsCallback = response => {
      console.log(response)

      if (response !== null && res === null) {

        if (response.status === 'OK') {
        setRes(response)
        } else {
          console.log('response: ', response)
        }
      }
      }



      let pointWay = kazanData.default.filter(kazan => {
      if(kazan.categories[0] !== 'Restaurant' && kazan.categories[1] !== 'Restaurant') {
       return kazan
      }
    }).map(item => {
      return {location: { lat : item.lat, lng: item.lng }, stopover: true}
    } )



let [start, finish, ...points] = pointWay

  let component = (
    <GoogleMap
      defaultZoom={13.5}
      options={{ styles: mapStyles }} >
        {
          kazanData.default.map(kazan =>{
            let img = 'https://icon-icons.com/icons2/619/PNG/32/church-black-silhouette-with-a-cross-on-top_icon-icons.com_56737.png'
            if(kazan.categories[0] === 'Restaurant' || kazan.categories[1] === 'Restaurant') {
              img =  `https://icon-icons.com/icons2/936/PNG/32/fork-and-knife-silhouette_icon-icons.com_73555.png`
            }

            return (

          <Marker
            key={kazan.lat + kazan.lng}
            position={{
              lat: kazan.lat,
              lng: kazan.lng
            }}
            onClick={() => { setSelectedKazan(kazan); }}
            icon={{ url: img }} / >
          )}

          )
        }

        {selectedKazan && (

          <InfoWindow
            onCloseClick={() => { setSelectedKazan(null) }}
            position={{
              lat: selectedKazan.lat,
              lng: selectedKazan.lng
            }}
            zoomOnClick={false}
          >
            <div >

              <h1>{selectedKazan.wikipedia_title}</h1>

              <img className='img' src={'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Russia_political_location_map_%28Crimea_disputed%29.svg/800px-Russia_political_location_map_%28Crimea_disputed%29.svg.png'} alt="img"/>

              <h3>Kатегория: {selectedKazan.categories[0]}</h3>
              <h4>Рейтинги в facebook: {selectedKazan.facebook_rating}</h4>
            </div>
          </InfoWindow>
        )
      }

      <DirectionsService
        options={{
          destination:  { lat : finish.location.lat, lng : finish.location.lng },
          origin:  { lat : start.location.lat, lng : start.location.lng },
          travelMode: 'WALKING',
          optimizeWaypoints: true,
          waypoints: points
        }}
        callback={directionsCallback}
      />


      <DirectionsRenderer
        options={{
          directions: res,
        }}
      />

      </GoogleMap>
  )

     return (

      <div style={{ width: "100vw", height: "100vh" }} >
          {isLoaded ? component : <h1>Loading...</h1>}

      </div>
     )
  }
