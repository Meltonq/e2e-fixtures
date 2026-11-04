require "sinatra/base"

class E2eApp < Sinatra::Base
  set :host_authorization, { permitted_hosts: [] }

  get "/" do
    content_type "text/plain"
    "e2e:ruby:v1"
  end
end
