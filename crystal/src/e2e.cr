require "http/server"

port = (ENV["PORT"]? || "8080").to_i

server = HTTP::Server.new do |context|
  context.response.content_type = "text/plain"
  context.response.print "e2e:crystal:v1"
end

address = server.bind_tcp("0.0.0.0", port)
puts "listening on #{address}"
server.listen
