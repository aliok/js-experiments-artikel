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

artikelApp.ApplicationBeanFactory = function(){

    var instance = this;

    instance.context = null;

    instance.wordManager = null;

    this.getContext = function(){
        if(!instance.context){
            instance.context = new artikelApp.Context();
        }

        return instance.context;
    };


    this.getWordManager = function(){
        if(!this.wordManager){
            this.wordManager = new artikelApp.WordManager(instance.getContext());
        }

        return instance.wordManager;
    };

};

var applicationBeanFactory = new artikelApp.ApplicationBeanFactory();