package com.aimultiagent.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "chat_messages")
@Data
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sender;
private String agent;
    @Column(columnDefinition = "TEXT")
    private String message;
}