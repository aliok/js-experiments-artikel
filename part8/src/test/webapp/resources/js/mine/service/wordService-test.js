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

var wordService;

var context;
var ajaxManager;
var databaseManager;

WordServiceTest= TestCase("WordServiceTest");

WordServiceTest.prototype.setUp = function() {
    jc = createJackContext();

    context = jc.create('context', ['websqlStorageSupport']);
    ajaxManager = jc.create('ajaxManager', ['getWords', 'getNextWord']);
    databaseManager = jc.create('databaseManager', ['initializeDatabase', 'checkIfWordStorageRefreshNecessary', 'getNextWord', 'addNewWordEntry', 'setWordAsShown', 'deleteAllWords']);

    wordService = new artikelApp.WordService(context, ajaxManager, databaseManager);

    wordService._makeAllPublicForTests();
};

WordServiceTest.prototype.testWordServiceShouldGetNextWordWhenWebSqlIsSupportedAndRefreshIsNotNecessary = function() {
    jc(function() {

        var callback = function(){};

        jc.expect("context.websqlStorageSupport")
            .once()
            .returnValue(true);

        jc.expect("databaseManager.checkIfWordStorageRefreshNecessary")
            .mock(function(){arguments[0](false);});

        jc.expect("databaseManager.getNextWord")
            .mock(function(){arguments[0]("theWord", "theTranslation", "theArticle");});

        jc.expect("databaseManager.setWordAsShown")
            .once();

        wordService.getNextWord(callback);

    });
};

WordServiceTest.prototype.testWordServiceShouldGetNextWordWhenWebSqlIsSupportedAndRefreshIsNecessary = function() {
    jc(function() {

        var callback = function(){};

        var data = [
            {'word' : "wordA", 'translation' : 'translationA', 'article' : 'articleA'},
            {'word' : "wordB", 'translation' : 'translationB', 'article' : 'articleB'}
        ];

        jc.expect("context.websqlStorageSupport")
            .once()
            .returnValue(true);

        jc.expect("databaseManager.checkIfWordStorageRefreshNecessary")
            .mock(function(){arguments[0](true);});

        jc.expect("ajaxManager.getWords")
            .mock(function(){arguments[0](data);});

        jc.expect("databaseManager.deleteAllWords")
            .mock(function(){arguments[0]();});

        jc.expect("databaseManager.addNewWordEntry")
            .exactly("2 times");

        wordService.getNextWord(callback);

    });
};

WordServiceTest.prototype.testWordServiceShouldGetNextWordWhenWebSqlIsNotSupported = function() {
    jc(function() {

        var callback = function(){};

        jc.expect("context.websqlStorageSupport")
            .once()
            .returnValue(false);

        jc.expect("ajaxManager.getNextWord")
            .once()
            .withArguments(callback);

        wordService.getNextWord(callback);

    });
};