import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseSelect from '../base-select.vue'

const options = [
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'angular' },
]

describe('BaseSelect', () => {
  it('renders label when provided', () => {
    const wrapper = mount(BaseSelect, { props: { options, label: 'Framework' } })
    expect(wrapper.find('label').text()).toContain('Framework')
  })

  it('shows placeholder when no value selected', () => {
    const wrapper = mount(BaseSelect, { props: { options, placeholder: 'Pick one' } })
    expect(wrapper.find('.base-select__value').text()).toBe('Pick one')
  })

  it('shows selected label when modelValue matches', () => {
    const wrapper = mount(BaseSelect, { props: { options, modelValue: 'react' } })
    expect(wrapper.find('.base-select__value').text()).toBe('React')
  })

  it('opens listbox on trigger click', async () => {
    const wrapper = mount(BaseSelect, { props: { options } })
    expect(wrapper.find('.base-select__listbox').exists()).toBe(false)
    await wrapper.find('.base-select__trigger').trigger('click')
    expect(wrapper.find('.base-select__listbox').exists()).toBe(true)
  })

  it('renders all options when open', async () => {
    const wrapper = mount(BaseSelect, { props: { options } })
    await wrapper.find('.base-select__trigger').trigger('click')
    const items = wrapper.findAll('.base-select__option')
    expect(items).toHaveLength(3)
    expect(items[0].text()).toBe('Vue')
  })

  it('emits update:modelValue on option click', async () => {
    const wrapper = mount(BaseSelect, { props: { options } })
    await wrapper.find('.base-select__trigger').trigger('click')
    await wrapper.findAll('.base-select__option')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['react'])
  })

  it('emits change on option click', async () => {
    const wrapper = mount(BaseSelect, { props: { options } })
    await wrapper.find('.base-select__trigger').trigger('click')
    await wrapper.findAll('.base-select__option')[0].trigger('click')
    expect(wrapper.emitted('change')?.[0]).toEqual(['vue'])
  })

  it('closes listbox after selecting an option', async () => {
    const wrapper = mount(BaseSelect, { props: { options } })
    await wrapper.find('.base-select__trigger').trigger('click')
    await wrapper.findAll('.base-select__option')[0].trigger('click')
    expect(wrapper.find('.base-select__listbox').exists()).toBe(false)
  })

  it('marks selected option with --selected class', async () => {
    const wrapper = mount(BaseSelect, { props: { options, modelValue: 'angular' } })
    await wrapper.find('.base-select__trigger').trigger('click')
    const selected = wrapper.findAll('.base-select__option--selected')
    expect(selected).toHaveLength(1)
    expect(selected[0].text()).toBe('Angular')
  })

  it('does not open when disabled', async () => {
    const wrapper = mount(BaseSelect, { props: { options, disabled: true } })
    await wrapper.find('.base-select__trigger').trigger('click')
    expect(wrapper.find('.base-select__listbox').exists()).toBe(false)
  })

  it('shows error message', () => {
    const wrapper = mount(BaseSelect, { props: { options, errorMessage: 'Required' } })
    expect(wrapper.find('.base-select__error').text()).toBe('Required')
  })

  it('applies error class when errorMessage set', () => {
    const wrapper = mount(BaseSelect, { props: { options, errorMessage: 'Required' } })
    expect(wrapper.classes()).toContain('base-select--error')
  })

  it('shows hint when no error', () => {
    const wrapper = mount(BaseSelect, { props: { options, hint: 'Choose one' } })
    expect(wrapper.find('.base-select__hint').text()).toBe('Choose one')
  })

  it('opens on ArrowDown keydown and closes on Escape', async () => {
    const wrapper = mount(BaseSelect, { props: { options } })
    await wrapper.find('.base-select__trigger').trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.find('.base-select__listbox').exists()).toBe(true)
    await wrapper.find('.base-select__trigger').trigger('keydown', { key: 'Escape' })
    expect(wrapper.find('.base-select__listbox').exists()).toBe(false)
  })

  it('disabled option has aria-disabled and --disabled class', async () => {
    const opts = [
      { label: 'Vue', value: 'vue' },
      { label: 'React', value: 'react', disabled: true },
    ]
    const wrapper = mount(BaseSelect, { props: { options: opts } })
    await wrapper.find('.base-select__trigger').trigger('click')
    const disabledOption = wrapper.findAll('.base-select__option')[1]
    expect(disabledOption.classes()).toContain('base-select__option--disabled')
    expect(disabledOption.attributes('aria-disabled')).toBe('true')
  })

  it('disabled option does not emit on click', async () => {
    const opts = [
      { label: 'Vue', value: 'vue' },
      { label: 'React', value: 'react', disabled: true },
    ]
    const wrapper = mount(BaseSelect, { props: { options: opts } })
    await wrapper.find('.base-select__trigger').trigger('click')
    await wrapper.findAll('.base-select__option')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('keyboard navigation skips disabled options', async () => {
    const opts = [
      { label: 'Vue', value: 'vue' },
      { label: 'React', value: 'react', disabled: true },
      { label: 'Angular', value: 'angular' },
    ]
    const wrapper = mount(BaseSelect, { props: { options: opts } })
    await wrapper.find('.base-select__trigger').trigger('keydown', { key: 'ArrowDown' })
    // focused on first selectable (vue), move down — should skip react → angular
    await wrapper.find('[role="listbox"]').trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.find('.base-select__option--focused').text()).toBe('Angular')
  })

  it('renders group labels in listbox', async () => {
    const opts = [
      { label: 'Vue', value: 'vue', group: 'Frontend' },
      { label: 'React', value: 'react', group: 'Frontend' },
      { label: 'Django', value: 'django', group: 'Backend' },
    ]
    const wrapper = mount(BaseSelect, { props: { options: opts } })
    await wrapper.find('.base-select__trigger').trigger('click')
    const groups = wrapper.findAll('.base-select__group-label')
    expect(groups).toHaveLength(2)
    expect(groups[0].text()).toBe('Frontend')
    expect(groups[1].text()).toBe('Backend')
  })

  it('group labels have role="presentation" and aria-hidden', async () => {
    const opts = [{ label: 'Vue', value: 'vue', group: 'JS' }]
    const wrapper = mount(BaseSelect, { props: { options: opts } })
    await wrapper.find('.base-select__trigger').trigger('click')
    const groupLabel = wrapper.find('.base-select__group-label')
    expect(groupLabel.attributes('role')).toBe('presentation')
    expect(groupLabel.attributes('aria-hidden')).toBe('true')
  })
})
