/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.model.DAOs.implementaciones;

import com.mycompany.model.DAOs.interfaces.PedidoDAO;
import com.mycompany.model.modelosDTO.PedidoDTO;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author seanb
 */
public class PedidoDAOImpl implements PedidoDAO{
    private final Connection connection;

    public PedidoDAOImpl(Connection connection) {
        this.connection = connection;
    }

    @Override
    public List<PedidoDTO> findAllByCliente(String id_cliente) throws SQLException {
        List<PedidoDTO> lista = new ArrayList<>();
        String sql = "SELECT * FROM vista_estado_pedido WHERE k_cod_cliente = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, id_cliente);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                lista.add(map(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return lista;
    }


    @Override
    public PedidoDTO findById(String id) {
        String sql = "SELECT * FROM pedido WHERE k_id_pedido = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return map(rs);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<PedidoDTO> findAll() {
        List<PedidoDTO> pedidos = new ArrayList<>();
        String sql = "SELECT * FROM vista_estado_pedido";
        try (PreparedStatement stmt = connection.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                pedidos.add(map(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return pedidos;
    }



    @Override
    public boolean insert(PedidoDTO pedido) {
        String sql = "INSERT INTO pedido (k_id_pedido, k_cod_cliente, f_fecha_pedido) VALUES (?, ?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, pedido.getK_id_pedido());
            stmt.setString(2, pedido.getK_cod_cliente());
            stmt.setDate(3, new java.sql.Date(pedido.getF_fecha_pedido().getTime()));

            int filas = stmt.executeUpdate();
            return filas > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }


    @Override
    public boolean update(PedidoDTO pedido) {
        String sql = "UPDATE pedido SET k_cod_cliente=?, f_fecha_pedido=?, b_pagado=? WHERE k_id_pedido=?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, pedido.getK_cod_cliente());
            stmt.setDate(2, (Date) pedido.getF_fecha_pedido());
            stmt.setBoolean(3, pedido.isB_pagado());
            stmt.setString(4, pedido.getK_id_pedido());
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public boolean deleteById(String id) {
        String sql = "DELETE FROM pedido WHERE k_id_pedido = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, id);
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
    
    private PedidoDTO map(ResultSet rs) throws SQLException {
        PedidoDTO dto = new PedidoDTO();
        dto.setK_id_pedido(rs.getString("k_id_pedido"));
        dto.setK_cod_cliente(rs.getString("k_cod_cliente"));
        dto.setF_fecha_pedido(rs.getDate("f_fecha_pedido"));
        dto.setPorcentaje_entregado(rs.getDouble("porcentaje_entregado"));
        dto.setB_pagado(rs.getBoolean("b_pagado"));
        return dto;
    }

    @Override
    public double updatePorcentaje(PedidoDTO pedidoDTO) throws SQLException {
        String sql = "SELECT porcentaje_entregado FROM vista_estado_pedido WHERE k_cod_cliente = ? AND k_id_pedido = ?";

        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, pedidoDTO.getK_cod_cliente());
            stmt.setString(2, pedidoDTO.getK_id_pedido());

            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return rs.getDouble("porcentaje_entregado");
            } else {
                return 0.0;
            }
        }
    }

    }
