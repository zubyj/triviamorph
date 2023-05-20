const basePath = './images/morphed/';

export default [
    {
        "name": "Princess Diana",
        "slug": "princess-diana",
        "morphs": [
            {
                "name": "Benjamin Franklin",
                "slug": "benjamin-franklin",
                "filename": require(`${basePath}diana/diana-franklin.jpeg`),
            },
            {
                "name": "Mahatma Gandhi",
                "slug": "mahatma-gandhi",
                "filename": require(`${basePath}diana/diana-gandhi.jpeg`),
            },
            {
                "name": "Frida Kahlo",
                "slug": "frida-kahlo",
                "filename": require(`${basePath}diana/diana-kahlo.jpeg`),
            },
            {
                "name": "Abraham Lincoln",
                "slug": "abraham-lincoln",
                "filename": require(`${basePath}diana/diana-lincoln.jpeg`),
            }
        ],
        "wrongOptions": [
            "Queen Elizabeth",
            "Amelia Earhart",
            "Audrey Hepburn",
        ]
    },
    {
        "name": "Albert Einstein",
        "slug": "albert-einstein",
        "morphs": [
            {
                "name": "Princess Diana",
                "slug": "princess-diana",
                "filename": require(`${basePath}einstein/einstein-diana.jpeg`),
            },
            {
                "name": "Audrey Hepburn",
                "slug": "audrey-hepburn",
                "filename": require(`${basePath}einstein/einstein-hepburn.jpeg`),
            },
            {
                "name": "Frida Kahlo",
                "slug": "frida-kahlo",
                "filename": require(`${basePath}einstein/einstein-kahlo.jpeg`),
            },
            {
                "name": "John F. Kennedy",
                "slug": "john-f-kennedy",
                "filename": require(`${basePath}einstein/einstein-kennedy.jpeg`),
            },
            {
                "name": "Pablo Picasso",
                "slug": "pablo-picasso",
                "filename": require(`${basePath}einstein/einstein-picasso.jpeg`),
            }
        ],
        "wrongOptions": [
            "Mahatma Gandhi",
            "Benjamin Franklin",
            "George Washington",
        ],
    },
    {
        "name": "Frida Kahlo",
        "slug": "frida-kahlo",
        "morphs": [
            {
                "name": "John F. Kennedy",
                "slug": "john-f-kennedy",
                "filename": require(`${basePath}kahlo/kahlo-kennedy.jpeg`),
            },
            {
                "name": "George Washington",
                "slug": "george-washington",
                "filename": require(`${basePath}kahlo/kahlo-washington.jpeg`),
            }
        ],
        "wrongOptions": [
            "Amelia Earhart",
            "Audrey Hepburn",
            "Princess Diana",
        ],
    },
    {
        "name": "Martin Luther King Jr.",
        "slug": "martin-luther-king-jr",
        "morphs": [
            {
                "name": "Amelia Earhart",
                "slug": "amelia-earhart",
                "filename": require(`${basePath}king/king-earhart.jpeg`),
            },
            {
                "name": "Elvis Presley",
                "slug": "elvis-presley",
                "filename": require(`${basePath}king/king-elvis.jpeg`),
            },
            {
                "name": "Frida Kahlo",
                "slug": "frida-kahlo",
                "filename": require(`${basePath}king/king-kahlo.jpeg`),
            }
        ],
        "wrongOptions": [
            "John F. Kennedy",
            "Mahatma Gandhi",
            "Pablo Picasso",
        ],
    },
    {
        "name": "Mahatma Gandhi",
        "slug": "mahatma-gandhi",
        "morphs": [
            {
                "name": "Benjamin Franklin",
                "slug": "benjamin-franklin",
                "filename": require(`${basePath}gandhi/gandhi-franklin.jpeg`),
            },
            {
                "name": "George Washington",
                "slug": "george-washington",
                "filename": require(`${basePath}gandhi/gandhi-washington.jpeg`),
            },
        ],
        "wrongOptions": [
            "Martin Luther King Jr",
            "Pablo Picasso",
            "Elvis Presley",
        ],
    },
]
