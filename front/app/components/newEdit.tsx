import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Forms from './forms'
import {url} from '../utils/url';
import css from "../styles/sass/components/newEdit.module.scss";

type NewEditProps = {
    coordinate: any;//ジェネリクスがつかえるかも？？
    setEditVisible:React.Dispatch<React.SetStateAction<boolean>>;
    setNewEditVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setMarkDetailVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function Newedit({ coordinate, setEditVisible, setNewEditVisible, setMarkDetailVisible}:NewEditProps) {

    const [formInfo, setFormsInfo] = useState({
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
        formInfo.longitude = coordinate ? coordinate.lng : 0.01
       formInfo.latitude = coordinate ? coordinate.lat : 0.01
    }, [coordinate]);


    return (
        <>
            <Forms formInfo={formInfo} sendData={(submission) => {
                axios.post(`${url}/api/locations/?format=json`, submission, { withCredentials: true, headers: { 'Content-type': "application/json; charset=utf-8", 'X-CSRFToken': Cookies.get('csrftoken') } }).then((res) => {
                    setNewEditVisible(false);
                })
            }}></Forms>
        </>
    )
}

export default Newedit;