package com.assignment.foodGarden;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class RecommendationController 
{

    @PostMapping("/recommendation")
    public String getRecommendation(@RequestParam("area") int area, Model model) 
	{
        // Determine the recommended plants and image
        String[] recommendation = getPlantRecommendation(area);

        // Add data to the model
        model.addAttribute("area", area);
        model.addAttribute("plant", recommendation[0]);
        model.addAttribute("image", recommendation[1]);

        // Return the view name (Thymeleaf template)
        return "recommendation";
    }

    private String[] getPlantRecommendation(int area) 
	{
        if (area < 10) 
		{
            return new String[]{"Herbs like basil, mint, or parsley.", "herbs.jpg"};
        } 
		else if (area >= 10 && area < 50) 
		{
            return new String[]{"Small vegetables like tomatoes, lettuce, or carrots.", "vegetables.jpg"};
        } 
		else 
		{
            return new String[]{"Larger vegetables or even small fruit trees like apples or peaches.", "large_garden.jpg"};
        }
    }
}
