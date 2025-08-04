package com.mycompany.view.proveedor.ventanaPrincipal;

import com.mycompany.controller.ProveedorController;
import com.mycompany.model.modelosDTO.ArticuloDTO;

import javax.swing.*;
import java.awt.*;
import java.util.List;

public class VentanaPrincipalProveedor extends JFrame {

    private PanelListaArticulosProveedor panelLista;
    private PanelDetalleArticuloProveedor panelDetalle;
    
    private ProveedorController proveedorController;

    public VentanaPrincipalProveedor(ProveedorController proveedorController, List<ArticuloDTO> articulosProveedor) {
        this.proveedorController = proveedorController;
        
        setTitle("Panel Proveedor - Artículos");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(1000, 600);
        setLocationRelativeTo(null);

        panelDetalle = new PanelDetalleArticuloProveedor(this, articulosProveedor);
        panelLista = new PanelListaArticulosProveedor(articulosProveedor, panelDetalle);

        JSplitPane splitPane = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT, panelLista, panelDetalle);
        splitPane.setDividerLocation(400);
        splitPane.setResizeWeight(0.5);

        add(splitPane);
    }
    
    public void visibilidad(boolean vis) {
        setVisible(vis);
    }

    public void realizarProduccion_Ventprin(ArticuloDTO articuloDTO, int cant) {
        this.proveedorController.realizarProduccion(articuloDTO, cant);
    }
    
    public void refrescarVentanaPrincipalProveedor(ProveedorController proveedorController, List<ArticuloDTO> articulosProveedor) {
        this.proveedorController = proveedorController;
        
        getContentPane().removeAll();
        
        setTitle("Panel Proveedor - Artículos");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(1000, 600);
        setLocationRelativeTo(null);

        panelDetalle = new PanelDetalleArticuloProveedor(this, articulosProveedor);
        panelLista = new PanelListaArticulosProveedor(articulosProveedor, panelDetalle);

        JSplitPane splitPane = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT, panelLista, panelDetalle);
        splitPane.setDividerLocation(400);
        splitPane.setResizeWeight(0.5);

        add(splitPane);
        revalidate();
        repaint();
    }
}
