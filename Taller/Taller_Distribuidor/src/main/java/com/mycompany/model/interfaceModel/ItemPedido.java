/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.mycompany.model.interfaceModel;

/**
 *
 * @author seanb
 */
public interface ItemPedido {
    double getV_precio();
    void detalle();
    int getI_cantidad_ordenada();
    int getI_cantidad_pendiente();
    int getI_stock_minimo();
    int getI_stock();
}
