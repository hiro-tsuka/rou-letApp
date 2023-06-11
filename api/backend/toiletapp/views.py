from django.shortcuts import render
from rest_framework import viewsets
from .models import Locations, Reviews
from .serializer import LocationSerializer, ReviewSerializer
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from .mail import gmail_send
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class CoordinateFilter(filters.FilterSet):
    min_latitude = filters.NumberFilter(field_name="latitude", lookup_expr="gte")
    max_latitude = filters.NumberFilter(field_name="latitude", lookup_expr="lte")
    min_longitude = filters.NumberFilter(field_name="longitude", lookup_expr="gte")
    max_longitude = filters.NumberFilter(field_name="longitude", lookup_expr="lte")
    

    class Meta:
        model = Locations
        fields = ["longitude","latitude","accepted"]

class LocationViewset(viewsets.ModelViewSet):
    queryset=Locations.objects.all()
    serializer_class=LocationSerializer
    filter_backends=[DjangoFilterBackend]
    filterset_class = CoordinateFilter

class ReviewViewset(viewsets.ModelViewSet):
    queryset=Reviews.objects.all()
    serializer_class=ReviewSerializer
    filterset_fields = ("location_id","id")

class SendEmail(APIView):
    def get(self,request,format=None):
        gmail_send(To="",Subject="test",MailBody="this is test")
    
        return Response("send")
    