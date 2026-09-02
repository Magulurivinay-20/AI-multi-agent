package com.aimultiagent.backend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    @Value("${gemini.api.key:}")
    private String apiKey;

    @PostMapping("/chat")
public String chat(@RequestBody Map<String, String> body) {

    if (apiKey == null || apiKey.isBlank()) {
        return "{\"error\":\"Gemini API key is not configured\"}";
    }

    String userPrompt = body.get("message");
    String agent = body.getOrDefault("agent", "research");

    String systemPrompt;

    switch (agent) {

        case "coder":
            systemPrompt =
                "You are a senior software engineer. Give complete code, explanations and best practices.";
            break;

        case "writer":
            systemPrompt =
                "You are a professional content writer. Write clear, polished and human-like content.";
            break;

        case "planner":
            systemPrompt =
                "You are an expert project planner. Give step-by-step plans with timelines.";
            break;

        default:
            systemPrompt =
                "You are a research expert. Give accurate, detailed and structured answers.";
    }

    String prompt = systemPrompt + "\n\nUser: " + userPrompt;

    WebClient client = WebClient.create();

    String url =
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key="
        + apiKey;

    String requestBody = """
    {
      "contents":[
        {
          "parts":[
            {
              "text":"%s"
            }
          ]
        }
      ]
    }
    """.formatted(prompt);

    try {

        return client.post()
                .uri(url)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

    } catch (Exception e) {

        e.printStackTrace();

        return "{\"error\":\"Gemini API failed\"}";
    }
}
}