package com.mycompany.view.cliente.ventanaPrincipal;

import com.mycompany.model.modelosDTO.PedidoDTO;
import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.List;

public class PanelPedidosActivos extends JPanel {
    public DetallePedidoDialog datellePed;
    private final JPanel panelPedidos;

    public PanelPedidosActivos(List<PedidoDTO> pedidosDTO) {
        setLayout(new BorderLayout());

        panelPedidos = new JPanel();
        panelPedidos.setLayout(new BoxLayout(panelPedidos, BoxLayout.Y_AXIS));
        panelPedidos.setBackground(Color.WHITE);
        panelPedidos.setAlignmentY(TOP_ALIGNMENT);

        JScrollPane scrollPane = new JScrollPane(panelPedidos);
        scrollPane.setBorder(null);
        scrollPane.getVerticalScrollBar().setUnitIncrement(16);
        add(scrollPane, BorderLayout.CENTER);

        for (PedidoDTO pedido : pedidosDTO) {
            this.datellePed = new DetallePedidoDialog(pedido);
            JPanel panel = crearPanelPedido(pedido, this.datellePed);

            JPanel contenedor = new JPanel(new BorderLayout());
            contenedor.setOpaque(false);
            contenedor.setBorder(BorderFactory.createEmptyBorder(5, 10, 5, 10));
            contenedor.setMaximumSize(new Dimension(Integer.MAX_VALUE, 120));
            contenedor.setPreferredSize(new Dimension(350, 120));

            contenedor.add(panel, BorderLayout.CENTER);
            panelPedidos.add(contenedor);
        }

        panelPedidos.add(Box.createVerticalGlue());
    }

    private JPanel crearPanelPedido(PedidoDTO pedido, DetallePedidoDialog datellePed) {
        JPanel panel = new JPanel(new BorderLayout(5, 5));
        panel.setBorder(BorderFactory.createLineBorder(Color.DARK_GRAY, 2));
        panel.setBackground(new Color(245, 245, 245));

        panel.setMaximumSize(new Dimension(Integer.MAX_VALUE, 120));
        panel.setPreferredSize(new Dimension(350, 120));
        panel.setMinimumSize(new Dimension(350, 120));

        JLabel lblNombre = new JLabel("Pedido " + pedido.getK_id_pedido());
        lblNombre.setFont(new Font("Arial", Font.BOLD, 16));

        JLabel lblFecha = new JLabel("Fecha: " + pedido.getF_fecha_pedido());
        lblFecha.setFont(new Font("Arial", Font.PLAIN, 12));

        JLabel lblValor = new JLabel("Valor total: " + pedido.getV_precio());
        lblValor.setFont(new Font("Arial", Font.PLAIN, 12));

        JPanel panelSuperior = new JPanel(new BorderLayout());
        panelSuperior.setOpaque(false);
        panelSuperior.add(lblNombre, BorderLayout.NORTH);

        JPanel panelInferior = new JPanel();
        panelInferior.setLayout(new GridLayout(2, 1));
        panelInferior.setOpaque(false);
        panelInferior.add(lblFecha);
        panelInferior.add(lblValor);

        panelSuperior.add(panelInferior, BorderLayout.SOUTH);

        // === BARRA DE PROGRESO PERSONALIZADA ===
        int porcentaje = (int) pedido.getPorcentaje_entregado();
        JProgressBar barraProgreso = new JProgressBar(0, 100);
        barraProgreso.setValue(porcentaje);
        barraProgreso.setStringPainted(true);

        // Cambiar color según el valor
        if (porcentaje < 50) {
            barraProgreso.setForeground(new Color(220, 53, 69)); // rojo
        } else if (porcentaje < 75) {
            barraProgreso.setForeground(new Color(255, 193, 7)); // naranja
        } else {
            barraProgreso.setForeground(new Color(76, 175, 80)); // verde
        }

        panel.add(panelSuperior, BorderLayout.CENTER);
        panel.add(barraProgreso, BorderLayout.SOUTH);

        // Abrir detalle del pedido al hacer clic
        panel.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                datellePed.setVisible(true);
            }
        });

        return panel;
    }
}
