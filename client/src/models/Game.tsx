interface Game {
    id: number;
    attributes: {
        name: string;
        description: string;
        cover_image: {
            data: {
                attributes: {
                    url: string; 
                };
            };
        };
    };
}

export default Game