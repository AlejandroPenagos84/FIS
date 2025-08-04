package com.mycompany.view.proveedor.ventanaPrincipal;

import com.mycompany.model.modelosDTO.ArticuloDTO;

import javax.swing.*;
import javax.swing.plaf.basic.BasicScrollBarUI;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.List;

public class PanelListaArticulosProveedor extends JPanel {

    public PanelListaArticulosProveedor(List<ArticuloDTO> articulos, PanelDetalleArticuloProveedor panelDetalle) {
        setLayout(new BorderLayout());
        setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

        JLabel titulo = new JLabel("Listado de Artículos");
        titulo.setFont(new Font("Segoe UI", Font.BOLD, 18));
        add(titulo, BorderLayout.NORTH);

        JPanel panelArticulos = new JPanel();
        panelArticulos.setLayout(new BoxLayout(panelArticulos, BoxLayout.Y_AXIS));
        panelArticulos.setBackground(Color.WHITE);

        for (ArticuloDTO articulo : articulos) {
            JPanel itemPanel = new JPanel();
            itemPanel.setLayout(new BoxLayout(itemPanel, BoxLayout.Y_AXIS));
            itemPanel.setMaximumSize(new Dimension(Integer.MAX_VALUE, 110));
            itemPanel.setBorder(BorderFactory.createCompoundBorder(
                    BorderFactory.createLineBorder(Color.LIGHT_GRAY),
                    BorderFactory.createEmptyBorder(8, 10, 8, 10)
            ));
            itemPanel.setBackground(new Color(250, 250, 250));

            JLabel lblNombre = new JLabel(articulo.getN_nombre_articulo());
            lblNombre.setFont(new Font("Segoe UI", Font.BOLD, 14));

            JLabel lblPrecio = new JLabel("Precio: $" + articulo.getV_precio());
            lblPrecio.setFont(new Font("Segoe UI", Font.PLAIN, 12));

            JLabel lblStock = new JLabel("Stock actual: " + articulo.getI_stock()+ "    " + "Stock mínimo: " + articulo.getI_stock_minimo());
            lblStock.setFont(new Font("Segoe UI", Font.PLAIN, 12));

            int stock = articulo.getI_stock();
            int stockMin = articulo.getI_stock_minimo();
            int porcentaje = calcularPorcentajeStock(stock, stockMin);

            JProgressBar barra = new JProgressBar(0, 100);
            barra.setValue(porcentaje);
            barra.setStringPainted(true);
            barra.setFont(new Font("Segoe UI", Font.PLAIN, 11));

            if (porcentaje < 50) {
                barra.setForeground(new Color(220, 53, 69)); // rojo
            } else if (porcentaje < 75) {
                barra.setForeground(new Color(255, 193, 7)); // naranja
            } else {
                barra.setForeground(new Color(76, 175, 80)); // verde
            }

            itemPanel.add(lblNombre);
            itemPanel.add(lblPrecio);
            itemPanel.add(lblStock);
            itemPanel.add(new JLabel("Nivel de stock:"));
            itemPanel.add(barra);

            itemPanel.addMouseListener(new MouseAdapter() {
                @Override
                public void mouseClicked(MouseEvent e) {
                    panelDetalle.setArticuloSeleccionado(articulo.getK_id_articulo());
                }
            });

            panelArticulos.add(itemPanel);
            panelArticulos.add(Box.createVerticalStrut(8));
        }

        JScrollPane scrollPane = new JScrollPane(panelArticulos);
        scrollPane.setBorder(BorderFactory.createEmptyBorder());
        scrollPane.getVerticalScrollBar().setPreferredSize(new Dimension(10, Integer.MAX_VALUE));

        // Estilo bonito del scroll
        scrollPane.getVerticalScrollBar().setUI(new BasicScrollBarUI() {
            @Override
            protected void configureScrollBarColors() {
                this.thumbColor = new Color(180, 180, 200);
                this.trackColor = new Color(245, 245, 250);
            }

            @Override
            protected JButton createDecreaseButton(int orientation) {
                return createZeroButton();
            }

            @Override
            protected JButton createIncreaseButton(int orientation) {
                return createZeroButton();
            }

            private JButton createZeroButton() {
                JButton button = new JButton();
                button.setPreferredSize(new Dimension(0, 0));
                button.setMinimumSize(new Dimension(0, 0));
                button.setMaximumSize(new Dimension(0, 0));
                return button;
            }
        });

        add(scrollPane, BorderLayout.CENTER);
    }

    private int calcularPorcentajeStock(int stock, int stockMinimo) {
        if (stockMinimo <= 0) return 100;
        if (stock <= stockMinimo) return 0;
        if (stock >= 2 * stockMinimo) return 100;
        return (int) ((double)(stock - stockMinimo) / stockMinimo * 100);
    }
}
