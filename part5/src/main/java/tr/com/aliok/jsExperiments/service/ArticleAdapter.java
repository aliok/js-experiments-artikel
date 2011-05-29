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

import tr.com.aliok.jsExperiments.model.Article;

import javax.xml.bind.annotation.adapters.XmlAdapter;

/**
 * This class is for used while converting the Article enum to String.
 * If this is missing, Article enum is converted by the name, not the text
 * @author Ali Ok (aliok@apache.org)
 */
public class ArticleAdapter extends XmlAdapter<String, Article> {

    @Override
    public Article unmarshal(String v) throws Exception {
        for (Article article : Article.values()) {
            if (article.getText().equals(v))
                return article;
        }

        return null;
    }

    @Override
    public String marshal(Article v) throws Exception {
        return v.getText();
    }

}
