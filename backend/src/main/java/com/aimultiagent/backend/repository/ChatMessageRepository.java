package com.aimultiagent.backend.repository;
import java.util.List;
import com.aimultiagent.backend.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessageRepository
        extends JpaRepository<ChatMessage, Long> {
List<ChatMessage> findByAgent(String agent);
}