/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.model.modelosDTO;

import com.mycompany.model.interfaceModel.ItemPedido;

/**
 *
 * @author seanb
 */
public class PedidoArticuloDTO implements ItemPedido{
    private int i_cantidad_ordenada;
    private int i_cantidad_pendiente;
    private String k_id_articulo;
    private String k_id_pedido;
    private ArticuloDTO articulo;

    public PedidoArticuloDTO() {
    }

    public PedidoArticuloDTO(int i_cantidad_ordenada, int i_cantidad_pendiente, String k_id_articulo, String k_id_pedido, ArticuloDTO articulo) {
        this.i_cantidad_ordenada = i_cantidad_ordenada;
        this.i_cantidad_pendiente = i_cantidad_pendiente;
        this.k_id_articulo = k_id_articulo;
        this.k_id_pedido = k_id_pedido;
        this.articulo = articulo;
    }

    @Override
    public int getI_cantidad_ordenada() {
        return i_cantidad_ordenada;
    }

    public void setI_cantidad_ordenada(int i_cantidad_ordenada) {
        this.i_cantidad_ordenada = i_cantidad_ordenada;
    }

    @Override
    public int getI_cantidad_pendiente() {
        return i_cantidad_pendiente;
    }

    public void setI_cantidad_pendiente(int i_cantidad_pendiente) {
        this.i_cantidad_pendiente = i_cantidad_pendiente;
    }

    public String getK_id_articulo() {
        return k_id_articulo;
    }

    public void setK_id_articulo(String k_id_articulo) {
        this.k_id_articulo = k_id_articulo;
    }

    public String getK_id_pedido() {
        return k_id_pedido;
    }

    public void setK_id_pedido(String k_id_pedido) {
        this.k_id_pedido = k_id_pedido;
    }

    public ArticuloDTO getArticulo() {
        return articulo;
    }

    public void setArticulo(ArticuloDTO articulo) {
        this.articulo = articulo;
    }

    @Override
    public double getV_precio() {
        return this.articulo.getV_precio() * this.i_cantidad_ordenada;
    }

    @Override
    public void detalle() {
        this.articulo.detalle();
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
