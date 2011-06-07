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

/**
 * @param context {artikelApp.Context}
 */
artikelApp.WordAjaxManager = function(context){

    var instance = this;

    /**
       * @private
       */
    var fetchNextWordCallback = function(data, callback) {

        if(!data || !data['words'])
            callback(null);

        var wordObject = data['words'];

        var word = wordObject['word'];
        var translation = wordObject['translation'];
        var article = wordObject['article'];

        callback(word, translation, article);

    };

    /**
       * @public
       */
    this.getNextWord = function(callback){
        $.getJSON(context.getNextWordServiceUrl(), function(data){
            fetchNextWordCallback(data, callback);
        })
        .error(function() {
            callback(null);
        });
    };

    /**
       * @private
       */
    var fetchWordsCallback = function(data, callback) {
        if(!data || !data['words'])
            callback(null);

        callback(data['words']);
    };

    this.getWords = function(callback){
        $.getJSON(context.getWordsServiceUrl(), function(data){
            fetchWordsCallback(data, callback);
        })
        .error(function() {
            callback(null);
        });
    };

    /**
       * Should only be used for tests
       * @public
       */
    this._makeAllPublicForTests = function(){
        instance.fetchNextWordCallback = fetchNextWordCallback;
        instance.fetchWordsCallback = fetchWordsCallback;
    };

};