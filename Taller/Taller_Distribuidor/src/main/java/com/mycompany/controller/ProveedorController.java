/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.controller;

import com.mycompany.model.DAOs.implementaciones.ArticuloDAOImpl;
import com.mycompany.model.DAOs.implementaciones.ClienteDAOImpl;
import com.mycompany.model.DAOs.implementaciones.PedidoArticuloDAOImpl;
import com.mycompany.model.DAOs.implementaciones.PedidoDAOImpl;
import com.mycompany.model.DAOs.implementaciones.ProveedorArticuloDAOImpl;
import com.mycompany.model.DAOs.implementaciones.ProveedorDAOImpl;
import com.mycompany.model.connection.ConexionBD;
import com.mycompany.model.modelosDTO.ArticuloDTO;
import com.mycompany.model.modelosDTO.ClienteDTO;
import com.mycompany.model.modelosDTO.PedidoArticuloDTO;
import com.mycompany.model.modelosDTO.PedidoDTO;
import com.mycompany.model.modelosDTO.ProveedorArticuloDTO;
import com.mycompany.model.modelosDTO.ProveedorDTO;
import com.mycompany.view.cliente.login.LoginCliente;
import com.mycompany.view.cliente.ventanaPrincipal.VentanaPrincipalCliente;
import com.mycompany.view.proveedor.login.LoginProveedor;
import com.mycompany.view.proveedor.ventanaPrincipal.VentanaPrincipalProveedor;
import java.sql.Connection;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

/**
 *
 * @author estudiantes
 */
public class ProveedorController {
    private ProveedorDAOImpl proveedorDAO;
    private ProveedorArticuloDAOImpl proveedorArticuloDAO;
    private ArticuloDAOImpl articuloDAO;
    
    private LoginProveedor log;
    private VentanaPrincipalProveedor ventPrin;
    
    private List<ArticuloDTO> articulosDTO;
    private List<ProveedorArticuloDTO> proveedorArticulosDTO;
    
    private ProveedorDTO proveedorDTO;

    public ProveedorController() {
        ConexionBD conexionBD = new ConexionBD();
        Connection conn = conexionBD.obtenerConexion();
        this.proveedorDAO = new ProveedorDAOImpl(conn);
        this.proveedorArticuloDAO = new ProveedorArticuloDAOImpl(conn);
        this.articuloDAO = new ArticuloDAOImpl(conn);
        this.log = new LoginProveedor(this);
        
        if (conn != null) {
            System.out.println("Conexión establecida correctamente.");
            this.log.visibilidad(true);
        } else {
            System.out.println("Error al establecer la conexión.");
        }
        
        
    }
    
    public void login(String usuario, String contra) throws SQLException{
        if(this.proveedorDAO.login(usuario, contra)){
            this.proveedorDTO = this.proveedorDAO.findByUser(usuario);
            this.articulosDTO = this.articuloDAO.findByProveedor(this.proveedorDTO.getK_id_proveedor());
            this.proveedorArticulosDTO = this.proveedorArticuloDAO.findByProveedor(this.proveedorDTO.getK_id_proveedor());      
            
            for (ArticuloDTO articuloDTO : this.articulosDTO) {
                for(ProveedorArticuloDTO proveedorArticuloDTO : this.proveedorArticulosDTO){
                    if(proveedorArticuloDTO.getK_id_articulo().equals(articuloDTO.getK_id_articulo())){
                        articuloDTO.setProducArticUnic(proveedorArticuloDTO);
                    }
                }
            }
            this.log.visibilidad(false);
            
            
            this.ventPrin = new VentanaPrincipalProveedor(this, this.articulosDTO);
            this.ventPrin.visibilidad(true);
        }
        else{
            this.log.noLog();
        }
    }

    public void realizarProduccion(ArticuloDTO articuloDTO, int cant) {
        for (ProveedorArticuloDTO proveedorArticuloDTO : this.proveedorArticulosDTO){
            if (proveedorArticuloDTO.getK_id_articulo().equals(articuloDTO.getK_id_articulo())){
                proveedorArticuloDTO.setI_stock(proveedorArticuloDTO.getI_stock() + cant);
                proveedorArticuloDAO.update(proveedorArticuloDTO);
                this.ventPrin.refrescarVentanaPrincipalProveedor(this, this.articulosDTO);
            }
        }
        
    }
    
}
