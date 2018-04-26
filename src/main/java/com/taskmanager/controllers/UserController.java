package main.java.com.taskmanager.controllers;

import java.util.HashSet;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import main.java.com.taskmanager.entities.Role;
import main.java.com.taskmanager.entities.User;
import main.java.com.taskmanager.repositories.UserRepository;
import main.java.com.taskmanager.services.UserService;

@Controller // This means that this class is a Controller
public class UserController {
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserService userService;

	@RequestMapping(value={"/", "/login"}, method = RequestMethod.GET)
	public ModelAndView login(){
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("login");
		return modelAndView;
	}
	
	@RequestMapping(value={"/registration"}, method = RequestMethod.GET)
	public ModelAndView register(){
		ModelAndView modelAndView = new ModelAndView();
		User user = new User();
		modelAndView.addObject("user", user);
		modelAndView.setViewName("registration");
		return modelAndView;
	}

	@PostMapping(path = "/registration")
	public ModelAndView createNewUser(@Valid User user, BindingResult bindingResult) {
		ModelAndView modelAndView = new ModelAndView();
		User userExists = userService.findUserByEmail(user.getEmail());
		if (userExists != null) {
			bindingResult
					.rejectValue("email", "error.user",
							"There is already a user registered with the email provided");
		}
		if (bindingResult.hasErrors()) {
			modelAndView.setViewName("registration");
		} else {
			Role role = new Role();
			Set<Role> roles = new HashSet<>();
			role.setRole("USER");
			roles.add(role);
			user.setRoles(roles);
			userService.saveUser(user);
			modelAndView.setViewName("redirect:/login?registered=true");
			
		}
		return modelAndView;
	}

}
