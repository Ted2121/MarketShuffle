const item = {
    "id":'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
    "name":'crackler amulet',
    "isFavorite": true,
    "category": "",
    "quality": "cheapest",
    "recipe": [
        {
            "quantity":"4",
            "name":"Gold crackler tooth"
        },
        {
            "quantity":"1",
            "name":"Flint"
        },
        {
            "quantity":"1",
            "name":"Granite"
        },
        {
            "quantity":"1",
            "name":"Crackler Stone"
        },
        {
            "quantity":"1",
            "name":"Coal",
            "recipe": [
                {
                    "quantity":"7",
                    "name":"Gold"
                },
                {
                    "quantity":"8",
                    "name":"silver",
                    "recipe": [
                        {
                            "quantity":"7",
                            "name":"Gold"
                        },
                        {
                            "quantity":"8",
                            "name":"silver",
                            "recipe": [
                                {
                                    "quantity":"7",
                                    "name":"Gold32df3qff fwef eqw"
                                },
                                {
                                    "quantity":"8",
                                    "name":"silver"
                                },
                            ]
                        },
                    ]
                },
            ]
        },
    ],
    "positions":[
        {
            "cost":"50000",
            "date":"123564365",
            "details":"hunter"
        },
    ]
}

export default item;