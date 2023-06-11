from rest_framework import serializers
from .models import Locations, Reviews

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Locations
        # fields=('id','name','longitude','latitude')
        # すべてのフィールドを取り出せる
        fields= "__all__" 
        read_only_fields = ('created_at', 'updated_at')

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model=Reviews
        # fields=('id','name','longitude','latitude')
        # すべてのフィールドを取り出せる
        fields= "__all__" 
        read_only_fields = ('created_at', 'updated_at')