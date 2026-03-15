import { describe, it, expect } from 'vitest'
import { defineComponent, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { useFormField } from '../useFormField'

function mountWithFormField(props: Parameters<typeof useFormField>[0]) {
  let result: ReturnType<typeof useFormField>
  mount(
    defineComponent({
      setup() {
        result = useFormField(props)
        return () => null
      },
    }),
  )
  return result!
}

describe('useFormField', () => {
  it('generates unique fieldId', () => {
    const a = mountWithFormField({})
    const b = mountWithFormField({})
    expect(a.fieldId.value).not.toBe(b.fieldId.value)
  })

  it('descriptionId differs from fieldId', () => {
    const { fieldId, descriptionId } = mountWithFormField({})
    expect(fieldId.value).not.toBe(descriptionId.value)
  })

  it('hasError is false by default', () => {
    const { hasError } = mountWithFormField({})
    expect(hasError.value).toBe(false)
  })

  it('hasError is true when error prop is set', () => {
    const { hasError } = mountWithFormField({ error: true })
    expect(hasError.value).toBe(true)
  })

  it('hasError is true when errorMessage is set', () => {
    const { hasError } = mountWithFormField({ errorMessage: 'Required' })
    expect(hasError.value).toBe(true)
  })

  it('ariaProps includes aria-invalid when hasError', () => {
    const { ariaProps } = mountWithFormField({ error: true })
    expect(ariaProps.value['aria-invalid']).toBe(true)
  })

  it('ariaProps includes aria-required when required', () => {
    const { ariaProps } = mountWithFormField({ required: true })
    expect(ariaProps.value['aria-required']).toBe(true)
  })

  it('ariaProps includes aria-disabled when disabled', () => {
    const { ariaProps } = mountWithFormField({ disabled: true })
    expect(ariaProps.value['aria-disabled']).toBe(true)
  })

  it('ariaProps includes aria-describedby when hint is set', () => {
    const { ariaProps, descriptionId } = mountWithFormField({ hint: 'Enter email' })
    expect(ariaProps.value['aria-describedby']).toBe(descriptionId.value)
  })

  it('ariaProps aria-invalid is undefined when no error', () => {
    const { ariaProps } = mountWithFormField({})
    expect(ariaProps.value['aria-invalid']).toBeUndefined()
  })

  it('reacts to reactive props changes', async () => {
    const props = reactive({ error: false, errorMessage: '' })
    const { hasError } = mountWithFormField(props)
    expect(hasError.value).toBe(false)
    props.error = true
    expect(hasError.value).toBe(true)
  })
})
