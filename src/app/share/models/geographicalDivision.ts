import { Country } from "./country";

export interface GeographicalDivision {
    idGeographicalDivision: String | null,
    nameGeographicalDivision: String | null,
    timeZone: String | null,
    country: Country | null
}