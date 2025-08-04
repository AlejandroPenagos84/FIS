package com.mycompany.controller;

import com.mycompany.model.DAOs.implementaciones.*;
import com.mycompany.model.modelosDTO.*;
import com.mycompany.model.connection.ConexionBD;
import com.mycompany.view.director_de_ventas.ventanaPrincipal.VentanaPrincipalDirectorVentas;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public class DirectorVentasController {
    private PedidoDAOImpl pedidoDAO;
    private PedidoArticuloDAOImpl pedidoArtDAO;
    private ClienteDAOImpl clienteDAO;
    private ArticuloDAOImpl articuloDAO;
    private ProveedorDAOImpl proveedorDAO;
    private ProveedorArticuloDAOImpl proveedorArticuloDAO;
    
    private VentanaPrincipalDirectorVentas vista;

    private List<ArticuloDTO> articulos;
    private List<ProveedorDTO> provedores;
    private List<PedidoDTO> pedidos;

    public DirectorVentasController() throws SQLException {
        ConexionBD conexionBD = new ConexionBD();
        Connection conn = conexionBD.obtenerConexion();

        this.pedidoDAO = new PedidoDAOImpl(conn);
        this.pedidoArtDAO = new PedidoArticuloDAOImpl(conn);
        this.clienteDAO = new ClienteDAOImpl(conn);
        this.articuloDAO = new ArticuloDAOImpl(conn);
        this.proveedorDAO = new ProveedorDAOImpl(conn);
        this.proveedorArticuloDAO = new ProveedorArticuloDAOImpl(conn);

        this.articulos = articuloDAO.findAll();
        this.provedores = proveedorDAO.findAll();
        this.pedidos = pedidoDAO.findAll();
        
        for (ArticuloDTO articuloDTO : this.articulos){
            articuloDTO.setProducArtic(proveedorArticuloDAO.findByArticulo(articuloDTO.getK_id_articulo()));
            
            for (ProveedorArticuloDTO provArti : articuloDTO.getProducArtic()){
                
                for (ProveedorDTO proveedor : this.provedores){
                    
                    if (provArti.getK_id_proveedor().equals(proveedor.getK_id_proveedor())){
                        provArti.setProveedor(proveedor);
                        
                    }
                }
            }
        }
        
        

        for (PedidoDTO pedido : pedidos) {
            // Buscar cliente
            ClienteDTO cliente = clienteDAO.findById(pedido.getK_cod_cliente());
            pedido.setCliente(cliente);

            // Buscar artículos del pedido
            List<PedidoArticuloDTO> pedArticulos = pedidoArtDAO.findByPedido(pedido.getK_id_pedido());

            for (PedidoArticuloDTO pa : pedArticulos) {
                ArticuloDTO articulo = buscarArticuloPorId(pa.getK_id_articulo());
                pa.setArticulo(articulo);
            }

            pedido.setPedArticulos(pedArticulos);
        }

        vista = new VentanaPrincipalDirectorVentas(this, pedidos);
        vista.visibilidad(true);
    }

    private ArticuloDTO buscarArticuloPorId(String idArticulo) {
        for (ArticuloDTO art : articulos) {
            if (art.getK_id_articulo().equals(idArticulo)) {
                return art;
            }
        }
        return null; // puede lanzar excepción si prefieres
    }
    
    public void actualizar_pedido (SuplementoPedidoArticulo suplementoPedidoArticulo) throws SQLException{
        for (PedidoDTO pedidoDTO : pedidos){
            if(pedidoDTO.getK_id_pedido().equals(suplementoPedidoArticulo.getPedidoArticulo().getK_id_pedido())){
                for(PedidoArticuloDTO pedidoArticulo : pedidoDTO.getPedArticulos()){
                    if(pedidoArticulo.getK_id_articulo().equals(suplementoPedidoArticulo.getPedidoArticulo().getK_id_articulo())){
                        pedidoArticulo.setI_cantidad_pendiente(pedidoArticulo.getI_cantidad_pendiente() - suplementoPedidoArticulo.getCantidadASuplementar());
                        this.pedidoArtDAO.update(pedidoArticulo);
                        pedidoDTO.setPorcentaje_entregado(this.pedidoDAO.updatePorcentaje(pedidoDTO));
                        
                        for (ProveedorArticuloDTO proveedorArticuloDTO : pedidoArticulo.getArticulo().getProducArtic()){
                            for (SuplementoProveedorArticulo suplementoProveedorArticulo : suplementoPedidoArticulo.getSuplementoProveedorArticulo()){
                                if(proveedorArticuloDTO.getK_id_proveedor().equals(suplementoProveedorArticulo.getProveedorArticulo().getK_id_proveedor())){
                                    proveedorArticuloDTO.setI_stock(proveedorArticuloDTO.getI_stock() - suplementoProveedorArticulo.getCantidadASuplementar());
                                    this.proveedorArticuloDAO.update(proveedorArticuloDTO);
                                }
                            }
                            
                        }
                        
                        this.vista.refrescarVentanaPrincipalDirectorVentas(this, pedidos);
                        
                    }
                }
            }
        }
    }
}
