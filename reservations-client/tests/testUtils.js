import checkPropTypes from 'check-prop-types'

/**
 * Return node(s) with the given data-test attribute
 * @param  {ShallowWrapper} wrapper - Enzyme shallow wrapper
 * @param  {string} val - Value of data-test attribute for search
 * @returns {ShallowWrapper}
 */
export const findByTestClass = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`)
}

// /**
//  * Return node(s) with the given data-test attribute
//  * @param  {JSX.Element} component - React component
//  * @param  {object} conformingProps - Value of data-test attribute for search
//  * @returns {undefined}
//  */
export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(component.propTypes, conformingProps, 'prop', component.name)
  expect(propError).toBeUndefined()
}
