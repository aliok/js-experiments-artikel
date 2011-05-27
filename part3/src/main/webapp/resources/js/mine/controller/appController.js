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

/**
 * @param appView {artikelApp.AppView}
 */
artikelApp.AppController = function(appView, wordManager) {

    var currentTranslation = null;
    var currentArticle = null;
    var score = 0;

    var init = function() {
        appView.registerAnswerDerButtonHandler(function(){answer('der');});
        appView.registerAnswerDieButtonHandler(function(){answer('die');});
        appView.registerAnswerDasButtonHandler(function(){answer('das');});
        appView.registerNextWordButtonHandler(next);

        appView.setScore(0);
        next();
    };

    var answer = function(article) {
        var correctAnswer = (article === currentArticle);

        if (correctAnswer)
            score++;
        else
            score--;

        appView.setArticleColor(correctAnswer);

        appView.setScore(score);

        appView.showResult();

    };

    var next = function() {
        appView.showLoadingDialog();

        var callback = function(word, translation, article) {
            if (word) {
                currentArticle = article;
                currentTranslation = translation;

                appView.showChoices();

                appView.setWord(word);
                appView.setTranslation(currentTranslation);
                appView.setArticle(currentArticle);

                appView.hideLoadingDialog();

            } else {      //then error occurred
                appView.hideLoadingDialog();
                alert("Unable to connect server, please check your internet connection.");
            }
        };

        wordManager.getNextWord(callback);
    };


    this.start = function(){
        appView.registerPageCreateHandler(init);
    };

};