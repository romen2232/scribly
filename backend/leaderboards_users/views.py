from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Leaderboards_users
from .serializers import LeaderboardUserSerializer
from leaderboards.models import Leaderboards

from datetime import datetime, timedelta    


class LeaderboardUserCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = LeaderboardUserSerializer(
            data=request.data, context={'request': request})
        
        if serializer.is_valid():
            
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLeaderboardsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id, *args, **kwargs):
        leaderboard_users = Leaderboards_users.objects.filter(user=user_id)
        serializer = LeaderboardUserSerializer(
            leaderboard_users, many=True, context={'request': request})
        return Response(serializer.data)


class LeaderboardUsersView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, leaderboard_id, *args, **kwargs):
        leaderboard_users = Leaderboards_users.objects.filter(
            leaderboard=leaderboard_id)
        serializer = LeaderboardUserSerializer(leaderboard_users, many=True)
        return Response(serializer.data)


class SpecificUserLeaderboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id, leaderboard_id, *args, **kwargs):
        try:
            leaderboard_user = Leaderboards_users.objects.get(
                user=user_id, leaderboard=leaderboard_id)
            serializer = LeaderboardUserSerializer(leaderboard_user)
            return Response(serializer.data)
        except Leaderboards_users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, user_id, leaderboard_id, *args, **kwargs):
        try:
            leaderboard_user = Leaderboards_users.objects.get(
                user=user_id, leaderboard=leaderboard_id)
            serializer = LeaderboardUserSerializer(
                leaderboard_user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Leaderboards_users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, user_id, leaderboard_id, *args, **kwargs):
        try:
            leaderboard_user = Leaderboards_users.objects.get(
                user=user_id, leaderboard=leaderboard_id)
            leaderboard_user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Leaderboards_users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)




class LeaderboardUserCompleteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request,league_id, *args, **kwargs):
        serializer = LeaderboardUserSerializer(
            user = request.user,
            leaderboard = self.choose_leaderboard(league_id),
             context={'request': request})
        
        if serializer.is_valid():
            
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    
        
    def patch(self, request, league_id, *args, **kwargs):

        user = request.user
       
        
        leaderboards = self.leaderboards_active(league_id)
        
        user_leaderboards =[]
        
        for leaderboard in leaderboards:
            
            leaderboard_user= Leaderboards_users.objects.filter(user=user, leaderboard=leaderboard).last()
            if leaderboard_user:
                user_leaderboards.append(leaderboard_user)
                
        if user_leaderboards:
        
            
            for leaderboard_user in user_leaderboards:
                
                reset= False
                if self.check_caducity(leaderboard_user):
                    
                    
                    serializer = LeaderboardUserSerializer(
                        leaderboard_user, data=request.data, partial=True)
                    if serializer.is_valid():
                        serializer.save()
                        return Response(serializer.data)
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                    
            else:
                self.post(request, league_id)
           
        
        
       
            
            serializer = LeaderboardUserSerializer(
                leaderboard_user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            self.post(request, league_id)
        
        #check if  exist a leaderboard_user for this user and league, create one
    def leaderboards_active(self, league_id):
        try:
            
            leaderboards = Leaderboards.objects.filter(league=league_id)
            
            active_leaderboards = []
            for leaderboard in leaderboards:
                
                
                time = datetime.now()-  leaderboard.week_date.replace(tzinfo=None)
                print('s')
                if time.days<7:
                    active_leaderboards.append(leaderboard)
                    
                    
            if not active_leaderboards:
                #create new leaderboard 
                self.create_leaderboard(league_id)
                
            return active_leaderboards
        except Leaderboards.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    def check_caducity(self, leaderboard_user): # True is it has passed 7 days
        print(leaderboard_user)
        time = leaderboard_user.leaderboard_update_date- leaderboard_user.leaderboard.week_date
        #check time is less than 7 days
        
        if time.days<7:
            return True
        else:
            return False
        
    def choose_leaderboard(self, league_id):
        #check number of user in a leaderboard
        #if less than 10, add user to that leaderboard
        leaderboards = self.leaderboards_active(league_id)
        
        for leaderboard in leaderboards:
            num = Leaderboards_users.objects.filter(leaderboard=leaderboard).count()
            if num<10:
                return leaderboard


    def create_leaderboard(self, league_id):
        leaderboard = Leaderboards.objects.create(league=league_id)
        leaderboard.save()
        return leaderboard
    
