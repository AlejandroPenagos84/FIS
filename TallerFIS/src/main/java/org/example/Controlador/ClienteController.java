package org.example.Controlador;

import org.example.Modelo.Articulo;
import org.example.Modelo.Cliente;
import org.example.Modelo.LineaPedido;
import org.example.Modelo.Pedido;
import org.example.VIsta.ClienteVerArticulos;
import org.example.VIsta.VerPedidos;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.time.LocalDate;
import java.util.*;

public class ClienteController implements ActionListener {
    private List<Articulo> articulos;
    private List<Cliente> clientes;
    private List<Pedido> pedidos;
    private VerPedidos verPedidos;
    private ClienteVerArticulos clienteVerArticulos;

    public ClienteController(){
        this.clienteVerArticulos = new ClienteVerArticulos(this);
        initDatos();
        this.agregarArticulos();
    }

    private void initDatos() {
        // --------------------
        // ARTÍCULOS
        // --------------------
        Articulo articulo1 = new Articulo();
        articulo1.setCodigo("A001");
        articulo1.setNombre("Laptop X15");
        articulo1.setDescripcion("Laptop de alto rendimiento para desarrolladores.");
        articulo1.setPlantasManufactureras(Arrays.asList("Planta Medellín", "Planta Bogotá"));
        articulo1.setCantidadEnExistenciaPorPlanta(new HashMap<>(Map.of(
                "Planta Medellín", 20,
                "Planta Bogotá", 15
        )));
        articulo1.setStockMinimoPorPlanta(new HashMap<>(Map.of(
                "Planta Medellín", 10,
                "Planta Bogotá", 5
        )));

        Articulo articulo2 = new Articulo();
        articulo2.setCodigo("B002");
        articulo2.setNombre("Mouse Ergonómico");
        articulo2.setDescripcion("Mouse inalámbrico con diseño ergonómico.");
        articulo2.setPlantasManufactureras(Collections.singletonList("Planta Cali"));
        articulo2.setCantidadEnExistenciaPorPlanta(new HashMap<>(Map.of(
                "Planta Cali", 50
        )));
        articulo2.setStockMinimoPorPlanta(new HashMap<>(Map.of(
                "Planta Cali", 20
        )));

        Articulo articulo3 = new Articulo();
        articulo3.setCodigo("C003");
        articulo3.setNombre("Monitor 27\"");
        articulo3.setDescripcion("Monitor 27 pulgadas Full HD.");
        articulo3.setPlantasManufactureras(Arrays.asList("Planta Bogotá", "Planta Barranquilla"));
        articulo3.setCantidadEnExistenciaPorPlanta(new HashMap<>(Map.of(
                "Planta Bogotá", 10,
                "Planta Barranquilla", 5
        )));
        articulo3.setStockMinimoPorPlanta(new HashMap<>(Map.of(
                "Planta Bogotá", 8,
                "Planta Barranquilla", 4
        )));

        // --------------------
        // CLIENTES
        // --------------------
        Cliente cliente1 = new Cliente(
                "C001",
                "Juan Pérez",
                Arrays.asList("Sucursal Bogotá Norte", "Sucursal Bogotá Sur"),
                500000,
                1000000,
                0.05
        );

        Cliente cliente2 = new Cliente(
                "C002",
                "Ana Gómez",
                List.of("Sucursal Medellín Centro"),
                300000,
                800000,
                0.10
        );

        Cliente cliente3 = new Cliente(
                "C003",
                "Carlos Ruiz",
                Arrays.asList("Sucursal Cali Sur", "Sucursal Cali Norte"),
                100000,
                500000,
                0.00
        );
        // --------------------
        // LÍNEAS DE PEDIDO
        // --------------------
        LineaPedido lp1 = new LineaPedido(articulo1, 2, 0);
        LineaPedido lp2 = new LineaPedido(articulo2, 5, 1);
        LineaPedido lp3 = new LineaPedido(articulo3, 1, 0);
        LineaPedido lp4 = new LineaPedido(articulo1, 3, 0);
        LineaPedido lp5 = new LineaPedido(articulo2, 2, 0);
        LineaPedido lp6 = new LineaPedido(articulo3, 3, 2);

        // --------------------
        // PEDIDOS
        // --------------------
        Pedido pedido1 = new Pedido();
        pedido1.setCodigo("P001");
        pedido1.setCliente(cliente1);
        pedido1.setDireccionEnvio("Sucursal Bogotá Norte");
        pedido1.setFechaPedido(LocalDate.of(2025, 7, 22));
        pedido1.setLineasPedido(Arrays.asList(lp1, lp2));

        Pedido pedido2 = new Pedido();
        pedido2.setCodigo("P002");
        pedido2.setCliente(cliente2);
        pedido2.setDireccionEnvio("Sucursal Medellín Centro");
        pedido2.setFechaPedido(LocalDate.of(2025, 7, 20));
        pedido2.setLineasPedido(Arrays.asList(lp3, lp4));

        Pedido pedido3 = new Pedido();
        pedido3.setCodigo("P003");
        pedido3.setCliente(cliente3);
        pedido3.setDireccionEnvio("Sucursal Cali Sur");
        pedido3.setFechaPedido(LocalDate.of(2025, 7, 18));
        pedido3.setLineasPedido(Arrays.asList(lp5, lp6));

        // Guardar listas
        articulos = Arrays.asList(articulo1, articulo2, articulo3);
        clientes = Arrays.asList(cliente1, cliente2, cliente3);
        pedidos = Arrays.asList(pedido1, pedido2, pedido3);

        this.agregarArticulos();
    }

    // Getters para acceder desde otras clases si quieres
    public List<Articulo> getArticulos() {
        return articulos;
    }

    public List<Cliente> getClientes() {
        return clientes;
    }

    public List<Pedido> getPedidos() {
        return pedidos;
    }

    private void agregarArticulos(){
        List<Object[]> articulosObj = new ArrayList<>();

        for(Articulo articulo : articulos){
            Object[] object = new Object[4];
            object[0] = articulo.getCodigo();
            object[1] = articulo.getNombre();
            object[2] = articulo.getDescripcion();
            articulosObj.add(object);
        }

        for (Object[] articuloObj : articulosObj) {
            this.clienteVerArticulos.agregarFila(
                    (String) articuloObj[0],
                    (String) articuloObj[1],
                    (String) articuloObj[2],
                    String.valueOf(55)
            );
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
