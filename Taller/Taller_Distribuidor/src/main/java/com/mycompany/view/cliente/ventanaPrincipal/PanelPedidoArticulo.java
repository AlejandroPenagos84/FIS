package com.mycompany.view.cliente.ventanaPrincipal;

import com.mycompany.model.modelosDTO.ArticuloDTO;
import com.mycompany.model.modelosDTO.PedidoArticuloDTO;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.ArrayList;
import java.util.List;

public class PanelPedidoArticulo extends JPanel {
    private final List<ItemPanel> itemPanels = new ArrayList<>();
    private final JButton btnPedidoNuevo = new JButton("Pedido Nuevo");
    private final JButton btnRealizarPedido = new JButton("Realizar Pedido");
    private final JPanel panelProductos = new JPanel();
    private boolean modoPedidoActivo = false;
    
    private VentanaPrincipalCliente VentPrin;

    public PanelPedidoArticulo(VentanaPrincipalCliente VentPrin) {
        this.VentPrin = VentPrin;
        
        setLayout(new BorderLayout());

        panelProductos.setLayout(new BoxLayout(panelProductos, BoxLayout.Y_AXIS));
        JScrollPane scrollPane = new JScrollPane(panelProductos);
        add(scrollPane, BorderLayout.CENTER);

        // Panel de botones
        JPanel panelBotones = new JPanel(new FlowLayout(FlowLayout.RIGHT));
        panelBotones.add(btnPedidoNuevo);
        panelBotones.add(btnRealizarPedido);
        add(panelBotones, BorderLayout.SOUTH);

        // Estado inicial
        btnPedidoNuevo.setEnabled(true);
        btnRealizarPedido.setEnabled(false);

        inicializarListeners();
    }

    public void mostrarArticulos(List<ArticuloDTO> articulos) {
        panelProductos.removeAll();
        itemPanels.clear();

        for (ArticuloDTO articulo : articulos) {
            JPanel panel = crearPanelProducto(articulo);
            panelProductos.add(panel);
        }

        panelProductos.revalidate();
        panelProductos.repaint();
    }

    private JPanel crearPanelProducto(ArticuloDTO articulo) {
        JPanel panelProducto = new JPanel();
        panelProducto.setLayout(new GridLayout(4, 1));
        panelProducto.setBorder(BorderFactory.createLineBorder(Color.GRAY));
        panelProducto.setBackground(Color.WHITE);

        panelProducto.setMaximumSize(new Dimension(Integer.MAX_VALUE, 150));
        panelProducto.setPreferredSize(new Dimension(100, 150));

        JLabel nombre = new JLabel("Producto: " + articulo.getN_nombre_articulo());
        JLabel descripcion = new JLabel("Descripción: " + articulo.getT_descripcion());
        JLabel precio = new JLabel("Precio: $" + String.format("%.2f", articulo.getV_precio()));
        JTextField cantidad = new JTextField();
        cantidad.setBorder(BorderFactory.createTitledBorder("Cantidad"));
        cantidad.setEnabled(false);

        panelProducto.add(nombre);
        panelProducto.add(descripcion);
        panelProducto.add(precio); // 👈 Se agrega al panel
        panelProducto.add(cantidad);

        final boolean[] seleccionado = {false};

        panelProducto.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                if (!modoPedidoActivo) return;

                seleccionado[0] = !seleccionado[0];
                panelProducto.setBackground(seleccionado[0] ? Color.GREEN : Color.WHITE);
            }
    });

    itemPanels.add(new ItemPanel(panelProducto, cantidad, articulo));
    return panelProducto;
}


    public void activarModoPedido() {
        modoPedidoActivo = true;

        for (ItemPanel item : itemPanels) {
            item.campoCantidad.setEnabled(true);
        }

        btnPedidoNuevo.setEnabled(false);
        btnRealizarPedido.setEnabled(true);
    }

    private void inicializarListeners() {
        btnPedidoNuevo.addActionListener(e -> activarModoPedido());

        btnRealizarPedido.addActionListener(e -> {
            List<PedidoArticuloDTO> seleccionados = obtenerArticulosSeleccionados();
            if (seleccionados.isEmpty()) {
                JOptionPane.showMessageDialog(this, "No has seleccionado ningún artículo.");
            } else {
                mostrarConfirmacionPedido(seleccionados); // Mostrar la ventana de confirmación
            }
        });

    }

    private List<PedidoArticuloDTO> obtenerArticulosSeleccionados() {
        List<PedidoArticuloDTO> seleccionados = new ArrayList<>();
        for (ItemPanel item : itemPanels) {
            if (item.panel.getBackground().equals(Color.GREEN)) {
                try {
                    int cantidad = Integer.parseInt(item.campoCantidad.getText().trim());
                    if (cantidad > 0) {
                        PedidoArticuloDTO dto = new PedidoArticuloDTO();
                        dto.setArticulo(item.articulo);
                        dto.setI_cantidad_ordenada(cantidad);
                        dto.setI_cantidad_pendiente(cantidad);
                        dto.setK_id_articulo(item.articulo.getK_id_articulo());
                        
                        seleccionados.add(dto);
                    }
                } catch (NumberFormatException ex) {
                    // Ignora si no es un número válido
                }
            }
        }
        return seleccionados;
    }

    // Clase interna para asociar el panel, el campo y el articulo
    private static class ItemPanel {
        JPanel panel;
        JTextField campoCantidad;
        ArticuloDTO articulo;

        public ItemPanel(JPanel panel, JTextField campoCantidad, ArticuloDTO articulo) {
            this.panel = panel;
            this.campoCantidad = campoCantidad;
            this.articulo = articulo;
        }
    }

    // Clase auxiliar para devolver el resultado del pedido
    public static class ArticuloPedido {
        public ArticuloDTO articulo;
        public int cantidad;

        public ArticuloPedido(ArticuloDTO articulo, int cantidad) {
            this.articulo = articulo;
            this.cantidad = cantidad;
        }
    }

    public JButton getBtnPedidoNuevo() {
        return btnPedidoNuevo;
    }

    public JButton getBtnRealizarPedido() {
        return btnRealizarPedido;
    }
    
    private void mostrarConfirmacionPedido(List<PedidoArticuloDTO> seleccionados) {
        JDialog dialog = new JDialog((Frame) SwingUtilities.getWindowAncestor(this), "Confirmar Pedido", true);
        dialog.setSize(500, 600);
        dialog.setLocationRelativeTo(this);
        dialog.setResizable(false);

        JPanel panel = new JPanel();
        panel.setLayout(new BoxLayout(panel, BoxLayout.Y_AXIS));
        panel.setBackground(Color.WHITE);
        panel.setBorder(BorderFactory.createEmptyBorder(15, 20, 15, 20));

        JLabel titulo = new JLabel("Confirmación del Pedido");
        titulo.setFont(new Font("Segoe UI", Font.BOLD, 18));
        titulo.setAlignmentX(Component.CENTER_ALIGNMENT);
        panel.add(titulo);
        panel.add(Box.createVerticalStrut(15));

        JPanel panelArticulos = new JPanel();
        panelArticulos.setLayout(new BoxLayout(panelArticulos, BoxLayout.Y_AXIS));
        panelArticulos.setBackground(Color.WHITE);

        final double[] totalPedido = {0.0};

        for (PedidoArticuloDTO pa : seleccionados) {
            ArticuloDTO art = pa.getArticulo();
            int cantidad = pa.getI_cantidad_ordenada();
            double precioUnitario = art.getV_precio();
            double totalArticulo = cantidad * precioUnitario;
            totalPedido[0] += totalArticulo;

            JPanel artPanel = new JPanel(new GridLayout(2, 2, 5, 3));  // mejor uso del espacio
            artPanel.setBackground(new Color(245, 245, 250));
            artPanel.setBorder(BorderFactory.createCompoundBorder(
                    BorderFactory.createLineBorder(new Color(200, 200, 200)),
                    BorderFactory.createEmptyBorder(8, 10, 8, 10)
            ));
            artPanel.setMaximumSize(new Dimension(Integer.MAX_VALUE, 100));
            artPanel.setPreferredSize(new Dimension(400, 100));

            artPanel.add(new JLabel("Artículo: " + art.getN_nombre_articulo()));
            artPanel.add(new JLabel("Cantidad: " + cantidad));
            artPanel.add(new JLabel("Precio unitario: $" + String.format("%.2f", precioUnitario)));
            artPanel.add(new JLabel("Valor total: $" + String.format("%.2f", totalArticulo)));

            panelArticulos.add(artPanel);
            panelArticulos.add(Box.createVerticalStrut(10));
        }

        JScrollPane scrollPane = new JScrollPane(panelArticulos);
        scrollPane.setBorder(BorderFactory.createLineBorder(new Color(210, 210, 210)));
        scrollPane.getVerticalScrollBar().setUnitIncrement(12);
        scrollPane.setPreferredSize(new Dimension(400, 320));
        panel.add(scrollPane);

        panel.add(Box.createVerticalStrut(15));

        JLabel lblTotal = new JLabel("💰 Total del Pedido: $" + String.format("%.2f", totalPedido[0]));
        lblTotal.setFont(new Font("Segoe UI", Font.BOLD, 15));
        lblTotal.setForeground(new Color(30, 30, 30));
        lblTotal.setAlignmentX(Component.CENTER_ALIGNMENT);
        panel.add(lblTotal);
        panel.add(Box.createVerticalStrut(15));

        // Botones
        JPanel botones = new JPanel(new FlowLayout(FlowLayout.CENTER, 20, 5));
        botones.setBackground(Color.WHITE);

        JButton btnConfirmar = new JButton("Confirmar");
        btnConfirmar.setFont(new Font("Segoe UI", Font.BOLD, 13));
        btnConfirmar.setBackground(new Color(76, 175, 80));
        btnConfirmar.setForeground(Color.WHITE);
        btnConfirmar.setFocusPainted(false);
        btnConfirmar.setPreferredSize(new Dimension(130, 35));

        JButton btnCancelar = new JButton("Cancelar");
        btnCancelar.setFont(new Font("Segoe UI", Font.BOLD, 13));
        btnCancelar.setBackground(new Color(220, 53, 69));
        btnCancelar.setForeground(Color.WHITE);
        btnCancelar.setFocusPainted(false);
        btnCancelar.setPreferredSize(new Dimension(130, 35));

        btnConfirmar.addActionListener(e -> {
            double saldoCliente = VentPrin.getSaldoCliente();
            if (totalPedido[0] > saldoCliente) {
                JOptionPane.showMessageDialog(dialog,
                        "El pedido excede el saldo disponible del cliente ($" + String.format("%.2f", saldoCliente) + ").",
                        "Saldo insuficiente", JOptionPane.ERROR_MESSAGE);
            } else {
                VentPrin.hacerPedido_VP(seleccionados);
                dialog.dispose();
            }
        });

        btnCancelar.addActionListener(e -> dialog.dispose());

        botones.add(btnConfirmar);
        botones.add(btnCancelar);

        panel.add(botones);
        dialog.setContentPane(panel);
        dialog.setVisible(true);
    }





}
