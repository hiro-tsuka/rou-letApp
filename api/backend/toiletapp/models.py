from django.db import models


# Create your models here.

class Locations(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=32)
    longitude = models.FloatField()
    latitude = models.FloatField()
    category = models.CharField(max_length=8)
    kind = models.CharField(max_length=8)
    available_on = models.TimeField()
    available_off = models.TimeField()
    remarks = models.CharField(max_length=128,blank=True)
    warm_toilet_seat = models.BooleanField()
    seat_cleaner = models.BooleanField()
    luggage_storage  = models.BooleanField()
    ostomate = models.BooleanField()
    barrier = models.BooleanField()
    crib = models.BooleanField()
    parking = models.BooleanField()
    by_gender = models.BooleanField()
    powder_room = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    accepted = models.BooleanField()
    reports = models.IntegerField()

    def __str__(self):
        return self.name

class Reviews(models.Model):
    id = models.AutoField(primary_key=True)
    location_id =  models.ForeignKey(Locations, on_delete=models.CASCADE)
    comment = models.TextField()
    star = models.IntegerField()
    is_name = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return Locations.objects.get(id=self.location_id)
