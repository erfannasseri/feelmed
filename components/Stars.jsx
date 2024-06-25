
const generateFaStars= (starRating) => {
    const emptyStars = 5 - starRating;
    const filledStars = Array.from({ length: starRating }, () => <FaStar />);
    const emptyStarComponents = Array.from({ length: emptyStars }, () => <FaStarEmpty />);
    
    return filledStars.concat(emptyStarComponents);
}

export default generateFaStars;