package com.mycompany.model.DAOs.implementaciones;

import com.mycompany.model.DAOs.interfaces.ArticuloDAO;
import com.mycompany.model.modelosDTO.ArticuloDTO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ArticuloDAOImpl implements ArticuloDAO {

    private final Connection conn;

    public ArticuloDAOImpl(Connection connection) {
        this.conn = connection;
    }

    @Override
    public boolean insert(ArticuloDTO articulo) {
        String sql = "INSERT INTO articulo (k_id_articulo, n_nombre_articulo, t_descripcion, v_precio) VALUES (?, ?, ?, ?)";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, articulo.getK_id_articulo());
            stmt.setString(2, articulo.getN_nombre_articulo());
            stmt.setString(3, articulo.getT_descripcion());
            stmt.setDouble(4, articulo.getV_precio());
            return stmt.executeUpdate() > 0;
        } catch (SQLException ex) {
            Logger.getLogger(ArticuloDAOImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
        return false;
    }

    @Override
    public boolean update(ArticuloDTO articulo) {
        String sql = "UPDATE articulo SET n_nombre_articulo = ?, t_descripcion = ?, v_precio = ? WHERE k_id_articulo = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, articulo.getN_nombre_articulo());
            stmt.setString(2, articulo.getT_descripcion());
            stmt.setDouble(3, articulo.getV_precio());
            stmt.setString(4, articulo.getK_id_articulo());
            return stmt.executeUpdate() > 0;
        } catch (SQLException ex) {
            Logger.getLogger(ArticuloDAOImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
        return false;
    }

    @Override
    public boolean deleteById(String id) {
        String sql = "DELETE FROM articulo WHERE k_id_articulo = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, id);
            return stmt.executeUpdate() > 0;
        } catch (SQLException ex) {
            Logger.getLogger(ArticuloDAOImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
        return false;
    }

    @Override
    public ArticuloDTO findById(String id) {
        String sql = "SELECT * FROM articulo WHERE k_id_articulo = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return map(rs);
            }
        } catch (SQLException ex) {
            Logger.getLogger(ArticuloDAOImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    @Override
    public List<ArticuloDTO> findAll() {
        String sql = "SELECT * FROM articulo";
        List<ArticuloDTO> lista = new ArrayList<>();
        try (PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                lista.add(map(rs));
            }
        } catch (SQLException ex) {
            Logger.getLogger(ArticuloDAOImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
        return lista;
    }

    private ArticuloDTO map(ResultSet rs) throws SQLException {
        ArticuloDTO dto = new ArticuloDTO();
        dto.setK_id_articulo(rs.getString("k_id_articulo"));
        dto.setN_nombre_articulo(rs.getString("n_nombre_articulo"));
        dto.setT_descripcion(rs.getString("t_descripcion"));
        dto.setV_precio(rs.getDouble("v_precio"));
        return dto;
    }

    @Override
    public List<ArticuloDTO> findByProveedor(String idProveedor) throws SQLException {
        List<ArticuloDTO> lista = new ArrayList<>();
        String sql = "SELECT A.* FROM articulo A"
                + " NATURAL JOIN proveedor_articulo PA"
                + " WHERE PA.k_id_proveedor = ?";

        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, idProveedor);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    lista.add(map(rs));
                }
            }
        }
        return lista;
    }
}
