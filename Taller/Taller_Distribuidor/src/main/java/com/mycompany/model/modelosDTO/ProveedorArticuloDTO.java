/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.model.modelosDTO;

import com.mycompany.model.interfaceModel.ItemPedido;
import com.mycompany.model.modelos.*;

/**
 *
 * @author seanb
 */
public class ProveedorArticuloDTO implements ItemPedido{
    private int i_stock_minimo;
    private int i_stock;
    private String k_id_articulo;
    private String k_id_proveedor;
    private ProveedorDTO proveedor;
    
    public ProveedorArticuloDTO() {
    }

    public ProveedorArticuloDTO(int i_stock_minimo, int i_stock, String k_id_articulo, String k_id_proveedor, ProveedorDTO proveedor) {
        this.i_stock_minimo = i_stock_minimo;
        this.i_stock = i_stock;
        this.k_id_articulo = k_id_articulo;
        this.k_id_proveedor = k_id_proveedor;
        this.proveedor = proveedor;
    }

    @Override
    public int getI_stock_minimo() {
        return i_stock_minimo;
    }

    public void setI_stock_minimo(int i_stock_minimo) {
        this.i_stock_minimo = i_stock_minimo;
    }

    @Override
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

    public ProveedorDTO getProveedor() {
        return proveedor;
    }

    public void setProveedor(ProveedorDTO proveedor) {
        this.proveedor = proveedor;
    }

    @Override
    public double getV_precio() {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
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
    
    
}
