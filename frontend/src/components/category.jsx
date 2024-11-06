/* eslint-disable react/prop-types */
const Category = ({category}) => {
    const routeLink = category.trim().split(" ").join("-");
    return <a href={`/cards/${routeLink}`}>{category}</a>;
};

export default Category;
