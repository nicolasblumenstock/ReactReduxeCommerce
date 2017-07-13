var fetchProductLine = function(pl){
	return{
		type: 'FETCH_PRODUCTLINE',
		payload: pl
	}
}

export default fetchProductLine;