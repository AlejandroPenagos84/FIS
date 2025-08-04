/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.model.modelos;

/**
 *
 * @author seanb
 */
public class PedidoArticulo {
    private int i_cantidad_ordenada;
    private int i_cantidad_pendiente;
    private String k_id_articulo; // FK a Articulo
    private String k_id_pedido;

    public PedidoArticulo() {
    }

    public PedidoArticulo(int i_cantidad_ordenada, int i_cantidad_pendiente, String k_id_articulo, String k_id_pedido) {
        this.i_cantidad_ordenada = i_cantidad_ordenada;
        this.i_cantidad_pendiente = i_cantidad_pendiente;
        this.k_id_articulo = k_id_articulo;
        this.k_id_pedido = k_id_pedido;
    }

    public int getI_cantidad_ordenada() {
        return i_cantidad_ordenada;
    }

    public void setI_cantidad_ordenada(int i_cantidad_ordenada) {
        this.i_cantidad_ordenada = i_cantidad_ordenada;
    }

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
    
    
    
}
