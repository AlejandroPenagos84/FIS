package com.mycompany.view.proveedor.login;

import com.mycompany.view.cliente.login.*;
import com.mycompany.controller.ClienteController;
import com.mycompany.controller.ProveedorController;
import javax.swing.*;
import java.awt.*;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class LoginProveedor extends JFrame {
    private JTextField usuarioField;
    private JPasswordField contraseñaField;
    private JButton loginButton;
    private JLabel resultadoLabel;

    public LoginProveedor(ProveedorController proveeCont) {
        setTitle("🔐 Login Proveedor");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(400, 300);
        setLocationRelativeTo(null);
        setResizable(false);

        // Fondo general
        JPanel mainPanel = new JPanel();
        mainPanel.setLayout(new BoxLayout(mainPanel, BoxLayout.Y_AXIS));
        mainPanel.setBackground(Color.WHITE);
        mainPanel.setBorder(BorderFactory.createEmptyBorder(20, 40, 20, 40));

        // Campos
        usuarioField = new JTextField();
        contraseñaField = new JPasswordField();

        prepararCampo(mainPanel, usuarioField, "Usuario");
        prepararCampo(mainPanel, contraseñaField, "Contraseña");

        // Botón login
        loginButton = new JButton("Ingresar");
        loginButton.setAlignmentX(Component.CENTER_ALIGNMENT);
        loginButton.setPreferredSize(new Dimension(120, 35));
        loginButton.setMaximumSize(new Dimension(Integer.MAX_VALUE, 40));
        loginButton.setFocusPainted(false);
        loginButton.setBackground(new Color(51, 153, 255));
        loginButton.setForeground(Color.WHITE);
        loginButton.setFont(new Font("Segoe UI", Font.BOLD, 14));
        loginButton.setBorder(BorderFactory.createEmptyBorder(10, 20, 10, 20));

        // Resultado label
        resultadoLabel = new JLabel("", SwingConstants.CENTER);
        resultadoLabel.setForeground(Color.RED);
        resultadoLabel.setFont(new Font("Segoe UI", Font.PLAIN, 13));
        resultadoLabel.setAlignmentX(Component.CENTER_ALIGNMENT);

        // Simulación de autocompletar para pruebas
        usuarioField.setText("techuser");
        contraseñaField.setText("secure1");

        // Acción botón
        loginButton.addActionListener(e -> {
            String usuario = usuarioField.getText().trim();
            String contraseña = new String(contraseñaField.getPassword()).trim();
            try {
                proveeCont.login(usuario, contraseña);
            } catch (SQLException ex) {
                Logger.getLogger(LoginProveedor.class.getName()).log(Level.SEVERE, null, ex);
                resultadoLabel.setText("Error en la base de datos");
            }
        });

        // Agregar componentes
        mainPanel.add(Box.createVerticalStrut(10));
        mainPanel.add(loginButton);
        mainPanel.add(Box.createVerticalStrut(15));
        mainPanel.add(resultadoLabel);
        mainPanel.add(Box.createVerticalGlue());

        setContentPane(mainPanel);
    }

    private void prepararCampo(JPanel mainPanel, JTextField campo, String placeholder) {
        campo.setMaximumSize(new Dimension(Integer.MAX_VALUE, 35));
        campo.setFont(new Font("Segoe UI", Font.PLAIN, 14));
        campo.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(Color.LIGHT_GRAY, 1),
                BorderFactory.createEmptyBorder(5, 10, 5, 10)
        ));
        campo.setAlignmentX(Component.CENTER_ALIGNMENT);

        JLabel label = new JLabel(" " + placeholder + ":");
        label.setFont(new Font("Segoe UI", Font.PLAIN, 14));
        label.setAlignmentX(Component.CENTER_ALIGNMENT);

        mainPanel.add(label);
        mainPanel.add(Box.createVerticalStrut(5));
        mainPanel.add(campo);
        mainPanel.add(Box.createVerticalStrut(10));
    }

    public void visibilidad(boolean vis) {
        setVisible(vis);
    }

    public void noLog() {
        resultadoLabel.setText("Usuario o contraseña incorrectos");
    }
}
