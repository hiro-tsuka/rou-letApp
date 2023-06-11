import Head from 'next/head';
import React from 'react';
import css from "../styles/sass/components/header.module.scss";
import { useState, useEffect, useMemo, useRef } from 'react';

type HeaderProps = {
    className?: string;
    markDetailVisible: boolean;
    newEditVisible: boolean;
    setNewEditVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setMarkDetailVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setEditVisible: React.Dispatch<React.SetStateAction<boolean>>;
    isWide: boolean;
}


function Header({className, markDetailVisible, newEditVisible, setNewEditVisible, setMarkDetailVisible, setEditVisible, isWide }:HeaderProps) {
    const temp_mark_detail_visible = useRef<boolean>(false);
    
    return (
        <div className={className}>
            <Head>
                <meta charSet="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Document</title>
                <link href="https://unpkg.com/sanitize.css" rel="stylesheet" />
            </Head>
            <header className={css.headerWrap}>
                <div className={css.headerFlex}>
                    <div><img className={css.logo} src="/Logo.png" style={{ width: "140px" }} /></div>
                    <div className={css.headerContent}>
                        <div className={css.markerExample}>
                            <div><img src="/sprite-blue.png" /><p> 公衆トイレ</p></div>
                            <div><img src="/sprite-green.png" /><p> 施設・店舗トイレ</p></div>
                        </div>
                        <button className={isWide ? css.additionButton : css.mobileAdditionButton} onClick={() => { setNewEditVisible(!newEditVisible); if(!newEditVisible) temp_mark_detail_visible.current = markDetailVisible; (!newEditVisible) ? setMarkDetailVisible(false) : setMarkDetailVisible(temp_mark_detail_visible.current); setEditVisible(false) }}>{isWide ? "新規作成" : "+"}</button>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header;