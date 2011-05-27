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

package tr.com.aliok.jsExperiments.model;

import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

/**
 * @author Ali Ok (aliok@apache.org)
 */
@XmlRootElement(name = "Word")
public class Word implements Serializable{
    private final String word;
    private final String translation;
    private final Article article;

    public Word(String word, String translation, Article article) {
        this.word = word;
        this.translation = translation;
        this.article = article;
    }

    public String getWord() {
        return word;
    }

    public String getTranslation() {
        return translation;
    }

    public Article getArticle() {
        return article;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Word word1 = (Word) o;

        if (article != word1.article) return false;
        if (!translation.equals(word1.translation)) return false;
        if (!word.equals(word1.word)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = word.hashCode();
        result = 31 * result + translation.hashCode();
        result = 31 * result + article.hashCode();
        return result;
    }
}
