from django.contrib import admin


from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework.schemas import get_schema_view
from rest_framework.renderers import JSONOpenAPIRenderer


router = DefaultRouter()

schema_view = get_schema_view(
    title="Escribly API",
    url='http://localhost:8000',
    renderer_classes=[JSONOpenAPIRenderer]
)


api_urlpatterns = [
    path('', include(router.urls)),
    path('', include('badges.urls')),
    path('', include('users.urls')),
    path('', include('notes.urls')),
    path('', include('tivi.urls')),
    path('', include('clubs.urls')),
    path('', include('lessons.urls')),
    path('', include('lessons_users.urls')),
    path('', include('leagues.urls')),
    path('', include('badges_users.urls')),
    path('', include('leaderboards_users.urls')),
    path('', include('challenges_users.urls')),
    path('', include('leaderboards.urls')),
    path('', include('directs.urls')),
    path('', include('badges.urls')),
    path('', include('resources.urls')),
    path('', include('tasks.urls')),
    path('', include('clubs_users.urls')),
    path('', include('tasks_users.urls')),
    path('', include('folders.urls')),
    path('', include('ratings.urls')),
    path('', include('streaks.urls')),
    path('', include('boosters.urls')),
    path('', include('boosters_users.urls')),
    path('', include('challenges.urls')),
    path('', include('follows.urls')),
    path('schema', schema_view),
]

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api/v1/', include(api_urlpatterns)),
]
