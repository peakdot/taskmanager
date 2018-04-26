package main.java.com.taskmanager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import main.java.com.taskmanager.entities.Task;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

@Repository("taskRepository")
public interface TaskRepository extends JpaRepository<Task, Long> {

}
