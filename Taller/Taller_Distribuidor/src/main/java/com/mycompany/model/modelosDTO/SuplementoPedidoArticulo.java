/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.model.modelosDTO;

import com.mycompany.model.interfaceModel.suplementacion;
import java.util.List;

public class SuplementoPedidoArticulo implements suplementacion{
    private PedidoArticuloDTO pedidoArticulo;
    private List<SuplementoProveedorArticulo> suplementoProveedorArticulo;

    public SuplementoPedidoArticulo(PedidoArticuloDTO pedidoArticulo, List<SuplementoProveedorArticulo> suplementoProveedorArticulo) {
        this.pedidoArticulo = pedidoArticulo;
        this.suplementoProveedorArticulo = suplementoProveedorArticulo;
    }

    public PedidoArticuloDTO getPedidoArticulo() {
        return pedidoArticulo;
    }

    public void setPedidoArticulo(PedidoArticuloDTO pedidoArticulo) {
        this.pedidoArticulo = pedidoArticulo;
    }

    public List<SuplementoProveedorArticulo> getSuplementoProveedorArticulo() {
        return suplementoProveedorArticulo;
    }

    public void setSuplementoProveedorArticulo(List<SuplementoProveedorArticulo> suplementoProveedorArticulo) {
        this.suplementoProveedorArticulo = suplementoProveedorArticulo;
    }

    @Override
    public int getCantidadASuplementar() {
        return suplementoProveedorArticulo.stream().mapToInt(suplementacion::getCantidadASuplementar).sum();
    }

    

    
}

