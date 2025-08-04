package com.mycompany.view.cliente.ventanaPrincipal;

import com.mycompany.model.modelosDTO.ArticuloDTO;
import com.mycompany.model.modelosDTO.PedidoArticuloDTO;
import com.mycompany.model.modelosDTO.PedidoDTO;

import javax.swing.*;
import java.awt.*;
import java.util.List;

public class DetallePedidoDialog extends JDialog {

    public DetallePedidoDialog(PedidoDTO pedido) {
        setTitle("📋 Detalle del Pedido " + pedido.getK_id_pedido());
        setSize(520, 620);
        setLocationRelativeTo(null);
        setModal(true);
        setResizable(false);

        JPanel panel = new JPanel();
        panel.setLayout(new BoxLayout(panel, BoxLayout.Y_AXIS));
        panel.setBorder(BorderFactory.createEmptyBorder(20, 30, 20, 30));
        panel.setBackground(new Color(250, 250, 255));

        JLabel lblId = new JLabel("Pedido: " + pedido.getK_id_pedido());
        JLabel lblFecha = new JLabel("Fecha: " + pedido.getF_fecha_pedido().toString());
        JLabel lblValorTotal = new JLabel("Valor total: $" + pedido.getV_precio());
        JLabel lblProgreso = new JLabel("Progreso Total:");

        lblId.setFont(new Font("Segoe UI", Font.BOLD, 17));
        lblFecha.setFont(new Font("Segoe UI", Font.PLAIN, 14));
        lblValorTotal.setFont(new Font("Segoe UI", Font.PLAIN, 14));
        lblProgreso.setFont(new Font("Segoe UI", Font.PLAIN, 14));

        JProgressBar barraProgreso = new JProgressBar(0, 100);
        int porcentajeGeneral = (int) pedido.getPorcentaje_entregado();
        barraProgreso.setValue(porcentajeGeneral);
        barraProgreso.setStringPainted(true);

        if (porcentajeGeneral < 50) {
            barraProgreso.setForeground(new Color(220, 53, 69));
        } else if (porcentajeGeneral < 75) {
            barraProgreso.setForeground(new Color(255, 193, 7));
        } else {
            barraProgreso.setForeground(new Color(76, 175, 80));
        }

        panel.add(lblId);
        panel.add(Box.createVerticalStrut(8));
        panel.add(lblFecha);
        panel.add(lblValorTotal);
        panel.add(Box.createVerticalStrut(12));
        panel.add(lblProgreso);
        panel.add(barraProgreso);
        panel.add(Box.createVerticalStrut(25));

        JLabel lblArticulos = new JLabel("Artículos del pedido:");
        lblArticulos.setFont(new Font("Segoe UI", Font.BOLD, 15));
        panel.add(lblArticulos);
        panel.add(Box.createVerticalStrut(12));

        JPanel panelScrollArticulos = new JPanel();
        panelScrollArticulos.setLayout(new BoxLayout(panelScrollArticulos, BoxLayout.Y_AXIS));
        panelScrollArticulos.setBackground(Color.WHITE);

        List<PedidoArticuloDTO> articulos = pedido.getPedArticulos();
        if (articulos != null && !articulos.isEmpty()) {
            for (PedidoArticuloDTO pa : articulos) {
                ArticuloDTO art = pa.getArticulo();
                int ordenada = pa.getI_cantidad_ordenada();
                int pendiente = pa.getI_cantidad_pendiente();
                int entregada = ordenada - pendiente;
                int porcentaje = (ordenada == 0) ? 0 : (entregada * 100 / ordenada);

                JPanel panelArt = new JPanel();
                panelArt.setLayout(new BoxLayout(panelArt, BoxLayout.Y_AXIS));
                panelArt.setBorder(BorderFactory.createCompoundBorder(
                        BorderFactory.createLineBorder(new Color(180, 180, 180), 1),
                        BorderFactory.createEmptyBorder(10, 12, 10, 12)
                ));
                panelArt.setBackground(new Color(245, 245, 250));
                panelArt.setMaximumSize(new Dimension(Integer.MAX_VALUE, 160));
                panelArt.setAlignmentX(Component.LEFT_ALIGNMENT);

                JLabel lblNombre = new JLabel(" " + art.getN_nombre_articulo());
                JLabel lblDesc = new JLabel(" " + art.getT_descripcion());
                JLabel lblPrecioUnitario = new JLabel(" Valor unitario: $" + art.getV_precio());
                JLabel lblPrecioTotal = new JLabel(" Valor Total: $" + (art.getV_precio() * ordenada));
                JLabel lblCantidad = new JLabel(" Cantidad ordenada: " + ordenada);
                JLabel lblPendiente = new JLabel(" Cantidad pendiente: " + pendiente);
                JLabel lblPorcentaje = new JLabel(" Progreso:");

                Font font = new Font("Segoe UI", Font.PLAIN, 12);
                lblNombre.setFont(new Font("Segoe UI", Font.BOLD, 13));
                lblDesc.setFont(font);
                lblPrecioUnitario.setFont(font);
                lblPrecioTotal.setFont(font);
                lblCantidad.setFont(font);
                lblPendiente.setFont(font);
                lblPorcentaje.setFont(font);

                JProgressBar barraArticulo = new JProgressBar(0, 100);
                barraArticulo.setValue(porcentaje);
                barraArticulo.setStringPainted(true);
                barraArticulo.setForeground(new Color(33, 150, 243)); // azul original

                panelArt.add(lblNombre);
                panelArt.add(lblDesc);
                panelArt.add(lblPrecioUnitario);
                panelArt.add(lblPrecioTotal);
                panelArt.add(lblCantidad);
                panelArt.add(lblPendiente);
                panelArt.add(lblPorcentaje);
                panelArt.add(barraArticulo);

                panelScrollArticulos.add(panelArt);
                panelScrollArticulos.add(Box.createVerticalStrut(10));
            }
        } else {
            JLabel lblVacio = new JLabel(" No hay artículos asociados.");
            lblVacio.setFont(new Font("Segoe UI", Font.ITALIC, 13));
            panelScrollArticulos.add(lblVacio);
        }

        JScrollPane scrollPane = new JScrollPane(panelScrollArticulos);
        scrollPane.setPreferredSize(new Dimension(450, 300));
        scrollPane.setBorder(BorderFactory.createLineBorder(Color.GRAY));
        scrollPane.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED);

        panel.add(scrollPane);
        panel.add(Box.createVerticalStrut(25));

        JButton btnCerrar = new JButton("Cerrar");
        btnCerrar.setPreferredSize(new Dimension(110, 36));
        btnCerrar.setFocusPainted(false);
        btnCerrar.setBackground(new Color(220, 53, 69));
        btnCerrar.setForeground(Color.WHITE);
        btnCerrar.setFont(new Font("Segoe UI", Font.BOLD, 13));
        btnCerrar.addActionListener(e -> dispose());

        JPanel btnPanel = new JPanel();
        btnPanel.setOpaque(false);
        btnPanel.add(btnCerrar);

        panel.add(btnPanel);
        add(panel);
    }
}
