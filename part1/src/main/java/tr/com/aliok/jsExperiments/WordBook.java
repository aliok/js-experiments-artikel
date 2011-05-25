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

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * @author Ali Ok (aliok@apache.org)
 */
public class WordBook implements Serializable{

    private final Set<Word> allWords;

    public WordBook() {
        allWords = new HashSet<Word>();

        allWords.add(new Word("Buch", "book", Article.DAS));
        allWords.add(new Word("Uhr", "wall clock", Article.DIE));
        allWords.add(new Word("Computer", "computer", Article.DER));
    }

    public Set<Word> getAllWords() {
        return allWords;
    }
}
