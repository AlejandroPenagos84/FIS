/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.model.modelosDTO;

import com.mycompany.model.interfaceModel.suplementacion;

public class SuplementoProveedorArticulo implements suplementacion{
    private ProveedorArticuloDTO proveedorArticulo;
    private int cantidadASuplementar;

    public SuplementoProveedorArticulo(ProveedorArticuloDTO proveedorArticulo, int cantidadASuplementar) {
        this.proveedorArticulo = proveedorArticulo;
        this.cantidadASuplementar = cantidadASuplementar;
    }

    public ProveedorArticuloDTO getProveedorArticulo() {
        return proveedorArticulo;
    }

    public void setProveedorArticulo(ProveedorArticuloDTO proveedorArticulo) {
        this.proveedorArticulo = proveedorArticulo;
    }

    public int getCantidadASuplementar() {
        return cantidadASuplementar;
    }

    public void setCantidadASuplementar(int cantidadASuplementar) {
        this.cantidadASuplementar = cantidadASuplementar;
    }

    
}

