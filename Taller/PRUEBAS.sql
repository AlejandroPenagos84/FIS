-- -------------------------------
-- DATOS DE PRUEBA
-- -------------------------------

-- Artículos
INSERT INTO articulo (k_id_articulo, n_nombre_articulo, t_descripcion, v_precio) VALUES
('A001', 'Mouse Gamer', 'Mouse RGB 6400 DPI', 75000),
('A002', 'Teclado Mecánico', 'Switch Red retroiluminado', 180000),
('A003', 'Monitor 24"', '1080p IPS', 550000),
('A004', 'Audífonos Inalámbricos', 'Bluetooth 5.0 con cancelación de ruido', 220000),
('A005', 'Cámara Web Full HD', '1080p con micrófono integrado', 130000),
('A006', 'Silla Ergonómica', 'Diseño gamer con soporte lumbar', 690000),
('A007', 'Alfombrilla RGB', 'Antideslizante con retroiluminación LED', 60000),
('A008', 'Disco SSD 1TB', 'Velocidad de lectura de hasta 3500 MB/s', 410000),
('A009', 'Tarjeta Gráfica RTX 4060', '8GB GDDR6 – NVIDIA', 1650000),
('A010', 'Procesador Intel i7 13ª Gen', '8 núcleos, 16 hilos, hasta 5.0GHz', 1450000),
('A011', 'RAM 16GB DDR5', '5600MHz CL36 – Corsair Vengeance', 340000),
('A012', 'Fuente 750W 80+ Gold', 'Modular – certificada para gaming', 290000),
('A013', 'Placa Base ATX Z790', 'Soporta DDR5, PCIe 5.0, Intel 13ª Gen', 720000),
('A014', 'Disco Duro 2TB', 'HDD 7200rpm – Western Digital', 270000),
('A015', 'Refrigeración Líquida', '240mm RGB – Cooler Master', 480000),
('A016', 'Gabinete ATX Gaming', 'Con ventiladores RGB y ventana lateral', 310000),
('A017', 'Adaptador Wi-Fi USB', 'Dual Band 1200Mbps – TP-Link', 85000),
('A018', 'Licencia Windows 11 Pro', 'Clave digital original', 460000),
('A019', 'Base para Laptop', 'Ajustable con ventiladores de enfriamiento', 95000),
('A020', 'Micrófono Profesional USB', 'Con condensador y brazo articulado', 250000);


-- Clientes
INSERT INTO cliente VALUES
('C001', 'Juan Pérez', 'Calle', '10', '25', 200000, 500000, 0.1, 'juanp', '1234'),
('C002', 'Ana Gómez', 'Cra', '8', '42', 50000, 300000, 0.05, 'anag', 'abcd'),
('C003', 'Carlos Ruiz', 'Calle', '15', '10', 0, 100000, NULL, 'carlr', 'xyz');

-- Pedidos
INSERT INTO pedido VALUES
('P001', '2025-07-15', 'C001'),
('P002', '2025-07-20', 'C002'),
('P003', '2025-07-30', 'C001');

-- Cliente - Pedido
INSERT INTO cliente_pedido VALUES
('C001', 'P001'),
('C002', 'P002'),
('C001', 'P003');

-- Pedido - Artículo
INSERT INTO pedido_articulo VALUES
(2, 0, 'A001', 'P001'),
(1, 1, 'A003', 'P001'),
(1, 0, 'A002', 'P002'),
(3, 0, 'A003', 'P003');

-- Proveedores
INSERT INTO proveedor VALUES
('PR01', 'TechStore SAS', 'techuser', 'secure1'),
('PR02', 'Global Supplies', 'globals', 'secure2');

-- Proveedor - Artículo
INSERT INTO proveedor_articulo VALUES
(10, 50, 'A001', 'PR01'),
(5, 20, 'A002', 'PR01'),
(2, 15, 'A003', 'PR02');

-- Pedido P004 (completado)
INSERT INTO pedido VALUES ('P004', '2025-08-01', 'C001');
INSERT INTO cliente_pedido VALUES ('C001', 'P004');
INSERT INTO pedido_articulo VALUES
(1, 0, 'A001', 'P004'),
(2, 0, 'A002', 'P004'),
(3, 0, 'A003', 'P004'),
(4, 0, 'A001', 'P004'),
(1, 0, 'A002', 'P004');

-- Pedido P005 (pendiente)
INSERT INTO pedido VALUES ('P005', '2025-08-01', 'C002');
INSERT INTO cliente_pedido VALUES ('C002', 'P005');
INSERT INTO pedido_articulo VALUES
(1, 1, 'A001', 'P005'),
(2, 0, 'A002', 'P005'),
(1, 1, 'A003', 'P005'),
(2, 0, 'A001', 'P005'),
(3, 1, 'A002', 'P005');

-- Nuevos Proveedores
INSERT INTO proveedor VALUES
('PR03', 'InnovaTech Ltda', 'innova', 'secure3'),
('PR04', 'ElectroWorld', 'electro', 'secure4'),
('PR05', 'Distribuciones Andes', 'andesd', 'secure5'),
('PR06', 'MegaComponentes', 'megac', 'secure6'),
('PR07', 'TecnoLine', 'tecnoline', 'secure7');

-- PR03: InnovaTech Ltda
INSERT INTO proveedor_articulo VALUES
(4, 25, 'A004', 'PR03'),
(6, 40, 'A005', 'PR03'),
(2, 20, 'A006', 'PR03');

-- PR04: ElectroWorld
INSERT INTO proveedor_articulo VALUES
(10, 60, 'A007', 'PR04'),
(5, 30, 'A008', 'PR04'),
(3, 10, 'A009', 'PR04');

-- PR05: Distribuciones Andes
INSERT INTO proveedor_articulo VALUES
(4, 15, 'A010', 'PR05'),
(8, 25, 'A011', 'PR05'),
(6, 20, 'A012', 'PR05');

-- PR06: MegaComponentes
INSERT INTO proveedor_articulo VALUES
(3, 18, 'A013', 'PR06'),
(7, 28, 'A014', 'PR06'),
(4, 12, 'A015', 'PR06');

-- PR07: TecnoLine
INSERT INTO proveedor_articulo VALUES
(5, 30, 'A016', 'PR07'),
(10, 50, 'A017', 'PR07'),
(2, 10, 'A018', 'PR07'),
(6, 20, 'A019', 'PR07'),
(3, 15, 'A020', 'PR07');



-- -------------------------------
-- VISTAS
-- -------------------------------

-- Vista 1: Estado por línea de pedido-artículo
CREATE OR REPLACE VIEW vista_pedido_articulo_estado AS
SELECT 
    pa.*,
    ROUND(
        100.0 * (pa.i_cantidad_ordenada - pa.i_cantidad_pendiente) / NULLIF(pa.i_cantidad_ordenada, 0),
        2
    ) AS porcentaje_entregado
FROM pedido_articulo pa;


-- Vista 2: Estado general del pedido
CREATE OR REPLACE VIEW vista_estado_pedido AS
SELECT 
    p.k_id_pedido,
    c.k_cod_cliente,
    p.f_fecha_pedido,
    ROUND(
        100.0 * SUM(pa.i_cantidad_ordenada - pa.i_cantidad_pendiente) / NULLIF(SUM(pa.i_cantidad_ordenada), 0),
        2
    ) AS porcentaje_entregado
FROM pedido p
JOIN cliente c ON c.k_cod_cliente = p.k_cod_cliente
JOIN pedido_articulo pa ON pa.k_id_pedido = p.k_id_pedido
GROUP BY p.k_id_pedido, c.k_cod_cliente, p.f_fecha_pedido;
