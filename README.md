# サイト概要
![Logo](https://github.com/hiro-tsuka/rou-letApp/assets/59140769/38ad9c1f-28ce-4910-9833-77d88ef63a84)
サイトURL：https://rou-let.com/  
行ったことのあるトイレの情報を共有できるマップアプリです。
制作者がライブに行ったときにトイレの大行列で不便な思いをしたことが開発のきっかけとなったアプリです。
「ライブなどのイベントでトイレの行列を避けたい、少し遠くても他のトイレに行きたい時」
「旅行などの遠出中に土地勘のない場所で急にトイレに行きたくなった時」
などでの利用を想定しています。
  
# 使用技術  
### フロントエンド  
React/Next.js
### バックエンド  
DjangoRestFramework  
### インフラ  
Docker   

## 機能一覧
●トップ画面  
![firsttview](https://github.com/hiro-tsuka/rou-letApp/assets/59140769/6406ff19-a572-4053-9245-ac6c26089480)
トップ画面には各ボタンの説明があります。  
<br/>
<br/>
●トイレ情報詳細  
![detail](https://github.com/hiro-tsuka/rou-letApp/assets/59140769/4e1810d6-d39c-49e8-89b4-78b246f677a4)　　
地図上のピン（すでに登録されたトイレがあれば出現）をクリックすると、トイレの詳細情報が表示されます。  
<br/>
<br/>
●新規登録  
![newedit](https://github.com/hiro-tsuka/rou-letApp/assets/59140769/55854f3d-4674-437c-8cb6-c92a60062275)
右上の新規登録ボタンを押すと、地図上に十字のボインターが出現します。地図上の登録したい場所に照準を定めて左のフォームに詳細な情報を入力し、送信ボタンから送信します。
送信されたトイレ情報は運営者にメールで通知が行き、公序良俗に反する内容などでない場合は、送信内容が反映され新たなピンが立ちます。  
<br/>
<br/>
●現在地ボタン  
![current](https://github.com/hiro-tsuka/rou-letApp/assets/59140769/b079b838-4060-4620-b555-43c2b92d156c)  
現在地ボタンで現在地のピンに戻ることができます。
<br/>
<br/>
●レビュー機能
![review](https://github.com/hiro-tsuka/rou-letApp/assets/59140769/716ae89b-8cc4-4a98-b03b-ce9caee240ba)  
星による数値評価と、コメントを投稿することができます。  
