export interface Guia {
    estado: number;
    Guias:  Guia2[];
}

export interface Guia2 {
    id:               string;
    nombre:           string;
    apellido:         string;
    email:            string;
    id_pais:          string;
    fecha_nacimiento: string;
    sexo:             string;
    telefono:         string;
    disponibilidad:   string;
    foto:             string | ArrayBuffer;
}


