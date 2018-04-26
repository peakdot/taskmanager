package main.java.com.taskmanager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import main.java.com.taskmanager.entities.Role;

@Repository("roleRepository")
public interface RoleRepository extends JpaRepository<Role, Integer> {
	Role findByRole(String role);

}