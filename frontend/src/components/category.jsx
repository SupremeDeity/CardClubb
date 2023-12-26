/* eslint-disable react/prop-types */
const Category = (props) => {
    return <a onClick={props.click}>{props.category}</a>;
};

export default Category;
