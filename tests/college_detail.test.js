import {shallow} from '@vue/test-utils'
import CollegeDetail from '../pages/_slug/index.vue'


describe('College Detail', () => {

  const wrapper = shallow(CollegeDetail);
  
  
  it('It is a component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  });

  // it('Hamburger is hidden', () => {
  //   expect(wrapper.vm.showNav).toBe(false);
  // });
  //
  // it('Clicking Hamburger shows it', () => {
  //   expect(wrapper.vm.showNav).toBe(false);
  //   clickable.trigger('click');
  //   expect(wrapper.vm.showNav).toBe(true);
  // });
  //
  // it('Clicking Hamburger again hides it', () => {
  //   clickable.trigger('click');
  //   expect(wrapper.vm.showNav).toBe(false);
  // });

});