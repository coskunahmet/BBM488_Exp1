function search(searchString, maxTweetCount)
{
	$.getJSON("http://search.twitter.com/search.json?q=" + searchString + "&rpp=" + maxTweetCount + "&callback=?", function(data)
	{
		var el = document.getElementById('stream');
	
		while( el.hasChildNodes() )
		{
    			el.removeChild(el.lastChild);
		}

		$(data.results).each(function(i,v)
		{						
			var avatar = createAvatar(v);
			var accountGroup = createAccountGroup(v);						
			var tweetText = createTweetText(v);
						
			createTweet(avatar, accountGroup, tweetText, v);					
		});
	});

}

function createAvatar(tweetData)
{
	var avatar_img = document.createElement('img');
	avatar_img.setAttribute("id","avatar_img_"+tweetData.id);
	avatar_img.setAttribute("class","avatar_img");
	avatar_img.setAttribute("src",tweetData.profile_image_url);
	avatar_img.setAttribute("alt",tweetData.from_user_name);

	var avatar_mt = document.createElement('a');
	avatar_mt.setAttribute("id", "avatar_mt_"+tweetData.id);
	avatar_mt.setAttribute("class", "avatar_mt");
	avatar_mt.setAttribute("href", "https://twitter.com/" + tweetData.from_user);

	avatar_mt.appendChild(avatar_img);

	var avatar = document.createElement('div');
	avatar.setAttribute("id","avatar_"+tweetData.id);
	avatar.setAttribute("class","avatar");

	avatar.appendChild(avatar_mt);

	return avatar;
}

function createAccountGroup(tweetData)
{
	var fullname = document.createElement('a');
	fullname.setAttribute("id","fullname_"+tweetData.id);
	fullname.setAttribute("class","fullname");
	fullname.setAttribute("href", "https://twitter.com/" + tweetData.from_user);
	fullname.innerHTML = tweetData.from_user_name;


	var username = document.createElement('span');
	username.setAttribute("id","username_"+tweetData.id);
	username.setAttribute("class","username");
	username.innerHTML = "@" + tweetData.from_user + "";

	var timestamp = document.createElement('div');						
	timestamp.setAttribute("id","timestamp_"+tweetData.id);
	timestamp.setAttribute("class", "timestamp");
						
	var date = "";
	for(var i=5;i<11;i++)
	{
		date += tweetData.created_at[i];
	}

	timestamp.innerHTML = date ;


	var tweetTimestamp = document.createElement('a');
	tweetTimestamp.setAttribute("id","tweetTimestamp_"+tweetData.id);
	tweetTimestamp.setAttribute("class","tweetTimestamp");
	tweetTimestamp.setAttribute("title", tweetData.created_at);

	tweetTimestamp.appendChild(timestamp);
						
	var time = document.createElement('small');
	time.setAttribute("id","time_"+tweetData.id);
	time.setAttribute("class", "time");

	time.appendChild(tweetTimestamp);

	var accountGroup = document.createElement('div');
	accountGroup.setAttribute("id","accountGroup_"+tweetData.id);
	accountGroup.setAttribute("class","accountGroup");
	accountGroup.setAttribute("userId",tweetData.from_user_id);

	accountGroup.appendChild(fullname);
	accountGroup.appendChild(username);
	accountGroup.appendChild(time);

	return accountGroup;
}

function createTweetText(tweetData)
{
	var tweetText = document.createElement('div');
	tweetText.setAttribute("id","tweetText_"+tweetData.id);
	tweetText.setAttribute("class", "tweetText");

	/*if(tweetData.to_user != null)
	{
		var atUser = document.createElement('a');
		atUser.setAttribute("id","atUser"+tweetData.id);
		atUser.setAttribute("class", "atUser");
		atUser.setAttribute("href", "https://twitter.com/" + tweetData.to_user);
		atUser.innerHTML = "@<b>" + tweetData.to_user + "</b>";
		tweetText.appendChild(atUser);
	}*/

	tweetText.innerHTML += tweetData.text;

	var footer_mt = document.createElement('div');
	footer_mt.setAttribute("class", "footer_mt");

	var temp = document.createElement('div');
	temp.setAttribute("style", "clear:both;");

	tweetText.appendChild(footer_mt);
	tweetText.appendChild(temp);

	return tweetText;
}

function createTweet(avatar, accountGroup, tweetText, tweetData)
{	

	var tweet = document.createElement('div');
	tweet.setAttribute("id","tweet_"+tweetData.id);
	tweet.setAttribute("class", "tweet");

	tweet.appendChild(avatar);
	tweet.appendChild(accountGroup);
	tweet.appendChild(tweetText);


	var container = document.getElementById('stream');
	container.appendChild(tweet);	
}

