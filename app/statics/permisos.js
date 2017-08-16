window.permisos = {
	menus : [{"nombre":"Ajustes","id":"mnuAjustes", "icon":"fa-cogs"},
			 {"nombre":"Permisos","id":"mnuPermisos", "icon":"fa-universal-access"},
			 {"nombre":"Usuarios","id":"mnuUsuarios", "icon":"fa-users"},
			 {"nombre":"Productos","id":"mnuProductos", "icon":"fa-shopping-bag"},
			 {"nombre":"Rutas","id":"mnuRutas", "icon":"fa-street-view"},
			 {"nombre":"Categorias","id":"mnuCategorias", "icon":"fa-folder-open"},
			 {"nombre":"Pedidos","id":"mnuPedidos", "icon":"fa-shopping-cart"},
			 {"nombre":"Facturacion","id":"mnuFacturacion", "icon":"fa-credit-card"},
			 {"nombre":"Arqueos","id":"mnuArqueos", "icon":"fa-calculator"},
			 {"nombre":"Apps","id":"mnuApps", "icon":"fa-android"},
			 {"nombre":"Empresa","id":"mnuEmpresas", "icon":"fa-building-o"}
				],

	forms  : [			{"parent":"mnuAjustes","nombre":"Ivas", "id":"frmIvas"},
						{"parent":"mnuAjustes","nombre":"Formas de Pago", "id":"frmFormaPagos"},
						{"parent":"mnuAjustes","nombre":"Consecutivos", "id":"frmConsecutivos"},
						{"parent":"mnuAjustes","nombre":"Casas Comerciales", "id":"frmCasaComercial"},
						{"parent":"mnuUsuarios","nombre":"Usuarios", "id":"frmUsuarios"},
						{"parent":"mnuUsuarios","nombre":"Empleados", "id":"frmEmpleados"},
						{"parent":"mnuUsuarios","nombre":"Vendedores", "id":"frmVendedores"},
						{"parent":"mnuFacturacion","nombre":"Nueva Facturacion", "id":"frmNuevaFacturacion"},
						{"parent":"mnuFacturacion","nombre":"Buscar Facturacion", "id":"frmBuscarFacturacion"},
						{"parent":"mnuFacturacion","nombre":"Devoluciones", "id":"frmDevoluciones"}
					]
}