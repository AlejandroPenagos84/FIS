package com.mycompany.model.DAOs.implementaciones;

import com.mycompany.model.DAOs.interfaces.ProveedorArticuloDAO;
import com.mycompany.model.modelosDTO.ProveedorArticuloDTO;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ProveedorArticuloDAOImpl implements ProveedorArticuloDAO {

    private final Connection conn;

    public ProveedorArticuloDAOImpl(Connection connection) {
        this.conn = connection;
    }

    @Override
    public List<ProveedorArticuloDTO> findByProveedor(String idProveedor) throws SQLException {
        List<ProveedorArticuloDTO> lista = new ArrayList<>();
        String sql = "SELECT * FROM proveedor_articulo WHERE k_id_proveedor = ?";

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

    public ProveedorArticuloDTO findById(String idProveedor, String idArticulo) {
        ProveedorArticuloDTO dto = null;
        String sql = "SELECT * FROM proveedor_articulo WHERE k_id_proveedor = ? AND k_id_articulo = ?";

        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, idProveedor);
            stmt.setString(2, idArticulo);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    dto = map(rs);
                }
            }
        } catch (SQLException ex) {
            System.getLogger(ProveedorArticuloDAOImpl.class.getName())
                  .log(System.Logger.Level.ERROR, "Error al buscar proveedor_articulo", ex);
        }
        return dto;
    }

    @Override
    public List<ProveedorArticuloDTO> findAll() {
        List<ProveedorArticuloDTO> lista = new ArrayList<>();
        String sql = "SELECT * FROM proveedor_articulo";

        try (PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                lista.add(map(rs));
            }
        } catch (SQLException ex) {
            System.getLogger(ProveedorArticuloDAOImpl.class.getName())
                  .log(System.Logger.Level.ERROR, "Error al obtener todos los proveedor_articulo", ex);
        }
        return lista;
    }

    @Override
    public boolean insert(ProveedorArticuloDTO entity) {
        String sql = "INSERT INTO proveedor_articulo (i_stock_minimo, i_stock, k_id_articulo, k_id_proveedor) " +
                     "VALUES (?, ?, ?, ?)";

        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, entity.getI_stock_minimo());
            stmt.setInt(2, entity.getI_stock());
            stmt.setString(3, entity.getK_id_articulo());
            stmt.setString(4, entity.getK_id_proveedor());
            return stmt.executeUpdate() > 0;
        } catch (SQLException ex) {
            System.getLogger(ProveedorArticuloDAOImpl.class.getName())
                  .log(System.Logger.Level.ERROR, "Error al insertar proveedor_articulo", ex);
        }
        return false;
    }

    @Override
    public boolean update(ProveedorArticuloDTO entity) {
        String sql = "UPDATE proveedor_articulo SET i_stock_minimo = ?, i_stock = ? " +
                     "WHERE k_id_proveedor = ? AND k_id_articulo = ?";

        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, entity.getI_stock_minimo());
            stmt.setInt(2, entity.getI_stock());
            stmt.setString(3, entity.getK_id_proveedor());
            stmt.setString(4, entity.getK_id_articulo());
            return stmt.executeUpdate() > 0;
        } catch (SQLException ex) {
            System.getLogger(ProveedorArticuloDAOImpl.class.getName())
                  .log(System.Logger.Level.ERROR, "Error al actualizar proveedor_articulo", ex);
        }
        return false;
    }

    public boolean deleteById(String idProveedor, String idArticulo) {
        String sql = "DELETE FROM proveedor_articulo WHERE k_id_proveedor = ? AND k_id_articulo = ?";

        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, idProveedor);
            stmt.setString(2, idArticulo);
            return stmt.executeUpdate() > 0;
        } catch (SQLException ex) {
            System.getLogger(ProveedorArticuloDAOImpl.class.getName())
                  .log(System.Logger.Level.ERROR, "Error al eliminar proveedor_articulo", ex);
        }
        return false;
    }

    private ProveedorArticuloDTO map(ResultSet rs) throws SQLException {
        ProveedorArticuloDTO dto = new ProveedorArticuloDTO();
        dto.setI_stock_minimo(rs.getInt("i_stock_minimo"));
        dto.setI_stock(rs.getInt("i_stock"));
        dto.setK_id_articulo(rs.getString("k_id_articulo"));
        dto.setK_id_proveedor(rs.getString("k_id_proveedor"));
        return dto;
    }

    @Override
    public List<ProveedorArticuloDTO> findByArticulo(String idArticulo) throws SQLException {
        List<ProveedorArticuloDTO> lista = new ArrayList<>();
        String sql = "SELECT * FROM proveedor_articulo WHERE k_id_articulo = ?";

        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, idArticulo);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    lista.add(map(rs));
                }
            }
        }
        return lista;
    }


    @Override
    public ProveedorArticuloDTO findById(String id) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public boolean deleteById(String id) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
}
