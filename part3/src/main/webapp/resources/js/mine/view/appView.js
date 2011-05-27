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

artikelApp.AppView = function() {

    this.registerPageCreateHandler = function(callback){
        $(document).bind('pagecreate', function(){
            callback();
        });
    };

    this.registerAnswerDerButtonHandler = function(callback) {
        $('#answerDer').bind('click', function() {
            callback();
        });
    };

    this.registerAnswerDieButtonHandler = function(callback) {
        $('#answerDie').bind('click', function() {
            callback();
        });
    };

    this.registerAnswerDasButtonHandler = function(callback) {
        $('#answerDas').bind('click', function() {
            callback();
        });
    };

    this.registerNextWordButtonHandler = function(callback) {
        $('#nextWord').bind('click', function() {
            callback();
        });
    };

    this.setWord = function(word) {
        $('#word').html(word);
    };

    this.setTranslation = function(translation) {
        $('#translation').html(translation);
    };

    this.setArticle = function(article) {
        $('#article').html(article);
    };

    this.setScore = function(score) {
        $('#score').html(score);
    };

    this.showLoadingDialog = function() {
        $.mobile.pageLoading();
    };

    this.hideLoadingDialog = function() {
        $.mobile.pageLoading(true);
    };

    this.showResult = function() {
        $('#answers').hide();
        $('#article').show();
        $('#translation').show();
        $('#nextWordContainer').show();
    };

    this.showChoices = function() {
        $('#answers').show();
        $('#article').hide();
        $('#translation').hide();
        $('#nextWordContainer').hide();
    };

    this.setArticleColor = function(correctAnswer){
        if(correctAnswer)
            $('#article').attr('class', 'correct');
        else
            $('#article').attr('class', 'wrong');
    };


};