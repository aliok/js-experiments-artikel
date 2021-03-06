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

var jc;

var appView;

AppViewTest = TestCase("AppViewTest");

AppViewTest.prototype.setUp = function() {
    jc = createJackContext();

    appView = new artikelApp.AppView();

    /*:DOC += <div id="answers"></div>*/
    /*:DOC += <div id="nextWordContainer"></div>*/

    /*:DOC += <div id="article">old article</div>*/
    /*:DOC += <div id="translation">old translation</div>*/
    /*:DOC += <div id="word">old word</div>*/

    /*:DOC += <button id="answerDer"></button>*/
    /*:DOC += <button id="answerDie"></button>*/
    /*:DOC += <button id="answerDas"></button>*/
    /*:DOC += <button id="nextWord"></button>*/
};

AppViewTest.prototype.testAppViewShouldShowResult = function() {

    appView.showResult();

    assertFalse('Answers must be hidden', $('div#answers').is(":visible"));
    assertTrue ('Article must be shown',  $('div#article').is(":visible"));
    assertTrue ('Answers must be shown', $('div#translation').is(":visible"));
    assertTrue ('Answers must be shown', $('div#nextWordContainer').is(":visible"));
};

AppViewTest.prototype.testAppViewShouldShowChoices = function() {

    appView.showChoices();

    assertTrue ('Answers must be shown',  $('div#answers').is(":visible"));
    assertFalse('Article must be hidden', $('div#article').is(":visible"));
    assertFalse('Answers must be hidden', $('div#translation').is(":visible"));
    assertFalse('Answers must be hidden', $('div#nextWordContainer').is(":visible"));
};

AppViewTest.prototype.testAppViewShouldSetArticleColor = function() {

    appView.setArticleColor(true);
    assertEquals('Correct answer class must be set',  $('div#article').attr('class'), 'correct');

    appView.setArticleColor(false);
    assertEquals('Wrong answer class must be set',  $('div#article').attr('class'), 'wrong');

};

//normally, this test is not necessary. only written for demonstration
AppViewTest.prototype.testAppViewShouldRegisterPageCreateHandler = function() {

    var callbackCalled = false;

    var callback = function(){
        callbackCalled = true;
    };

    appView.registerPageCreateHandler(callback);

    $(document).trigger('pagecreate');

    assertTrue('Page create handler must be called', callbackCalled);
};

//normally, this test is not necessary. only written for demonstration
AppViewTest.prototype.testAppViewShouldRegisterAnswerDerButtonHandler = function() {

    var callbackCalled = false;

    var callback = function(){
        callbackCalled = true;
    };

    appView.registerAnswerDerButtonHandler(callback);

    $('#answerDer').trigger('click');

    assertTrue('AnswerDer button click handler must be called', callbackCalled);
};

//normally, this test is not necessary. only written for demonstration
AppViewTest.prototype.testAppViewShouldRegisterAnswerDieButtonHandler = function() {

    var callbackCalled = false;

    var callback = function(){
        callbackCalled = true;
    };

    appView.registerAnswerDieButtonHandler(callback);

    $('#answerDie').trigger('click');

    assertTrue('AnswerDie button click handler must be called', callbackCalled);
};

//normally, this test is not necessary. only written for demonstration
AppViewTest.prototype.testAppViewShouldRegisterAnswerDasButtonHandler = function() {

    var callbackCalled = false;

    var callback = function(){
        callbackCalled = true;
    };

    appView.registerAnswerDasButtonHandler(callback);

    $('#answerDas').trigger('click');

    assertTrue('AnswerDas button click handler must be called', callbackCalled);
};

//normally, this test is not necessary. only written for demonstration
AppViewTest.prototype.testAppViewShouldRegisterNextButtonHandler = function() {

    var callbackCalled = false;

    var callback = function(){
        callbackCalled = true;
    };

    appView.registerNextWordButtonHandler(callback);

    $('#nextWord').trigger('click');

    assertTrue('Next button click handler must be called', callbackCalled);
};

//normally, this test is not necessary. only written for demonstration
AppViewTest.prototype.testAppViewShouldSetWord = function() {

    appView.setWord('new word');

    assertEquals('Word must be set on UI', $('#word').html(), 'new word');
};

//normally, this test is not necessary. only written for demonstration
AppViewTest.prototype.testAppViewShouldSetTranslation = function() {

    appView.setTranslation('new translation');

    assertEquals('Translation must be set on UI', $('#translation').html(), 'new translation');
};

//normally, this test is not necessary. only written for demonstration
AppViewTest.prototype.testAppViewShouldSetArticle = function() {

    appView.setArticle('new article');

    assertEquals('Article must be set on UI', $('#article').html(), 'new article');
};

//normally, this test is not necessary. only written for demonstration
AppViewTest.prototype.testAppViewShouldSetScore = function() {

    appView.setWord('new word');

    assertEquals('Word must be set on UI', $('#word').html(), 'new word');
};