import { useState, useEffect, useRef } from 'react'
// import './components/Map.css';
import L from '../node_modules/leaflet';
import './leaflet.sprite';
import '../node_modules/leaflet/dist/leaflet.css';
import '../node_modules/leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import Newedit from './newEdit.js';
L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/';
import css from "../styles/sass/components/map.module.scss";
import axios from 'axios';
import {url} from '../utils/url';

const category2color = {
  "公衆トイレ": "blue",
  "店舗・施設トイレ": "green"
}

function Crosshair({ map_position }) {

  return (
    <>
      {map_position &&
        <>
          <div style={{ zIndex: "100000", position: "absolute", width: "30px", height: "4px", left: map_position.width * 0.5 - 13 + "px", top: map_position.height * 0.5 + "px", backgroundColor: "black" }}></div>
          <div style={{ zIndex: "100000", position: "absolute", width: "4px", height: "30px", left: map_position.width * 0.5 + "px", top: map_position.height * 0.5 - 13 + "px", backgroundColor: "black" }}></div>
        </>
      }
    </>
  )
}


function Map({ updateMap, visible, setDetails, coordinate, setCoordinate, newEditVisible, setNewEditVisible, markDetailVisible, setMarkDetailVisible, editVisible }) {
  const [position, setPosition] = useState();
  // const [visible, setVisible] = useState(true);
  const container_ref = useRef();
  const [map_position, setMapPosition] = useState(null);
  const map_ref = useRef(null);
  const current_user_position = useRef();
  const center_ref = useRef();
  const displayed_markers = useRef([]);
  const selected_marker = useRef<any>();
  const editVisibleRef = useRef();

  useEffect(() => {
    editVisibleRef.current = editVisible;
  },[editVisible])

  useEffect(() => {
    
    //地図を表示するdiv要素のidを設定
    if (map_ref.current == null) {
      let map = L.map('mapcontainer', {
        center: [35.81937073825304, 139.70889148551595],
        zoom: 10,
        minZoom: 12,
        maxZoom: 18,
        preferCanvas: true,
      });
      map_ref.current = map;

      let popup = L.popup();

      // マップ更新関数を定義
      updateMap.current = () =>{
        center_ref.current = map.getCenter();
        setCoordinate(map.getCenter());
        const bounds = map_ref.current.getBounds();
        const max_latitude = bounds._northEast.lat;//地図の表示領域のなかで緯度（縦幅）の最大値（上）を取得
        const min_latitude = bounds._southWest.lat;//地図の表示領域のなかで緯度（縦幅）の最小値（下）を取得
        const max_longitude = bounds._northEast.lng;//地図の表示領域のなかで経度（横幅）の最大値（右）を取得
        const min_longitude = bounds._southWest.lng;//地図の表示領域のなかで経度（横幅）の最小値（左）を取得
        getLocationsInfo(max_latitude, min_latitude, max_longitude, min_longitude)//地図の表示領域の四隅の座標をget通信で送信する関数に渡す
      }

      //地図の中心とズームレベルを指定
      map.setView([35.40, 136], 5);
      //表示するタイルレイヤのURLとAttributionコントロールの記述を設定して、地図に追加する
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: "<a href='https://www.openstreetmap.org/copyright' target='_blank'>地理院タイル</a>"
      }).addTo(map);

      map.on("locationfound", (e) => {
        L.marker(e.latlng, { title: "現在地" }).addTo(map);
        map.flyTo(e.latlng, map.getZoom());
        current_user_position.current = e.latlng;
      });

      map.on("moveend", () => {//マウスドラッグでの地図内移動やズームイン・ズームアウトなど、地図の表示に変化が加わったら発火する
        updateMap.current(); // マップ更新
      });

      map.on("resize", () => {
        const map_dom = document.getElementsByClassName("leaflet-container")[0];
        setMapPosition(map_dom.getBoundingClientRect());
      })


      map.locate();
    }
  }, [])

  //地図の四隅の座標が渡されたら、その表示範囲内にあるマーカー（トイレ情報）をAPIに問い合わせて、取得するための関数（moovend時に使われる）
  function getLocationsInfo(max_latitude: string, min_latitude: string, max_longitude: string, min_longitude: string) {
    axios.get(`${url}/api/locations/?min_latitude=${min_latitude}&max_latitude=${max_latitude}&min_longitude=${min_longitude}&max_longitude=${max_longitude}&accepted=${true}&format=json`).then((res) => {
      //地図の表示範囲内のマーカーごとのトイレ情報を受け取り、マーカーを表示したり、クリックイベントを付与するための関数
      putMarkers(res.data);
    })
  }

  //現在地に戻るボタンの関数
  function reloadCurrent() {
    map_ref.current.flyTo(current_user_position.current, map_ref.current.getZoom());
  }

  //地図の表示範囲内のマーカーごとのトイレ情報を受け取り、マーカーを表示したり、クリックイベントを付与するための関数（表示範囲内のマーカー情報のget通信での取得する「getLocationsInfo」関数で利用される）
  function putMarkers(data) {
    for (let delete_marker of displayed_markers.current) {//moovendのたびに増えていってしまうピンを初回に削除
      map_ref.current.removeLayer(delete_marker.marker)
    }
    displayed_markers.current = [];//removeLayerメソッドではあくまで地図上表示範囲内に追加されたマーカー（mapオブジェクトにプロパティとして追加された）を削除しているにすぎず、useRefで受け取ったレスポンスデータの表示範囲内のマーカー情報は別途ここで初期化

    for (let location_info of data) {//location_infoには地図表示範囲内のマーカーの情報が入っている
      let marker;
      if (selected_marker.current && selected_marker.current.id == location_info.id) {//表示範囲のマーカーが、refに代入されているかを確認し、値がある場合はマップにピンを
        marker = L.marker([location_info.latitude, location_info.longitude], { icon: L.spriteIcon("red") }).addTo(map_ref.current);//クリックされたピンを赤に変更
      } else {
        marker = L.marker([location_info.latitude, location_info.longitude], { icon: L.spriteIcon(category2color[location_info.category]) }).addTo(map_ref.current);
      }
      marker.on("click", () => {
        displayed_markers.current.map((e) => {
          if (e.location_info.id == location_info.id) {
            e.marker.setIcon(L.spriteIcon("red"));
          } else {
            e.marker.setIcon(L.spriteIcon(category2color[e.location_info.category]));
          }
        })
        selected_marker.current = location_info;
        setDetails(location_info);
        if (!editVisibleRef.current) {
          setMarkDetailVisible(true);
          setNewEditVisible(false);
        }

      })
      displayed_markers.current.push({ marker, location_info });
    }
  }

  useEffect(() => {
    const map_dom = document.getElementsByClassName("leaflet-container")[0];
    setMapPosition(map_dom.getBoundingClientRect());
  }, [container_ref])

  return (
    <>
      <section className={css.map} style={{ position: "relative", }}>
        <div id="mapcontainer" className={css.map__contentArea}></div>
        {visible && <Crosshair map_position={map_position} />}
        {/* <button style={{position: "absolute", top: "200px", left: "10px", zIndex: "100000"}} onClick={()=>{setVisible(!visible); console.log(visible)}}>テスト</button> */}
        <button className={css.map__currentButton} onClick={() => { reloadCurrent() }}><img src="/current.png"/></button>
        {/* {visible && <button style={{ position: "absolute", top: "400px", left: "10px", zIndex: "100000" }} >決定</button>} */}
      </section>
      {/* {coordinate && <p>{coordinate.lat},{coordinate.lng}</p>} */}
    </>
  );
}


export default Map;
