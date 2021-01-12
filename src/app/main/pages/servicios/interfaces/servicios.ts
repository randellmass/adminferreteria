export interface Servicio{
    servicio_tipo_id?:number,
    servicio_tipo_nombre?:string,
    producto_tipo_id?:number,
    producto_tipo_nombre?:string,
    producto_id?:number,
    producto_nombre?:string,
    servicio_marca_id?:number,
    servicio_marca_nombre?:string,
    instalacion_lugar_id?:number,
    instalacion_lugar_nombre?:string,
    direccion?:string,
    ciudad_id?:number,
    ciudad_nombre?:string,
    servicio_ubi_unidad_id?:number,
    servicio_ubi_unidad_nombre?:string,
    servicio_falla_id?:number,
    servicio_falla_nombre?:string,
    contacto?:string,
    telefono?:string,
    servicio_estado_id?:number,
    servicio_estado_nombre?:string,
    fecha_solicitud_servicio?:any,
    user_solicitud_id?: number,
    descripcion?:string
 } 