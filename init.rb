require 'rubygems'
require 'sinatra'

set :public, File.join(File.dirname(__FILE__), 'public')

get '/' do
  File.read('public/index.html')
end

get '/google50839014440e56f6' do
  File.read('public/google50839014440e56f6.html')
end
