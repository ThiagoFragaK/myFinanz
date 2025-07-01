import { parseISO, format } from 'date-fns';

export default {
    getFormatedDate(dateString, pattern = 'dd/MM/yyyy HH:mm') {
        if (!dateString) return '';
        return format(parseISO(dateString), pattern);    },

    getFormatedMonthDate(dateString, pattern = 'dd/MM') {
        if (!dateString) return '';
        return format(parseISO(dateString), pattern);
    }
}