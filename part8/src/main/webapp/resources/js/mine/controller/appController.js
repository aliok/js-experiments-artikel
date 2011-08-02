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

artikelApp.AppController = function(appView, wordService) {

    var instance = this;

    var currentTranslation = null;
    var currentArticle = null;
    var score = 0;

    /**
       * @private
       */
    var init = function() {
        appView.registerAnswerDerButtonHandler(answerDer);
        appView.registerAnswerDieButtonHandler(answerDie);
        appView.registerAnswerDasButtonHandler(answerDas);
        appView.registerNextWordButtonHandler(next);

        appView.setScore(0);
        next();
    };

    /**
       * @private
       */
    var answerDer = function() {
        answer('der');
    };

    /**
       * @private
       */
    var answerDie = function() {
        answer('die');
    };

    /**
       * @private
       */
    var answerDas = function() {
        answer('das');
    };

    /**
       * @private
       */
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

    /**
       * @private
       */
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
                if(Modernizr.websqldatabase)
                    appView.alert("You answered all the words, so internet connection is required to get new words." +
                            "Unable to connect server, please check your internet connection.");
                else
                    appView.alert("Unable to connect server, please check your internet connection.");
            }
        };

        wordService.getNextWord(callback);
    };


    /**
       * @public
       */
    this.start = function(){
        appView.registerPageCreateHandler(init);
        wordService.initializeDatabase(function(constructed){
            if(!constructed)
                alert('Unable to construct the database.');
        });
    };

    /**
       * Should only be used for tests
       * @public
       */
    this._makeAllPublicForTests = function(){
        instance.init = init;
        instance.answerDer = answerDer;
        instance.answerDie = answerDie;
        instance.answerDas = answerDas;
        instance.answer = answer;
        instance.next = next;
    };

    /**
       *  Should only be used for tests
       * @public
       */
    this._setScore = function(newScore){
        score = newScore;
    };

    /**
       *  Should only be used for tests
       * @public
       */
    this._setCurrentArticle = function(newArticle){
        currentArticle = newArticle;
    };

    /**
       *  Should only be used for tests
       * @public
       */
    this._setCurrentTranslation = function(newTranslation){
        currentTranslation = newTranslation;
    };

    /**
       *  Should only be used for tests
       * @public
       */
    this._getScore = function(){
        return score;
    };
    /**
       *  Should only be used for tests
       * @public
       */
    this._getCurrentArticle = function(){
        return currentArticle;
    };
    /**
       *  Should only be used for tests
       * @public
       */
    this._getCurrentTranslation = function(){
        return currentTranslation;
    };
};