package tr.com.aliok.jsExperiments.service;

import tr.com.aliok.jsExperiments.model.Word;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

/**
 * @author Ali Ok (aliok@apache.org)
 */
public interface WordService {

    @GET
    @Path("/nextWord")
    public Word getNextWord();
}
