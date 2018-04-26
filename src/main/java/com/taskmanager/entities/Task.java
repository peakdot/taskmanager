package main.java.com.taskmanager.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table(name = "TBL_BALLS")
public class Task {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "_name")
	@Size(max = 50, min = 1, message = "Name must be between 1 and 50 characters.")
	@NotEmpty(message = "Required field.")
	private String name;

	@Column(name = "_goalid", nullable = false, columnDefinition = "int default 0")
	private Integer goalid;

	@Column(name = "_duration", nullable = false, columnDefinition = "int default 10")
	private Integer duration;

	@Column(name = "_starttime")
	private java.time.LocalTime starttime;

	@Column(name = "_endtime")
	private java.time.LocalTime endtime;

	@Column(name = "_startdate")
	private java.time.LocalDate startdate;

	@Column(name = "_enddate")
	private java.time.LocalDate enddate;

	@Column(name = "_interval")
	private Integer interval;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@OneToMany(mappedBy = "task")
	private List<TaskTag> tags;

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

	public Integer getGoalid() {
		return goalid;
	}

	public void setGoalid(Integer goalid) {
		this.goalid = goalid;
	}

	public Integer getDuration() {
		return duration;
	}

	public void setDuration(Integer duration) {
		this.duration = duration;
	}

	public java.time.LocalTime getStarttime() {
		return starttime;
	}

	public void setStarttime(java.time.LocalTime starttime) {
		this.starttime = starttime;
	}

	public java.time.LocalTime getEndtime() {
		return endtime;
	}

	public void setEndtime(java.time.LocalTime endtime) {
		this.endtime = endtime;
	}

	public java.time.LocalDate getStartdate() {
		return startdate;
	}

	public void setStartdate(java.time.LocalDate startdate) {
		this.startdate = startdate;
	}

	public java.time.LocalDate getEnddate() {
		return enddate;
	}

	public void setEnddate(java.time.LocalDate enddate) {
		this.enddate = enddate;
	}

	public Integer getInterval() {
		return interval;
	}

	public void setInterval(Integer interval) {
		this.interval = interval;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<TaskTag> getTags() {
		return tags;
	}

	public void setTags(List<TaskTag> tags) {
		this.tags = tags;
	}

}
