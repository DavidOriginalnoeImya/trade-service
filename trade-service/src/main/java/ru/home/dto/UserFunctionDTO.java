package ru.home.dto;

public class UserFunctionDTO {
    private String functionName;
    private String functionUri;

    public String getFunctionName() {
        return functionName;
    }

    public UserFunctionDTO setFunctionName(String functionName) {
        this.functionName = functionName;

        return this;
    }

    public String getFunctionUri() {
        return functionUri;
    }

    public UserFunctionDTO setFunctionUri(String functionUri) {
        this.functionUri = functionUri;

        return this;
    }




}
