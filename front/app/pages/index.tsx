import { useState, useEffect, useMemo, useRef } from 'react';
import {useMedia} from 'react-use';
import React from "react";
import dynamic from "next/dynamic";
import Header from '../components/header';
import Newedit from '../components/newEdit';
import Edit from '../components/edit';
import Tutorial from '../components/tutorial';
import MarkDetail from '../components/markDetail';
import Log from '../components/log';
import css from "../styles/sass/components/index.module.scss";

// const Map = dynamic(() => import("../components/map-index.js"), {
//         loading: () => <p>A map is loading</p>,
//         ssr: false,
//       });

const Home = () => {
    //moovend毎に中心座標を取得する
    const [coordinate, setCoordinate] = useState();
    // エラーが出るため適当な初期値を代入
    const [details, setDetails] = useState({id:-1});
    const [newEditVisible, setNewEditVisible] = useState(false);
    const [markDetailVisible, setMarkDetailVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);

    //logのstate
    // const [auth, setAuth] = useState(false);

    // マップをアップデートするための関数 ==> max-indexのuseEffectで初期化・定義
    const updateMap = useRef();
    const isWide = useMedia('(min-width: 500px)', false);

    const Map = useMemo(
        () =>
          dynamic(() => import("../components/map-index"), {
            loading: () => <p>A map is loading</p>,
            ssr: false,
          }),
        []
      );


    return (
        // auth ? 
        <>
            <Header markDetailVisible={markDetailVisible} newEditVisible={newEditVisible} setNewEditVisible={setNewEditVisible} setMarkDetailVisible={setMarkDetailVisible} setEditVisible={setEditVisible} isWide={isWide}/>
            <article className={css.flexWrap}>
                <div className={css.mapArea}>
                    <Map updateMap={updateMap} visible={newEditVisible} coordinate={coordinate} setCoordinate={setCoordinate}  setDetails={setDetails} newEditVisible={newEditVisible} setNewEditVisible={setNewEditVisible} markDetailVisible={markDetailVisible} setMarkDetailVisible={setMarkDetailVisible} editVisible={editVisible}/>
                </div>
                <div className={css.interactionArea}>
                    { (!newEditVisible && !markDetailVisible && !editVisible) && <Tutorial/>}
                    {newEditVisible && <Newedit coordinate={coordinate} setEditVisible={setEditVisible} setNewEditVisible={setNewEditVisible} setMarkDetailVisible={setMarkDetailVisible}/>}
                    {/* 編集が画面に編集画面の非表示ボタンを配置しているため、新規投稿画面と編集画面の非表示のために非表示用Props（editVisible・）を全て送っている */}
                    {markDetailVisible && details.id != -1 && <MarkDetail updateMap={updateMap} details={details} setDetails={setDetails} setEditVisible={setEditVisible} setNewEditVisible={setNewEditVisible} setMarkDetailVisible={setMarkDetailVisible}/>}
                    {editVisible && <Edit updateMap={updateMap} coordinate={coordinate} details={details} setDetails={setDetails} setEditVisible={setEditVisible} setNewEditVisible={setNewEditVisible} setMarkDetailVisible={setMarkDetailVisible}/>}
                </div>
            </article>
        </>
        // : 
        // <Login setAuth={setAuth}/>
    )
}

export default Home;