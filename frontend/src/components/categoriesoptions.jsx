/* eslint-disable react/prop-types */

const CategoriesOptions = (props) => {
  return (
    <>
        <option value={props.item}>{props.item}</option>
    </>
  )
}

export default CategoriesOptions