/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.mycompany.model.DAOs.interfaces;

import com.mycompany.model.modelosDTO.ProveedorArticuloDTO;
import java.sql.SQLException;
import java.util.List;

/**
 *
 * @author seanb
 */
public interface ProveedorArticuloDAO extends CRUDs<ProveedorArticuloDTO, String> {
    List<ProveedorArticuloDTO> findByProveedor(String idProveedor) throws SQLException;
    List<ProveedorArticuloDTO> findByArticulo(String idArticulo) throws SQLException;
}