"""
URL configuration for escribly_api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin


from django.urls import include, path
from rest_framework.routers import DefaultRouter
from users import urls as users_urls

# from lessons_users.api import Lessons_Users_ViewSet
# from notes.api import NotesViewSet
# #from tivi.api import TiviViewSet
# #from clubs.api import ClubsViewSet
# from lessons.api import LessonViewSet
# from leagues.api import LeagueViewSet
# from badges_users.api import BadgeUsersViewSet
# from users.api import UsersViewSet
# from leaderboards_users.api import Leaderboards_usersViewSet
# from challenges_users.api import Challenges_usersViewSet
# from leaderboards.api import LeaderboardsViewSet
# from directs.api import DirectsViewSet
# from badges.api import BadgesViewSet
# #from resources.api import ResourcesViewSet
# from tasks.api import TasksViewSet
# #from clubs_users.api import Clubs_usersViewSet
# from tasks_users.api import Tasks_usersViewSet
# from folders.api import FoldersViewSet
# from ratings.api import RatingsViewSet
# from streaks.api import StreaksViewSet
# from boosters.api import BoostersViewSet
# from boosters_users.api import Boosters_usersViewSet
# from challenges.api import ChallengesViewSet
# from follows.api import FollowsViewSet

router = DefaultRouter()
# router.register(r'lessons_users', Lessons_Users_ViewSet)       
# router.register(r'notes', NotesViewSet)
# #router.register(r'tivi', TiviViewSet)
# #router.register(r'clubs', ClubsViewSet)
# router.register(r'lessons', LessonViewSet)
# router.register(r'leagues', LeagueViewSet)
# router.register(r'badges_users', BadgeUsersViewSet)
# router.register(r'users', UsersViewSet)
# router.register(r'leaderboards_users', Leaderboards_usersViewSet)
# router.register(r'challenges_users', Challenges_usersViewSet)
# router.register(r'leaderboards', LeaderboardsViewSet)
# router.register(r'directs', DirectsViewSet)
# #router.register(r'badges', BadgesViewSet)
# #router.register(r'resources', ResourcesViewSet)
# router.register(r'tasks', TasksViewSet)
# #router.register(r'clubs_users', Clubs_usersViewSet)
# router.register(r'tasks_users', Tasks_usersViewSet)
# router.register(r'folders', FoldersViewSet)
# router.register(r'ratings', RatingsViewSet)
# router.register(r'streaks', StreaksViewSet)
# router.register(r'boosters', BoostersViewSet)
# router.register(r'boosters_users', Boosters_usersViewSet)
# router.register(r'challenges', ChallengesViewSet)
# router.register(r'follows', FollowsViewSet)



api_urlpatterns = [
    path('', include(router.urls)),
    path('badges/', include('badges.urls')),
    path('users/', include('users.urls')),
    path('notes/', include('notes.urls')),
    path('tivi/', include('tivi.urls')),
    path('clubs/', include('clubs.urls')),
    path('lessons/', include('lessons.urls')),
    path('lessons_users/', include('lessons_users.urls')),
    path('leagues/', include('leagues.urls')),
    path('badges_users/', include('badges_users.urls')),
    path('leaderboards_users/', include('leaderboards_users.urls')),
    path('challenges_users/', include('challenges_users.urls')),
    path('leaderboards/', include('leaderboards.urls')),
    path('directs/', include('directs.urls')),
    path('badges/', include('badges.urls')),
    path('resources/', include('resources.urls')),
    path('tasks/', include('tasks.urls')),
    path('clubs_users/', include('clubs_users.urls')),
    path('tasks_users/', include('tasks_users.urls')),
    path('folders/', include('folders.urls')),
    path('ratings/', include('ratings.urls')),
    path('streaks/', include('streaks.urls')),
    path('boosters/', include('boosters.urls')),
    path('boosters_users/', include('boosters_users.urls')),
    path('challenges/', include('challenges.urls')),
    path('follows/', include('follows.urls')),
]

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api/v1/', include(api_urlpatterns)),
]

