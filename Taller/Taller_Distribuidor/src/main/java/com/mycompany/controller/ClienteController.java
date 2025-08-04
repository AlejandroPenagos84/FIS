/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.controller;

import com.mycompany.model.DAOs.implementaciones.ArticuloDAOImpl;
import com.mycompany.model.DAOs.implementaciones.ClienteDAOImpl;
import com.mycompany.model.DAOs.implementaciones.PedidoArticuloDAOImpl;
import com.mycompany.model.DAOs.implementaciones.PedidoDAOImpl;
import com.mycompany.model.connection.ConexionBD;
import com.mycompany.model.modelosDTO.ArticuloDTO;
import com.mycompany.model.modelosDTO.ClienteDTO;
import com.mycompany.model.modelosDTO.PedidoArticuloDTO;
import com.mycompany.model.modelosDTO.PedidoDTO;
import com.mycompany.view.cliente.login.LoginCliente;
import com.mycompany.view.cliente.ventanaPrincipal.VentanaPrincipalCliente;
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
public class ClienteController {
    private ClienteDAOImpl clienteDAO;
    private ArticuloDAOImpl articuloDAO;
    private PedidoDAOImpl pedidoDAO;
    private PedidoArticuloDAOImpl pedidoArtDAO;
    
    private LoginCliente log;
    private VentanaPrincipalCliente ventPrin;
    
    private List<ArticuloDTO> articulosDTO;
    private List<PedidoDTO> pedidosDTO;
    private List<PedidoDTO> pedidosDTOPend;
    private List<PedidoDTO> pedidosDTOComp;
    
    private ClienteDTO clienteDTO;

    public ClienteController() {
        ConexionBD conexionBD = new ConexionBD();
        Connection conn = conexionBD.obtenerConexion();
        this.clienteDAO = new ClienteDAOImpl(conn);
        this.articuloDAO = new ArticuloDAOImpl(conn);
        this.pedidoDAO = new PedidoDAOImpl(conn);
        this.pedidoArtDAO = new PedidoArticuloDAOImpl(conn);
        this.log = new LoginCliente(this);
        
        if (conn != null) {
            System.out.println("Conexión establecida correctamente.");
            this.log.visibilidad(true);
        } else {
            System.out.println("Error al establecer la conexión.");
        }
        
        
    }
    
    public void login(String usuario, String contra) throws SQLException{
        if(this.clienteDAO.login(usuario, contra)){
            this.clienteDTO = this.clienteDAO.findByUser(usuario);
            this.articulosDTO = this.articuloDAO.findAll();
            
            this.pedidosDTO = this.pedidoDAO.findAllByCliente(this.clienteDTO.getK_cod_cliente());      
            
            for (PedidoDTO pedido : this.pedidosDTO) {
                pedido.setCliente(clienteDTO);
                pedido.setPedArticulos(this.pedidoArtDAO.findByPedido(pedido.getK_id_pedido()));
                
                for(PedidoArticuloDTO pedArt : pedido.getPedArticulos()){
                    pedArt.setArticulo(this.articuloDAO.findById(pedArt.getK_id_articulo()));
                }
            }
            
            pedidosDTOComp = new ArrayList<>();
            pedidosDTOPend = new ArrayList<>();

            for (PedidoDTO pedido : pedidosDTO) {
                double porcentaje = pedido.getPorcentaje_entregado();

                if (porcentaje == 100.0) {
                    pedidosDTOComp.add(pedido);
                } else {
                    pedidosDTOPend.add(pedido);
                }
            }            
            
            this.log.visibilidad(false);
            
            
            this.ventPrin = new VentanaPrincipalCliente(this.clienteDTO, 
                    this.articulosDTO, this.pedidosDTOComp, 
                    this.pedidosDTOPend, this);
            this.ventPrin.visibilidad(true);
        }
        else{
            this.log.noLog();
        }
    }
    
    public void hacerPedido(List<PedidoArticuloDTO> seleccionados) {
        if (seleccionados == null || seleccionados.isEmpty()) {
            System.out.println("No hay artículos seleccionados para el pedido.");
            return;
        }

        // Fecha del pedido
        Date fechaActual = new Date();
        // Generar ID bonito
        String idPedido = generarIdPedido(clienteDTO.getN_nombre_cliente(), fechaActual);
        // Crear objeto PedidoDTO
        PedidoDTO nuevoPedido = new PedidoDTO();
        nuevoPedido.setK_id_pedido(idPedido);
        nuevoPedido.setK_cod_cliente(clienteDTO.getK_cod_cliente());
        nuevoPedido.setF_fecha_pedido(new java.sql.Date(fechaActual.getTime()));
        nuevoPedido.setPorcentaje_entregado(0.0);
        nuevoPedido.setCliente(clienteDTO);
        
        // Insertar el pedido
        boolean pedidoInsertado = pedidoDAO.insert(nuevoPedido);
        if (pedidoInsertado) {
            for (PedidoArticuloDTO pa : seleccionados) {
                pa.setK_id_pedido(idPedido);
                pedidoArtDAO.insert(pa);
            }
            
            // Enlazar artículos con sus DTOs
            for (PedidoArticuloDTO pa : seleccionados) {
                pa.setArticulo(articuloDAO.findById(pa.getK_id_articulo()));
            }
            
            // Asignar artículos al pedido y clasificarlo como pendiente
            nuevoPedido.setPedArticulos(seleccionados);
            this.clienteDTO.setV_saldo(this.clienteDTO.getV_saldo() - nuevoPedido.getV_precio());
            pedidosDTOPend.add(nuevoPedido);
            this.ventPrin.refrescarPedidos(this.clienteDTO, 
                    this.articulosDTO, this.pedidosDTOComp, 
                    this.pedidosDTOPend, this);
            System.out.println("Pedido realizado con éxito: " + idPedido);
        } else {
            System.out.println("Error al insertar el pedido.");
        }
    }
    
    private String generarIdPedido(String nombreCliente, Date fechaPedido) {
        // Obtener primeras 2 iniciales del cliente
        String[] partes = nombreCliente.trim().split("\\s+");
        StringBuilder iniciales = new StringBuilder();
        for (String parte : partes) {
            if (!parte.isEmpty() && iniciales.length() < 2) {
                iniciales.append(Character.toUpperCase(parte.charAt(0)));
            }
        }
        while (iniciales.length() < 2) {
            iniciales.append("X"); // completar si hay solo 1 letra
        }

        // Fecha en formato yyMMdd (6 dígitos)
        SimpleDateFormat sdf = new SimpleDateFormat("yyMMdd");
        String fechaStr = sdf.format(fechaPedido);

        // Número aleatorio de 2 cifras
        int aleatorio = new Random().nextInt(90) + 10;

        // Concatenar
        return iniciales.toString() + fechaStr + aleatorio;
    }
    
    public void relaizarPago(PedidoDTO pedido){
        for(PedidoDTO pedidoDTO : this.pedidosDTO){
            if(pedidoDTO.getK_id_pedido().equals(pedido.getK_id_pedido())){
                pedidoDTO.setB_pagado(true);
                this.pedidoDAO.update(pedidoDTO);
                this.clienteDTO.setV_saldo(this.clienteDTO.getV_saldo() + pedidoDTO.getV_precio());
                this.clienteDAO.update(clienteDTO);
                
                this.ventPrin.refrescarPedidos(this.clienteDTO, 
                    this.articulosDTO, this.pedidosDTOComp, 
                    this.pedidosDTOPend, this);
            }
        }
    }

    
}
