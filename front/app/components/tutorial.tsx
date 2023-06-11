import css from "../styles/sass/components/tutorial.module.scss";

function Tutorial(){



return(
<div className={css.tutorial}>
    <article>
        <h1>使い方</h1>
        <div className={css.tutorial__contentsWrap}>
            <h2>・現在地周辺のトイレを探す</h2>
            <img className={css.tutorial__img} src="/genzaichi.png" alt="" />
            <p>「現在地ボタン」をクリックすると今自分がいる場所が表示されます。</p>
        </div>
        <div className={css.tutorial__contentsWrap}>
            <h2>・トイレ情報の詳細を確認する</h2>
            <img className={css.tutorial__img} src="/pin.png" alt="" />
            <p>地図上のピンをクリックすると、トイレ情報の詳細が表示されます。<br/><span style={{fontSize: '12px',fontWeight:'normal'}}>（ピンの色：青…公衆トイレ　緑…商業施設などの併設トイレ）</span></p>
        </div>
        <div className={css.tutorial__contentsWrap}>
            <h2>・新しくトイレ情報を登録する</h2>
            <img className={css.tutorial__img} src="/newbutton.png" alt="" />
            <p>新規トイレ情報を登録する場合は、右上の「新規登録」ボタンをクリックするとフォームが表示されます。<br/><span style={{fontSize: '12px',fontWeight:'normal'}}>（入力内容は運営によって精査されるため、すぐには反映されません）</span></p>
        </div>
        <div className={css.tutorial__contentsWrap}>
            <h2>・既存のトイレ情報を編集する</h2>
            <img className={css.tutorial__img} src="/edit.png" alt="" />
            <p>誤った情報の記載がある場合などには、地図上のピンをクリックすると表示される「トイレ情報を編集する」ボタンからトイレ情報を編集できます。</p>
        </div>
        <div className={css.tutorial__contentsWrap}>
            <h2>・既存のトイレ情報を削除する</h2>
            <img className={css.tutorial__img} style={{width:'80px'}} src="/delete.png" alt="" />
            <p>存在しないトイレ情報の記載がある場合などには、地図上のピンをクリックすると表示される「削除依頼」ボタンからトイレ情報の削除を依頼できます。</p>
        </div>
    </article>
</div>
)

}

export default Tutorial;