import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Forms from './forms'
import {url} from '../utils/url';
import css from "../styles/sass/components/edit.module.scss";

//Edit内FormInfoのstateの管理
type ExistingDetails = {
    name:string;
    longitude: number;
    latitude: number;
    category: string;
    kind: string;
    available_on: string;
    available_off: string;
    remarks: string;
    warm_toilet_seat: boolean;
    seat_cleaner: boolean;
    luggage_storage: boolean;
    ostomate: boolean;
    barrier: boolean;
    crib: boolean;
    parking: boolean;
    by_gender: boolean;
    powder_room: boolean;
    accepted: boolean;
    reports: number;
}

type EditDetails = {
    coodinate: number;
    details: number;
    
}

function Edit({ updateMap, coordinate, details, setDetails, setNewEditVisible, setEditVisible, setMarkDetailVisible }) {


    const [formInfo, setFormsInfo] = useState <ExistingDetails> ({
        name: "",
        longitude: coordinate ? coordinate.lng : 0.01,
        latitude: coordinate ? coordinate.lat : 0.01,
        category: "公衆トイレ",
        kind: "洋式",
        available_on: "",
        available_off: "",
        remarks: "",
        warm_toilet_seat: false,
        seat_cleaner: false,
        luggage_storage: false,
        ostomate: false,
        barrier: false,
        crib: false,
        parking: false,
        by_gender: false,
        powder_room: false,
        accepted: false,
        reports: 0,
    })

    useEffect(() => {
       axios.get(`${url}/api/locations/${details.id}/?format=json`).then((res) => {
        setFormsInfo(res.data);
       })
    }, [details]);


    return (
        <>
        <button className={css.button} onClick={() => {
            setEditVisible(false);
            setNewEditVisible(false);
            setMarkDetailVisible(true);
        }}>キャンセル</button>
            <Forms formInfo={formInfo} sendData={(submission) => {
                axios.put(`${url}/api/locations/${details.id}/?format=json`, submission, { withCredentials: true, headers: { 'Content-type': "application/json; charset=utf-8", 'X-CSRFToken': Cookies.get('csrftoken') } }).then((res) => {
                    setDetails(res.data);
                    updateMap.current && updateMap.current();
                    setNewEditVisible(false);
                    setEditVisible(false);
                    setMarkDetailVisible(true);
                })
            }}></Forms>
        </>
    )
}

export default Edit;