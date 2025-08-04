
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.model.modelosDTO;

import com.mycompany.model.modelosDTO.*;
import com.mycompany.model.interfaceModel.ItemPedido;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 *
 * @author seanb
 */
public class PedidoDTO implements ItemPedido{
    private String k_id_pedido;
    private Date f_fecha_pedido;
    private String k_cod_cliente;
    private double porcentaje_entregado;
    private boolean b_pagado;
    private List<PedidoArticuloDTO> pedArticulos;
    private ClienteDTO cliente;

    public PedidoDTO() {
    }

    public PedidoDTO(String k_id_pedido, Date f_fecha_pedido, String k_cod_cliente, double porcentaje_entregado, List<PedidoArticuloDTO> pedArticulos, ClienteDTO cliente) {
        this.k_id_pedido = k_id_pedido;
        this.f_fecha_pedido = f_fecha_pedido;
        this.k_cod_cliente = k_cod_cliente;
        this.porcentaje_entregado = porcentaje_entregado;
        this.pedArticulos = pedArticulos;
        this.cliente = cliente;
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

    public double getPorcentaje_entregado() {
        return porcentaje_entregado;
    }

    public void setPorcentaje_entregado(double porcentaje_entregado) {
        this.porcentaje_entregado = porcentaje_entregado;
    }

    public List<PedidoArticuloDTO> getPedArticulos() {
        return pedArticulos;
    }

    public void setPedArticulos(List<PedidoArticuloDTO> pedArticulos) {
        this.pedArticulos = pedArticulos;
    }

    public ClienteDTO getCliente() {
        return cliente;
    }

    public void setCliente(ClienteDTO cliente) {
        this.cliente = cliente;
    }

    public boolean isB_pagado() {
        return b_pagado;
    }

    public void setB_pagado(boolean b_pagado) {
        this.b_pagado = b_pagado;
    }

    @Override
    public double getV_precio() {
        return pedArticulos.stream().mapToDouble(ItemPedido::getV_precio).sum() 
                - (pedArticulos.stream().mapToDouble(ItemPedido::getV_precio).sum() 
                * this.cliente.getV_porcentaje_de_descuento());
    }

    @Override
    public void detalle() {
        System.out.println("+ Pedido: " + this.k_id_pedido);
        for (ItemPedido item : pedArticulos) {
            item.detalle();
        }
    }

    @Override
    public int getI_cantidad_ordenada() {
        return pedArticulos.stream().mapToInt(ItemPedido::getI_cantidad_ordenada).sum();
    }

    @Override
    public int getI_cantidad_pendiente() {
        return pedArticulos.stream().mapToInt(ItemPedido::getI_cantidad_pendiente).sum();
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
