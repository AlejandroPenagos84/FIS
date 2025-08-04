package com.mycompany.view.proveedor.ventanaPrincipal;

import com.mycompany.model.modelosDTO.ArticuloDTO;

import javax.swing.*;
import java.awt.*;
import java.util.List;

public class PanelDetalleArticuloProveedor extends JPanel {
    private String k_id_cod;

    private JLabel lblNombre, lblDescripcion, lblPrecio;
    private JLabel lblStock, lblStockMinimo;
    private JLabel lblCodigoLabel, lblCodigoValue;
    private JTextField txtCantidadProduccion;
    private JButton btnProducir;

    private VentanaPrincipalProveedor ventanaPrincipalProveedor;
    private List<ArticuloDTO> articulosProveedor;

    public PanelDetalleArticuloProveedor(VentanaPrincipalProveedor ventanaPrincipalProveedor, List<ArticuloDTO> articulosProveedor) {
        this.ventanaPrincipalProveedor = ventanaPrincipalProveedor;
        this.articulosProveedor = articulosProveedor;

        setLayout(new BoxLayout(this, BoxLayout.Y_AXIS));
        setBackground(Color.WHITE);
        setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(new Color(220, 220, 220)),
                BorderFactory.createEmptyBorder(20, 20, 20, 20))
        );

        JLabel titulo = new JLabel("Detalle del Artículo");
        titulo.setFont(new Font("Segoe UI", Font.BOLD, 18));
        titulo.setForeground(new Color(60, 60, 60));
        titulo.setAlignmentX(Component.LEFT_ALIGNMENT);

        lblCodigoLabel = crearLabelInfo("Código:");
        lblCodigoValue = crearLabelInfo("");

        JPanel panelCodigo = new JPanel();
        panelCodigo.setLayout(new BoxLayout(panelCodigo, BoxLayout.X_AXIS));
        panelCodigo.setBackground(Color.WHITE);
        panelCodigo.setAlignmentX(Component.LEFT_ALIGNMENT);
        panelCodigo.add(lblCodigoLabel);
        panelCodigo.add(Box.createHorizontalStrut(10));
        panelCodigo.add(lblCodigoValue);

        lblNombre = crearLabelInfo("Nombre:");
        lblDescripcion = crearLabelInfo("Descripción:");
        lblPrecio = crearLabelInfo("Precio:");
        lblStock = crearLabelInfo("Stock actual:");
        lblStockMinimo = crearLabelInfo("Stock mínimo:");

        add(titulo);
        add(Box.createVerticalStrut(20));
        add(panelCodigo);
        add(Box.createVerticalStrut(10));
        add(lblNombre);
        add(Box.createVerticalStrut(10));
        add(lblDescripcion);
        add(Box.createVerticalStrut(10));
        add(lblPrecio);
        add(Box.createVerticalStrut(10));
        add(lblStock);
        add(Box.createVerticalStrut(10));
        add(lblStockMinimo);
        add(Box.createVerticalStrut(20));

        // Sección producir
        JPanel panelProduccion = new JPanel();
        panelProduccion.setLayout(new FlowLayout(FlowLayout.LEFT, 10, 5));
        panelProduccion.setBackground(Color.WHITE);
        panelProduccion.setAlignmentX(Component.LEFT_ALIGNMENT);

        JLabel lblProduccion = new JLabel("Cantidad a producir:");
        lblProduccion.setFont(new Font("Segoe UI", Font.PLAIN, 14));

        txtCantidadProduccion = new JTextField(5);
        txtCantidadProduccion.setFont(new Font("Segoe UI", Font.PLAIN, 14));

        btnProducir = new JButton("Producir");
        btnProducir.setFont(new Font("Segoe UI", Font.BOLD, 14));
        btnProducir.setBackground(new Color(76, 175, 80));
        btnProducir.setForeground(Color.WHITE);
        btnProducir.setFocusPainted(false);
        btnProducir.setCursor(new Cursor(Cursor.HAND_CURSOR));

        // Evento del botón Producir
        btnProducir.addActionListener(e -> {
            try {
                int textoCantidad = Integer.parseInt(getCantidadProduccion());
                for (ArticuloDTO articuloDTO : this.articulosProveedor) {
                    if (articuloDTO.getK_id_articulo().equals(this.k_id_cod)) {
                        this.ventanaPrincipalProveedor.realizarProduccion_Ventprin(articuloDTO, textoCantidad);
                        break;
                    }
                }
            } catch (NumberFormatException ex) {
                JOptionPane.showMessageDialog(this, "Ingrese una cantidad válida.", "Error", JOptionPane.ERROR_MESSAGE);
            }
        });

        panelProduccion.add(lblProduccion);
        panelProduccion.add(txtCantidadProduccion);
        panelProduccion.add(btnProducir);

        add(panelProduccion);
        add(Box.createVerticalStrut(10));

        // Inicialmente en blanco
        limpiarDetalle();
    }

    private JLabel crearLabelInfo(String text) {
        JLabel label = new JLabel(text);
        label.setFont(new Font("Segoe UI", Font.PLAIN, 14));
        label.setForeground(new Color(80, 80, 80));
        label.setAlignmentX(Component.LEFT_ALIGNMENT);
        return label;
    }

    public void setArticuloSeleccionado(String k_id_articulo) {
        for (ArticuloDTO articuloDTO : this.articulosProveedor) {
            if (articuloDTO.getK_id_articulo().equals(k_id_articulo)) {
                this.k_id_cod = k_id_articulo;
                lblCodigoValue.setText(k_id_articulo);
                lblNombre.setText("Nombre: " + articuloDTO.getN_nombre_articulo());
                lblDescripcion.setText("<html>Descripción:<br>" + articuloDTO.getT_descripcion() + "</html>");
                lblPrecio.setText("Precio: $" + articuloDTO.getV_precio());
                lblStock.setText("Stock actual: " + articuloDTO.getI_stock());
                lblStockMinimo.setText("Stock mínimo: " + articuloDTO.getI_stock_minimo());
                return;
            }
        }
    }

    public void limpiarDetalle() {
        lblCodigoValue.setText("");
        lblNombre.setText("Nombre:");
        lblDescripcion.setText("Descripción:");
        lblPrecio.setText("Precio:");
        lblStock.setText("Stock actual:");
        lblStockMinimo.setText("Stock mínimo:");
        txtCantidadProduccion.setText("");
    }

    public JButton getBtnProducir() {
        return btnProducir;
    }

    public String getCantidadProduccion() {
        return txtCantidadProduccion.getText().trim();
    }
}
