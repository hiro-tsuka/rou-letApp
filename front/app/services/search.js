import { useState, useRef } from 'react';
import {municipalities} from './municipalities.js';

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    //ここでボックスの中身のスタイルをカスタマイズ
    maxWidth: "400px",
    borderBottom: "1px dotted blue",
    color: state.isSelected ? "red" : "blue",
    padding: 20,
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    //ここでボックス自体のスタイルをカスタマイズ
    maxWidth: "400px",
    display: "flex",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

const Search = ({ prefecturesVal,setPrefecturesVal, setMunicipalitiesVal}) => {
  //市区町村のドロップダウンを都道府県の選択が無いと操作できなくするためのref
  const displayRefs = useRef();

  //市区町村のドロップダウンで変更がでたらstateに代入
  const onChangedMunicipalities = (e) => {
    console.log(e.target.value);
    setMunicipalitiesVal(e.target.value);
  }
  //都道府県のドロップダウンで変更がでたらstateに代入
  const onChangedPrefectures = (e) => {
    setPrefecturesVal(e.target.value);
    displayRefs.current.disabled = false;
  }


  return (
    <>
      <select onChange={onChangedPrefectures} >
        <option value="">全域</option>
        <option value="北海道">北海道</option>
        <option value="岩手県">岩手県</option>
        <option value="宮城県">宮城県</option>
        <option value="秋田県">秋田県</option>
        <option value="山形県">山形県</option>
        <option value="福島県">福島県</option>
        <option value="茨城県">茨城県</option>
        <option value="栃木県">栃木県</option>
        <option value="群馬県">群馬県</option>
        <option value="埼玉県">埼玉県</option>
        <option value="千葉県">千葉県</option>
        <option value="東京都">東京都</option>
        <option value="神奈川県">神奈川県</option>
        <option value="新潟県">新潟県</option>
        <option value="愛知県">愛知県</option>
        <option value="三重県">三重県</option>
        <option value="滋賀県">滋賀県</option>
        <option value="京都府">京都府</option>
        <option value="大阪府">大阪府</option>
        <option value="兵庫県">兵庫県</option>
        <option value="奈良県">奈良県</option>
        <option value="和歌山県">和歌山県</option>
        <option value="鳥取県">鳥取県</option>
        <option value="島根県">島根県</option>
        <option value="岡山県">岡山県</option>
        <option value="佐賀県">佐賀県</option>
        <option value="広島県">広島県</option>
        <option value="長崎県">長崎県</option>
        <option value="大分県">大分県</option>
        <option value="宮崎県">宮崎県</option>
        <option value="鹿児島県">鹿児島県</option>
        <option value="沖縄県">沖縄県</option>
        <option value="千葉県">千葉県</option>
      </select>

      <select onChange={onChangedMunicipalities} ref={displayRefs} disabled >
        <option>全域</option>
        {municipalities[prefecturesVal]?.map((select, index) =>
          <option key={index} >{select}</option>
        )}
      </select>


    </>
  )
}

export default Search