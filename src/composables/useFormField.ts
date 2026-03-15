import { computed, getCurrentInstance } from 'vue'

export interface FormFieldProps {
  label?: string
  required?: boolean
  disabled?: boolean
  error?: boolean
  errorMessage?: string
  hint?: string
}

export function useFormField(props: FormFieldProps) {
  const uid = getCurrentInstance()?.uid
  const fieldId = computed(() => `sc-field-${uid}`)
  const descriptionId = computed(() => `sc-desc-${uid}`)

  const hasError = computed(() => props.error || !!props.errorMessage)

  const ariaProps = computed(() => ({
    'aria-required': props.required || undefined,
    'aria-disabled': props.disabled || undefined,
    'aria-invalid': hasError.value || undefined,
    'aria-describedby':
      props.errorMessage || props.hint ? descriptionId.value : undefined,
  }))

  return { fieldId, descriptionId, hasError, ariaProps }
}
