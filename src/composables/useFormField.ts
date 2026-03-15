import { computed, getCurrentInstance } from 'vue'

/** Shared props for all form field components. */
export interface FormFieldProps {
  /** Consumer-controlled id. Auto-generated when omitted. */
  id?: string
  /** HTML name attribute for form submission. */
  name?: string
  /** Label text rendered above the field. */
  label?: string
  /** Shows asterisk and sets aria-required. */
  required?: boolean
  /** Disables interaction. */
  disabled?: boolean
  /** Makes the field read-only. */
  readonly?: boolean
  /** Activates error styling. Use alongside errorMessage. */
  error?: boolean
  /** Error text shown below the field; implies error=true. */
  errorMessage?: string
  /** Hint text shown below the field when there is no error. */
  hint?: string
}

export function useFormField(props: FormFieldProps) {
  const uid = getCurrentInstance()?.uid
  const fieldId = computed(() => props.id ?? `sc-field-${uid}`)
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
