package fr.cpe.dao;

import javax.annotation.PostConstruct;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import fr.cpe.common.Role;
import fr.cpe.common.UserModel;

import java.util.List;

@Stateless
public class UserDao {

    @PersistenceContext
    EntityManager em;

    public void addUser(UserModel user) {
        em.persist(user);
    }

    public List<UserModel> listUsers() {
        List<UserModel> users = em.createNamedQuery("Users.list").getResultList();

        return users;
    }

    public List<UserModel> findUser(String login) {
        CriteriaBuilder builder = em.getCriteriaBuilder();

        CriteriaQuery<UserModel> crit = builder.createQuery(UserModel.class);
        Root<UserModel> root = crit.from(UserModel.class);
        crit.select(root)
                .where(builder.like(builder.lower(root.get("login")), "%" + login.toLowerCase() + "%"));

        List<UserModel> users = em.createQuery(crit).getResultList();

        return users;
    }
    
	public Role checkUser(UserModel user) {
		Role result = null;
		UserModel existingUser = findUser(user.getLogin()).get(0);
		
		if (existingUser != null) {
			result = Role.valueOf(existingUser.getRole());
		}
		
		return result;
	}
}
