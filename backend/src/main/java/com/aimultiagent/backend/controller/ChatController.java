package com.aimultiagent.backend.controller;

import com.aimultiagent.backend.entity.ChatMessage;
import com.aimultiagent.backend.repository.ChatMessageRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatController {

    private final ChatMessageRepository repo;

    public ChatController(ChatMessageRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<ChatMessage> getMessages() {
        return repo.findAll();
    }

@GetMapping("/count")
public long countChats() {
    return repo.count();
}


    @GetMapping("/{agent}")
public List<ChatMessage> getAgentMessages(
        @PathVariable String agent) {

    return repo.findByAgent(agent);
}
@DeleteMapping("/clear")
public void clearChats() {
    repo.deleteAll();
}

    @PostMapping
    public ChatMessage sendMessage(
            @RequestBody ChatMessage message) {
        return repo.save(message);
    }
}