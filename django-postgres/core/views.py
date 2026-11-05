import logging

from django.core import signing
from django.core.cache import cache
from django.db import connection
from django.shortcuts import render

from core.models import Visit

logger = logging.getLogger(__name__)


def check(run) -> str:
    try:
        return f"ok {run()}".strip()
    except Exception as error:  # noqa: BLE001 - the answer reports any failure
        logger.error("e2e check failed: %s: %s", type(error).__name__, error)
        return f"fail ({type(error).__name__}: {error})"


def database() -> str:
    Visit.objects.create()

    return f"{connection.vendor} visits={Visit.objects.count()}"


def redis_cache() -> str:
    cache.set("e2e", "pong", 30)
    if cache.get("e2e") != "pong":
        raise RuntimeError("value not read back")

    return ""


def signed_value() -> str:
    if signing.loads(signing.dumps("e2e")) != "e2e":
        raise RuntimeError("signature not verified")

    return ""


def index(request):
    context = {
        "db": check(database),
        "cache": check(redis_cache),
        "secret": check(signed_value),
    }

    # Any failed check fails the deployment's healthcheck instead of passing quietly.
    status = 200 if all(value.startswith("ok") for value in context.values()) else 500

    return render(request, "core/index.html", context, content_type="text/html", status=status)
