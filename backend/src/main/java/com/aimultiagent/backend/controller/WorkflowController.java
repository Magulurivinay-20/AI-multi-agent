package com.aimultiagent.backend.controller;

import com.aimultiagent.backend.entity.Workflow;
import com.aimultiagent.backend.repository.WorkflowRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workflows")
@CrossOrigin(origins = "http://localhost:5173")
public class WorkflowController {

    private final WorkflowRepository repo;

    public WorkflowController(WorkflowRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Workflow> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Workflow create(@RequestBody Workflow workflow) {
        return repo.save(workflow);
    }
    @GetMapping("/count")
public long countWorkflows() {
    return repo.count();
}

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}