exports.getMatchPercentage = (product,searchText)=>{

    const ignoreWords = ["the", "is", "at", "which", "on", "a", "an", "and", "or", "but","under","over","in","with","for","to","of"];
  
    const keyWords = searchText.toLowerCase().split(" ").filter(word => !ignoreWords.includes(word));
    const productText = `${product.product_name} ${product.description} ${product.brand} ${product.unit} ${product.location[0].city} `.toLowerCase();

    let matchCount = 0;
    keyWords.forEach((word) => {
        if (productText.includes(word)) {
            matchCount++;
        }
    });
    const matchPercentage = (matchCount / keyWords.length) * 100;

    return matchPercentage;

}

