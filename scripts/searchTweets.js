function testNumeric(input)
{
    if (input.match(/[^0-9]/g)) return false;
	else return true;
}
function startSearching()
{
	stopRefreshing();
	
	var maxTweetCount = document.getElementById("maxTweetCount");
	var refreshperiod = document.getElementById("refreshperiod");

	if(maxTweetCount.value == "" || !testNumeric(maxTweetCount.value))
	{
		maxTweetCount.value = 5;
	}


	if(refreshPeriod.value == "" || !testNumeric(refreshPeriod.value))
	{
		refreshPeriod.value = 10;
	}

	var valueSearch = document.getElementById("searchString");
	var searchString = valueSearch.value;
	valueSearch.value = "";

	search(searchString, maxTweetCount.value);
	startRefreshing(searchString, maxTweetCount.value, refreshPeriod.value);
}

var refreshSearchIntervalId;
function stopRefreshing()
{
	if(refreshSearchIntervalId)
	{
		clearInterval(refreshSearchIntervalId);
	}
}
function startRefreshing(searchString, maxTweetCount, refreshPeriod)
{
	refreshSearchIntervalId = self.setInterval(function(){search(searchString, maxTweetCount)},refreshPeriod*1000);
}
