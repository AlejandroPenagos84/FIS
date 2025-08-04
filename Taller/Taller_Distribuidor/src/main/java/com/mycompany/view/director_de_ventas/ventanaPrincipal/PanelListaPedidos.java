package com.mycompany.view.director_de_ventas.ventanaPrincipal;

import com.mycompany.model.modelosDTO.PedidoDTO;
import com.toedter.calendar.JDateChooser;

import javax.swing.*;
import java.awt.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.List;
import java.util.stream.Collectors;

class PanelListaPedidos extends JPanel {
    private JTextField txtIdCliente = new JTextField(8);
    private JComboBox<String> comboNombreCliente = new JComboBox<>();
    private JTextField txtIdPedido = new JTextField(8);
    private JDateChooser dateChooser = new JDateChooser();
    private JButton btnFiltrar = new JButton("Filtrar");

    private JPanel panelPedidos = new JPanel();
    private JScrollPane scroll;
    private List<PedidoDTO> pedidosOriginales;

    public PanelListaPedidos(List<PedidoDTO> pedidos, PanelDetallePedido panelDetalle) {
        setLayout(new BorderLayout());
        this.pedidosOriginales = pedidos;

        // Llenar comboBox con nombres únicos de clientes
        Set<String> nombresClientesUnicos = pedidos.stream()
            .map(p -> p.getCliente().getN_nombre_cliente())
            .collect(Collectors.toCollection(TreeSet::new)); // ordenado

        comboNombreCliente.addItem(""); // para permitir que quede vacío
        for (String nombre : nombresClientesUnicos) {
            comboNombreCliente.addItem(nombre);
        }

        // Panel de búsqueda
        JPanel panelBusqueda = new JPanel(new FlowLayout(FlowLayout.LEFT));
        panelBusqueda.add(new JLabel("ID Cliente:"));
        panelBusqueda.add(txtIdCliente);
        panelBusqueda.add(new JLabel("Nombre Cliente:"));
        panelBusqueda.add(comboNombreCliente);
        panelBusqueda.add(new JLabel("ID Pedido:"));
        panelBusqueda.add(txtIdPedido);
        panelBusqueda.add(new JLabel("Fecha Pedido:"));
        dateChooser.setDateFormatString("yyyy-MM-dd");
        dateChooser.setPreferredSize(new Dimension(120, 25));
        panelBusqueda.add(dateChooser);
        panelBusqueda.add(btnFiltrar);

        add(panelBusqueda, BorderLayout.NORTH);

        // Panel de pedidos en scroll
        panelPedidos.setLayout(new BoxLayout(panelPedidos, BoxLayout.Y_AXIS));
        scroll = new JScrollPane(panelPedidos);
        add(scroll, BorderLayout.CENTER);

        mostrarPedidos(pedidosOriginales, panelDetalle);

        // Listener botón Filtrar
        btnFiltrar.addActionListener(e -> filtrarPedidos(panelDetalle));
    }

    private void filtrarPedidos(PanelDetallePedido detallePanel) {
        String idCliente = txtIdCliente.getText().trim().toLowerCase();
        String nombreCliente = ((String) comboNombreCliente.getSelectedItem()).trim().toLowerCase();
        String idPedido = txtIdPedido.getText().trim().toLowerCase();

        Date selectedDate = dateChooser.getDate();
        String fecha = selectedDate != null ? new SimpleDateFormat("yyyy-MM-dd").format(selectedDate) : "";

        List<PedidoDTO> filtrados = new ArrayList<>();
        for (PedidoDTO pedido : pedidosOriginales) {
            boolean coincide = true;

            if (!idCliente.isEmpty() && !pedido.getK_cod_cliente().toLowerCase().contains(idCliente)) {
                coincide = false;
            }
            if (!nombreCliente.isEmpty() && !pedido.getCliente().getN_nombre_cliente().toLowerCase().contains(nombreCliente)) {
                coincide = false;
            }
            if (!idPedido.isEmpty() && !pedido.getK_id_pedido().toLowerCase().contains(idPedido)) {
                coincide = false;
            }
            if (!fecha.isEmpty()) {
                String fechaPedido = new SimpleDateFormat("yyyy-MM-dd").format(pedido.getF_fecha_pedido());
                if (!fechaPedido.equals(fecha)) {
                    coincide = false;
                }
            }

            if (coincide) {
                filtrados.add(pedido);
            }
        }

        mostrarPedidos(filtrados, detallePanel);
    }

    private void mostrarPedidos(List<PedidoDTO> pedidos, PanelDetallePedido detallePanel) {
        panelPedidos.removeAll();
        for (PedidoDTO pedido : pedidos) {
            JPanel panel = new JPanel();
            panel.setLayout(new BoxLayout(panel, BoxLayout.Y_AXIS));
            panel.setBorder(BorderFactory.createCompoundBorder(
                    BorderFactory.createLineBorder(Color.GRAY),
                    BorderFactory.createEmptyBorder(8, 8, 8, 8)));
            panel.setBackground(Color.WHITE);

            JLabel lblCliente = new JLabel("Cliente: " + pedido.getCliente().getN_nombre_cliente());
            JLabel lblDireccion = new JLabel("Dirección: " + pedido.getCliente().getDir_calle()
                    + " #" + pedido.getCliente().getDir_carrera() + "-" 
                    + pedido.getCliente().getDir_numero());
            JLabel lblProgreso = new JLabel("Progreso del pedido:");

            int porcentaje = (int) pedido.getPorcentaje_entregado();
            JProgressBar barra = new JProgressBar(0, 100);
            barra.setValue(porcentaje);
            barra.setStringPainted(true);

            if (porcentaje < 50) {
                barra.setForeground(Color.RED);
            } else if (porcentaje < 75) {
                barra.setForeground(Color.ORANGE);
            } else {
                barra.setForeground(new Color(0, 153, 0));
            }

            panel.add(lblCliente);
            panel.add(lblDireccion);
            panel.add(lblProgreso);
            panel.add(barra);

            panel.addMouseListener(new java.awt.event.MouseAdapter() {
                public void mouseClicked(java.awt.event.MouseEvent evt) {
                    detallePanel.mostrarDetalle(pedido);
                }
            });

            panelPedidos.add(panel);
            panelPedidos.add(Box.createVerticalStrut(10));
        }

        panelPedidos.revalidate();
        panelPedidos.repaint();
    }
}
