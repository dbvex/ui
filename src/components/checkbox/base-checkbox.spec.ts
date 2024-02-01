import checkbox from './base-checkbox.vue'
import { mount } from "@vue/test-utils";

const DEFAULT_SLOT_VALUE = 'this default slot';

describe('components/checkbox', () => {
    test('V-model - Boolean', () => {
        const wrapper = mount(checkbox, {
            props: { modelValue: false },
        })
        wrapper.find('input').trigger('click')
        const [[value]] = wrapper.emitted('update:modelValue') || [[]];
        expect(value).toEqual(true)
    })
    
    test('V-model - Array - adding value', () => {
        const wrapper = mount(checkbox, {
            props: { 
                modelValue: ['loki'], 
                value: 'tor', 
            }
        })
        wrapper.find('input').trigger('click')
        
        const [[res]] = wrapper.emitted('update:modelValue') || [[]];
        
        expect(res).toEqual(['loki', 'tor'])
    })
    
    test('V-model - Array - removing value', () => {
        const wrapper = mount(checkbox, {
            props: { 
                modelValue: ['loki', 'tor'], 
                value: 'tor', 
            }
        })
        wrapper.find('input').trigger('click')
        
        const [[res]] = wrapper.emitted('update:modelValue') || [[]]
        
        expect(res).toEqual(['loki'])
    })

    test('Сlicked to label (V-model - Boolean)', () => {
        const wrapper = mount(checkbox, {
            props: { modelValue: false },
            slots: { default: DEFAULT_SLOT_VALUE}
        })
        wrapper.find('label').trigger('click')
        const [[value]] = wrapper.emitted('update:modelValue') || [[]];
        expect(value).toEqual(true)
    })

    test('Must use default slot (V-model - Boolean)', () => {

        const wrapper = mount(checkbox, {
            props: { modelValue: false },
            slots: { default: DEFAULT_SLOT_VALUE}
        })
        expect(wrapper.find('label').text()).toContain(DEFAULT_SLOT_VALUE)
    })

    
    test('shouldn\'t draw the label unless we pass it (V-model - Boolean)', () => {
        const wrapper = mount(checkbox, {
            props: { modelValue: false },
        })
        wrapper.find('label')
        const res = wrapper.emitted('update:modelValue');
        expect(res).toEqual(undefined)
    })
})