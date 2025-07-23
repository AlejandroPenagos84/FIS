package org.example.Modelo;


import java.util.List;

public class Cliente {
    private String codigo;
    private String nombre;
    private List<String> direccionesEnvio;
    private double saldo;
    private double limiteCredito;
    private double porcentajeDescuento;

    // Métodos
    public void realizarPedido() {
        // Lógica para realizar pedido
    }

    public void revisarEstadoPedido() {
        // Lógica para revisar estado del pedido
    }

    // Getters y S etters
    public String getCodigo() { return codigo; }
    public void setCodigo(String codigo) { this.codigo = codigo; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public List<String> getDireccionesEnvio() { return direccionesEnvio; }
    public void setDireccionesEnvio(List<String> direccionesEnvio) { this.direccionesEnvio = direccionesEnvio; }

    public double getSaldo() { return saldo; }
    public void setSaldo(double saldo) { this.saldo = saldo; }

    public double getLimiteCredito() { return limiteCredito; }
    public void setLimiteCredito(double limiteCredito) { this.limiteCredito = limiteCredito; }

    public double getPorcentajeDescuento() { return porcentajeDescuento; }
    public void setPorcentajeDescuento(double porcentajeDescuento) { this.porcentajeDescuento = porcentajeDescuento; }
}