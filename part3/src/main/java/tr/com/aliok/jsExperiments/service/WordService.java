///*
// * Copyright [2011] [Ali Ok - aliok@apache.org]
// *
// *    Licensed under the Apache License, Version 2.0 (the "License");
// *    you may not use this file except in compliance with the License.
// *    You may obtain a copy of the License at
// *
// *        http://www.apache.org/licenses/LICENSE-2.0
// *
// *    Unless required by applicable law or agreed to in writing, software
// *    distributed under the License is distributed on an "AS IS" BASIS,
// *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// *    See the License for the specific language governing permissions and
// *    limitations under the License.
// */
//
//package tr.com.aliok.jsExperiments.service;
//
//import tr.com.aliok.jsExperiments.model.Word;
//
//import javax.servlet.ServletException;
//import javax.ws.rs.Consumes;
//import javax.ws.rs.GET;
//import javax.ws.rs.Path;
//import javax.ws.rs.Produces;
//import java.util.ArrayList;
//import java.util.Collections;
//import java.util.List;
//
///**
// * @author Ali Ok (aliok@apache.org)
// */
//@Path("/wordService/")
//@Produces("application/json")
//public class WordService{
//
//    WordBook wordBook;
//
//
//    public WordService() {
//        wordBook = new WordBook();
//    }
//
//    @GET
//    @Path("/nextWord/")
//    @Consumes("application/json")
//    protected Word nextWord(){
//        return getShuffledWords().iterator().next();
//
//    }
//
//    private List<Word> getShuffledWords() {
//        //TODO use math.random iterator
//
//        List<Word> shuffledWords = new ArrayList<Word>(this.wordBook.getAllWords());
//
//        Collections.shuffle(shuffledWords);
//
//
//        return shuffledWords;
//    }
//
//}
