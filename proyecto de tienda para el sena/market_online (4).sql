-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-09-2024 a las 04:19:16
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `market_online`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito_de_compras`
--

CREATE TABLE `carrito_de_compras` (
  `id_carrito` int(11) NOT NULL,
  `usuario_id_usuario` int(11) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `nombre_categoria` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nombre_categoria`) VALUES
(1, 'Frutas y verduras'),
(2, 'Productos de aseo'),
(3, 'Granos'),
(4, 'Licores'),
(5, 'Snacks'),
(6, 'Panaderia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto`
--

CREATE TABLE `contacto` (
  `id_contacto` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mensaje` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contacto`
--

INSERT INTO `contacto` (`id_contacto`, `nombre`, `apellido`, `email`, `mensaje`) VALUES
(1, 'edwin', 'restrepo', 'restrepoedwin172819@gmail.com', 'hola'),
(2, 'edwin', 'restrepo', 'restrepoedwin172819@gmail.com', 'dos'),
(3, 'edwin', 'restrepo', 'restrepoedwin172819@gmail.com', ',bbhjbjhvjvh'),
(4, 'edwin', 'restrepo', 'restrepoedwin172819@gmail.com', 'hola soy edwin y estoy probando mi pagina '),
(5, 'edwin', 'restrepo', 'ar@gmail.com', 'hola');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `devolucion_cambio`
--

CREATE TABLE `devolucion_cambio` (
  `id_devolucion` int(11) NOT NULL,
  `orden_id_orden` int(11) DEFAULT NULL,
  `producto_id_producto` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `fecha_devolucion` timestamp NOT NULL DEFAULT current_timestamp(),
  `motivo` text DEFAULT NULL,
  `estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `envio`
--

CREATE TABLE `envio` (
  `id_envio` int(11) NOT NULL,
  `orden_id_orden` int(11) DEFAULT NULL,
  `direccion_envio` varchar(255) NOT NULL,
  `fecha_envio` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `estado_envio` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `id_factura` int(11) NOT NULL,
  `orden_id_orden` int(11) DEFAULT NULL,
  `metodo_pago_id_metodo` int(11) DEFAULT NULL,
  `fecha_factura` timestamp NOT NULL DEFAULT current_timestamp(),
  `monto_total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inicio_sesion`
--

CREATE TABLE `inicio_sesion` (
  `id_sesion` int(11) NOT NULL,
  `usuario_id_usuario` int(11) DEFAULT NULL,
  `password` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodo_de_pago`
--

CREATE TABLE `metodo_de_pago` (
  `id_metodo` int(11) NOT NULL,
  `nombre_metodo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden_de_compra`
--

CREATE TABLE `orden_de_compra` (
  `id_orden` int(11) NOT NULL,
  `carrito_id_carrito` int(11) DEFAULT NULL,
  `total` decimal(10,2) NOT NULL,
  `fecha_orden` timestamp NOT NULL DEFAULT current_timestamp(),
  `estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock_producto` int(11) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `categoria_id_categoria` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `nombre`, `descripcion`, `precio`, `stock_producto`, `imagen`, `categoria_id_categoria`) VALUES
(3, 'Mango', 'Tomy', 3000.00, 200, 'https://exoticfruitbox.com/wp-content/uploads/2015/10/mango.jpg', 1),
(4, 'Guayaba', 'kilo aproxi', 4000.00, 100, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2j4inmpQuzRafBcCZ34NzzOae_dKyUSQO9g&s', 1),
(5, 'Jabón', 'Protex', 4000.00, 30, 'https://www.protex-soap.com/content/dam/cp-sites/personal-care/protex-relaunch/latam/products/jabon-en-barra-protex-probiotico-y-avena-110g.jpg', 2),
(6, 'Arroz', '500gr', 2200.00, 300, 'https://mercadomadrid.com.co/8931-thickbox_default/arroz-sonora-x-2500kl.jpg', NULL),
(7, 'Garbanzo', '500gr', 3000.00, 50, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKCYXg7c_9BSKpVs1xBqa680v0KI2KezF8fA&s', 3),
(8, 'Vino', '15 años', 50000.00, 300, 'https://cigarreriareal.com/wp-content/uploads/2020/05/0010.jpg', 4),
(9, 'Ron', 'Ron viejo de caldas, 5 años 750 ml', 60000.00, 300, 'https://drinkcentral.co/wp-content/uploads/2023/06/RON-VIEJO-DE-CALDAS-TRADICIONAL-GARRAFA-1750ml.webp', 4),
(10, 'arroz', 'Arroz blanco Colanta x 500 gr', 2200.00, 300, 'https://colanta.vtexassets.com/arquivos/ids/157503/8212-1.png?v=638180372597300000', 3),
(11, 'Cerveza ', 'Cerveza águila light 330 Ml', 3000.00, 2000, 'https://static.wixstatic.com/media/ae02d4_2d52553b51674ef2b89b9196b62bf7d3~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg', 4),
(12, 'whisky', 'Whisky Jack Daniels Botella 750 ML - JR Licores Junior\r\nMarca: Jack Daniel\'s\r\n', 90000.00, 400, 'https://licoresjunior.com/wp-content/uploads/2023/12/Mesa-de-trabajo-1-copia-11-3-600x600.jpg', 4),
(13, 'Piña', '1 kl aprox', 4000.00, 300, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe7looVC_9fWTCfWNkiEWjQQ1oY3Kqc1sIKw&s', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_has_carritodecompras`
--

CREATE TABLE `producto_has_carritodecompras` (
  `id_producto` int(11) NOT NULL,
  `id_carrito` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_usuario`
--

CREATE TABLE `registro_usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellidos` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` varchar(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `Direccion` varchar(255) NOT NULL,
  `Foto` varchar(255) NOT NULL,
  `reset_token` varchar(255) NOT NULL,
  `reset_token_expiry` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registro_usuario`
--

INSERT INTO `registro_usuario` (`id_usuario`, `nombre`, `apellidos`, `email`, `telefono`, `password`, `Direccion`, `Foto`, `reset_token`, `reset_token_expiry`) VALUES
(19, 'jesus e', 'Restrepo', 'ar@gmail.com', '3001055840', '2222', 'Medellin', 'http://localhost/conexion.php/uploads/http://localhost/conexion.php/uploads/http://localhost/conexion.php/uploads/http://localhost/conexion.php/uploads/http://localhost/conexion.php/uploads/blob:http://localhost:5173/0c7d73d6-4c17-4b35-9eab-03684df0b8a8', '', ''),
(20, 'angie p', 'gomez', 'a@gmail.com', '11111111', '1111', 'angostura', '', '', ''),
(21, 'EDWIN DE JESUS', 'RESTREPO ATEHORTUA', 'restrepoedwin172819@gmail.com', '3001055840', '1728', 'CR 36 B # 81 - 59', '', '', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito_de_compras`
--
ALTER TABLE `carrito_de_compras`
  ADD PRIMARY KEY (`id_carrito`),
  ADD KEY `usuario_id_usuario` (`usuario_id_usuario`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD PRIMARY KEY (`id_contacto`);

--
-- Indices de la tabla `devolucion_cambio`
--
ALTER TABLE `devolucion_cambio`
  ADD PRIMARY KEY (`id_devolucion`),
  ADD KEY `orden_id_orden` (`orden_id_orden`),
  ADD KEY `producto_id_producto` (`producto_id_producto`);

--
-- Indices de la tabla `envio`
--
ALTER TABLE `envio`
  ADD PRIMARY KEY (`id_envio`),
  ADD KEY `orden_id_orden` (`orden_id_orden`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`id_factura`),
  ADD KEY `orden_id_orden` (`orden_id_orden`),
  ADD KEY `metodo_pago_id_metodo` (`metodo_pago_id_metodo`);

--
-- Indices de la tabla `inicio_sesion`
--
ALTER TABLE `inicio_sesion`
  ADD PRIMARY KEY (`id_sesion`),
  ADD KEY `usuario_id_usuario` (`usuario_id_usuario`);

--
-- Indices de la tabla `metodo_de_pago`
--
ALTER TABLE `metodo_de_pago`
  ADD PRIMARY KEY (`id_metodo`);

--
-- Indices de la tabla `orden_de_compra`
--
ALTER TABLE `orden_de_compra`
  ADD PRIMARY KEY (`id_orden`),
  ADD KEY `carrito_id_carrito` (`carrito_id_carrito`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `categoria_id_categoria` (`categoria_id_categoria`);

--
-- Indices de la tabla `producto_has_carritodecompras`
--
ALTER TABLE `producto_has_carritodecompras`
  ADD PRIMARY KEY (`id_producto`,`id_carrito`),
  ADD KEY `id_carrito` (`id_carrito`);

--
-- Indices de la tabla `registro_usuario`
--
ALTER TABLE `registro_usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito_de_compras`
--
ALTER TABLE `carrito_de_compras`
  MODIFY `id_carrito` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `contacto`
--
ALTER TABLE `contacto`
  MODIFY `id_contacto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `devolucion_cambio`
--
ALTER TABLE `devolucion_cambio`
  MODIFY `id_devolucion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `envio`
--
ALTER TABLE `envio`
  MODIFY `id_envio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `factura`
--
ALTER TABLE `factura`
  MODIFY `id_factura` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `inicio_sesion`
--
ALTER TABLE `inicio_sesion`
  MODIFY `id_sesion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `metodo_de_pago`
--
ALTER TABLE `metodo_de_pago`
  MODIFY `id_metodo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `orden_de_compra`
--
ALTER TABLE `orden_de_compra`
  MODIFY `id_orden` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `registro_usuario`
--
ALTER TABLE `registro_usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito_de_compras`
--
ALTER TABLE `carrito_de_compras`
  ADD CONSTRAINT `carrito_de_compras_ibfk_1` FOREIGN KEY (`usuario_id_usuario`) REFERENCES `registro_usuario` (`id_usuario`);

--
-- Filtros para la tabla `devolucion_cambio`
--
ALTER TABLE `devolucion_cambio`
  ADD CONSTRAINT `devolucion_cambio_ibfk_1` FOREIGN KEY (`orden_id_orden`) REFERENCES `orden_de_compra` (`id_orden`),
  ADD CONSTRAINT `devolucion_cambio_ibfk_2` FOREIGN KEY (`producto_id_producto`) REFERENCES `productos` (`id_producto`);

--
-- Filtros para la tabla `envio`
--
ALTER TABLE `envio`
  ADD CONSTRAINT `envio_ibfk_1` FOREIGN KEY (`orden_id_orden`) REFERENCES `orden_de_compra` (`id_orden`);

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`orden_id_orden`) REFERENCES `orden_de_compra` (`id_orden`),
  ADD CONSTRAINT `factura_ibfk_2` FOREIGN KEY (`metodo_pago_id_metodo`) REFERENCES `metodo_de_pago` (`id_metodo`);

--
-- Filtros para la tabla `inicio_sesion`
--
ALTER TABLE `inicio_sesion`
  ADD CONSTRAINT `inicio_sesion_ibfk_1` FOREIGN KEY (`usuario_id_usuario`) REFERENCES `registro_usuario` (`id_usuario`);

--
-- Filtros para la tabla `orden_de_compra`
--
ALTER TABLE `orden_de_compra`
  ADD CONSTRAINT `orden_de_compra_ibfk_1` FOREIGN KEY (`carrito_id_carrito`) REFERENCES `carrito_de_compras` (`id_carrito`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoria_id_categoria`) REFERENCES `categoria` (`id_categoria`);

--
-- Filtros para la tabla `producto_has_carritodecompras`
--
ALTER TABLE `producto_has_carritodecompras`
  ADD CONSTRAINT `producto_has_carritodecompras_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`),
  ADD CONSTRAINT `producto_has_carritodecompras_ibfk_2` FOREIGN KEY (`id_carrito`) REFERENCES `carrito_de_compras` (`id_carrito`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
