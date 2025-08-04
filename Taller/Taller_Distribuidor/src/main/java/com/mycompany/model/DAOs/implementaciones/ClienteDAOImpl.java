/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.model.DAOs.implementaciones;

import com.mycompany.model.DAOs.interfaces.ClienteDAO;
import com.mycompany.model.modelosDTO.ClienteDTO;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author seanb
 */
public class ClienteDAOImpl implements ClienteDAO{
    private final Connection conn;

    public ClienteDAOImpl(Connection connection) {
        this.conn = connection;
    }

    @Override
    public boolean signUp(String usuario, String contrasena) throws SQLException {
        String check = "SELECT 1 FROM cliente WHERE cre_usuario_cliente = ?";
        try (PreparedStatement stmt = conn.prepareStatement(check)) {
            stmt.setString(1, usuario);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) return false;
        }

        String insert = "INSERT INTO cliente (k_cod_cliente, cre_usuario_cliente, cre_contrasena_cliente) VALUES (?, ?, ?)";
        try (PreparedStatement stmt = conn.prepareStatement(insert)) {
            stmt.setString(1, "CLI" + System.currentTimeMillis());
            stmt.setString(2, usuario);
            stmt.setString(3, contrasena);
            return stmt.executeUpdate() > 0;
        }
    }

    @Override
    public boolean login(String usuario, String contrasena) throws SQLException {
        String sql = "SELECT 1 FROM cliente WHERE cre_usuario_cliente = ? AND cre_contrasena_cliente = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, usuario);
            stmt.setString(2, contrasena);
            ResultSet rs = stmt.executeQuery();
            return rs.next();
        }
    }

    @Override
    public ClienteDTO findById(String id) {
        String sql = "SELECT * FROM cliente WHERE k_cod_cliente = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return map(rs);
            }
        } catch (SQLException ex) {
            System.getLogger(ClienteDAOImpl.class.getName()).log(System.Logger.Level.ERROR, (String) null, ex);
        }
        return null;
    }

    @Override
    public List<ClienteDTO> findAll() {
        String sql = "SELECT * FROM cliente";
        List<ClienteDTO> lista = new ArrayList<>();

        try (PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                lista.add(map(rs));
            }
        } catch (SQLException ex) {
            System.getLogger(ClienteDAOImpl.class.getName()).log(System.Logger.Level.ERROR, (String) null, ex);
        }
        return lista;
    }

    @Override
    public boolean insert(ClienteDTO cliente) {
        String sql = "INSERT INTO cliente (k_cod_cliente, n_nombre_cliente, dir_calle, dir_carrera, dir_numero, " +
                "v_saldo, v_limite_credito, v_porcentaje_de_descuento, cre_usuario_cliente, cre_contrasena_cliente) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, cliente.getK_cod_cliente());
            stmt.setString(2, cliente.getN_nombre_cliente());
            stmt.setString(3, cliente.getDir_calle());
            stmt.setString(4, cliente.getDir_carrera());
            stmt.setString(5, cliente.getDir_numero());
            stmt.setDouble(6, cliente.getV_saldo());
            stmt.setDouble(7, cliente.getV_limite_credito());
            stmt.setDouble(8, cliente.getV_porcentaje_de_descuento());
            stmt.setString(9, cliente.getCre_usuario_cliente());
            stmt.setString(10, cliente.getCre_contrasena_cliente());
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public boolean update(ClienteDTO cliente) {
        String sql = "UPDATE cliente SET n_nombre_cliente=?, dir_calle=?, dir_carrera=?, dir_numero=?, " +
                "v_saldo=?, v_limite_credito=?, v_porcentaje_de_descuento=?, cre_usuario_cliente=?, " +
                "cre_contrasena_cliente=? WHERE k_cod_cliente=?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, cliente.getN_nombre_cliente());
            stmt.setString(2, cliente.getDir_calle());
            stmt.setString(3, cliente.getDir_carrera());
            stmt.setString(4, cliente.getDir_numero());
            stmt.setDouble(5, cliente.getV_saldo());
            stmt.setDouble(6, cliente.getV_limite_credito());
            stmt.setDouble(7, cliente.getV_porcentaje_de_descuento());
            stmt.setString(8, cliente.getCre_usuario_cliente());
            stmt.setString(9, cliente.getCre_contrasena_cliente());
            stmt.setString(10, cliente.getK_cod_cliente());
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public boolean deleteById(String id) {
        String sql = "DELETE FROM cliente WHERE k_cod_cliente = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, id);
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public ClienteDTO findByUser(String user) {
        String sql = "SELECT * FROM cliente WHERE cre_usuario_cliente = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, user);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return map(rs);
            }
        } catch (SQLException ex) {
            System.getLogger(ClienteDAOImpl.class.getName())
                  .log(System.Logger.Level.ERROR, "Error al buscar cliente por usuario", ex);
        }
        return null;
    }
    
    private ClienteDTO map(ResultSet rs) throws SQLException {
        ClienteDTO dto = new ClienteDTO();
        dto.setK_cod_cliente(rs.getString("k_cod_cliente"));
        dto.setN_nombre_cliente(rs.getString("n_nombre_cliente"));
        dto.setDir_calle(rs.getString("dir_calle"));
        dto.setDir_carrera(rs.getString("dir_carrera"));
        dto.setDir_numero(rs.getString("dir_numero"));
        dto.setV_saldo(rs.getDouble("v_saldo"));
        dto.setV_limite_credito(rs.getDouble("v_limite_credito"));
        dto.setV_porcentaje_de_descuento(rs.getDouble("v_porcentaje_de_descuento"));
        dto.setCre_usuario_cliente(rs.getString("cre_usuario_cliente"));
        dto.setCre_contrasena_cliente(rs.getString("cre_contrasena_cliente"));
        return dto;
    }
}
