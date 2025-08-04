/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.model.modelos;

/**
 *
 * @author seanb
 */
public class ProveedorArticulo {
    private int i_stock_minimo;
    private int i_stock;
    private String k_id_articulo;
    private String k_id_proveedor;

    public ProveedorArticulo() {
    }

    public ProveedorArticulo(int i_stock_minimo, int i_stock, String k_id_articulo, String k_id_proveedor) {
        this.i_stock_minimo = i_stock_minimo;
        this.i_stock = i_stock;
        this.k_id_articulo = k_id_articulo;
        this.k_id_proveedor = k_id_proveedor;
    }

    public int getI_stock_minimo() {
        return i_stock_minimo;
    }

    public void setI_stock_minimo(int i_stock_minimo) {
        this.i_stock_minimo = i_stock_minimo;
    }

    public int getI_stock() {
        return i_stock;
    }

    public void setI_stock(int i_stock) {
        this.i_stock = i_stock;
    }

    public String getK_id_articulo() {
        return k_id_articulo;
    }

    public void setK_id_articulo(String k_id_articulo) {
        this.k_id_articulo = k_id_articulo;
    }

    public String getK_id_proveedor() {
        return k_id_proveedor;
    }

    public void setK_id_proveedor(String k_id_proveedor) {
        this.k_id_proveedor = k_id_proveedor;
    }
    
    
}
