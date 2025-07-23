package org.example.Modelo;

public class LineaPedido {
    private Articulo articulo;
    private int cantidadOrdenada;
    private int cantidadPendiente;

    // Constructor
    public LineaPedido(Articulo articulo, int cantidadOrdenada, int cantidadPendiente) {
        this.articulo = articulo;
        this.cantidadOrdenada = cantidadOrdenada;
        this.cantidadPendiente = cantidadPendiente;
    }



    // Getters y Setters
    public Articulo getArticulo() { return articulo; }
    public void setArticulo(Articulo articulo) { this.articulo = articulo; }

    public int getCantidadOrdenada() { return cantidadOrdenada; }
    public void setCantidadOrdenada(int cantidadOrdenada) { this.cantidadOrdenada = cantidadOrdenada; }

    public int getCantidadPendiente() { return cantidadPendiente; }
    public void setCantidadPendiente(int cantidadPendiente) { this.cantidadPendiente = cantidadPendiente; }
}