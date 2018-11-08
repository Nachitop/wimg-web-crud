export interface Lugar1 {
    estado:  number;
    Lugares: Lugar2[];
}

export interface Lugar2 {
    id:                     string;
    nombre:                 string;
    precio_x_hora:          string;
    precio_x_persona_extra: string;
    lugar_de_encuentro:     string;
}