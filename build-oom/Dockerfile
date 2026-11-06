# The isolated builder must stop a build step that takes more memory than its limit
# (applications.builds.memory_mb, 2 GiB by default): the build fails, the node is fine.
FROM python:3.12-alpine

# b'a' * N writes every byte, so the memory is really taken (not just reserved).
RUN python -c "import sys; x = b'a' * (3 * 1024 ** 3); print('allocated', len(x), 'bytes: the memory limit did not stop the build', file=sys.stderr)"

WORKDIR /srv
RUN echo 'e2e:build-oom:v1' > index.html
EXPOSE 8080
CMD ["python", "-m", "http.server", "8080", "--bind", "0.0.0.0"]
