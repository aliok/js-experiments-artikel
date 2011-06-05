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
var wordLocalStorageManager;

WordLocalStorageManagerTest = TestCase("WordLocalStorageManagerTest");

WordLocalStorageManagerTest.prototype.setUp = function() {
    jc = createJackContext();

    wordLocalStorageManager = new artikelApp.WordLocalStorageManager();

    localStorage.clear();
};

WordLocalStorageManagerTest.prototype.testShouldCheckIsWordStorageRefreshNecessaryWhenItIsNot = function() {
    jc(function() {

        localStorage['lastWordId'] = 1;
        localStorage['word_1'] = 'The Word';

        var wordStorageRefreshNecessary = wordLocalStorageManager.isWordStorageRefreshNecessary();

        assertTrue(wordStorageRefreshNecessary);

    });
};

WordLocalStorageManagerTest.prototype.testShouldCheckIsWordStorageRefreshNecessaryWhenLastWordIdIsNotPresent = function() {
    jc(function() {

        localStorage['lastWordId'] = null;

        var wordStorageRefreshNecessary = wordLocalStorageManager.isWordStorageRefreshNecessary();

        assertTrue(wordStorageRefreshNecessary);

    });
};

WordLocalStorageManagerTest.prototype.testShouldCheckIsWordStorageRefreshNecessaryWhenNextWordIsNotPresent = function() {
    jc(function() {

        localStorage['lastWordId'] = 1;

        var wordStorageRefreshNecessary = wordLocalStorageManager.isWordStorageRefreshNecessary();

        assertTrue(wordStorageRefreshNecessary);

    });
};

WordLocalStorageManagerTest.prototype.testConstructWordStorage = function() {
    jc(function() {

        var words = [
            {'word' : "wordA", 'translation' : 'translationA', 'article' : 'articleA'},
            {'word' : "wordB", 'translation' : 'translationB', 'article' : 'articleB'}
        ];

        wordLocalStorageManager.constructWordStorage(words);

        assertEquals(localStorage['lastWordId'], -1);

        assertEquals(localStorage['word_0'], 'wordA');
        assertEquals(localStorage['translation_0'], 'translationA');
        assertEquals(localStorage['article_0'], 'articleA');

        assertEquals(localStorage['word_1'], 'wordB');
        assertEquals(localStorage['translation_1'], 'translationB');
        assertEquals(localStorage['article_1'], 'articleB');
    });
};

WordLocalStorageManagerTest.prototype.testShouldGetNextWord = function() {
    jc(function() {

        localStorage['lastWordId'] = 99;

        localStorage['word_100'] = 'wordA';
        localStorage['translation_100'] = 'translationA';
        localStorage['article_100'] = 'articleA';

        var nextWord = null;
        var nextTranslation = null;
        var nextArticle = null;

        wordLocalStorageManager.getNextWord(function(word, translation, article){
            nextWord = word;
            nextTranslation = translation;
            nextArticle = article;
        });

        assertEquals(localStorage['lastWordId'], 100);

        assertEquals(nextWord, 'wordA');
        assertEquals(nextTranslation, 'translationA');
        assertEquals(nextArticle, 'articleA');
    });
};