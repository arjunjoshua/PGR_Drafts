import { backend_url } from '../constants/constants'

interface GetResultProps {
    trainer1ID: string;
    trainer2ID: string;
    lobbyID: string;
    setResponseData: (value: MatchResponse | null) => void;
};

interface MatchResponse {
    match: {
        _id: string;
        lobby: string;
        trainer1: string;
        trainer2: string;
        winner: string;
        winnerName: string;
        isReported: boolean;
        __v: number;
    }
};

const getResult = async ({trainer1ID, trainer2ID, lobbyID, setResponseData}: GetResultProps) => {
    try{
        // setLoading(true);
        const response = await fetch(`${backend_url}/lobby/getResult?trainer1ID=${trainer1ID}&trainer2ID=${trainer2ID}&lobbyID=${lobbyID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                },
            });
        const data = await response.json();
        setResponseData(data); // Update state with response data
    } catch (error) {
        console.log(error);
    }
};

export default getResult;