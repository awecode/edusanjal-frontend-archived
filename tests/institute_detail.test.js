import {mount, createLocalVue} from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import CollegeDetail from '../pages/_slug/index.vue'
import config from '../config.js'

const localVue = createLocalVue();
localVue.use(Vuex);
// localVue.use(VueRouter);
const router = new VueRouter();

global.config = config;


const $route = {
  params: {'slug': 'khwopa-college'}
};

describe('College Detail', () => {

  let store;

  const data = {
    "name": "Khwopa College",
    "slug": "khwopa-college",
    "cover_image": "http://via.placeholder.com/1500x150",
    "logo": "http://via.placeholder.com/150x150",
    "boards": [
      {
        "slug": "tribhuwan-university",
        "name": "Tribhuwan University"
      },
      {
        "slug": "khwopa",
        "name": "Khwopa University"
      }
    ],
    "description": "asas",
    "recent_awards": [
      {
        "slug": "a4",
        "name": "A4"
      },
      {
        "slug": "a3",
        "name": "A3"
      },
      {
        "slug": "a2",
        "name": "A2"
      }
    ],
    "awards_count": 4,
    "documents": [
      {
        "name": "asdasd",
        "file": "http://via.placeholder.com/150x150"
      },
      {
        "name": "Brochure",
        "file": "http://via.placeholder.com/150x150"
      }
    ],
    "established": 1982,
    "address": "Bhaktapur",
    "district": "Bhaktapur",
    "type": "Private",
    "phone": [
      "01-6611932",
      "01-5612031"
    ],
    "email": [
      "info@khcollege.example"
    ],
    "website": "http://khwopacollege.edu.np",
    "images": [
      {
        "name": "ccc",
        "url": {
          "small": "http://via.placeholder.com/150x150",
          "full": "http://via.placeholder.com/450x450"
        }
      },
      {
        "name": "bbb",
        "url": {
          "small": "http://via.placeholder.com/150x150",
          "full": "http://via.placeholder.com/450x450"
        }
      },
      {
        "name": "aaa",
        "url": {
          "small": "http://via.placeholder.com/150x150",
          "full": "http://via.placeholder.com/450x450"
        }
      }
    ],
    "salient_features": "",
    "admission_guidelines": "",
    "scholarship_information": "",
    "network_institutes": [
      {
        "name": "Khwopa PG",
        "logo": {
          "small": "http://via.placeholder.com/100x100",
          "full": "http://via.placeholder.com/450x450"
        },
        "slug": "khwopa-pg",
        "levels": [
          "Pre-school"
        ]
      },
      {
        "name": "Khwopa School",
        "logo": {
          "small": "http://via.placeholder.com/100x100",
          "full": "http://via.placeholder.com/450x450"
        },
        "slug": "khwopa-school",
        "levels": [
          "Secondary School",
          "Primary School"
        ]
      }
    ],
    "levels": [
      "Masters",
      "Bachelors"
    ],
    "programs": [
      {
        "name": "BBA",
        "slug": "bba",
        "level": "Bachelors"
      },
      {
        "name": "MBA",
        "slug": "mba",
        "level": "Masters"
      }
    ]
  };

  const actions = {
    moduleActionClick: jest.fn()
  };

  const state = {
    collection: {
      institutes: {objects: {'khwopa-college': data}, pagination: {}, pages: {}, key: 'slug'}
    }
  };

  beforeEach(() => {
    store = new Vuex.Store({state, actions})
  });

  it('It is a component', () => {
    const wrapper = mount(CollegeDetail, {store, localVue, mocks: {$route}});
    expect(wrapper.isVueInstance()).toBeTruthy()
  });

  it('Has name', () => {
    const wrapper = mount(CollegeDetail, {store, localVue, mocks: {$route}});
    expect(wrapper.vm.obj.name).toBe(data.name);
  });

  it('Renders name', () => {
    const wrapper = mount(CollegeDetail, {store, localVue, mocks: {$route}});
    expect(wrapper.find('h1').text()).toContain(data.name);
  });

  it('Renders logo image', () => {
    const wrapper = mount(CollegeDetail, {store, localVue, mocks: {$route}});
    expect(wrapper.find('img.logo').attributes().src).toBe(data.logo);
  });

  it('Styles cover image', () => {
    const wrapper = mount(CollegeDetail, {store, localVue, mocks: {$route}});
    expect(wrapper.find('section.header').element.style.background).toBe('url(' + data.cover_image + ')');
  });

});