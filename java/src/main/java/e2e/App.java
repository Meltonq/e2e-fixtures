package e2e;

import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class App {
    @GetMapping(value = "/", produces = "text/plain")
    public String index() {
        this does not compile
        return "e2e:java:v3-broken";
    }

    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
}
