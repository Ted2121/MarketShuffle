import React from 'react'

function RecipeList({item}) {
    const recipe = item?.recipe?.map((ingredient, index) => {
        const costValue = ingredientPrices[index] !== undefined ? ingredientPrices[index] : '';

        return (
            !item || !Array.isArray(item.positions) ? (
                <div key={index}>No positions data available</div>
            ) : (
                <Box
                    key={index}
                    sx={{
                        gap: 1,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Typography sx={{ fontSize: '1rem' }}>
                        {ingredient.name} -
                    </Typography>
                    <Typography sx={{ fontSize: '1rem' }}>
                        {ingredient.quantity}x
                    </Typography>
                    <TextField
                        type="number"
                        label="Cost"
                        size='small'
                        value={costValue}
                        onChange={(event) => handleCostChange(index, event)}
                    />
                    <Typography sx={{ fontSize: '1rem' }}>
                        = {ingredientPrices[index] && (ingredientPrices[index] * ingredient.quantity).toLocaleString()} k
                    </Typography>
                </Box>
            )
        );
    });

    return (
        <>
            {recipe}
        </>
    )
}

export default RecipeList