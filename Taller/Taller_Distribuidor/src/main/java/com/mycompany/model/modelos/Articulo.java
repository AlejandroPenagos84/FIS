/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.model.modelos;

import com.mycompany.model.interfaceModel.ItemPedido;

/**
 *
 * @author seanb
 */
public class Articulo implements ItemPedido{
    private String k_id_articulo;
    private String n_nombre_articulo;
    private String t_descripcion;
    private double v_precio;

    public Articulo() {
    }

    public Articulo(String k_id_articulo, String n_nombre_articulo, String t_descripcion, double v_precio) {
        this.k_id_articulo = k_id_articulo;
        this.n_nombre_articulo = n_nombre_articulo;
        this.t_descripcion = t_descripcion;
        this.v_precio = v_precio;
    }

    public String getK_id_articulo() {
        return k_id_articulo;
    }

    public void setK_id_articulo(String k_id_articulo) {
        this.k_id_articulo = k_id_articulo;
    }

    public String getN_nombre_articulo() {
        return n_nombre_articulo;
    }

    public void setN_nombre_articulo(String n_nombre_articulo) {
        this.n_nombre_articulo = n_nombre_articulo;
    }

    public String getT_descripcion() {
        return t_descripcion;
    }

    public void setT_descripcion(String t_descripcion) {
        this.t_descripcion = t_descripcion;
    }

    @Override
    public double getV_precio() {
        return v_precio;
    }

    public void setV_precio(double v_precio) {
        this.v_precio = v_precio;
    }

    @Override
    public void detalle() {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public int getI_cantidad_ordenada() {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public int getI_cantidad_pendiente() {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public int getI_stock_minimo() {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public int getI_stock() {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
    
    
}
