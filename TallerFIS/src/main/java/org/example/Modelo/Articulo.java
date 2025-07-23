package org.example.Modelo;

import java.util.List;
import java.util.Map;


public class Articulo {
    private String codigo;
    private String nombre;
    private String descripcion;
    private List<String> plantasManufactureras;
    private Map<String, Integer> cantidadEnExistenciaPorPlanta;
    private Map<String, Integer> stockMinimoPorPlanta;

    public String getCodigo() { return codigo; }
    public void setCodigo(String codigo) { this.codigo = codigo; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public List<String> getPlantasManufactureras() { return plantasManufactureras; }
    public void setPlantasManufactureras(List<String> plantasManufactureras) { this.plantasManufactureras = plantasManufactureras; }

    public Map<String, Integer> getCantidadEnExistenciaPorPlanta() { return cantidadEnExistenciaPorPlanta; }
    public void setCantidadEnExistenciaPorPlanta(Map<String, Integer> cantidadEnExistenciaPorPlanta) { this.cantidadEnExistenciaPorPlanta = cantidadEnExistenciaPorPlanta; }

    public Map<String, Integer> getStockMinimoPorPlanta() { return stockMinimoPorPlanta; }
    public void setStockMinimoPorPlanta(Map<String, Integer> stockMinimoPorPlanta) { this.stockMinimoPorPlanta = stockMinimoPorPlanta; }
}