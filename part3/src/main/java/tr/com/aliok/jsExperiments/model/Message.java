package tr.com.aliok.jsExperiments.model;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "message")
public class Message {

    private String content;

    private Message() {
    }

    public Message(String content) {
        this.setContent(content);
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

}