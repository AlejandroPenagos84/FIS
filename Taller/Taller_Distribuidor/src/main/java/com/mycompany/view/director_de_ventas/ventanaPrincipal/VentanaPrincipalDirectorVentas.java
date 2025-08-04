/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.view.director_de_ventas.ventanaPrincipal;

import com.mycompany.controller.DirectorVentasController;
import com.mycompany.model.modelosDTO.PedidoDTO;
import com.mycompany.model.modelosDTO.PedidoArticuloDTO;
import com.mycompany.model.modelosDTO.SuplementoPedidoArticulo;

import javax.swing.*;
import java.awt.*;
import java.sql.SQLException;
import java.util.List;

public class VentanaPrincipalDirectorVentas extends JFrame {

    private PanelListaPedidos panelLista;
    private PanelDetallePedido panelDetalle;
    private DirectorVentasController directorVentasController;

    public VentanaPrincipalDirectorVentas(DirectorVentasController directorVentasController, List<PedidoDTO> pedidos) {
        this.directorVentasController = directorVentasController;
        
        setTitle("Panel Director de Ventas");
        setExtendedState(JFrame.MAXIMIZED_BOTH);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        panelDetalle = new PanelDetallePedido(this);
        panelLista = new PanelListaPedidos(pedidos, panelDetalle);

        JSplitPane split = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT, panelLista, panelDetalle);
        split.setDividerLocation(0.5);

        add(split);
    }

    public void visibilidad(boolean visible) {
        setVisible(visible);
    }
    
    public void actualizar_pedido_VentPrin (SuplementoPedidoArticulo suplementoPedidoArticulo) throws SQLException{
        this.directorVentasController.actualizar_pedido(suplementoPedidoArticulo);
    }
    
    public void refrescarVentanaPrincipalDirectorVentas(DirectorVentasController directorVentasController, List<PedidoDTO> pedidos) {
        this.directorVentasController = directorVentasController;

        getContentPane().removeAll();

        setTitle("Panel Director de Ventas");
        setExtendedState(JFrame.MAXIMIZED_BOTH);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        panelDetalle = new PanelDetallePedido(this);
        panelLista = new PanelListaPedidos(pedidos, panelDetalle);

        JSplitPane split = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT, panelLista, panelDetalle);
        split.setDividerLocation(0.5);

        add(split);

        revalidate();
        repaint();
    }

}
