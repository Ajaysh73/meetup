// src/theme.js
import colors from 'vuetify/es5/util/colors'

export default {
  primary: {
    base: colors.red.base,
    darken2: colors.red.darken2
  },
  secondary: colors.grey,
  info: colors.blue.lighten1,
  warning: colors.amber.darken2,
  error: colors.red.accent4,
  success: colors.green.lighten2,

      // All keys will generate theme styles,
      // Here we add a custom `tertiary` color
  tertiary: colors.pink.base
      // All keys will generate theme styles,
      // Here we add a custom `tertiary` color
}
