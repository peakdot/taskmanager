package main.java.com.taskmanager.entities;

import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

@Entity // This tells Hibernate to make a table out of this class
@Table(name = "TBL_USERS")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@Column(name = "fname")
	@Size(max = 40, min = 3, message = "Name must be between 3 and 40 characters.")
	@NotEmpty(message = "Required field.")
	private String fname;

	@Column(name = "lname")
	@Size(max = 40, min = 3, message = "Name must be between 3 and 40 characters.")
	@NotEmpty(message = "Required field.")
	private String lname;

	@Column(name = "email", unique = true)
	@Email(message = "Invalid email address.")
	@NotEmpty(message = "Required field.")
	private String email;

	@Column(name = "password")
	private String password;

	@OneToMany(mappedBy = "user")
	private List<Board> boards;

	@OneToMany(mappedBy = "user")
	private List<Task> tasks;

	@ManyToMany
	@JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles;

	public List<Board> getBoards() {
		return boards;
	}

	public void setBoards(List<Board> boards) {
		this.boards = boards;
	}

	public List<Task> getTasks() {
		return tasks;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFname() {
		return fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public String getLname() {
		return lname;
	}

	public void setLname(String lname) {
		this.lname = lname;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

}
