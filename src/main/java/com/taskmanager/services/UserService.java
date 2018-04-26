package main.java.com.taskmanager.services;

import main.java.com.taskmanager.entities.User;

public interface UserService {

	public User findUserByEmail(String email);

	public void saveUser(User user);
}
