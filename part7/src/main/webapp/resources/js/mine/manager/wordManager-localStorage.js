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

artikelApp.WordLocalStorageManager = function(){

    /**
       * @public
       */
    this.isWordStorageRefreshNecessary = function(){
        var lastWordId = window.localStorage['lastWordId'];
        if(!lastWordId)
            return true;

        lastWordId++;

        if(window.localStorage['word_' + lastWordId])
            return false;
        else
            return true;
    };

    /**
       * @public
       */
    this.constructWordStorage = function(words){
        for(var i=0; i<words.length;  i++){
            var word = words[i]['word'];
            var translation = words[i]['translation'];
            var article = words[i]['article'];

            window.localStorage['word_' + i] = word;
            window.localStorage['translation_' + i] = translation;
            window.localStorage['article_' + i] = article;
        }

        window.localStorage['lastWordId'] = -1;
    };

    /**
       * @public
       */
    this.getNextWord = function(callback){
        var lastWordId = window.localStorage['lastWordId'];

        lastWordId++;

        var word = window.localStorage['word_' + lastWordId];
        var translation = window.localStorage['translation_' + lastWordId];
        var article = window.localStorage['article_' + lastWordId];

        window.localStorage['lastWordId'] = lastWordId;

        callback(word, translation, article);
    };

};