import { defineRule } from 'vee-validate'

defineRule('required', value => {
    if (value === null || value === undefined) {
        return 'Field is required.'
    }

    if (typeof value === 'string' && value.trim() === '') {
        return 'Field is required.'
    }

    if (Array.isArray(value) && value.length === 0) {
        return 'Field is required.'
    }

    return true
})

defineRule('email', value => {
    if (!value || /^\S+@\S+\.\S+$/.test(value)) {
        return true
    }
    return "Email isn't valid."
})

defineRule('min', (value, [min]) => {
    if (!isNaN(value)) {
        if (Number(value) < Number(min)) {
            return `Minimum value is ${min}.`
        }
        return true
    }

    if (typeof value === 'string' && value.length < min) {
        return `Minimum of ${min} characters.`
    }

    return true
})

defineRule('max', (value, [max]) => {
    if (!isNaN(value)) {
        if (Number(value) > Number(max)) {
            return `Maximum value is ${max}.`
        }
        return true
    }

    if (typeof value === 'string' && value.length > max) {
        return `Maximum of ${max} characters.`
    }

    return true
})

defineRule('password', value => {
    if (!value) return 'Password is required.'
    const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    return strong.test(value)
        ? true
        : "Password isn't valid. At least 8 characters, lower and upper case characeters and numbers."
})

defineRule('confirmed', (value, [target], ctx) => {
    if (value === ctx.form[target]) {
        return true
    }
    return "Fields doesn't match."
})

defineRule('numeric', value => {
    const normalized = String(value).trim().replace(',', '.');
    const number = Number(normalized);
    if (!isNaN(number) && isFinite(number)) {
        return true;
    }

    return 'Only numeric values are allowed.';
});

export const rules = {
    name: { required: true, min: 3 },
    description: { required: true, min: 5 },
    type_id: { required: true },
    type: { required: true },
    limit: { required: true, min: 1 },
    turnDay: { required: true, min: 1, max: 31 },
    value: { required: true, numeric: true, min: 1 },
    number: { required: true, numeric: true, min: 1 },
    parcel_numbers: { required: true, numeric: true, min: 1, max: 24 },
    payment_methods_id: { required: true },
    category_id: { required: true },
    source_id: { required: true },
    entry_day: { required: true, numeric: true, min: 1, max: 31 },
};