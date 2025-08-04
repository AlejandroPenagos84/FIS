package com.mycompany.model.DAOs.implementaciones;

import com.mycompany.model.DAOs.interfaces.PedidoArticuloDAO;
import com.mycompany.model.modelosDTO.PedidoArticuloDTO;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class PedidoArticuloDAOImpl implements PedidoArticuloDAO {

    private final Connection conn;

    public PedidoArticuloDAOImpl(Connection connection) {
        this.conn = connection;
    }

    @Override
    public List<PedidoArticuloDTO> findByPedido(String idPedido) throws SQLException {
        List<PedidoArticuloDTO> lista = new ArrayList<>();
        String sql = "SELECT * FROM pedido_articulo WHERE k_id_pedido = ?";

        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, idPedido);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    lista.add(map(rs));
                }
            }
        }
        return lista;
    }

    @Override
    public PedidoArticuloDTO findById(String id) {
        PedidoArticuloDTO dto = null;
        String sql = "SELECT * FROM pedido_articulo WHERE k_id_pedido = ? AND k_id_articulo = ?";

        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    dto = map(rs);
                }
            }
        } catch (SQLException ex) {
            System.getLogger(PedidoArticuloDAOImpl.class.getName()).log(System.Logger.Level.ERROR, (String) null, ex);
        }
        return dto;
    }

    @Override
    public List<PedidoArticuloDTO> findAll() {
        List<PedidoArticuloDTO> lista = new ArrayList<>();
        String sql = "SELECT * FROM pedido_articulo";

        try (PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                lista.add(map(rs));
            }
        } catch (SQLException ex) {
            System.getLogger(PedidoArticuloDAOImpl.class.getName()).log(System.Logger.Level.ERROR, (String) null, ex);
        }
        return lista;
    }

    @Override
    public boolean insert(PedidoArticuloDTO entity) {
        String sql = "INSERT INTO pedido_articulo (i_cantidad_ordenada, i_cantidad_pendiente, k_id_articulo, k_id_pedido) VALUES (?, ?, ?, ?)";

        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, entity.getI_cantidad_ordenada());
            stmt.setInt(2, entity.getI_cantidad_pendiente());
            stmt.setString(3, entity.getK_id_articulo());
            stmt.setString(4, entity.getK_id_pedido());
            return stmt.executeUpdate() > 0;
        } catch (SQLException ex) {
            System.getLogger(PedidoArticuloDAOImpl.class.getName()).log(System.Logger.Level.ERROR, (String) null, ex);
        }
        return false;
    }

    @Override
    public boolean update(PedidoArticuloDTO entity) {
        String sql = "UPDATE pedido_articulo SET i_cantidad_ordenada = ?, i_cantidad_pendiente = ? WHERE k_id_pedido = ? AND k_id_articulo = ?";

        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, entity.getI_cantidad_ordenada());
            stmt.setInt(2, entity.getI_cantidad_pendiente());
            stmt.setString(3, entity.getK_id_pedido());
            stmt.setString(4, entity.getK_id_articulo());
            return stmt.executeUpdate() > 0;
        } catch (SQLException ex) {
            System.getLogger(PedidoArticuloDAOImpl.class.getName()).log(System.Logger.Level.ERROR, (String) null, ex);
        }
        return false;
    }

    @Override
    public boolean deleteById(String id){
        String sql = "DELETE FROM pedido_articulo WHERE k_id_pedido = ?";

        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, id);
            return stmt.executeUpdate() > 0;
        } catch (SQLException ex) {
            System.getLogger(PedidoArticuloDAOImpl.class.getName()).log(System.Logger.Level.ERROR, (String) null, ex);
        }
        return false;
    }

    private PedidoArticuloDTO map(ResultSet rs) throws SQLException {
        PedidoArticuloDTO dto = new PedidoArticuloDTO();
        dto.setI_cantidad_ordenada(rs.getInt("i_cantidad_ordenada"));
        dto.setI_cantidad_pendiente(rs.getInt("i_cantidad_pendiente"));
        dto.setK_id_articulo(rs.getString("k_id_articulo"));
        dto.setK_id_pedido(rs.getString("k_id_pedido"));
        return dto;
    }

}
