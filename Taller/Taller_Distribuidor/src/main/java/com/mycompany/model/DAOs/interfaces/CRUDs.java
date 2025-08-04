package com.mycompany.model.DAOs.interfaces;
import java.util.List;

public interface CRUDs <T, ID> {
    T findById(ID id);
    List<T> findAll();
    boolean insert(T entity);
    boolean update(T entity);
    boolean deleteById(ID id);
}
