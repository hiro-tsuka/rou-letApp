// import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
// import { useState, useEffect, useRef } from 'react'
// import "leaflet/dist/leaflet.css";
// import L from 'leaflet';
// L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/';

// function LocationMarker() {
//   const [position, setPosition] = useState(null)

//   const map = useMapEvents({
//     locationfound(e) {
//       setPosition(e.latlng);
//       console.log(e.latlng);
//       map.flyTo(e.latlng, map.getZoom());
//     }
//   })

//   useEffect(() => {
//     map.locate()
//   }, [])

//   return position === null ? null : (
//     <Marker position={position} >
//       <Popup>You are here</Popup>
//     </Marker>
//   );
// }

// // function Locator (){
// //   const map = useMap();
// //   useEffect(()=>{
// //     map.locate()

// //   },[])
// //   return null
// // }


// function Crosshair({ map_position, visible }) {

//   const map = useMapEvents({
//     moveend() {
//       let centerMark = map.getCenter();
//       console.log(centerMark);
//     }
//   })

//   return (
//     <>
//       {map_position &&
//         <>
//           <div style={{ zIndex: "100000", position: "absolute", width: "30px", height: "4px", left: map_position.width * 0.5 - 13 + "px", top: map_position.height * 0.5 + "px", backgroundColor: "black" }}></div>
//           <div style={{ zIndex: "100000", position: "absolute", width: "4px", height: "30px", left: map_position.width * 0.5 + "px", top: map_position.height * 0.5 - 13 + "px", backgroundColor: "black" }}></div>
//         </>
//       }
//     </>
//   )
// }

// const Map = () => {
//   const [visible, setVisible] = useState(false);
//   const container_ref = useRef();
//   const [map_position, setMapPosition] = useState(null);

//   useEffect(() => {
//     const map_dom = document.getElementsByClassName("leaflet-container")[0];
//     setMapPosition(map_dom.getBoundingClientRect());
//     console.log(map_dom.getBoundingClientRect());
//   }, [container_ref])


//   return (
//     <>
//       <MapContainer
//         center={[35.6809591, 139.7673068]}
//         zoom={13}
//         scrollWheelZoom={false}
//         style={{ height: "100vh", width: "100%" }}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={[35.6809591, 139.7673068]}>
//           <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//           </Popup>
//         </Marker>

//         {/* <Locator/> */}
//         <LocationMarker />

//         {/* 画面中央の座標を表示 */}
//         {visible && <Crosshair map_position={map_position} visible={visible} />}

//       </MapContainer>
//       <button style={{ position: "absolute", top: "200px", left: "30px", zIndex: "100000" }} onClick={() => { setVisible(!visible); console.log(visible) }}>テスト</button>
//     </>
//   );
// };

// export default Map;