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

var appController;

var appView;
var wordManager

AppControllerTest = TestCase("AppControllerTest");

AppControllerTest.prototype.setUp = function() {
    jc = createJackContext();

    appView = jc.create('appView', [
                'registerPageCreateHandler',
                'registerAnswerDerButtonHandler',
                'registerAnswerDieButtonHandler',
                'registerAnswerDasButtonHandler',
                'registerNextWordButtonHandler',
                'setWord',
                'setTranslation',
                'setArticle',
                'setScore',
                'showLoadingDialog',
                'hideLoadingDialog',
                'showResult',
                'showChoices',
                'setArticleColor',
                'alert']);

    wordManager = jc.create('wordManager', ['getNextWord']);

    appController = new artikelApp.AppController(appView, wordManager);
    appController._makeAllPublicForTests();
};

AppControllerTest.prototype.testStartShouldRegisterPageCreateHandlerOnView = function() {
    jc(function() {
        jc.expect("appView.registerPageCreateHandler")
                .once()
                .withArguments(appController.init);
        appController.start();
    });
};

AppControllerTest.prototype.testInitShouldRegisterButtonHandlersOnViewAndInitializeApp = function() {
    jc(function() {
        jc.expect("appView.registerAnswerDerButtonHandler").once().withArguments(appController.answerDer);
        jc.expect("appView.registerAnswerDieButtonHandler").once().withArguments(appController.answerDie);
        jc.expect("appView.registerAnswerDasButtonHandler").once().withArguments(appController.answerDas);
        jc.expect("appView.registerNextWordButtonHandler").once().withArguments(appController.next);

        jc.expect("appView.setScore").once().withArguments(0);

        jc.expect("appView.showLoadingDialog").once();
        jc.expect("wordManager.getNextWord").once();

        appController.init();
    });
};

AppControllerTest.prototype.testCorrectAnswerShouldBeHandled = function() {
    jc(function() {

        appController._setScore(10);
        appController._setCurrentArticle('der');
        appController._setCurrentTranslation('initial translation');

        jc.expect("appView.setArticleColor").once().withArguments(true);
        jc.expect("appView.setScore").once().withArguments(11);
        jc.expect("appView.showResult").once();

        appController.answer('der');

        assertEquals('Score must be increased', 11, appController._getScore());
    });
};

AppControllerTest.prototype.testWrongAnswerShouldBeHandled = function() {
    jc(function() {

        appController._setScore(10);
        appController._setCurrentArticle('der');
        appController._setCurrentTranslation('initial translation');

        jc.expect("appView.setArticleColor").once().withArguments(false);
        jc.expect("appView.setScore").once().withArguments(9);
        jc.expect("appView.showResult").once();

        appController.answer('das');

        assertEquals('Score must be decreased', 9, appController._getScore());
    });
};

AppControllerTest.prototype.testNextWordShouldBeFetchedAndSet = function() {
    jc(function() {

        appController._setCurrentArticle('der');
        appController._setCurrentTranslation('initial translation');

        jc.expect("appView.showLoadingDialog").once();

        jc.expect("wordManager.getNextWord")
            .once()
            .mock(function(callback) {
                callback('new word', 'new translation', 'new article');
            });

        jc.expect('appView.showChoices').once();
        jc.expect('appView.setWord').once().withArguments('new word');
        jc.expect('appView.setTranslation').once().withArguments('new translation');
        jc.expect('appView.setArticle').once().withArguments('new article');
        jc.expect('appView.hideLoadingDialog').once();

        appController.next();

        assertEquals('New article must be set', 'new article', appController._getCurrentArticle());
        assertEquals('New translation must be set', 'new translation', appController._getCurrentTranslation());

    });
};


AppControllerTest.prototype.testConnectionErrorShouldBeHandledWhileFetchingNewWord = function() {
    jc(function() {

        appController._setCurrentArticle('der');
        appController._setCurrentTranslation('initial translation');

        jc.expect("appView.showLoadingDialog").once();

        jc.expect("wordManager.getNextWord")
            .once()
            .mock(function(callback) {
                callback(null, null, null);
            });

        jc.expect('appView.showChoices').never();
        jc.expect('appView.setWord').never();
        jc.expect('appView.setTranslation').never();
        jc.expect('appView.setArticle').never();

        jc.expect('appView.hideLoadingDialog').once();
        jc.expect('appView.alert').once();

        appController.next();

        assertEquals('Old article must not be changed', 'der', appController._getCurrentArticle());
        assertEquals('Old translation must not be changed', 'initial translation', appController._getCurrentTranslation());

    });
};