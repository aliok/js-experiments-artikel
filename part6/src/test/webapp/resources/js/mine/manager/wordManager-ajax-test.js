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

var context;
var wordAjaxManager;

WordAjaxManagerTest= TestCase("WordAjaxManagerTest");

WordAjaxManagerTest.prototype.setUp = function() {
    jc = createJackContext();

    context = jc.create('context', ['getNextWordServiceUrl', 'getWordsServiceUrl']);

    wordAjaxManager = new artikelApp.WordAjaxManager(context);
    wordAjaxManager._makeAllPublicForTests();
};

WordAjaxManagerTest.prototype.testWordAjaxManagerShouldFetchNextWord = function() {
    jc(function() {

        var newWord, newTranslation, newArticle;

        var getNextWordCallback = function(word, translation, article){
            newWord = word;
            newTranslation = translation;
            newArticle = article;
        };

        jc.expect("context.getNextWordServiceUrl")
            .once()
            .returnValue('service url');

        jc.expect("$.getJSON")
            .once()
            .mock(function(){
                var data = {'words' : {'word' : 'new word', 'translation' : 'new translation', 'article' : 'new article'}};
                wordAjaxManager.fetchNextWordCallback(data, getNextWordCallback);
                return new function(){
                        this.error = function(){};
                    };
            });

        wordAjaxManager.getNextWord(getNextWordCallback);

        assertEquals('New word must be fetched', newWord, 'new word');
        assertEquals('New translation must be fetched', newTranslation, 'new translation');
        assertEquals('New article must be fetched', newArticle, 'new article');
    });
};

WordAjaxManagerTest.prototype.testWordAjaxManagerShouldHandleConnectionErrorsWhileFetchingNextWord = function() {
    jc(function() {

        var newWord, newTranslation, newArticle;

        var getNextWordCallback = function(word, translation, article){
            newWord = word;
            newTranslation = translation;
            newArticle = article;
        };

        jc.expect("context.getNextWordServiceUrl")
            .once()
            .returnValue('service url');

        jc.expect("$.getJSON")
            .once()
            .mock(function(){
                return new function(){
                        this.error = function(){
                            getNextWordCallback(null);
                        };
                    };
            });

        wordAjaxManager.getNextWord(getNextWordCallback);

        assertNull('New word must be null', newWord);
        assertTrue('New translation must stay undefined', newTranslation==undefined);
        assertTrue('New article must stay undefined', newArticle==undefined);
    });
};

WordAjaxManagerTest.prototype.testWordAjaxManagerShouldFetchWords = function() {
    jc(function() {

        var fetchedWords;

        var getWordsCallback = function(words){
            fetchedWords = words;
        };

        jc.expect("context.getWordsServiceUrl")
            .once()
            .returnValue('service url');

        jc.expect("$.getJSON")
            .once()
            .mock(function(){
                wordAjaxManager.fetchWordsCallback({'words' : 'the data'}, getWordsCallback);
                return new function(){
                    this.error = function(){};
                };
            });

        wordAjaxManager.getWords(getWordsCallback);

        assertEquals('Words must be fetched', 'the data', fetchedWords);
    });
};

WordAjaxManagerTest.prototype.testWordAjaxManagerShouldHandleConnectionErrorsWhileFetchingWords = function() {
    jc(function() {

        var fetchedWords;

        var getWordsCallback = function(words){
            fetchedWords = words;
        };

        jc.expect("context.getWordsServiceUrl")
            .once()
            .returnValue('service url');

        jc.expect("$.getJSON")
            .once()
            .mock(function(){
                return new function(){
                    this.error = function(){
                        getWordsCallback(null);
                    };
                };
            });

        wordAjaxManager.getWords(getWordsCallback);

        assertNull('Words must be null because of the error', fetchedWords);
    });
};