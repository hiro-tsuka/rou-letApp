import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import css from "../styles/sass/components/markDetail.module.scss"
import {url} from '../utils/url';

function markDetail({ updateMap, details, setDetails, setEditVisible, setNewEditVisible, setMarkDetailVisible }) {
  const [contents, setContents] = useState();
  const [reviewName, setReviewName] = useState("");
  const [reviewStar, setReviewStar] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [currnetReview, setCurrentReview] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [wasReported, setWasReported] = useState(false);

  function reviewSubmit() {
    // location_id =  models.ForeignKey(Locations, on_delete=models.CASCADE)
    // comment = models.TextField()
    // star = models.IntegerField()
    // is_name = models.CharField(max_length=10)
    const submission = {
      location_id: details.id,
      comment: reviewText,
      star: reviewStar,
      is_name: reviewName
    }
    axios.post(`${url}/api/reviews/?format=json`, submission, { withCredentials: true, headers: { 'Content-type': "application/json; charset=utf-8", 'X-CSRFToken': Cookies.get('csrftoken') } }).then((res) => {
      // stateを初期化
      setReviewName("")
      setReviewStar(0);
      setReviewText("");
      getInfo();
    }).catch((res) => { console.log(res) })
  }

  function getInfo() {
    axios.get(`${url}/api/reviews/?format=json&location_id=${details.id}`, { withCredentials: true, headers: { 'Content-type': "application/json; charset=utf-8", 'X-CSRFToken': Cookies.get('csrftoken') } }).then((res) => {
      setCurrentReview(res.data);
    }).catch((res) => { console.log(res) })
  }

  useEffect(() => {
    setWasReported(false);
    getInfo();
  }, [details.id])

  function removeRequest() {
    axios.put(`${url}/api/locations/${details.id}/?format=json`, { ...details, reports: details.reports + 1 }, { withCredentials: true, headers: { 'Content-type': "application/json; charset=utf-8", 'X-CSRFToken': Cookies.get('csrftoken') } }).then((res) => {
      setDetails(res.data);
      updateMap.current && updateMap.current();
      setWasReported(true);
    }).catch((res) => { console.log(res) })
  }


  return (
    <>
        <div className={css.markDetail}>

          <div className={css.content}>
            <h1 className={css.content__name}>{details.name}</h1>
          </div>

          <div className={css.tags}>
            <p className={details.category == "公衆トイレ" ? css.tags__category1 : css.tags__category2 }>{details.category}</p>
            <p className={css.tags__type}>{details.kind}</p>
          </div>

          <div className={css.availableTime}>
            <p className={css.availableTime__title}>利用可能時間：</p>
            {details.available_off == "00:00:00" && details.available_on == "00:00:00" ? <p className={css.availableTime__content}>24時間利用可能</p> : <p className={css.availableTime__content}>{details.available_on.slice(0, -3)}～{details.available_off.slice(0, -3)}</p>}
          </div>

          <div className={css.marks}>
            <p className={css.marks__title}>備考：</p>
            <p className={css.marks__content}>{details.marks}</p>
          </div>

          <div className={css.check}>
            <table className={css.check__table}>
              <thead>
                <tr>
                  <th>温水洗浄便座</th>
                  <th>便座クリーナー</th>
                  <th>荷物置き・服掛け</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{details.warm_toilet_seat && "〇"}</td>
                  <td>{details.seat_cleaner && "〇"}</td>
                  <td>{details.luggage_storage && "〇"}</td>
                </tr>
                <tr>
                  <th>オストメイト対応</th>
                  <th>バリアフリー対応</th>
                  <th>おむつ交換設備</th>
                </tr>
                <tr>
                  <td>{details.ostomate && "〇"}</td>
                  <td>{details.barrier && "〇"}</td>
                  <td>{details.crib && "〇"}</td>
                </tr>
                <tr>
                  <th>駐車場</th>
                  <th>男女別</th>
                  <th>パウダールーム</th>
                </tr>
                <tr>
                  <td>{details.parking && "〇"}</td>
                  <td>{details.by_gender && "〇"}</td>
                  <td>{details.powder_room && "〇"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={css.editButton}>
            <button
              onClick={() => {
                setEditVisible(true);
                setNewEditVisible(false);
                setMarkDetailVisible(false);
              }}>トイレ情報を編集する</button>
          </div>
        </div>


        {/* {contents?.map((content, index) => */}
        {/* レビュー表示部分 */}
        <div className={css.reviewWrap}>
          {currnetReview.map((review, index) => (
            ((!isOpen && index < 2) || (isOpen)) &&
            <div className={css.review} key={index}>
              <div>
                <h2 className={css.review__name}>{review.is_name}</h2>
              </div>
              <div>
                <p>{review.star}</p>
              </div>
              <div>
                <p className={css.review__text}>{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
        {currnetReview.length > 2 && <button className={css.reviewOpen} onClick={() => setIsOpen(!isOpen)}>{!isOpen ? "もっと見る" : "閉じる"}</button>}
        {/* )} */}

        {/* レビューフォーム */}
        <div className={css.reviewEdit}>
          <input className={css.reviewEdit__name} value={reviewName} onChange={(e) => { setReviewName(e.target.value) }} type="text" placeholder="ハンドルネームを書く" />
          <div className={css.reviewEdit__rate}>
            <input id="star5" type="radio" name="rate" value="5" checked={reviewStar == 5} onChange={() => {}} onClick={(e) => { setReviewStar(5) }} />
            <label htmlFor="star5">★</label>
            <input id="star4" type="radio" name="rate" value="4" checked={reviewStar == 4} onChange={() => {}} onClick={(e) => { setReviewStar(4) }} />
            <label htmlFor="star4">★</label>
            <input id="star3" type="radio" name="rate" value="3" checked={reviewStar == 3} onChange={() => {}} onClick={(e) => { setReviewStar(3) }} />
            <label htmlFor="star3">★</label>
            <input id="star2" type="radio" name="rate" value="2" checked={reviewStar == 2} onChange={() => {}} onClick={(e) => { setReviewStar(2) }} />
            <label htmlFor="star2">★</label>
            <input id="star1" type="radio" name="rate" value="1" checked={reviewStar == 1} onChange={() => {}} onClick={(e) => { setReviewStar(1) }} />
            <label htmlFor="star1">★</label>
          </div>
          <textarea className={css.reviewEdit__text} value={reviewText} onChange={(e) => { setReviewText(e.target.value) }} placeholder="レビューを書く"></textarea>
          <div className={css.reviewEdit__button}>
            <button
              onClick={() => {
                reviewSubmit();
              }}>レビューを送る</button>
          </div>
          <div className={css.deleteButton}>
            {!wasReported ? <button onClick={() => { removeRequest() }}>削除依頼</button> : <p>削除依頼を受付ました</p>}

          </div>
        </div>
    </>
  )
}

export default markDetail;