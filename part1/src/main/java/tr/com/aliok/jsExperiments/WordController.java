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

package tr.com.aliok.jsExperiments;

import org.apache.commons.collections.CollectionUtils;

import javax.faces.event.ActionEvent;
import java.io.Serializable;
import java.util.*;

/**
 * @author Ali Ok (aliok@apache.org)
 */
public class WordController implements Serializable{

    private WordBook wordBook;

    private LinkedList<Word> shuffledWords;
    private Word currentWord;
    private int score = 0;
    private boolean lastAnswerWasCorrect;
    private boolean answered = false;


    public void constructWordSet(){
        this.shuffledWords = new LinkedList<Word>(wordBook.getAllWords());
        Collections.shuffle(this.shuffledWords);
    }

    public void der(ActionEvent event){
        answer(Article.DER);
    }

    public void die(ActionEvent event){
        answer(Article.DIE);
    }

    public void das(ActionEvent event){
        answer(Article.DAS);
    }

    private void answer(Article article){
        if(currentWord.getArticle().equals(article)){
            lastAnswerWasCorrect = true;
            score++;
        }
        else{
            lastAnswerWasCorrect = false;
            score--;
        }

        answered = true;
    }

    public void nextWord(ActionEvent event) {
        if(CollectionUtils.isEmpty(this.shuffledWords))
            constructWordSet();

        this.currentWord = this.shuffledWords.poll();

        answered = false;
    }

    public Word getCurrentWord(){
        if(this.currentWord==null)
            this.nextWord(null);

        return this.currentWord;
    }

    public void setWordBook(WordBook wordBook) {
        this.wordBook = wordBook;
    }

    public int getScore() {
        return score;
    }

    public boolean isLastAnswerWasCorrect() {
        return lastAnswerWasCorrect;
    }

    public boolean isAnswered() {
        return answered;
    }
}
