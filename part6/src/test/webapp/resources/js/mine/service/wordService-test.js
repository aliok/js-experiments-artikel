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
var localStorageManager;

WordServiceTest= TestCase("WordServiceTest");

WordServiceTest.prototype.setUp = function() {
    jc = createJackContext();

    context = jc.create('context', ['localStorageSupport']);
    ajaxManager = jc.create('ajaxManager', ['getWords', 'getNextWord']);
    localStorageManager = jc.create('localStorageManager', ['isWordStorageRefreshNecessary', 'getNextWord', 'constructWordStorage']);

    wordService = new artikelApp.WordService(context, ajaxManager, localStorageManager);

    wordService._makeAllPublicForTests();
};

WordServiceTest.prototype.testWordServiceShouldGetNextWordWhenLocalStorageIsSupportedAndRefreshIsNotNecessary = function() {
    jc(function() {

        var callback = function(){};

        jc.expect("context.localStorageSupport")
            .once()
            .returnValue(true);

        jc.expect("localStorageManager.isWordStorageRefreshNecessary")
            .once()
            .returnValue(false);

        jc.expect("localStorageManager.getNextWord")
            .once()
            .withArguments(callback);

        wordService.getNextWord(callback);

    });
};

WordServiceTest.prototype.testWordServiceShouldGetNextWordWhenLocalStorageIsSupportedAndRefreshIsNecessary = function() {
    jc(function() {

        var callback = function(){};

        jc.expect("context.localStorageSupport")
            .once()
            .returnValue(true);

        jc.expect("localStorageManager.isWordStorageRefreshNecessary")
            .once()
            .returnValue(true);

        jc.expect("ajaxManager.getWords")
            .once();

        wordService.getNextWord(callback);

    });
};

WordServiceTest.prototype.testWordServiceShouldSetFetchedWordsOnLocalStorage = function() {
    jc(function() {

        var words = {'data' : 'the words'};

        var callback = function(){};

        jc.expect("localStorageManager.constructWordStorage")
            .once()
            .withArguments(words);

        jc.expect("localStorageManager.getNextWord")
            .once()
            .withArguments(callback);

        wordService.getWordsAjaxCallback(words, callback);

    });
};

WordServiceTest.prototype.testWordServiceShouldHandleConnectionErrorsDuringFetchingWords = function() {
    jc(function() {

        var passedWords = new Object();

        var callback = function(arg){
            passedWords = arg;
        };

        jc.expect("localStorageManager.constructWordStorage")
            .never();

        jc.expect("localStorageManager.getNextWord")
            .never();

        wordService.getWordsAjaxCallback(null, callback);

        assertNull('The passed words to callback must be null', passedWords);
    });
};

WordServiceTest.prototype.testWordServiceShouldGetNextWordWhenLocalStorageIsNotSupported = function() {
    jc(function() {

        var callback = function(){};

        jc.expect("context.localStorageSupport")
            .once()
            .returnValue(false);

        jc.expect("localStorageManager.isWordStorageRefreshNecessary")
            .never();

        jc.expect("ajaxManager.getNextWord")
            .once()
            .withArguments(callback);

        wordService.getNextWord(callback);

    });
};