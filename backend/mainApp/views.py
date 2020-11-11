from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, RetrieveAPIView
from django.contrib.auth.models import User, Group
from .serializers import UserSerializer, GroupSerializer
# Create your views here.
def main(request):
    return render(request, 'mainApp/index.html')

class UserView(ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

@api_view(['POST'])
def createUser(request):
	serializer = UserSerializer(data = request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)

@api_view(['POST'])
def updateUser(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(instance=user, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def deleteUser(request, pk):
    user = User.objects.get(id=pk)
    user.delete()

    return Response('Successful operation!')

class GroupView(ListAPIView):
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Group.objects.all()

@api_view(['POST'])
def createGroup(request):
    serializer = GroupSerializer(data = request.data)

    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def updateGroup(request, pk):
    group = Group.objects.get(id=pk)
    serializer = GroupSerializer(instance=group, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def deleteGroup(request, pk):
    group = Group.objects.get(id=pk)
    group.delete()

    return Response('Successful operation!')
