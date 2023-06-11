""" インポート文(編集不要) """
import smtplib
from email.mime.text import MIMEText
from email.header import Header
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
import os
charset = "iso-2022-jp"


def gmail_send(To,Subject,MailBody):
    
    """ 
    *****************************************
    メール設定（要編集）
    *****************************************
    """
    #SMTPサーバー接続・ログイン情報
    my_mail      = "test.toiletapp@gmail.com"
    app_password = "iounoecxkatcleix"
    # app_password = "cskdltparvpztyhb"
    smtp         = smtplib.SMTP("smtp.gmail.com",587)
    
    """ 
    *****************************************
    メール本文（編集不要）
    *****************************************
    """ 
    From    = my_mail
    Atesaki = To
    Kenmei  = Subject
    Body    = MailBody
    
    #メール本文
    msg = MIMEMultipart()
    msg.attach(MIMEText(Body))
    msg["Subject"] = Header(Kenmei.encode(charset),charset)


    """ メールサーバー接続（編集不要）"""
    #サーバー・ポート接続
    smtp.ehlo()
    #TLS暗号化
    smtp.starttls()
    #SMTPサーバーログイン
    smtp.login(my_mail,app_password)
    #メール送信
    smtp.sendmail(From,Atesaki,msg.as_string())
    #SMTPサーバー遮断
    smtp.quit()
    
    print("メールを送信しました。")