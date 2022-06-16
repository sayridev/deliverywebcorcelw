import { Category } from "../components/categories/Category";
import { Customer } from "../components/customers/Customer";
import { Delivery } from "../components/delivery/Delivery";
import { Order } from "../components/order/Order";
import { Product } from "../components/products/Product";
import { Store } from "../components/stores/Store";
import {
    ShoppingOutlined,
    UserOutlined,
    CarFilled,
    ShopFilled,
    GoldFilled,
    ShoppingFilled,
    MoneyCollectFilled
} from "@ant-design/icons";
import { Delivered } from "../components/delivered/Delivered";
import { ViewDelivered } from "../components/report/ViewDelivered";
import { Sales } from "../components/sales/Sales";
interface Route {
    to: string;
    path: string;
    Component: () => JSX.Element;
    name: string;
    icon: React.ForwardRefExoticComponent<any>;
}
export const routes: Route[] = [
    {
        path: "order",
        to: '/order',
        Component: Order,
        name: 'Ordenes',
        icon: ShoppingOutlined
    },
    {
        path: "customer",
        to: '/Customer',
        Component: Customer,
        name: 'Clientes',
        icon: UserOutlined
    },
    {
        path: "delivery",
        to: '/delivery',
        Component: Delivery,
        name: 'Repartidores',
        icon: CarFilled
    },
    {
        path: "store",
        to: '/store',
        Component: Store,
        name: 'Tiendas',
        icon: ShopFilled
    },
    {
        path: "category",
        to: '/category',
        Component: Category,
        name: 'Categorias',
        icon: GoldFilled
    },
    {
        path: "product",
        to: '/product',
        Component: Product,
        name: 'Productos',
        icon: ShoppingFilled
    }, {
        path: "charge",
        to: '/charge',
        Component: Order,
        name: 'Pedidos',
        icon: ShoppingOutlined
    },
    {
        path: "delivered",
        to: '/delivered',
        Component: Delivered,
        name: 'Entregas',
        icon: ShoppingOutlined
    },
    {
        path: "report",
        to: '/report',
        Component: ViewDelivered,
        name: 'Ver Entrega',
        icon: ShopFilled
    },
    {
        path: "sales",
        to: '/sales',
        Component: Sales,
        name: 'Ventas Diaras',
        icon: MoneyCollectFilled
    }


]