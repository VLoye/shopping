package com.team6.exception;

public class ErrorTokenException extends Exception {
    public ErrorTokenException(String message) {
        super(message);
    }

    public ErrorTokenException(String message, Throwable cause) {
        super(message, cause);
    }
}
