import { parseISO, format } from 'date-fns';

export default {
    getFormatedDate(dateString, pattern = 'dd/MM/yyyy') {
        if (!dateString) return '';
        return format(parseISO(dateString), pattern);
    },
}