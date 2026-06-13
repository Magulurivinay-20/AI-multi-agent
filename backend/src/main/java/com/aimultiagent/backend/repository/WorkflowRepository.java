package com.aimultiagent.backend.repository;

import com.aimultiagent.backend.entity.Workflow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkflowRepository extends JpaRepository<Workflow, Long> {
}