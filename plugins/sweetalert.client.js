import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default defineNuxtPlugin(() => {
    const showNotification = ({ title, text, icon }) => {
        return Swal.fire({
            title: title || 'Notification',
            text: text || '',
            icon: icon || 'info',
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            toast: true,
        });
    };

    const showConfirmation = ({ title, text, icon, confirmText, cancelText }) => {
        return Swal.fire({
            title: title || 'Are you sure?',
            text: text || '',
            icon: icon || 'warning',
            showCancelButton: true,
            confirmButtonText: confirmText || 'Ok',
            cancelButtonText: cancelText || 'Cancel'
        });
    };

    return {
        provide: {
            swal: Swal,
            notify: showNotification,
            confirm: showConfirmation
        }
    };
});