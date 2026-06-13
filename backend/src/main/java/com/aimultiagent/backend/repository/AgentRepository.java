package com.aimultiagent.backend.repository;

import com.aimultiagent.backend.entity.Agent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgentRepository extends JpaRepository<Agent, Long> {
}