package com.snowball.snowball_project_java.dto.mock;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MockStockSearchDto {

  private String ticker;
  private String name;
  private String description;
  private String homepageUrl;
  private Long marketCap;
  private String logoUrl;
  private String sicCode;
  private String sicDescription;
  private String type;

}
