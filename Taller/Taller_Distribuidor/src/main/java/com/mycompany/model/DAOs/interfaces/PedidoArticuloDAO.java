/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.mycompany.model.DAOs.interfaces;

import com.mycompany.model.modelosDTO.PedidoArticuloDTO;
import java.sql.SQLException;
import java.util.List;

/**
 *
 * @author seanb
 */
public interface PedidoArticuloDAO extends CRUDs<PedidoArticuloDTO, String> {
    List<PedidoArticuloDTO> findByPedido(String idPedido) throws SQLException;
}
