package com.mycompany.view.cliente.ventanaPrincipal;

import com.mycompany.controller.ClienteController;
import com.mycompany.model.modelosDTO.ArticuloDTO;
import com.mycompany.model.modelosDTO.ClienteDTO;
import com.mycompany.model.modelosDTO.PedidoDTO;
import com.mycompany.model.modelosDTO.PedidoArticuloDTO;

import javax.swing.*;
import java.awt.*;
import java.util.List;

public class VentanaPrincipalCliente extends JFrame {
    private ClienteController clienCont;
    private ClienteDTO cliente;
    private List<ArticuloDTO> articulos;
    private List<PedidoDTO> pedidosComp;
    private List<PedidoDTO> pedidosPend;

    public VentanaPrincipalCliente(ClienteDTO cliente, List<ArticuloDTO> articulos, 
            List<PedidoDTO> pedidosComp, List<PedidoDTO> pedidosPend, ClienteController clienCont) {
        this.clienCont = clienCont;
        this.cliente = cliente;
        this.articulos = articulos;
        this.pedidosComp = pedidosComp;
        this.pedidosPend = pedidosPend;
        
         
        setTitle("Aplicación Principal Pantalla Completa");
        setExtendedState(JFrame.MAXIMIZED_BOTH);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        // Panel derecho → historial de pedidos (ya tiene JScrollPane interno)
        PanelHistorialPedidos panelHistorial = new PanelHistorialPedidos(pedidosComp, this);

        // Centro → pedidos activos (también ya tiene JScrollPane interno)
        PanelPedidosActivos panelPedidos = new PanelPedidosActivos(pedidosPend);

        // Izquierda superior → datos cliente
        PanelDatosCliente panelDatosCliente = new PanelDatosCliente(this.cliente);

        // Izquierda inferior → productos
        PanelPedidoArticulo panelProductos = new PanelPedidoArticulo(this);
        llenadoArt(panelProductos, articulos);

        // Panel izquierdo que contiene datos del cliente y productos
        JPanel panelIzquierdo = new JPanel();
        panelIzquierdo.setLayout(new BorderLayout());
        panelIzquierdo.add(panelDatosCliente, BorderLayout.NORTH);
        panelIzquierdo.add(panelProductos, BorderLayout.CENTER);

        // Unión de centro y derecha
        JSplitPane centroYDerecha = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT, panelPedidos, panelHistorial);
        centroYDerecha.setDividerLocation(0.5);
        centroYDerecha.setResizeWeight(0.5);

        // Unión de izquierda con el resto
        JSplitPane splitPrincipal = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT, panelIzquierdo, centroYDerecha);
        splitPrincipal.setDividerLocation(0.33);
        splitPrincipal.setResizeWeight(0.33);

        add(splitPrincipal);
    }

    public void visibilidad(boolean vis) {
        setVisible(vis);
    }

    public void llenadoArt(PanelPedidoArticulo panelProductos, List<ArticuloDTO> articulos) {
        panelProductos.mostrarArticulos(articulos);
    }

    public void hacerPedido_VP(List<PedidoArticuloDTO> seleccionados) {
        this.clienCont.hacerPedido(seleccionados);
    }
    
    public void refrescarPedidos(ClienteDTO cliente, List<ArticuloDTO> articulos, 
            List<PedidoDTO> pedidosComp, List<PedidoDTO> pedidosPend, 
            ClienteController clienCont) {
        // Obtener pedidos actualizados desde el controlador

        this.clienCont = clienCont;
        this.cliente = cliente;
        this.articulos = articulos;
        this.pedidosComp = pedidosComp;
        this.pedidosPend = pedidosPend;

        // Remover todo del JFrame y volver a armar
        getContentPane().removeAll();

        // Paneles actualizados
        PanelHistorialPedidos panelHistorial = new PanelHistorialPedidos(pedidosComp, this);
        PanelPedidosActivos panelPedidos = new PanelPedidosActivos(pedidosPend);
        PanelDatosCliente panelDatosCliente = new PanelDatosCliente(this.cliente);
        PanelPedidoArticulo panelProductos = new PanelPedidoArticulo(this);
        llenadoArt(panelProductos, this.articulos);

        JPanel panelIzquierdo = new JPanel();
        panelIzquierdo.setLayout(new BorderLayout());
        panelIzquierdo.add(panelDatosCliente, BorderLayout.NORTH);
        panelIzquierdo.add(panelProductos, BorderLayout.CENTER);

        JSplitPane centroYDerecha = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT, panelPedidos, panelHistorial);
        centroYDerecha.setDividerLocation(0.5);
        centroYDerecha.setResizeWeight(0.5);

        JSplitPane splitPrincipal = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT, panelIzquierdo, centroYDerecha);
        splitPrincipal.setDividerLocation(0.33);
        splitPrincipal.setResizeWeight(0.33);

        add(splitPrincipal);
        revalidate();
        repaint();
    }
    
    public double getSaldoCliente() {
        return cliente.getV_saldo();
    }

    void relaizarPago_VentPrin(PedidoDTO pedido) {
        this.clienCont.relaizarPago(pedido);
    }
    

}
