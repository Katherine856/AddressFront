import { Address } from "./address";
import { User } from "./user";

//Interface que permite la lectura de la información del cambio
export interface Change {
    idChange?: number | null,
    previous?: String | null,
    date?: String | null,
    type?: String | null,
    user: User,
    address: Address
}