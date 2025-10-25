import { defineRule } from 'vee-validate'

defineRule('required', value => {
    if (!value || String(value).trim() === '') {
        return "Field is required."
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
    if (value && value.length < min) {
        return `Minimum of ${min} characters.`
    }
    return true
})

defineRule('max', (value, [max]) => {
    if (value && value.length > max) {
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
  if (!value || /^[0-9]+$/.test(value)) {
    return true;
  }
  return 'Only numeric values are allowed.';
});

export const rules = {
    name: 'required|min:3',
    description: 'required|min:5',
    type: 'required',
    limit: 'required|min:1',
    turnDay: 'required|min:1|max:31',
    value: 'required|numeric|min:100',
}