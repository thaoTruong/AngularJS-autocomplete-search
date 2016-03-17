angular.module('autocompleteApp', [])
    .controller('autocompleteController', function() {
        var controller = this;
        //the suggestions are stored here
        controller.suggestions = [];

        controller.loadSuggestions = function(term){
            //if the input isn't empty, process it
            if(term) {
                // this is a google hack used for this test. We load suggestions from google and push them to controller.suggestions.
                // we use dataType jsonp to avoid cross-origin error
                $.ajax({
                    url: "http://suggestqueries.google.com/complete/search?q=" + encodeURIComponent(term) + "&client=youtube",
                    dataType: "jsonp",
                    success: function (data) {
                        var suggestions = [];
                        $.each(data[1], function (key, val) {
                            suggestions.push(val[0]);
                        });
                        controller.suggestions = suggestions;
                    }
                });
            }
        };
    });
