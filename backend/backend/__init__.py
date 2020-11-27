from .celery_dj import celery_app

#register a celery app to start it with django together
__all__ = ('celery_app')