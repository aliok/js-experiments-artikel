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

artikelApp.WordService = function(context, ajaxManager, databaseManager){

    var instance = this;

    this.initializeDatabase = function(callback){
        databaseManager.initializeDatabase(callback);
    };

    var getWordsAjaxCallback = function(words, callback){
        if(words==null){
            callback(null);
        }
        else{
            constructWordStorage(words, function(word, translation, article){
                databaseManager.setWordAsShown(word, function(){
                    callback(word, translation, article);
                });
            });
        }
    };


    this.getNextWord = function(callback){
        if(context.websqlStorageSupport()){
            databaseManager.checkIfWordStorageRefreshNecessary(function(refreshNecessary){
                if(refreshNecessary){
                    ajaxManager.getWords(function(data){
                        getWordsAjaxCallback(data,callback);
                    });
                }
                else{
                    databaseManager.getNextWord(function(word, translation, article){
                        databaseManager.setWordAsShown(word, function(){
                            callback(word, translation, article);
                        });
                    });
                }
            });
        }
        else{
            ajaxManager.getNextWord(callback);
        }
    };

    var constructWordStorage = function(words, firstWordCallback){
        databaseManager.deleteAllWords(function(sqlError){
            if(sqlError){
                alert("Unable to delete all words for reconstructing the word storage");
                return;
            }

            for(var i=0; i<words.length;  i++){
                var word = words[i]['word'];
                var translation = words[i]['translation'];
                var article = words[i]['article'];

                if(i==0)
                    databaseManager.addNewWordEntry(word, translation, article, firstWordCallback);
                else
                    databaseManager.addNewWordEntry(word, translation, article);
            }
        });
    };

    /**
       * Should only be used for tests
       * @public
       */
    this._makeAllPublicForTests = function(){
        instance.getWordsAjaxCallback = getWordsAjaxCallback;
        instance.constructWordStorage = constructWordStorage;
    };
};