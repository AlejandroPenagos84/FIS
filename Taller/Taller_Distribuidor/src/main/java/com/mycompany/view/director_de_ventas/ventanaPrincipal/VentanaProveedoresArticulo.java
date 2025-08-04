package com.mycompany.view.director_de_ventas.ventanaPrincipal;

import com.mycompany.model.modelosDTO.PedidoArticuloDTO;
import com.mycompany.model.modelosDTO.ProveedorArticuloDTO;
import com.mycompany.model.modelosDTO.ProveedorDTO;
import com.mycompany.model.modelosDTO.SuplementoPedidoArticulo;
import com.mycompany.model.modelosDTO.SuplementoProveedorArticulo;

import javax.swing.*;
import javax.swing.text.*;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class VentanaProveedoresArticulo extends JFrame {

    private final JPanel panelLista = new JPanel();
    private PanelDetallePedido panelDetallePedido;

    public VentanaProveedoresArticulo(PanelDetallePedido panelDetallePedido, PedidoArticuloDTO pedidoArticulo) {
        this.panelDetallePedido = panelDetallePedido;

        setTitle("📦 Proveedores de: " + pedidoArticulo.getArticulo().getN_nombre_articulo());
        setSize(600, 550);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        setLayout(new BorderLayout());

        panelLista.setLayout(new BoxLayout(panelLista, BoxLayout.Y_AXIS));
        panelLista.setBackground(new Color(245, 245, 245));
        panelLista.setBorder(BorderFactory.createEmptyBorder(15, 15, 15, 15));

        if (pedidoArticulo.getArticulo().getProducArtic() != null && !pedidoArticulo.getArticulo().getProducArtic().isEmpty()) {
            for (ProveedorArticuloDTO provArt : pedidoArticulo.getArticulo().getProducArtic()) {
                ProveedorDTO proveedor = provArt.getProveedor();

                JPanel panelProveedor = new JPanel();
                panelProveedor.setLayout(new BoxLayout(panelProveedor, BoxLayout.Y_AXIS));
                panelProveedor.setBorder(BorderFactory.createTitledBorder("🏢 " + proveedor.getN_nombre()));
                panelProveedor.setBackground(Color.WHITE);
                panelProveedor.setPreferredSize(new Dimension(480, 150));
                panelProveedor.setMaximumSize(new Dimension(Short.MAX_VALUE, 170));
                panelProveedor.setAlignmentX(Component.LEFT_ALIGNMENT);

                panelProveedor.putClientProperty("proveedorArticulo", provArt);

                // Campo de cantidad y botón
                JTextField txtCantidadSuplida = new JTextField(10);
                txtCantidadSuplida.setEnabled(false);
                restringirCantidadMaxima(txtCantidadSuplida, pedidoArticulo.getI_cantidad_pendiente(), provArt.getI_stock());
                panelProveedor.putClientProperty("txtCantidad", txtCantidadSuplida);

                JButton btnAutoSuplir = new JButton("✔ Auto-Suplir");
                btnAutoSuplir.setEnabled(false);
                panelProveedor.putClientProperty("btnAutoSuplir", btnAutoSuplir);

                // Selección visual y activación
                panelProveedor.addMouseListener(new MouseAdapter() {
                    private boolean seleccionado = false;
                    private final Color originalColor = Color.WHITE;
                    private final Color colorSeleccionado = new Color(200, 255, 200);

                    @Override
                    public void mouseClicked(MouseEvent e) {
                        seleccionado = !seleccionado;
                        panelProveedor.setBackground(seleccionado ? colorSeleccionado : originalColor);
                        txtCantidadSuplida.setEnabled(seleccionado);
                        btnAutoSuplir.setEnabled(seleccionado);
                        if (!seleccionado) {
                            txtCantidadSuplida.setText("");
                        }
                        panelProveedor.repaint();
                    }
                });

                JPanel datosGrid = new JPanel(new GridLayout(3, 2, 10, 5));
                datosGrid.setOpaque(false);
                datosGrid.add(new JLabel("🆔 ID Proveedor: " + proveedor.getK_id_proveedor()));
                datosGrid.add(new JLabel("📛 Nombre: " + proveedor.getN_nombre()));
                datosGrid.add(new JLabel("📉 Stock mínimo: " + provArt.getI_stock_minimo()));
                datosGrid.add(new JLabel("📦 Stock actual: " + provArt.getI_stock()));
                datosGrid.add(new JLabel("📭 Pendiente por entregar: " + pedidoArticulo.getI_cantidad_pendiente()));

                panelProveedor.add(datosGrid);

                JPanel panelSuplir = new JPanel(new FlowLayout(FlowLayout.LEFT));
                panelSuplir.setOpaque(false);

                btnAutoSuplir.setPreferredSize(new Dimension(130, 30));
                btnAutoSuplir.setBackground(new Color(0, 122, 204));
                btnAutoSuplir.setForeground(Color.WHITE);
                btnAutoSuplir.setFocusPainted(false);
                btnAutoSuplir.setBorder(BorderFactory.createLineBorder(new Color(0, 100, 180), 1));

                btnAutoSuplir.addActionListener(e -> {
                    Integer pendiente = pedidoArticulo.getI_cantidad_pendiente();
                    Integer stock = provArt.getI_stock();
                    if (pendiente != null && stock != null) {
                        txtCantidadSuplida.setText(String.valueOf(Math.min(pendiente, stock)));
                    }
                });

                panelSuplir.add(new JLabel("🔢 Cantidad a suplir:"));
                panelSuplir.add(txtCantidadSuplida);
                panelSuplir.add(btnAutoSuplir);

                panelProveedor.add(panelSuplir);
                panelLista.add(panelProveedor);
                panelLista.add(Box.createVerticalStrut(15));
            }
        } else {
            JLabel noProveedores = new JLabel("❌ Este artículo no tiene proveedores asociados.");
            noProveedores.setFont(new Font("Segoe UI", Font.BOLD, 14));
            panelLista.add(noProveedores);
        }

        JScrollPane scrollPane = new JScrollPane(panelLista);
        scrollPane.setBorder(null);
        scrollPane.getVerticalScrollBar().setUnitIncrement(16);
        add(scrollPane, BorderLayout.CENTER);

        JPanel panelInferior = new JPanel(new FlowLayout(FlowLayout.CENTER));
        panelInferior.setBorder(BorderFactory.createEmptyBorder(10, 0, 10, 0));

        JButton btnSuplirTodo = new JButton("📤 Suplir");
        btnSuplirTodo.setPreferredSize(new Dimension(120, 35));
        btnSuplirTodo.setBackground(new Color(50, 150, 50));
        btnSuplirTodo.setForeground(Color.WHITE);

        btnSuplirTodo.addActionListener(e -> {
            SuplementoPedidoArticulo suplemento = new SuplementoPedidoArticulo(pedidoArticulo, obtenerProveedoresSeleccionados());
            try {
                panelDetallePedido.actualizar_pedido_VentPrin_DetallPed(suplemento);
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
            dispose();
        });

        panelInferior.add(btnSuplirTodo);
        add(panelInferior, BorderLayout.SOUTH);
    }

    private List<SuplementoProveedorArticulo> obtenerProveedoresSeleccionados() {
        List<SuplementoProveedorArticulo> seleccionados = new ArrayList<>();
        for (Component comp : panelLista.getComponents()) {
            if (comp instanceof JPanel panelProveedor) {
                if (panelProveedor.getBackground().equals(new Color(200, 255, 200))) {
                    ProveedorArticuloDTO proveedorArticulo = (ProveedorArticuloDTO) panelProveedor.getClientProperty("proveedorArticulo");
                    JTextField txtCantidad = (JTextField) panelProveedor.getClientProperty("txtCantidad");

                    try {
                        int cantidad = Integer.parseInt(txtCantidad.getText().trim());
                        if (cantidad > 0 && cantidad <= proveedorArticulo.getI_stock()) {
                            seleccionados.add(new SuplementoProveedorArticulo(proveedorArticulo, cantidad));
                        }
                    } catch (NumberFormatException ignored) { }
                }
            }
        }
        return seleccionados;
    }

    private void restringirCantidadMaxima(JTextField campo, int maxPendiente, int maxStock) {
        int maxPermitido = Math.min(maxPendiente, maxStock);
        ((AbstractDocument) campo.getDocument()).setDocumentFilter(new DocumentFilter() {
            @Override
            public void insertString(FilterBypass fb, int offset, String string, AttributeSet attr) throws BadLocationException {
                String nuevoTexto = new StringBuilder(campo.getText()).insert(offset, string).toString();
                if (esValido(nuevoTexto, maxPermitido)) {
                    super.insertString(fb, offset, string, attr);
                }
            }

            @Override
            public void replace(FilterBypass fb, int offset, int length, String text, AttributeSet attrs) throws BadLocationException {
                String nuevoTexto = new StringBuilder(campo.getText()).replace(offset, offset + length, text).toString();
                if (esValido(nuevoTexto, maxPermitido)) {
                    super.replace(fb, offset, length, text, attrs);
                }
            }

            private boolean esValido(String texto, int max) {
                try {
                    if (texto.isEmpty()) return true;
                    int valor = Integer.parseInt(texto);
                    return valor >= 0 && valor <= max;
                } catch (NumberFormatException e) {
                    return false;
                }
            }
        });
    }
}
