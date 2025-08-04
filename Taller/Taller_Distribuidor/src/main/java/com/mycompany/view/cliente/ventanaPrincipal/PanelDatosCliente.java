package com.mycompany.view.cliente.ventanaPrincipal;
import com.mycompany.model.modelosDTO.ClienteDTO;

import javax.swing.*;
import java.awt.*;

public class PanelDatosCliente extends JPanel {

    public PanelDatosCliente(ClienteDTO cliente) {
        setLayout(new GridLayout(8, 2, 5, 5)); // 8 campos, 2 columnas
        setBorder(BorderFactory.createTitledBorder("Datos del Cliente"));

        add(new JLabel("Código Cliente:"));
        add(new JLabel(cliente.getK_cod_cliente()));

        add(new JLabel("Nombre Cliente:"));
        add(new JLabel(cliente.getN_nombre_cliente()));

        add(new JLabel("Calle:"));
        add(new JLabel(cliente.getDir_calle()));

        add(new JLabel("Carrera:"));
        add(new JLabel(cliente.getDir_carrera()));

        add(new JLabel("Número:"));
        add(new JLabel(cliente.getDir_numero()));

        add(new JLabel("Saldo:"));
        add(new JLabel(String.valueOf(cliente.getV_saldo())));

        add(new JLabel("Límite de Crédito:"));
        add(new JLabel(String.valueOf(cliente.getV_limite_credito())));

        add(new JLabel("Porcentaje Descuento:"));
        add(new JLabel(String.valueOf((cliente.getV_porcentaje_de_descuento()) * 100) + "%"));
    }
}