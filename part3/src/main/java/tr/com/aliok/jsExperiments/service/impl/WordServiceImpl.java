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

package tr.com.aliok.jsExperiments.service.impl;

import org.apache.cxf.common.util.CollectionUtils;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.context.annotation.Scope;
import tr.com.aliok.jsExperiments.model.Word;
import tr.com.aliok.jsExperiments.service.WordBook;
import tr.com.aliok.jsExperiments.service.WordService;

import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.Collections;
import java.util.LinkedList;

/**
 * @author Ali Ok (aliok@apache.org)
 */
@Path("/wordService/")
@Scope("session")
@Produces("application/json")
public class WordServiceImpl implements WordService {

    private WordBook wordBook;

    private LinkedList<Word> shuffledWords;

    @Override
    public Word getNextWord() {
        return getShuffledWords().pop();
    }

    private LinkedList<Word> getShuffledWords() {
        if (CollectionUtils.isEmpty(this.shuffledWords)) {
            this.shuffledWords = new LinkedList<Word>(this.wordBook.getAllWords());

            Collections.shuffle(this.shuffledWords);
        }

        return shuffledWords;
    }

    @Required
    public void setWordBook(WordBook wordBook) {
        this.wordBook = wordBook;
    }
}
