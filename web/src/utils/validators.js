import { addValidator } from 'redux-form-validators'

export const togetherValidator = addValidator({
  defaultMessage: 'You should enter both values',
  validator: (options, value, allValues) => {
    if (value && !allValues[0][options.together]) {
      return {
        defaultMessage: `You should enter ${options.together} too`
      };
    }
  }
})