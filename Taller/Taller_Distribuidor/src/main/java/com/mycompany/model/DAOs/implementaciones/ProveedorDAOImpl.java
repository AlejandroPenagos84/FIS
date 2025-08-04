package com.mycompany.model.DAOs.implementaciones;

import com.mycompany.model.DAOs.interfaces.ProveedorDAO;
import com.mycompany.model.modelosDTO.ProveedorDTO;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ProveedorDAOImpl implements ProveedorDAO {
    private final Connection conn;

    public ProveedorDAOImpl(Connection connection) {
        this.conn = connection;
    }

    @Override
    public boolean signUp(String usuario, String contrasena) throws SQLException {
        String check = "SELECT 1 FROM proveedor WHERE cre_usuario_proveedor = ?";
        try (PreparedStatement stmt = conn.prepareStatement(check)) {
            stmt.setString(1, usuario);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) return false;  // Ya existe
        }

        String insert = "INSERT INTO proveedor (k_id_proveedor, n_nombre, cre_usuario_proveedor, cre_contrasena_proveedor) " +
                        "VALUES (?, ?, ?, ?)";
        try (PreparedStatement stmt = conn.prepareStatement(insert)) {
            stmt.setString(1, "PROV" + System.currentTimeMillis()); // generar ID único
            stmt.setString(2, ""); // nombre vacío en signUp
            stmt.setString(3, usuario);
            stmt.setString(4, contrasena);
            return stmt.executeUpdate() > 0;
        }
    }

    @Override
    public boolean login(String usuario, String contrasena) throws SQLException {
        String sql = "SELECT 1 FROM proveedor WHERE cre_usuario_proveedor = ? AND cre_contrasena_proveedor = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, usuario);
            stmt.setString(2, contrasena);
            ResultSet rs = stmt.executeQuery();
            return rs.next();
        }
    }

    @Override
    public ProveedorDTO findById(String id) {
        String sql = "SELECT * FROM proveedor WHERE k_id_proveedor = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) return map(rs);
        } catch (SQLException ex) {
            System.getLogger(ProveedorDAOImpl.class.getName()).log(System.Logger.Level.ERROR, (String) null, ex);
        }
        return null;
    }

    @Override
    public List<ProveedorDTO> findAll() {
        String sql = "SELECT * FROM proveedor";
        List<ProveedorDTO> lista = new ArrayList<>();
        try (PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) lista.add(map(rs));
        } catch (SQLException ex) {
            System.getLogger(ProveedorDAOImpl.class.getName()).log(System.Logger.Level.ERROR, (String) null, ex);
        }
        return lista;
    }

    @Override
    public boolean insert(ProveedorDTO proveedor) {
        String sql = "INSERT INTO proveedor (k_id_proveedor, n_nombre, cre_usuario_proveedor, cre_contrasena_proveedor) " +
                     "VALUES (?, ?, ?, ?)";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, proveedor.getK_id_proveedor());
            stmt.setString(2, proveedor.getN_nombre());
            stmt.setString(3, proveedor.getCre_usuario_proveedor());
            stmt.setString(4, proveedor.getCre_contrasena_proveedor());
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public boolean update(ProveedorDTO proveedor) {
        String sql = "UPDATE proveedor SET n_nombre = ?, cre_usuario_proveedor = ?, cre_contrasena_proveedor = ? " +
                     "WHERE k_id_proveedor = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, proveedor.getN_nombre());
            stmt.setString(2, proveedor.getCre_usuario_proveedor());
            stmt.setString(3, proveedor.getCre_contrasena_proveedor());
            stmt.setString(4, proveedor.getK_id_proveedor());
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public boolean deleteById(String id) {
        String sql = "DELETE FROM proveedor WHERE k_id_proveedor = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, id);
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    private ProveedorDTO map(ResultSet rs) throws SQLException {
        ProveedorDTO dto = new ProveedorDTO();
        dto.setK_id_proveedor(rs.getString("k_id_proveedor"));
        dto.setN_nombre(rs.getString("n_nombre"));
        dto.setCre_usuario_proveedor(rs.getString("cre_usuario_proveedor"));
        dto.setCre_contrasena_proveedor(rs.getString("cre_contrasena_proveedor"));
        return dto;
    }

    @Override
    public ProveedorDTO findByUser(String user) {
        String sql = "SELECT * FROM proveedor WHERE cre_usuario_proveedor = ?";
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

}
