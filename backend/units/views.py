from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Unit
from .serializers import *


class UnitListCreateView(generics.ListCreateAPIView):
    """
    get: Return a list of all the existing units.

    post: Create a new unit instance.
    """
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):

        serializer = UnitSerializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        unit = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UnitRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    """
    get: Return the given unit.
    update: Update the given unit.
    delete: Delete the given unit.
    """

    queryset = Unit.objects.all()
    serializer_class = UnitSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        unit = serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
class UnitRetrieveCompletedView(generics.RetrieveUpdateDestroyAPIView):
    """
    get: Return the given unit.
    update: Update the given unit.
    delete: Delete the given unit.
    """

    queryset = Unit.objects.all()
    serializer_class = UnitCompletedSerializer
    permission_classes = [permissions.IsAuthenticated]


class UnitRetrievePercentagesView(generics.RetrieveUpdateDestroyAPIView):
    """
    get: Return the given unit.
    update: Update the given unit.
    delete: Delete the given unit.
    """

    queryset = Unit.objects.all()
    serializer_class = UnitPercentageSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, pk):
        units = Unit.objects.all()  # Tu lógica para obtener las unidades
        serializer = UnitPercentageSerializer(units, many=True, context={'request': request})
        return Response(serializer.data)
    


class UnitRetrieveByCategoryView(generics.RetrieveUpdateDestroyAPIView):
    """
    get: Return the given unit.
    update: Update the given unit.
    delete: Delete the given unit.
    """
    #category is filter by unit_style
    queryset = Unit.objects.all()
    serializer_class = UnitPercentageSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, category):
        units = Unit.objects.filter(unit_style=category)
        serializer = UnitPercentageSerializer(units, many=True, context={'request': request})
        return Response(serializer.data)

