package org.example.VIsta;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class ButtonEditor extends DefaultCellEditor {
    private JButton button;
    private String label;
    private boolean clicked;
    private int row;

    public ButtonEditor(JCheckBox checkBox, ActionListener listener, String actionValue) {
        super(checkBox);
        button = new JButton();
        button.setOpaque(true);
        button.addActionListener(e -> {
            if (clicked) {
                ActionEvent nuevoEvento = new ActionEvent(
                        e.getSource(),

                        ActionEvent.ACTION_PERFORMED,
                        actionValue+":" + row
                );
                listener.actionPerformed(nuevoEvento);
            }
            clicked = false;
            fireEditingStopped();
        });
    }

    @Override
    public Component getTableCellEditorComponent(JTable table, Object value,
                                                 boolean isSelected, int row, int column) {
        this.label = (value == null) ? "value" : value.toString();
        button.setText(label);
        this.clicked = true;
        this.row = row;
        return button;
    }

    @Override
    public Object getCellEditorValue() {
        return label;
    }

    @Override
    public boolean stopCellEditing() {
        clicked = false;
        return super.stopCellEditing();
    }
}
