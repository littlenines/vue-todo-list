import { mount } from '@vue/test-utils'
import ToDo from '@/components/ToDo.vue'

describe('ToDo.vue', () => {
  it('should title be to-do list', () => {
    const wrapper = mount(ToDo);
    const todo = wrapper.get('[data-test="title"]')
    expect(todo.text()).toBe('to-do list')
  })

  it('should list have three default values', () => {
    const wrapper = mount(ToDo);
    expect(wrapper.findAll('[data-test="todo-item"]')).toHaveLength(3)
  })

  it('should add new item in list', async () => {
    const wrapper = mount(ToDo);
    await wrapper.get('[data-test="todo-input"]').setValue('Buy Elden Ring');
    await wrapper.get('[data-test="todo-button"]').trigger('click');
    expect(wrapper.findAll('[data-test="todo-item"]')).toHaveLength(4)
  })

  it('should add class "done" on first clicked list item', async () => {
    const wrapper = mount(ToDo);
    await wrapper.findAll('[data-test="todo-item"]')[0].trigger('click');
    expect(wrapper.findAll('[data-test="todo-item"]')[0].classes()).toContain('done');
  })

  it('should remove class "done" on third clicked list item', async () => {
    const wrapper = mount(ToDo);
    await wrapper.findAll('[data-test="todo-item"]')[2].trigger('click');
    expect(wrapper.findAll('[data-test="todo-item"]')[2].classes()).not.toContain('done');
  })

  it('should delete third item from list on click', async () => {
    const wrapper = mount(ToDo);
    await wrapper.findAll('[data-test="delete-button"]')[2].trigger('click');
    expect(wrapper.findAll('[data-test="todo-item"]')).toHaveLength(2);
  })

  it('should not add list item if input is empty', async () => {
    const wrapper = mount(ToDo);
    await wrapper.get('[data-test="todo-input"]').setValue('');
    await wrapper.get('[data-test="todo-button"]').trigger('click');
    expect(wrapper.findAll('[data-test="todo-item"]')).toHaveLength(3);
  })

  it('should not add list item if input is whitespace', async () => {
    const wrapper = mount(ToDo);
    await wrapper.get('[data-test="todo-input"]').setValue('   ');
    await wrapper.get('[data-test="todo-button"]').trigger('click');
    expect(wrapper.findAll('[data-test="todo-item"]')).toHaveLength(3);
  })

  it('should input attribute max-length be 35', async () => {
    const wrapper = mount(ToDo);
    expect(wrapper.get('[data-test="todo-input"]').attributes('maxlength')).toBe("35");
  })

  it('should max list item limit be 10 items', async () => {
    const wrapper = mount(ToDo);
    await wrapper.get('[data-test="todo-input"]').setValue('test4');
    await wrapper.get('[data-test="todo-button"]').trigger('click');
    await wrapper.get('[data-test="todo-input"]').setValue('tes5');
    await wrapper.get('[data-test="todo-button"]').trigger('click');
    await wrapper.get('[data-test="todo-input"]').setValue('tes6');
    await wrapper.get('[data-test="todo-button"]').trigger('click');
    await wrapper.get('[data-test="todo-input"]').setValue('tes7');
    await wrapper.get('[data-test="todo-button"]').trigger('click');
    await wrapper.get('[data-test="todo-input"]').setValue('test8');
    await wrapper.get('[data-test="todo-button"]').trigger('click');
    await wrapper.get('[data-test="todo-input"]').setValue('test9');
    await wrapper.get('[data-test="todo-button"]').trigger('click');
    await wrapper.get('[data-test="todo-input"]').setValue('test10');
    await wrapper.get('[data-test="todo-button"]').trigger('click');
    await wrapper.get('[data-test="todo-input"]').setValue('test11');
    await wrapper.get('[data-test="todo-button"]').trigger('click');
    expect(wrapper.findAll('[data-test="todo-item"]')).toHaveLength(10);
  })
})
