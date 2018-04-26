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

import org.hibernate.annotations.Type;

@Entity
@Table(name = "TBL_BOARDS")
public class Board {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "name")
	@Size(max = 50, min = 1, message = "Name must be between 1 and 50 characters.")
	private String name;

	@Column(name = "opt")
	@Type(type = "text")
	private String opt;

	@Column(name = "style")
	@Type(type = "text")
	private String style;

	@Column(name = "type")
	private Integer type;

	@OneToMany(mappedBy = "board")
	private List<BoardTag> tags;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	public Long getId() {
		return id;
	}

	public List<BoardTag> getTags() {
		return tags;
	}

	public void setTags(List<BoardTag> tags) {
		this.tags = tags;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
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

	public String getOpt() {
		return opt;
	}

	public void setOpt(String opt) {
		this.opt = opt;
	}

	public String getStyle() {
		return style;
	}

	public void setStyle(String style) {
		this.style = style;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}
}
