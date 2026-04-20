exports.getMatchPercentage = (product,searchText)=>{
    if (!searchText) return 0;

    const ignoreWords = ["the", "is", "at", "which", "on", "a", "an", "and", "or", "but","under","over","in","with","for","to","of"];
  
    const keyWords = searchText.toLowerCase().split(" ").filter(word => !ignoreWords.includes(word));
    const locationStr = product.location && product.location.length > 0 ? product.location[0].city : "";
    const productText = `${product.product_name || ""} ${product.description || ""} ${product.brand || ""} ${product.unit || ""} ${locationStr} `.toLowerCase();

    let matchCount = 0;
    keyWords.forEach((word) => {
        if (productText.includes(word)) {
            matchCount++;
        }
    });
    const matchPercentage = (matchCount / keyWords.length) * 100;

    return matchPercentage;

}

