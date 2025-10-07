package com.snowball.snowball_project_java.dto.api;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ApiResponse<T> {
  
  private boolean success;
  private String message;
  private T data;

}
