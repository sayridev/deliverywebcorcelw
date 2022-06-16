import { IUserApp, TypeAdmin } from "../interfaces/IUserApp";

const permissionAdmin = [
    "order",
    "customer",
    "delivery",
    "store",
    "category",
    "product",
]
const permissionSucursal = [
    "order",
    "customer",
    "delivery",
    "report",
    "sales"

]
const permissionDelivery = [
    "charge",
    "delivered"
]
export const permissionCustomer = []
export const HasPermision = (userApp: IUserApp) => {
    switch (userApp?.type) {
        case TypeAdmin.Admin:
            if (userApp.sucursal === "SSlmanVakfvRcXbrAd61") {
                return permissionAdmin;
            }
            return permissionSucursal;

        case TypeAdmin.Customer:
            return permissionCustomer;

        case TypeAdmin.Delivery:
            return permissionDelivery;
    }
};