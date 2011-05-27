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
