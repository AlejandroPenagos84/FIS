package org.example.VIsta;

import org.example.Controlador.ClienteController;
import org.example.Controlador.DirectorController;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import javax.swing.table.TableCellRenderer;
import java.awt.*;
import java.lang.Integer;
import java.util.List;
import java.util.ArrayList;



public class VerPedidos extends JFrame {

    private DirectorController directorController;
    private JTable tabla;
    private DefaultTableModel model;
    public JButton enviarBoton;

    public VerPedidos(DirectorController controllerD) {
        this.directorController= controllerD;

        setTitle("Inventario de Artículos");
        setSize(700, 400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setLayout(new BorderLayout());

        enviarBoton = new JButton("Enviar");
        enviarBoton.addActionListener(directorController);

        String[] columnas = {"ID", "Nombre Cliente", "Direccion", "Fecha", "Acción"};

        model = new DefaultTableModel(null, columnas) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return column == 4; // solo la columna del botón
            }

            @Override
            public Class<?> getColumnClass(int columnIndex) {
                return super.getColumnClass(columnIndex);
            }
        };

        tabla = new JTable(model);
        tabla.getColumn("Acción").setCellRenderer(new ButtonRenderer());
        tabla.getColumn("Acción").setCellEditor(new ButtonEditor(new JCheckBox(), directorController,"verPedido"));

        JScrollPane scrollPane = new JScrollPane(tabla);
        add(scrollPane, BorderLayout.CENTER);

        JPanel panelInferior = new JPanel();
        panelInferior.add(enviarBoton);
        add(panelInferior, BorderLayout.SOUTH);

        setVisible(true);
    }

    public void agregarFila(String id, String nombre, String direccion, String fecha) {
        model.addRow(new Object[]{id, nombre, direccion, fecha, "Ver pedido"});
    }

    private static class ButtonRenderer extends JButton implements TableCellRenderer {
        public ButtonRenderer() {
            setOpaque(true);
        }

        @Override
        public Component getTableCellRendererComponent(JTable table, Object value,
                                                       boolean isSelected, boolean hasFocus,
                                                       int row, int column) {
            setText((value == null) ? "Ver pedido" : value.toString());
            return this;
        }
    }
}