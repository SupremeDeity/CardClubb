/* eslint-disable react/prop-types */
const Category = ({category}) => {
    const routeLink = category.trim().split(" ").join("-");
    console.log(routeLink);
    
    return <a href={`/cards/${routeLink}`}>{category}</a>;
};

export default Category;
