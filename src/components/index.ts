import { App } from 'vue';
import DbPage from './DbPage/index.vue';

const components = [DbPage];

export default {
  install(app: App) {
    components.map((component: any) => {
      app.component(component.name, component);
      return component;
    });
  },
};
