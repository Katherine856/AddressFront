import { GeographicalDivision } from "./geographicalDivision";
import { Product_Service } from "./product_service";

export interface Address {
    idAddress: number | null,
    geographicalDivision: GeographicalDivision,
    infoAddress: String,
    latitude: number,
    longitude: number,
    residential: String,
    building: String,
    tower: String,
    floor: number,
    apartment: number,
    product_service: Product_Service[]
}