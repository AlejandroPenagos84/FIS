/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.model.connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConexionBD {

    private static final String URL = "jdbc:postgresql://localhost:5432/Taller_Distribuidor";
    private static final String USUARIO = "postgres";
    private static final String CONTRASENA = "postgres"; // <-- cámbiala aquí

    static {
        try {
            Class.forName("org.postgresql.Driver"); // Carga del driver JDBC
        } catch (ClassNotFoundException e) {
            System.err.println("Error al cargar el driver de PostgreSQL");
            e.printStackTrace();
        }
    }

    public Connection obtenerConexion() {
        try {
            return DriverManager.getConnection(URL, USUARIO, CONTRASENA);
        } catch (SQLException e) {
            System.err.println("Error al conectar con la base de datos:");
            e.printStackTrace();
            return null;
        }
    }

    public void cerrarConexion(Connection conn) {
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                System.err.println("Error al cerrar la conexión:");
                e.printStackTrace();
            }
        }
    }
}
