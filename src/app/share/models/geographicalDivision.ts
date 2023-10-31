import { Country } from "./country";

//Interface que permite la lectura de la información de la división geografica
export interface GeographicalDivision {
    idGeographicalDivision: String | null,
    nameGeographicalDivision: String | null,
    timeZone: String | null,
    country: Country | null
}