import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import css from "../styles/sass/components/newEdit.module.scss";

function Forms({formInfo, sendData }) {
    const [addCheck, setAddCheck] = useState([]);
    const [category, setCategory] = useState(formInfo.category);
    const [kind, setKind] = useState(formInfo.kind);
    const [availableTimeDisabled, setAvailableTimeDisabled] = useState(formInfo.available_on == "00:00:00" && formInfo.available_off == "00:00:00");
    const [startTime, setStartTime] = useState("00:00:00");
    const [endTime, setEndTime] = useState("00:00:00");
    const [name, setName] = useState(formInfo.name);
    const [remarks, setRemarks] = useState(formInfo.remarks);
    const [nameVisible, setNameVisible] = useState(false);
    const [timeVisible, setTimeVisible] = useState(false);
    const inputText = useRef<HTMLInputElement | null>();
    const inputTime1 = useRef<HTMLInputElement | null>();
    const inputTime2 = useRef<HTMLInputElement | null>();
    useEffect(() => {
        setCategory(formInfo.category);
        setKind(formInfo.kind);
        setAvailableTimeDisabled(formInfo.available_on == "00:00:00" && formInfo.available_off == "00:00:00");
        setStartTime(formInfo.available_on);
        setEndTime(formInfo.available_off);
        setName(formInfo.name);
        setRemarks(formInfo.remarks);
        let tempAddCheck = [];
        if(formInfo.warm_toilet_seat) tempAddCheck.push("温水洗浄便座")
        if(formInfo.seat_cleaner) tempAddCheck.push("便座クリーナー")
        if(formInfo.luggage_storage) tempAddCheck.push("荷物置き・服掛け")
        if(formInfo.ostomate) tempAddCheck.push("オストメイト対応")
        if(formInfo.barrier) tempAddCheck.push("バリアフリー対応")
        if(formInfo.crib) tempAddCheck.push("おむつ交換設備")
        if(formInfo.parking) tempAddCheck.push("駐車場")
        if(formInfo.by_gender) tempAddCheck.push("男女別")
        if(formInfo.powder_room) tempAddCheck.push("パウダールーム")
        setAddCheck(tempAddCheck);
    }, [formInfo]);

    function addEdit(e) {
        if (name == "" || name == null) {//施設名の入力が無かった場合アラートを表示
            inputText.current.style.backgroundColor = '#ffcdd2';
            setNameVisible(!nameVisible);
        }
        if (startTime === "" || startTime === null) {//開始時間の入力がない場合にアラートを表示
            inputTime1.current.style.backgroundColor = '#ffcdd2';
            setTimeVisible(true)
        }
        if (endTime === "" || endTime === null) {//終了時間の入力がない場合にアラートを表示
            inputTime2.current.style.backgroundColor = '#ffcdd2';
            setTimeVisible(true)
        }
        if (nameVisible === false || timeVisible === false) {//バリデーションをクリアしたら、入力データを連想配列に入れてaxiosで送信
            let submission = {
                name: name,
                longitude: formInfo.longitude,
                latitude: formInfo.latitude,
                category: category,
                kind: kind,
                available_on: startTime,
                available_off: endTime,
                remarks: remarks,
                warm_toilet_seat: addCheck.includes("温水洗浄便座"),
                seat_cleaner: addCheck.includes("便座クリーナー"),
                luggage_storage: addCheck.includes("荷物置き・服掛け"),
                ostomate: addCheck.includes("オストメイト対応"),
                barrier: addCheck.includes("バリアフリー対応"),
                crib: addCheck.includes("おむつ交換設備"),
                parking: addCheck.includes("駐車場"),
                by_gender: addCheck.includes("男女別"),
                powder_room: addCheck.includes("パウダールーム"),
                accepted: formInfo.accepted,
                reports: formInfo.reports,
            };
            // let submission = {name:'test', longitude: 0.0,latitude: 0.0, category: 'test', available: '00:00:00', day_off: 'false', warm_toilet_seat: false, seat_cleaner: false, luggage_storage: false, ostomate: false, barrier: false, crib: false, parking: false, by_gender: false, powder_room: false}
            sendData(submission);
        }
    }

    function onChangedCheckbox(e) {
        const name = e.target.getAttribute("name");
        if (addCheck.includes(name)) {
            setAddCheck(addCheck.filter((elm) => elm !== name))
        } else {
            setAddCheck([...addCheck, name]);
        }
    }

    function onChangedRadioButton(e) {
        if (e.target.getAttribute("data-type") == "category") {
            setCategory(e.target.getAttribute("name"));
        } else if (e.target.getAttribute("data-type") == "kind") {
            setKind(e.target.getAttribute("name"));
        }
    }

    function onClickdAvailableTime(e) {
        setAvailableTimeDisabled(e.target.checked);
        setStartTime("00:00");
        setEndTime("00:00");
    }

    function onChangeName(e) {
        setName(e.target.value);

    }


    return (
        <div className={css.newEdit}>
            <h2 className={css.newEdit__title}>施設名</h2>
            <input className={css.newEdit__table} ref={inputText} type="text" onChange={onChangeName} value={name} />
            <h2 className={css.newEdit__title}>カテゴリー</h2>
            <table className={css.newEdit__table}>
                <tbody>
                    <tr>
                        <th className={css.newEdit__input}>公衆トイレ</th>
                        <td>
                            <label className={`${css.newEdit__radioDecorate} ${css.newEdit__radioCategory}`}>
                                <input className={css.newEdit__radioCategory} type="radio" name="公衆トイレ" data-type="category" onChange={onChangedRadioButton} checked={category === "公衆トイレ"} defaultValue="ture" />
                                <span className={css.newEdit__dummy}></span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th className={css.newEdit__input}>店舗・施設トイレ</th>
                        <td>
                            <label className={`${css.newEdit__radioDecorate} ${css.newEdit__radioCategory}`}>
                                <input className={css.newEdit__radioCategory} type="radio" name="店舗・施設トイレ" data-type="category" onChange={onChangedRadioButton} checked={category === "店舗・施設トイレ"} />
                                <span className={css.newEdit__dummy}></span>
                            </label>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h2 className={css.newEdit__title}>様式</h2>
            <table className={css.newEdit__table}>
                <tbody>
                    <tr>
                        <th className={css.newEdit__input}>洋式</th>
                        <td>
                            <label className={`${css.newEdit__radioDecorate} ${css.newEdit__radioStyle}`}>
                                <input  type="radio" name="洋式" defaultValue="" data-type="kind" onChange={onChangedRadioButton} checked={kind == "洋式"} />
                                <span className={css.newEdit__dummy}></span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th className={css.newEdit__input}>和式</th>
                        <td>
                            <label className={`${css.newEdit__radioDecorate} ${css.newEdit__radioStyle}`}>
                                <input type="radio" name="和式" defaultValue="" data-type="kind" onChange={onChangedRadioButton} checked={kind == "和式"} />
                                <span className={css.newEdit__dummy}></span>
                            </label>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h2 className={css.newEdit__title}>設備の充実度チェック</h2>
            <table className={css.newEdit__table}>
                <tbody>
                    <tr><th className={css.newEdit__input}>温水洗浄便座</th>
                        <td><input className={css.newEdit__check} type="checkbox" name="温水洗浄便座" checked={addCheck.includes("温水洗浄便座")} onChange={onChangedCheckbox} /></td></tr>
                    <tr><th className={css.newEdit__input}>便座クリーナー</th>
                        <td><input className={css.newEdit__check} type="checkbox" name="便座クリーナー" checked={addCheck.includes("便座クリーナー")} onChange={onChangedCheckbox} /></td></tr>
                    <tr><th className={css.newEdit__input}>荷物置き・服掛け</th>
                        <td><input className={css.newEdit__check} type="checkbox" name="荷物置き・服掛け" checked={addCheck.includes("荷物置き・服掛け")} onChange={onChangedCheckbox} /></td></tr>
                    <tr><th className={css.newEdit__input}>オストメイト対応</th>
                        <td><input className={css.newEdit__check} type="checkbox" name="オストメイト対応" checked={addCheck.includes("オストメイト対応")} onChange={onChangedCheckbox} /></td></tr>
                    <tr><th className={css.newEdit__input}>バリアフリー対応</th>
                        <td><input className={css.newEdit__check} type="checkbox" name="バリアフリー対応" checked={addCheck.includes("バリアフリー対応")} onChange={onChangedCheckbox} /></td></tr>
                    <tr><th className={css.newEdit__input}>おむつ交換設備</th>
                        <td><input className={css.newEdit__check} type="checkbox" name="おむつ交換設備" checked={addCheck.includes("おむつ交換設備")} onChange={onChangedCheckbox} /></td></tr>
                    <tr><th className={css.newEdit__input}>駐車場</th>
                        <td><input className={css.newEdit__check} type="checkbox" name="駐車場" checked={addCheck.includes("駐車場")} onChange={onChangedCheckbox} /></td></tr>
                    <tr><th className={css.newEdit__input}>男女別</th>
                        <td><input className={css.newEdit__check} type="checkbox" name="男女別" checked={addCheck.includes("男女別")} onChange={onChangedCheckbox} /></td></tr>
                    <tr><th className={css.newEdit__input}>パウダールーム</th>
                        <td><input className={css.newEdit__check} type="checkbox" name="パウダールーム" checked={addCheck.includes("パウダールーム")} onChange={onChangedCheckbox} /></td></tr>
                </tbody>
            </table>
            <h2 className={css.newEdit__title}>利用可能な時間</h2>
            <table className={css.newEdit__table}>
                <tbody>
                    <tr><th className={css.newEdit__input}>24時間利用可能</th>
                        <td><input className={css.newEdit__checkTime} type="checkbox" name="24時間利用可能" checked={availableTimeDisabled} onChange={onClickdAvailableTime} /></td></tr>
                    <tr><th className={css.newEdit__input}>開始時間</th>
                        <td><input className={css.newEdit__time} type="time" name="開始時間" ref={inputTime1} value={startTime} disabled={availableTimeDisabled} onChange={(e) => setStartTime(e.target.value)} /></td></tr>
                    <tr><th className={css.newEdit__input}>終了時間</th>
                        <td><input className={css.newEdit__time} type="time" name="終了時間" ref={inputTime2} value={endTime} disabled={availableTimeDisabled} onChange={(e) => setEndTime(e.target.value)} /></td></tr>
                </tbody>
            </table>
            <h2 className={css.newEdit__title}>備考</h2>
            <input className={css.newEdit__table} type="text" placeholder='定休日など' value={remarks} onChange={(e) => setRemarks(e.target.value)} />

            {nameVisible && <p>「施設名」を入力してください</p>}
            {timeVisible && <p>「利用可能な時間」を指定してください</p>}
            <button className={css.newEdit__submit} onClick={addEdit}>送信</button>
        </div>
    )
}

export default Forms;