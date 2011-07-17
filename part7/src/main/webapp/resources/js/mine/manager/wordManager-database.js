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

artikelApp.WordDatabaseManager = function(){

    var database;

    /**
       * @public
       */
    this.initializeDatabase = function(callback){
        database = openDatabase('artikel-app', '1.0', 'Awesome German Learning Application Database', 2 * 1024 * 1024);

        database.transaction(
            function(tx){
                tx.executeSql('CREATE TABLE IF NOT EXISTS word (word TEXT NOT NULL, translation TEXT NOT NULL, article TEXT NOT NULL, shown BOOLEAN NOT NULL)');
            },
            function(sqlError){
                callback(false);
            },
            function(){
                callback(true);
            }
        );
    };

    /**
       * @public
       */
    this.checkIfWordStorageRefreshNecessary = function(callback){

        database.transaction(
            function(tx){
                tx.executeSql(
                        'select count(*) as notShownWordCount from word where shown="false"',
                        null,
                        function(t, r){
                            var notShownWordCount = r.rows.item(0)['notShownWordCount'];
                            if(notShownWordCount==0)
                                callback(true);
                            else
                                callback(false);
                        },
                        function(){});
            }
        );

    };

    /**
       * @public
       */
    this.getNextWord = function(callback){
        database.transaction(
            function(tx){
                tx.executeSql(
                        'select * from word where shown="false" limit 1',
                        null,
                        function(t, r){
                            var item = r.rows.item(0);
                            callback(item['word'], item['translation'], item['article']);
                        },
                        function(){});
            }
        );
    };

    this.addNewWordEntry = function(word, translation, article, callback){
        database.transaction(
            function(tx){
                tx.executeSql("INSERT INTO word values(?, ?, ?, 'false')", [word, translation, article]);
            },
            function(sqlError){
                alert(sqlError);
            },
            function(){
                if(callback)
                    callback(word, translation, article);
            }
        );
    };

    this.setWordAsShown = function(word, callback){
        database.transaction(
            function(tx){
                tx.executeSql('UPDATE word set shown="true" where word.word = ?', [word]);
            },
            function(sqlError){
                callback(sqlError);
            },
            function(){
                callback();
            }
        );
    };

    this.deleteAllWords = function(callback){
        database.transaction(
            function(tx){
                tx.executeSql('DELETE from word');
            },
            function(sqlError){
                callback(sqlError);
            },
            function(){
                callback();
            }
        );
    };

};