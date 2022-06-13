package ru.home.rest;

import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.logging.Logger;

@Path("/api/user")
public class UserInfoREST {
    private static final Logger LOGGER = Logger.getLogger(UserInfoREST.class.getSimpleName());

    @Inject
    JsonWebToken jwt;

    @GET
    @Path("/functions")
    @Produces(MediaType.TEXT_PLAIN)
    public String getUserFunctionByRole() {
        LOGGER.info(jwt == null ? "null" : jwt.getRawToken());

        return "Jwt: " + (jwt == null ? "null" : jwt.getRawToken());
    }
}
