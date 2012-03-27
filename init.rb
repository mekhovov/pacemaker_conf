require 'rubygems'
require 'sinatra'
require 'twitter'
# require 'awesome_print'

Twitter.configure do |config|
   config.consumer_key = 'iLHqIMRs3roKizOifRog'
   config.consumer_secret = 'T4hETM7yRctra3nIUnmpU3Jex5BhFvHVnBT6uWYIOVA'
   config.oauth_token = '524597088-lazizoKuBNsVDamGjUwQQ6r4q7mQJXzWeFkjMQSC'
   config.oauth_token_secret = 'wHKMKnYUr79aUTDvVQs4XVPKdlNpOF8yJdttYUox05s'
end

set :public, File.join(File.dirname(__FILE__), 'public')

get '/' do
  File.read('public/index.html')
end

get '/twitter' do
  File.read('public/twitter.html')
end

get '/t' do
  	posts = {}
	Twitter.search("@pacemaker_conf", :result_type => "recent").map do |status|
  		posts[status.created_at] = {:user => status.from_user_name, :author => status.from_user, :photo => status.profile_image_url, :msg => status.text}
	end
  Twitter.search("from:@pacemaker_conf", :result_type => "recent").map do |status|
      posts[status.created_at] = {:user => status.from_user_name,  :author => status.from_user, :photo => status.profile_image_url, :msg => status.text}
  end
	Twitter.search("#pacemaker_conf", :result_type => "recent").map do |status|
  		posts[status.created_at] = {:user => status.from_user_name,  :author => status.from_user, :photo => status.profile_image_url, :msg => status.text}
	end
	
	tweets = posts.keys.sort{|x, y| y <=> x}.inject({}){|tweets, key| tweets[key] = posts[key]; tweets}
	tweets.to_json
end

get '/google50839014440e56f6' do
  File.read('public/google50839014440e56f6.html')
end
