/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.mycompany.model.DAOs.interfaces;

import com.mycompany.model.modelosDTO.ClienteDTO;
import com.mycompany.model.modelosDTO.ProveedorDTO;
import java.sql.SQLException;

/**
 *
 * @author seanb
 */
public interface ProveedorDAO extends CRUDs<ProveedorDTO, String> {
    boolean signUp(String usuario, String contrasena) throws SQLException;
    boolean login(String usuario, String contrasena) throws SQLException;
    ProveedorDTO findByUser(String user);
}
