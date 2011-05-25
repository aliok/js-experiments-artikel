/*
 * Copyright [2011] [Ali Ok - aliok@apache.org]
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

var artikelApp;
if (artikelApp == undefined || artikelApp == null)
    artikelApp = {};

artikelApp.Controller = function() {

    var currentTranslation = null;
    var currentArticle = null;
    var score = 0;

    var init = function() {

        $('#answerDer').bind('click', function() {
            answer('der');
        });
        $('#answerDie').bind('click', function() {
            answer('die');
        });
        $('#answerDas').bind('click', function() {
            answer('das');
        });
        $('#nextWord').bind('click', next);

        next();
    };

    var answer = function(article) {

        console.log("currentArticle " + currentArticle);
        if (article === currentArticle) {
            score++;
            $('#article').attr('class', 'correct');
        }
        else {
            score--;
            $('#article').attr('class', 'wrong');
        }

        $('#score').html(score);

        $('#answers').hide();
        $('#article').show();
        $('#translation').show();
        $('#nextWordContainer').show();
    };

    var next = function() {
        //show loading dialog
        $.mobile.pageLoading();

        //fetch next word
        $.getJSON('/wordService?'+new Date().getTime() , function(data) {
            console.log("data['article'] " + data['article']);

            var word = data['word'];
            currentTranslation = data['translation'];
            currentArticle = data['article'];

            //show answer buttons, hide others
            $('#answers').show();
            $('#article').hide();
            $('#translation').hide();
            $('#nextWordContainer').hide();

            //set the content for the new word
            $('#word').html(word);
            $('#translation').html(currentTranslation);
            $('#article').html(currentArticle);

            //hide loading dialog
            $.mobile.pageLoading(true);
        }).error(function() {
            alert("Unable to connect server, please check your internet connection.");
            $.mobile.pageLoading(true);
        });
    };


    init();

};