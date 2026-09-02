package com.aimultiagent.backend.controller;
import org.springframework.http.ResponseEntity;
import com.aimultiagent.backend.entity.User;
import com.aimultiagent.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        return userRepository.save(user);
    }
@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody User loginUser) {

    User user = userRepository.findByEmail(loginUser.getEmail());

    if (user != null &&
        user.getPassword().equals(loginUser.getPassword())) {
        return ResponseEntity.ok(user);
    }

    return ResponseEntity.status(401).body(new ErrorResponse("Invalid credentials", 401));
}
 @GetMapping("/count")
public long countUsers() {
    return userRepository.count();
}

    @GetMapping("/test")
    public String test() {
        return "Backend Working!";
    }
   
}