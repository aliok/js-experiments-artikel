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
};

AppViewTest.prototype.testAppViewShouldRegisterPageCreateHandler = function() {

    var callbackCalled = false;

    var callback = function(){
        callbackCalled = true;
    };

    appView.registerPageCreateHandler(callback);

    $(document).trigger('pagecreate');

    assertTrue('Page create handler is called', callbackCalled);
};

AppViewTest.prototype.testAppViewShouldRegisterAnswerDerButtonHandler = function() {

    /*:DOC += <button id="answerDer"></button>*/

    var callbackCalled = false;

    var callback = function(){
        callbackCalled = true;
    };

    appView.registerAnswerDerButtonHandler(callback);

    $('#answerDer').trigger('click');

    assertTrue('AnswerDer button click handler is called', callbackCalled);
};

AppViewTest.prototype.testAppViewShouldRegisterAnswerDieButtonHandler = function() {

    /*:DOC += <button id="answerDie"></button>*/

    var callbackCalled = false;

    var callback = function(){
        callbackCalled = true;
    };

    appView.registerAnswerDieButtonHandler(callback);

    $('#answerDie').trigger('click');

    assertTrue('AnswerDie button click handler is called', callbackCalled);
};

AppViewTest.prototype.testAppViewShouldRegisterAnswerDasButtonHandler = function() {

    /*:DOC += <button id="answerDas"></button>*/

    var callbackCalled = false;

    var callback = function(){
        callbackCalled = true;
    };

    appView.registerAnswerDasButtonHandler(callback);

    $('#answerDas').trigger('click');

    assertTrue('AnswerDas button click handler is called', callbackCalled);
};

AppViewTest.prototype.testAppViewShouldSetScore = function() {

    /*:DOC += <span id="score">999</span>*/

    appView.setScore(10);

    assertEquals('Score must be set on UI', $('span#score').html(), '10');
};