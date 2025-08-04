/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.mycompany.model.DAOs.interfaces;

import com.mycompany.model.modelosDTO.ClienteDTO;
import java.sql.SQLException;

/**
 *
 * @author seanb
 */
public interface ClienteDAO extends CRUDs<ClienteDTO, String> {
    boolean signUp(String usuario, String contrasena) throws SQLException;
    boolean login(String usuario, String contrasena) throws SQLException;
    ClienteDTO findByUser(String user);
}
