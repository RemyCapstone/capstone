import { MapContainer, TileLayer, Marker,Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

//https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2hhbmRha2VyaDY3IiwiYSI6ImNsMmd0aWd4NDA3NjUza212YTAyZ3UzaXMifQ.FaxDrtLhoOY_I4M_7L4EHA

const Map = () => {
  return (
    <MapContainer center={[40.7128,-73.950]} zoom={13} scrollWheelZoom={true} style={{minHeight: "1000px", width: "100%"}}>

       <TileLayer
            url="https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2hhbmRha2VyaDY3IiwiYSI6ImNsMmd0aWd4NDA3NjUza212YTAyZ3UzaXMifQ.FaxDrtLhoOY_I4M_7L4EHA"
            attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>"
        /> 
      <Marker 
      position={[40.8054,-74.0241]}
      draggable={false}
      animate={true}
      >
        <Popup>
          Hey ! you found me
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map