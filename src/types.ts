import type { FormFieldProps } from './composables/useFormField'

// ─── Button ──────────────────────────────────────────────────────────────────

/** Visual style of the button. */
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'

/** Size of the button. Maps to --sc-height-* tokens. */
export type ButtonSize = 'sm' | 'md' | 'lg'

/** HTML button type attribute. */
export type ButtonType = 'button' | 'submit' | 'reset'

export interface BaseButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  type?: ButtonType
  disabled?: boolean
  loading?: boolean
  /** Stretches button to full container width. */
  block?: boolean
}

// ─── Input ───────────────────────────────────────────────────────────────────

/** HTML input type attribute subset supported by BaseInput. */
export type InputType = 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url'

export interface BaseInputProps extends FormFieldProps {
  modelValue?: string | number
  placeholder?: string
  type?: InputType
}

// ─── Select ──────────────────────────────────────────────────────────────────

/**
 * A single option in BaseSelect.
 * @typeParam T - Type of the value. Defaults to `string | number`.
 */
export interface SelectOption<T = string | number> {
  /** Display text. */
  label: string
  /** Value emitted on selection. */
  value: T
  /** When true the option is visible but not selectable. */
  disabled?: boolean
  /** Optional group label for visual grouping (rendered as a divider label). */
  group?: string
}

export interface BaseSelectProps extends FormFieldProps {
  modelValue?: string | number | null
  options: SelectOption[]
  placeholder?: string
}

// ─── Checkbox ────────────────────────────────────────────────────────────────

/** Checked color theme of BaseCheckbox. */
export type CheckboxTheme = 'red' | 'black'

export interface BaseCheckboxProps {
  modelValue?: boolean | string[]
  /** Value used when modelValue is an array. */
  value?: boolean | string
  id?: string
  /** Renders the dash (partial-select) icon and sets aria-checked="mixed". */
  indeterminate?: boolean
  error?: boolean
  disabled?: boolean
  theme?: CheckboxTheme
}

// ─── Label ───────────────────────────────────────────────────────────────────

export interface BaseLabelProps {
  value?: string
  /** CSS variable name (without --) for the background color. */
  backgroundColor?: string
  /** CSS variable name (without --) for the text color. */
  textColor?: string
}
