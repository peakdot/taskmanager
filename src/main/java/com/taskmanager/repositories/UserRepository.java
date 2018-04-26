package main.java.com.taskmanager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import main.java.com.taskmanager.entities.User;

@Repository("userRepository")
public interface UserRepository extends JpaRepository<User, Long> {
	User findByEmail(String email);
}
