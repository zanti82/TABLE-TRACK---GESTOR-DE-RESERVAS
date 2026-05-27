Necesidades:

GET (Lectura): Una vista principal ("/panel") que recupere y muestre todas las reservas
registradas en el sistema. Deben mostrarse en un listado o cuadrícula clara.
● POST (Creación): Un formulario para registrar una nueva reserva. Debe validar que ni el
nombre del cliente ni la cantidad de personas se envíen vacíos.
● PUT / PATCH (Actualización): Mecanismo para editar la información de una reserva (ej: si
el cliente llama para cambiar la hora o la cantidad de personas) y un botón/opción rápida
para cambiar su estado a "Finalizada" cuando el cliente se retire de la mesa.

● DELETE (Eliminación): Opción para cancelar/eliminar una reserva. OBLIGATORIO: Se
requiere el uso de SweetAlert2 para mostrar un cuadro de diálogo de confirmación
indicando "¿Estás seguro de cancelar esta reserva?" antes de disparar la petición DELETE
a la API. Confirmar el éxito de la cancelación con otra alerta.