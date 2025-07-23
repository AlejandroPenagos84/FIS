package org.example.VIsta;
import org.example.Controlador.ClienteController;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import javax.swing.table.TableCellRenderer;
import java.awt.*;
import java.util.List;
import java.util.ArrayList;


public class ClienteVerArticulos extends JFrame {

    private ClienteController controller;
    private JTable tabla;
    private DefaultTableModel model;
    public JButton enviarBoton;

    public ClienteVerArticulos(ClienteController controllerC) {
        this.controller = controllerC;

        setTitle("Inventario de Artículos");
        setSize(700, 400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setLayout(new BorderLayout()); // <- Usa BorderLayout explícitamente

        enviarBoton = new JButton("Enviar");
        enviarBoton.addActionListener(controller);

        String[] columnas = {"ID", "Nombre", "Cantidad", "Precio", "Seleccionado", "Acción"};

        model = new DefaultTableModel(null, columnas) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return column == 4 || column == 5; // checkbox y botón
            }

            @Override
            public Class<?> getColumnClass(int columnIndex) {
                if (columnIndex == 4) return Boolean.class;
                return super.getColumnClass(columnIndex);
            }
        };

        tabla = new JTable(model);
        tabla.getColumn("Acción").setCellRenderer(new ButtonRenderer());
        tabla.getColumn("Acción").setCellEditor(new ButtonEditor(new JCheckBox(), controller, "verArticulo"));

        JScrollPane scrollPane = new JScrollPane(tabla);
        add(scrollPane, BorderLayout.CENTER); // tabla al centro

        JPanel panelInferior = new JPanel(); // puedes usar FlowLayout, GridLayout, etc.
        panelInferior.add(enviarBoton);
        add(panelInferior, BorderLayout.SOUTH); // botón abajo

        setVisible(true);
    }

    public void agregarFila(String id, String nombre, String cantidad, String precio) {
        model.addRow(new Object[]{id, nombre, cantidad, precio, false, "Ver artículo"});
    }

    public List<String> obtenerFilasSeleccionadas() {
        List<String> seleccionadas = new ArrayList<>();
        for (int i = 0; i < model.getRowCount(); i++) {
            Boolean checked = (Boolean) model.getValueAt(i, 4); // Columna del checkbox
            if (Boolean.TRUE.equals(checked)) {
                String articulo = (String) model.getValueAt(i, 0);
                seleccionadas.add(articulo);
            }
        }
        return seleccionadas;
    }

    private static class ButtonRenderer extends JButton implements TableCellRenderer {
        public ButtonRenderer() {
            setOpaque(true);
        }

        @Override
        public Component getTableCellRendererComponent(JTable table, Object value,
                                                       boolean isSelected, boolean hasFocus,
                                                       int row, int column) {
            setText((value == null) ? "Ver artículo" : value.toString());
            return this;
        }
    }
}