/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.mycompany.model.DAOs.interfaces;
import java.sql.SQLException;
import java.util.List;
import com.mycompany.model.modelosDTO.PedidoDTO;

/**
 *
 * @author seanb
 */
public interface PedidoDAO extends CRUDs<PedidoDTO, String>{
    List<PedidoDTO> findAllByCliente (String id_cliente) throws SQLException;
    double updatePorcentaje (PedidoDTO pedidoDTO) throws SQLException;
    
}
