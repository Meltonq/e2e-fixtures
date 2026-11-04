require "dotenv"
require "sinatra/base"

class E2eApp < Sinatra::Base
  set :host_authorization, { permitted_hosts: [] }

  get "/" do
    content_type "text/plain"
    "e2e:ruby:v3-broken"
  end
end
