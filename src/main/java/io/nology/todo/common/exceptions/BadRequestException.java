package io.nology.todo.common.exceptions;

public class BadRequestException extends Exception {
  public BadRequestException(String message) {
    super(message);
  }
}
