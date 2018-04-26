package main.java.com.taskmanager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import main.java.com.taskmanager.entities.Board;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

@Repository("boardRepository")
public interface BoardRepository extends JpaRepository<Board, Long> {

}