
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');


    // load streetview
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');


    // load nytimes and populate the website with articles
    var NYTimesApiKey = "<Your-NYTimes-API-KEY-HERE>";
    var NYTimesUrl    = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + cityStr + "&api-key=" + NYTimesApiKey;
    
    $.getJSON(NYTimesUrl, function(data) {
        var articles = data.response.docs;

        var items = [];
        $.each(articles, function(index, article) {
            var headline    = "<a href='"+ article['web_url'] + "'>" + article['headline']['main'] + "</a>";
            var leadingPara = "<p>" + article['lead_paragraph'] + "</p>";
            items.push("<li class='article'>" + headline + leadingPara + "</li>");
        });

        $("#nytimes-articles").append(items.join(""));
    })
      .fail(function() {
        $nytHeaderElem.text("New York Times Articles Could Not Be Loaded");
    });

    return false;
};

$('#form-container').submit(loadData);
