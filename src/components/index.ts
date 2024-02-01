import { Plugin, Component } from 'vue'
import { Label } from './label'

const plugin: Plugin = function(app, config = {}) {
  const prefix = config.prefix || 'base'
  const use = (name: string, component: Component) => {
    app.component(`${prefix}-${name}`, component)
  }

  use('label', Label)
}

export default plugin
