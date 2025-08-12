package com.assignment.foodGarden;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "homepage";  // Maps to src/main/resources/templates/homePage.html
    }

    @GetMapping("/about")
    public String about() {
        return "about";  // Maps to src/main/resources/templates/about.html
    }

    @GetMapping("/garden")
    public String gardenForm() {
        return "garden_form";  // Maps to src/main/resources/templates/garden_form.html
    }
}
