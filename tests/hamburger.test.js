import {mount, shallow} from '@vue/test-utils'
import Header from '../components/Header.vue'
import NuxtLink from '../.nuxt/components/nuxt-link.js'


describe('Hamburger Test', () => {
  
  Header.components = Header.components || {};
  Header.components.NuxtLink = NuxtLink;
  const wrapper = shallow(Header);
  const clickable = wrapper.find('.navbar-burger span:first-child');

  it('Header is a component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  });

  it('Hamburger is hidden', () => {
    expect(wrapper.vm.showNav).toBe(false);
  });

  it('Clicking Hamburger shows it', () => {
    expect(wrapper.vm.showNav).toBe(false);
    clickable.trigger('click');
    expect(wrapper.vm.showNav).toBe(true);
  });

  it('Clicking Hamburger again hides it', () => {
    clickable.trigger('click');
    expect(wrapper.vm.showNav).toBe(false);
  });

});