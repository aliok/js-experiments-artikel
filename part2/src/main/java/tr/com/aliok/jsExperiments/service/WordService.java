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

package tr.com.aliok.jsExperiments.service;

import org.apache.commons.collections.CollectionUtils;
import tr.com.aliok.jsExperiments.model.Word;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collections;
import java.util.LinkedList;

/**
 * @author Ali Ok (aliok@apache.org)
 */
public class WordService extends HttpServlet{

    private static final String WORD_BOOK_KEY = "WORD_BOOK";
    private static final String SHUFFLED_WORDS_KEY = "SHUFFLED_WORDS";


    @Override
    public void init() throws ServletException {
        WordBook wordBook = new WordBook();

        this.getServletConfig().getServletContext().setAttribute(WORD_BOOK_KEY, wordBook);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        final PrintWriter writer = resp.getWriter();

        final LinkedList<Word> shuffledWords =  getShuffledWords(req);
        final Word word = shuffledWords.pop();

        writer.printf("{ \"word\" : \"%s\", \"translation\" : \"%s\", \"article\" : \"%s\" }", word.getWord(), word.getTranslation(), word.getArticle().getText());

        writer.flush();
    }

    private LinkedList<Word> getShuffledWords(HttpServletRequest req) {
        final HttpSession session = req.getSession(true);
        LinkedList<Word> shuffledWords = (LinkedList<Word>) session.getAttribute(SHUFFLED_WORDS_KEY);
        if(CollectionUtils.isEmpty(shuffledWords)){
            WordBook wordBook = (WordBook) this.getServletConfig().getServletContext().getAttribute(WORD_BOOK_KEY);
            shuffledWords = new LinkedList<Word>(wordBook.getAllWords());

            Collections.shuffle(shuffledWords);

            session.setAttribute(SHUFFLED_WORDS_KEY, shuffledWords);
        }

        return shuffledWords;
    }

}
