import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseInput from './base-input.vue'

describe('BaseInput', () => {
  it('renders label when provided', () => {
    const wrapper = mount(BaseInput, { props: { label: 'Email' } })
    expect(wrapper.find('label').text()).toContain('Email')
  })

  it('shows required asterisk when required', () => {
    const wrapper = mount(BaseInput, { props: { label: 'Name', required: true } })
    expect(wrapper.find('.base-input__required').exists()).toBe(true)
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(BaseInput, { props: { modelValue: '' } })
    await wrapper.find('input').setValue('hello')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['hello'])
  })

  it('applies error class when error prop is true', () => {
    const wrapper = mount(BaseInput, { props: { error: true } })
    expect(wrapper.classes()).toContain('base-input--error')
  })

  it('shows error message', () => {
    const wrapper = mount(BaseInput, { props: { errorMessage: 'Required field' } })
    expect(wrapper.find('.base-input__error').text()).toBe('Required field')
    expect(wrapper.classes()).toContain('base-input--error')
  })

  it('shows hint when no error', () => {
    const wrapper = mount(BaseInput, { props: { hint: 'Enter your email' } })
    expect(wrapper.find('.base-input__hint').text()).toBe('Enter your email')
  })

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(BaseInput, { props: { disabled: true } })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('base-input--disabled')
  })

  it('emits blur event', async () => {
    const wrapper = mount(BaseInput)
    await wrapper.find('input').trigger('blur')
    expect(wrapper.emitted('blur')).toHaveLength(1)
  })

  it('emits focus event', async () => {
    const wrapper = mount(BaseInput)
    await wrapper.find('input').trigger('focus')
    expect(wrapper.emitted('focus')).toHaveLength(1)
  })

  it('renders prefix slot', () => {
    const wrapper = mount(BaseInput, { slots: { prefix: '@' } })
    expect(wrapper.find('.base-input__prefix').text()).toBe('@')
  })

  it('renders suffix slot', () => {
    const wrapper = mount(BaseInput, { slots: { suffix: 'kg' } })
    expect(wrapper.find('.base-input__suffix').text()).toBe('kg')
  })
})
