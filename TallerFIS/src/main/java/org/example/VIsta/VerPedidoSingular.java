package org.example.VIsta;

import org.example.Controlador.DirectorController;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import javax.swing.table.TableCellRenderer;
import java.awt.*;
import java.util.List;
import java.util.Map;

public class VerPedidoSingular extends JFrame {
    private DirectorController directorController;
    public VerPedidoSingular(Map<String, Object> pedido, List<Map<String, Object>> lineas, DirectorController controller) {
        this.directorController = controller;

        setTitle("Detalle del Pedido");
        setSize(800, 450);
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        setLocationRelativeTo(null);
        setLayout(new BorderLayout());

        // Panel superior con info del pedido
        JPanel infoPanel = new JPanel(new GridLayout(3, 1));
        infoPanel.setBorder(BorderFactory.createTitledBorder("Información del Pedido"));

        JLabel clienteLabel = new JLabel("Cliente: " + pedido.get("cliente"));
        JLabel direccionLabel = new JLabel("Dirección de Envío: " + pedido.get("direccionEnvio"));
        JLabel fechaLabel = new JLabel("Fecha del Pedido: " + pedido.get("fechaPedido"));

        infoPanel.add(clienteLabel);
        infoPanel.add(direccionLabel);
        infoPanel.add(fechaLabel);

        add(infoPanel, BorderLayout.NORTH);

        // Tabla de líneas de pedido con botón en cada fila
        String[] columnas = {"Código", "Nombre", "Descripción", "Cantidad Ordenada", "Cantidad Pendiente", "Acción"};
        DefaultTableModel model = new DefaultTableModel(columnas, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                // Solo la última columna ("Acción") es editable (para el botón)
                return column == 5;
            }
        };

        for (Map<String, Object> linea : lineas) {
            Object[] fila = {
                    linea.get("codigo"),
                    linea.get("nombre"),
                    linea.get("descripcion"),
                    linea.get("ordenada"),
                    linea.get("pendiente"),
                    "Realizar solicitud" // Texto del botón
            };
            model.addRow(fila);
        }

        JTable tabla = new JTable(model);

        // Render y Editor para el botón
        tabla.getColumn("Acción").setCellRenderer(new ButtonRenderer());
        tabla.getColumn("Acción").setCellEditor(new ButtonEditor(new JCheckBox(), directorController,"realizarSolicitud"));

        JScrollPane scroll = new JScrollPane(tabla);
        scroll.setBorder(BorderFactory.createTitledBorder("Líneas de Pedido"));

        add(scroll, BorderLayout.CENTER);
        setVisible(true);
    }
}