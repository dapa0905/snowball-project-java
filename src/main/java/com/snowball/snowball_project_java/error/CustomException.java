package com.snowball.snowball_project_java.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_GATEWAY)
public class CustomException extends RuntimeException{
  
  public CustomException(String message) {
    super(message);
  }
  
}
