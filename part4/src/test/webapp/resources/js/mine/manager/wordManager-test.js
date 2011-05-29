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
var wordManager;

WordManagerTest = TestCase("WordManagerTest");

WordManagerTest.prototype.setUp = function() {
    jc = createJackContext();

    context = jc.create('context', ['getNextWordServiceUrl']);

    wordManager = new artikelApp.WordManager(context);
    wordManager._makeAllPublicForTests();
};

WordManagerTest.prototype.testWordManagerShouldFetchNextWord = function() {
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
                var data = {'word' : {'word' : 'new word', 'translation' : 'new translation', 'article' : 'new article'}};
                wordManager.fetchNextWordCallback(data, getNextWordCallback);
                return new function(){
                        this.error = function(){};
                    };
            });

        wordManager.getNextWord(getNextWordCallback);

        assertEquals('New word must be fetched', newWord, 'new word');
        assertEquals('New translation must be fetched', newTranslation, 'new translation');
        assertEquals('New article must be fetched', newArticle, 'new article');
    });
};

WordManagerTest.prototype.testWordManagerShouldHandleConnectionErrorsWhileFetchingNextWord = function() {
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

        wordManager.getNextWord(getNextWordCallback);

        assertNull('New word must be null', newWord);
        assertTrue('New translation must stay undefined', newTranslation==undefined);
        assertTrue('New article must stay undefined', newArticle==undefined);
    });
};