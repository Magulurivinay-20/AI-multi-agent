package com.aimultiagent.backend.controller;

import com.aimultiagent.backend.entity.Agent;
import com.aimultiagent.backend.repository.AgentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agents")
public class AgentController {

    private final AgentRepository repo;

    public AgentController(AgentRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Agent> getAllAgents() {
        return repo.findAll();
    }
    

    @PostMapping
    public Agent createAgent(@RequestBody Agent agent) {
        return repo.save(agent);
    }
    @PutMapping("/{id}")
public Agent updateAgent(
        @PathVariable Long id,
        @RequestBody Agent updatedAgent) {

    Agent agent = repo.findById(id).orElseThrow();

    agent.setName(updatedAgent.getName());
    agent.setRole(updatedAgent.getRole());
    agent.setModel(updatedAgent.getModel());
    agent.setColor(updatedAgent.getColor());

    return repo.save(agent);
}
@GetMapping("/count")
public long countAgents() {
    return repo.count();
}

    
}