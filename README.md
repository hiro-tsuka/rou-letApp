# サイト概要
![logo](https://github.com/hiro-tsuka/rou-letApp/front/app/public/Logo.png)
サイトURL：  
行ったことのあるトイレの情報を共有できるマップアプリです。
制作者がライブに行ったときにトイレの大行列で不便な思いをしたことが開発のきっかけとなったアプリです。
「ライブなどのイベントでトイレの行列を避けたい、少し遠くても他のトイレに行きたい時」
「旅行などの遠出中に土地勘のない場所で急にトイレに行きたくなった時」
などでの利用を想定しています。
  
# 使用技術  
### フロントエンド  
React/Next.js
採用理由：本アプリはトイレに行きたくなった時とっさに利用するシーンが多くなると予測し、next.jsのプリレンダリングでレスポンスを高速化しました。それにより、すばやく詳細情報を確認ができ、かつ少しでもトイレ情報の入力の協力いただけるように表示速度のストレスの軽減を目的に使用しました。  
### バックエンド  
DjangoRestFramework  
採用理由：postmanなどのサードパーティツールを使わなくても管理画面からデータの編集が行えるため使用しました。  
### インフラ  
Docker  
以前自主製作のsnsサイトでvagrant・virtualBox環境からHerokuにデプロイする際に苦労したので、デプロイのしやすさという観点からDockerを採用しました。  
  
## 機能一覧
●トップ画面  
![firsttview](https://github.com/hiro-tsuka/rou-letApp/front/app/public/readme/firsttview.PNG)
トップ画面には各ボタンの説明があります。  
<br/>
<br/>
●トイレ情報詳細  
![detail](https://github.com/hiro-tsuka/rou-letApp/front/app/public/readme/detail.PNG)　　
地図上のピン（すでに登録されたトイレがあれば出現）をクリックすると、トイレの詳細情報が表示されます。  
<br/>
<br/>
●新規登録  
![newedit](https://github.com/hiro-tsuka/rou-letApp/front/app/public/readme/newedit.PNG)
右上の新規登録ボタンを押すと、地図上に十字のボインターが出現します。地図上の登録したい場所に照準を定めて左のフォームに詳細な情報を入力し、送信ボタンから送信します。
送信されたトイレ情報は運営者にメールで通知が行き、公序良俗に反する内容などでない場合は、送信内容が反映され新たなピンが立ちます。  
<br/>
<br/>
●現在地ボタン  
![current](https://github.com/hiro-tsuka/rou-letApp/front/app/public/readme/current.PNG)
<br/>
<br/>
●レビュー機能
![review](https://github.com/hiro-tsuka/rou-letApp/front/app/public/readme/review.jpg)