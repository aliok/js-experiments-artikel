package tr.com.aliok.jsExperiments.service;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import tr.com.aliok.jsExperiments.model.Message;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

/**
 * @author Ali Ok (aliok@apache.org)
 */
@Path("/messages/")
@Component
@Scope("request")
public class TestService {


//    @GET
//    @Produces("application/xml")
//    public MessageListDTO getMessages() {
//        return MessageConverter.toDTO(messages);
//    }

    @GET
    @Produces("application/xml")
    @Path("/{index}")
    public Response getMessage(@PathParam("index") int index) {
        return Response.status(Response.Status.OK).entity(new Message("TEST")).build();
    }

}
