import { defineRule } from 'vee-validate'

defineRule('required', value => {
    if (!value || String(value).trim() === '') {
        return 'Este campo é obrigatório.'
    }
    return true
})

defineRule('email', value => {
    if (!value || /^\S+@\S+\.\S+$/.test(value)) {
        return true
    }
    return 'Insira um e-mail válido.'
})

defineRule('min', (value, [min]) => {
    if (value && value.length < min) {
        return `Mínimo de ${min} caracteres.`
    }
    return true
})

defineRule('max', (value, [max]) => {
    if (value && value.length > max) {
        return `Máximo de ${max} caracteres.`
    }
    return true
})

defineRule('password', value => {
    if (!value) return 'Senha obrigatória.'
    const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    return strong.test(value)
        ? true
        : 'A senha deve ter ao menos 8 caracteres, incluindo maiúsculas, minúsculas e números.'
})

defineRule('confirmed', (value, [target], ctx) => {
    if (value === ctx.form[target]) {
        return true
    }
    return 'Os campos não coincidem.'
})
