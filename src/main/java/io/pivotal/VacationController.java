package io.pivotal;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class VacationController {

    @Value("${VACATIONFORM_URL}")
    private String url = "https://example.com/exec";

    @RequestMapping(path = "/api/setVacationPlans", method = RequestMethod.POST, consumes = {"application/json"})
    public ResponseEntity vacationPlans3(@RequestBody VacationRequest vacationRequest) {
        vacationRequest.stripPlans();
        System.out.println(vacationRequest);
        RestTemplate restTemplate = new RestTemplate();
        HttpMessageConverter formHttpMessageConverter = new FormHttpMessageConverter();
        HttpMessageConverter stringHttpMessageConverter = new StringHttpMessageConverter();
        restTemplate.getMessageConverters().add(formHttpMessageConverter);
        restTemplate.getMessageConverters().add(stringHttpMessageConverter);

        for (VacationPlan plan : vacationRequest.vacationPlans) {
            MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
            map.add("name", vacationRequest.getName());
            map.add("weeks", Integer.toString(vacationRequest.getWeeks()));
            map.add("ptoDays", Integer.toString(vacationRequest.getPtoDays()));
            map.add("fromDate", plan.getFromDate());
            map.add("toDate", plan.getToDate());
            map.add("note", plan.getNote());

            String response = restTemplate.postForObject(url, map, String.class);
            System.out.println(response);
        }

        return new ResponseEntity("its done", HttpStatus.OK);
    }
}
