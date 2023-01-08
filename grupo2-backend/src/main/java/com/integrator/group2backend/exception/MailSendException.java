package com.integrator.group2backend.exception;

public class MailSendException extends org.springframework.mail.MailSendException {
    public MailSendException(String message) { super(message); }
}
