package com.mycompany.view.director_de_ventas.ventanaPrincipal;

import com.mycompany.model.modelosDTO.PedidoDTO;
import com.mycompany.model.modelosDTO.PedidoArticuloDTO;
import com.mycompany.model.modelosDTO.SuplementoPedidoArticulo;

import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.sql.SQLException;

class PanelDetallePedido extends JPanel {
    private VentanaPrincipalDirectorVentas VentPrin;
    
    private JPanel panelInfoPedido = new JPanel();
    private JPanel panelArticulos = new JPanel();

    public PanelDetallePedido(VentanaPrincipalDirectorVentas VentPrin) {
        this.VentPrin = VentPrin;
        
        setLayout(new BorderLayout());

        panelInfoPedido.setLayout(new BoxLayout(panelInfoPedido, BoxLayout.Y_AXIS));
        panelInfoPedido.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
        panelInfoPedido.setBackground(new Color(245, 245, 245));

        panelArticulos.setLayout(new BoxLayout(panelArticulos, BoxLayout.Y_AXIS));
        JScrollPane scrollPane = new JScrollPane(panelArticulos);

        add(panelInfoPedido, BorderLayout.NORTH);  // Fijo arriba
        add(scrollPane, BorderLayout.CENTER);      // Scroll para artículos
    }

    public void mostrarDetalle(PedidoDTO pedido) {
        panelInfoPedido.removeAll();
        panelArticulos.removeAll();

        // === Info Pedido ===
        JLabel lblId = new JLabel("🆔 ID Pedido: " + pedido.getK_id_pedido());
        JLabel lblCliente = new JLabel("👤 Cliente: " + pedido.getCliente().getN_nombre_cliente());
        JLabel lblDireccion = new JLabel("📍 Dirección: " +
                pedido.getCliente().getDir_calle() + " #" +
                pedido.getCliente().getDir_carrera() + "-" +
                pedido.getCliente().getDir_numero());
        JLabel lblFecha = new JLabel("📅 Fecha: " + pedido.getF_fecha_pedido());

        JProgressBar barraTotal = new JProgressBar(0, 100);
        int porcentaje = (int) pedido.getPorcentaje_entregado();
        barraTotal.setValue(porcentaje);
        barraTotal.setString("Entregado: " + porcentaje + "%");
        barraTotal.setStringPainted(true);
        barraTotal.setMaximumSize(new Dimension(200, 20));
        if (porcentaje < 50) barraTotal.setForeground(Color.RED);
        else if (porcentaje < 75) barraTotal.setForeground(Color.ORANGE);
        else barraTotal.setForeground(new Color(0, 153, 0));

        panelInfoPedido.add(lblId);
        panelInfoPedido.add(lblCliente);
        panelInfoPedido.add(lblDireccion);
        panelInfoPedido.add(lblFecha);
        panelInfoPedido.add(Box.createVerticalStrut(5));
        panelInfoPedido.add(barraTotal);

        // === Artículos ===
        for (PedidoArticuloDTO pa : pedido.getPedArticulos()) {
            PedidoArticuloDTO articuloActual = pa;

            JPanel panelArt = new JPanel(new BorderLayout());
            panelArt.setBorder(BorderFactory.createTitledBorder("🧾 " + pa.getArticulo().getN_nombre_articulo()));
            panelArt.setBackground(Color.WHITE);
            panelArt.setPreferredSize(new Dimension(500, 100));
            panelArt.setMaximumSize(new Dimension(Integer.MAX_VALUE, 100));

            JPanel infoGrid = new JPanel(new GridLayout(2, 2, 10, 5));
            infoGrid.setOpaque(false);
            infoGrid.add(new JLabel("🔢 Código: " + pa.getK_id_articulo()));
            infoGrid.add(new JLabel("📦 Cantidad ordenada: " + pa.getI_cantidad_ordenada()));
            infoGrid.add(new JLabel("📭 Pendiente por entregar: " + pa.getI_cantidad_pendiente()));

            int ordenada = pa.getI_cantidad_ordenada();
            int pendiente = pa.getI_cantidad_pendiente();
            int entregada = ordenada - pendiente;
            int porcArt = ordenada > 0 ? (int) ((entregada * 100.0) / ordenada) : 0;

            JProgressBar barra = new JProgressBar(0, 100);
            barra.setValue(porcArt);
            barra.setString(porcArt + "%");
            barra.setStringPainted(true);
            if (porcArt < 50) barra.setForeground(Color.RED);
            else if (porcArt < 75) barra.setForeground(Color.ORANGE);
            else barra.setForeground(new Color(0, 153, 0));

            panelArt.add(infoGrid, BorderLayout.CENTER);
            panelArt.add(barra, BorderLayout.SOUTH);

            // Listener para mostrar ventana emergente con proveedores
            panelArt.addMouseListener(new MouseAdapter() {
                @Override
                public void mouseClicked(MouseEvent e) {
                    SwingUtilities.invokeLater(() -> {
                        VentanaProveedoresArticulo ventana = new VentanaProveedoresArticulo(PanelDetallePedido.this, articuloActual);
                        ventana.setLocationRelativeTo(PanelDetallePedido.this);
                        ventana.setVisible(true);
                    });
                }
            });

            panelArticulos.add(panelArt);
            panelArticulos.add(Box.createVerticalStrut(10));
        }

        revalidate();
        repaint();
    }
    
    public void actualizar_pedido_VentPrin_DetallPed (SuplementoPedidoArticulo suplementoPedidoArticulo) throws SQLException{
        this.VentPrin.actualizar_pedido_VentPrin(suplementoPedidoArticulo);
    }
}
