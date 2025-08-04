/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.model.modelos;

/**
 *
 * @author seanb
 */
public class Cliente {
    private String k_cod_cliente;
    private String n_nombre_cliente;
    private String dir_calle;
    private String dir_carrera;
    private String dir_numero;
    private Integer v_saldo;
    private Integer v_limite_credito;
    private Double v_porcentaje_de_descuento;
    private String cre_usuario_cliente;
    private String cre_contrasena_cliente;
    

    public Cliente() {
    }

    public Cliente(String k_cod_cliente, String n_nombre_cliente, String dir_calle, String dir_carrera, String dir_numero, Integer v_saldo, Integer v_limite_credito, Double v_porcentaje_de_descuento, String cre_usuario_cliente, String cre_contrasena_cliente) {
        this.k_cod_cliente = k_cod_cliente;
        this.n_nombre_cliente = n_nombre_cliente;
        this.dir_calle = dir_calle;
        this.dir_carrera = dir_carrera;
        this.dir_numero = dir_numero;
        this.v_saldo = v_saldo;
        this.v_limite_credito = v_limite_credito;
        this.v_porcentaje_de_descuento = v_porcentaje_de_descuento;
        this.cre_usuario_cliente = cre_usuario_cliente;
        this.cre_contrasena_cliente = cre_contrasena_cliente;
    }

    public String getK_cod_cliente() {
        return k_cod_cliente;
    }

    public void setK_cod_cliente(String k_cod_cliente) {
        this.k_cod_cliente = k_cod_cliente;
    }

    public String getN_nombre_cliente() {
        return n_nombre_cliente;
    }

    public void setN_nombre_cliente(String n_nombre_cliente) {
        this.n_nombre_cliente = n_nombre_cliente;
    }

    public String getDir_calle() {
        return dir_calle;
    }

    public void setDir_calle(String dir_calle) {
        this.dir_calle = dir_calle;
    }

    public String getDir_carrera() {
        return dir_carrera;
    }

    public void setDir_carrera(String dir_carrera) {
        this.dir_carrera = dir_carrera;
    }

    public String getDir_numero() {
        return dir_numero;
    }

    public void setDir_numero(String dir_numero) {
        this.dir_numero = dir_numero;
    }

    public Integer getV_saldo() {
        return v_saldo;
    }

    public void setV_saldo(Integer v_saldo) {
        this.v_saldo = v_saldo;
    }

    public Integer getV_limite_credito() {
        return v_limite_credito;
    }

    public void setV_limite_credito(Integer v_limite_credito) {
        this.v_limite_credito = v_limite_credito;
    }

    public Double getV_porcentaje_de_descuento() {
        return v_porcentaje_de_descuento;
    }

    public void setV_porcentaje_de_descuento(Double v_porcentaje_de_descuento) {
        this.v_porcentaje_de_descuento = v_porcentaje_de_descuento;
    }

    public String getCre_usuario_cliente() {
        return cre_usuario_cliente;
    }

    public void setCre_usuario_cliente(String cre_usuario_cliente) {
        this.cre_usuario_cliente = cre_usuario_cliente;
    }

    public String getCre_contrasena_cliente() {
        return cre_contrasena_cliente;
    }

    public void setCre_contrasena_cliente(String cre_contrasena_cliente) {
        this.cre_contrasena_cliente = cre_contrasena_cliente;
    }

    
}
