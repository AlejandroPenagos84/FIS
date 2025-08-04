package com.mycompany.view.cliente.ventanaPrincipal;

import com.mycompany.model.modelosDTO.PedidoDTO;

import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.List;

public class PanelHistorialPedidos extends JPanel {
    private DetallePedidoDialog datellePed;
    private final JPanel panelContenido = new JPanel();
    
    private VentanaPrincipalCliente ventPrinc;

    public PanelHistorialPedidos(List<PedidoDTO> listaPedidos, VentanaPrincipalCliente ventPrinc) {
        this.ventPrinc = ventPrinc;
        
        setLayout(new BorderLayout());

        panelContenido.setLayout(new BoxLayout(panelContenido, BoxLayout.Y_AXIS));
        panelContenido.setBackground(Color.WHITE);

        JScrollPane scrollPane = new JScrollPane(panelContenido);
        scrollPane.setBorder(null);
        scrollPane.getVerticalScrollBar().setUnitIncrement(12);
        add(scrollPane, BorderLayout.CENTER);

        for (PedidoDTO pedido : listaPedidos) {
            System.out.print("llega");
            this.datellePed = new DetallePedidoDialog(pedido);
            JPanel panelPedido = crearPanelHistorial(pedido, this.datellePed);
            panelContenido.add(panelPedido);
            panelContenido.add(Box.createVerticalStrut(8));
        }

        revalidate();
        repaint();
    }


    private JPanel crearPanelHistorial(PedidoDTO pedido, DetallePedidoDialog datellePed) {
        JPanel panel = new JPanel(new BorderLayout(10, 10));
        panel.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(Color.DARK_GRAY, 1),
                BorderFactory.createEmptyBorder(10, 15, 10, 15)
        ));
        panel.setMaximumSize(new Dimension(Integer.MAX_VALUE, 100));
        panel.setPreferredSize(new Dimension(400, 100));

        if (pedido.isB_pagado()) {
            panel.setBackground(new Color(198, 239, 206)); // verde claro
        } else {
            panel.setBackground(new Color(255, 204, 203)); // rojo claro
        }

        JLabel lblTitulo = new JLabel("Pedido " + pedido.getK_id_pedido());
        lblTitulo.setFont(new Font("Segoe UI", Font.BOLD, 15));

        JLabel lblFecha = new JLabel("📅 Fecha: " + pedido.getF_fecha_pedido().toString());
        lblFecha.setFont(new Font("Segoe UI", Font.PLAIN, 13));

        JLabel lblEstado = new JLabel(pedido.isB_pagado() ? "✅ Pagado" : "❌ No pagado");
        lblEstado.setFont(new Font("Segoe UI", Font.BOLD, 13));
        lblEstado.setForeground(pedido.isB_pagado() ? new Color(0, 120, 0) : new Color(180, 0, 0));

        JPanel info = new JPanel(new GridLayout(3, 1));
        info.setOpaque(false);
        info.add(lblTitulo);
        info.add(lblFecha);
        info.add(lblEstado);

        panel.add(info, BorderLayout.CENTER);

        // Botón "Pagar"
        if (!pedido.isB_pagado()) {
            JButton btnPagar = new JButton("Pagar");
            btnPagar.setFocusPainted(false);
            btnPagar.setBackground(new Color(0, 123, 255));
            btnPagar.setForeground(Color.WHITE);
            btnPagar.setFont(new Font("Segoe UI", Font.BOLD, 13));
            btnPagar.setCursor(new Cursor(Cursor.HAND_CURSOR));
            btnPagar.setPreferredSize(new Dimension(90, 30));

            btnPagar.addActionListener(e -> {
                this.ventPrinc.relaizarPago_VentPrin(pedido);
            });

            JPanel panelBoton = new JPanel(new FlowLayout(FlowLayout.RIGHT));
            panelBoton.setOpaque(false);
            panelBoton.add(btnPagar);
            panel.add(panelBoton, BorderLayout.EAST);
        }

        // Click para ver detalles
        panel.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                datellePed.setVisible(true);
            }
        });

        return panel;
    }
}
