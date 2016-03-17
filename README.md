# AngularJS-autocomplete-search
This is a small project written to use AngularJS, HTML5 and jquery to retrieve google search's suggestions whenever we type an additional letter into an input field

Code sample:
```
<!--assigning controller-->
<div ng-controller="autocompleteController as cont">
    <!-- input field type list, assigning value to $term then on every keyup event process value with function loadSuggestions-->
    Search for <input list="suggestions" ng-model="term" ng-keyup="cont.loadSuggestions(term)">
    <!-- suggestions show up every time there's a keyup event from the input field above, suggestions are loaded dynamically as we type -->
    <datalist id="suggestions">
        <div ng-repeat="suggestion in cont.suggestions">
            <option value="{{suggestion}}">
        </div>
    </datalist>
</div>
```

```
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
```
Why do I use HTML5, jquery and AngularJS? Besides AngularJS which is a must-have for this project (upon request), I wanted to keep things simple, and no other fancy technology was needed. 
