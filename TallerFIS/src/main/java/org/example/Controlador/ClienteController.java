package org.example.Controlador;

import org.example.VIsta.ClienteVerArticulos;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.List;

public class ClienteController implements ActionListener {
    String[] columnas = {"ID", "Nombre", "Cantidad", "Precio", "Acción"};
    Object[][] datos = {
            {"1", "Laptop", "5", "$1000", "Ver artículo"},
            {"2", "Mouse", "25", "$20", "Ver artículo"},
            {"3", "Teclado", "15", "$30", "Ver artículo"}
    };

    private ClienteVerArticulos clienteVerArticulos;

    public ClienteController(){
        this.clienteVerArticulos = new ClienteVerArticulos(this);
        this.agregarArticulos();
    }

    private void agregarArticulos(){
        for (Object[] articulo : datos) {
            String id = (String) articulo[0];
            String nombre = (String) articulo[1];
            String cantidad = (String) articulo[2];
            String precio = (String) articulo[3];

            clienteVerArticulos.agregarFila(id, nombre, cantidad, precio);
        }
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        System.out.println(e.getSource());
        String comando = e.getActionCommand();
        if (comando.startsWith("verArticulo:")) {
            int fila = Integer.parseInt(comando.split(":")[1]);
            System.out.println("Mostrando artículo de la fila " + fila);
                // Aquí puedes hacer lógica con los datos de esa fila
        }

        if(e.getSource() == this.clienteVerArticulos.enviarBoton){

            List<String> filas = this.clienteVerArticulos.obtenerFilasSeleccionadas();
            for(String i : filas){
                System.out.println(i);
            }
        }
    }
}
