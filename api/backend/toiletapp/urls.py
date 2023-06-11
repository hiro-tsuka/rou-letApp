from rest_framework import routers
from .views import LocationViewset, ReviewViewset
from django.urls import path
from .views import SendEmail
router=routers.DefaultRouter()
router.register('locations',LocationViewset)
router.register('reviews',ReviewViewset)
# routerにemail用のURLを追加
urlpatterns = [
    path('email',SendEmail.as_view(),name="SendEmail")
]
# apps.pyはstrictmodeのように2回処理が実行されてしまうので、１度だけ処理が実行されるurl.pyにupdate.pyに記述した処理を記述
urlpatterns+=router.urls
from .update import start
start()