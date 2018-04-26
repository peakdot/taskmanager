package main.java.com.taskmanager.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;
import javax.validation.constraints.Size;

@Entity
@Table(name = "TBL_TASK_TAGS")
public class TaskTag {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "_name")
	@Size(max = 50, min = 1, message = "Name must be between 1 and 50 characters.")
	private String name;

	@ManyToOne
	@JoinColumn(name = "task_id", nullable = false)
	private Task task;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Task getTask() {
		return task;
	}

	public void setTask(Task task) {
		this.task = task;
	}

}
