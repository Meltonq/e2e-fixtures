# What a build step can reach from the isolated builder: the internet yes; the node
# itself, private networks and cloud metadata no. The result is printed in the build
# log and served by the application, so it can be read without access to the node.
FROM python:3.12-alpine

# NODE_IP: the public address of the node the build runs on.
ARG NODE_IP=116.202.51.112
RUN set -u; \
    probe() { if timeout 5 nc -z -w 4 "$1" "$2" 2>/dev/null; then echo "OPEN    $1:$2 ($3)"; else echo "closed  $1:$2 ($3)"; fi; }; \
    { \
      echo "e2e:build-net:v1"; \
      echo "expected: only the internet lines OPEN"; \
      probe 1.1.1.1 443 "internet"; \
      probe github.com 443 "internet"; \
      probe "$NODE_IP" 8081 "node: wings-apps API"; \
      probe "$NODE_IP" 22 "node: SSH"; \
      probe "$NODE_IP" 3306 "node: databases"; \
      probe 172.23.0.1 8081 "node from the applications network"; \
      probe 172.17.0.1 8081 "docker0 gateway"; \
      probe 10.211.0.1 8081 "gateway of the build network"; \
      probe 10.210.0.1 80 "pool network"; \
      probe 169.254.169.254 80 "cloud metadata"; \
      probe 192.168.0.1 80 "private network"; \
    } | tee /net.txt

RUN mkdir -p /www && cp /net.txt /www/index.html
WORKDIR /www
EXPOSE 8080
CMD ["sh", "-c", "exec python -m http.server ${PORT:-8080} --bind 0.0.0.0"]
