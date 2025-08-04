
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.model.modelos;

import com.mycompany.model.interfaceModel.ItemPedido;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 *
 * @author seanb
 */
public class Pedido implements ItemPedido{
    private String k_id_pedido;
    private Date f_fecha_pedido;
    private String k_cod_cliente;
    private List<Articulo> articulos;

    public Pedido() {
    }

    public Pedido(String k_id_pedido, Date f_fecha_pedido, String k_cod_cliente) {
        this.k_id_pedido = k_id_pedido;
        this.f_fecha_pedido = f_fecha_pedido;
        this.k_cod_cliente = k_cod_cliente;
        this.articulos = new ArrayList<>();
    }

    public String getK_id_pedido() {
        return k_id_pedido;
    }

    public void setK_id_pedido(String k_id_pedido) {
        this.k_id_pedido = k_id_pedido;
    }

    public Date getF_fecha_pedido() {
        return f_fecha_pedido;
    }

    public void setF_fecha_pedido(Date f_fecha_pedido) {
        this.f_fecha_pedido = f_fecha_pedido;
    }

    public String getK_cod_cliente() {
        return k_cod_cliente;
    }

    public void setK_cod_cliente(String k_cod_cliente) {
        this.k_cod_cliente = k_cod_cliente;
    }

    @Override
    public double getV_precio() {
        return articulos.stream().mapToDouble(ItemPedido::getV_precio).sum();
    }

    @Override
    public void detalle() {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
    public void agregarItem(ItemPedido item) {
        articulos.add((Articulo) item);
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
