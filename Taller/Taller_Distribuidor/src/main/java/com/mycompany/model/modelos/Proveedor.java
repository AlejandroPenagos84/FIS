/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.model.modelos;

/**
 *
 * @author seanb
 */
public class Proveedor {
    private String k_id_proveedor;
    private String n_nombre;
    private String cre_usuario_proveedor;
    private String cre_contrasena_proveedor;

    public Proveedor() {
    }

    public Proveedor(String k_id_proveedor, String n_nombre, String cre_usuario_proveedor, String cre_contrasena_proveedor) {
        this.k_id_proveedor = k_id_proveedor;
        this.n_nombre = n_nombre;
        this.cre_usuario_proveedor = cre_usuario_proveedor;
        this.cre_contrasena_proveedor = cre_contrasena_proveedor;
    }

    public String getK_id_proveedor() {
        return k_id_proveedor;
    }

    public void setK_id_proveedor(String k_id_proveedor) {
        this.k_id_proveedor = k_id_proveedor;
    }

    public String getN_nombre() {
        return n_nombre;
    }

    public void setN_nombre(String n_nombre) {
        this.n_nombre = n_nombre;
    }

    public String getCre_usuario_proveedor() {
        return cre_usuario_proveedor;
    }

    public void setCre_usuario_proveedor(String cre_usuario_proveedor) {
        this.cre_usuario_proveedor = cre_usuario_proveedor;
    }

    public String getCre_contrasena_proveedor() {
        return cre_contrasena_proveedor;
    }

    public void setCre_contrasena_proveedor(String cre_contrasena_proveedor) {
        this.cre_contrasena_proveedor = cre_contrasena_proveedor;
    }
    
    
}
