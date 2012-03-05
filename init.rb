require 'rubygems'
require 'sinatra'

set :public, File.join(File.dirname(__FILE__), 'public')

get '/' do
  File.read('public/index.html')
end

