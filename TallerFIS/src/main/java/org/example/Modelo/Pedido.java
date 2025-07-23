package org.example.Modelo;

import java.time.LocalDate;
import java.util.List;

public class Pedido {
    private String codigo;
    private Cliente cliente;
    private String direccionEnvio;
    private LocalDate fechaPedido;
    private List<LineaPedido> lineasPedido;

    // Getters y Setters

    public String getCodigo() {return codigo;}
    public void setCodigo(String codigo) {this.codigo = codigo;}

    public Cliente getCliente() { return cliente; }
    public void setCliente(Cliente cliente) { this.cliente = cliente; }

    public String getDireccionEnvio() { return direccionEnvio; }
    public void setDireccionEnvio(String direccionEnvio) { this.direccionEnvio = direccionEnvio; }

    public LocalDate getFechaPedido() { return fechaPedido; }
    public void setFechaPedido(LocalDate fechaPedido) { this.fechaPedido = fechaPedido; }

    public List<LineaPedido> getLineasPedido() { return lineasPedido; }
    public void setLineasPedido(List<LineaPedido> lineasPedido) { this.lineasPedido = lineasPedido; }
}