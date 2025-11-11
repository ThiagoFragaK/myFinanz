import { validate } from 'vee-validate';
import { rules } from '@/rules/validationRules.js';

export const Validation = {
    async validateField(fieldName, fieldValue) {
        const rule = rules[fieldName];
        const fieldValidation = {
            [fieldName]: {
                status: true,
                message: '',
            },
        };

        if (!rule) {
            return fieldValidation;
        }

        const result = await validate(fieldValue, rule);

        if (result.valid) {
            fieldValidation[fieldName].status = true;
            fieldValidation[fieldName].message = "";
        } else {
            fieldValidation[fieldName].status = false;
            fieldValidation[fieldName].message = result.errors[0];
        }

        return fieldValidation;
    },

    async validateForm(formData) {
        const results = {};
        let isValid = true;

        for (const field in formData) {
            if (!rules[field]) continue;
            
            const validation = await this.validateField(field, formData[field]);
            results[field] = validation[field];
            if (!validation[field].status) isValid = false;
        }

        return { 
            valid: isValid, 
            fields: results 
        };
    },
};
