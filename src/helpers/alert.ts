import Swal from "sweetalert2"
import { TYPE_ALERT } from "./error"

export const alert = (message: string, icon: TYPE_ALERT = TYPE_ALERT.ERROR, time: number = 2000) => {
    Swal.fire({
        toast: true,
        position: "top",
        icon: icon,
        width: 500,
        title: message,
        timerProgressBar: true,
        showConfirmButton: false,
        timer: time,
    });
}
export async function confirmAlert(
    message: string,
    confirm: string = "Si, eliminar!",
    cancel: string = "No, eliminar",
    title: string = "¿Eliminar?"
) {
    return await Swal.fire({
        title,
        text: message,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: confirm,
        cancelButtonText: cancel,
    }).then((result) => {
        if (result.isConfirmed) {
            return true;
        } else {
            return false;
        }
    });
}