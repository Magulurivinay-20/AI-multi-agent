package com.aimultiagent.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "workflows")
@Data
public class Workflow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String status;
}