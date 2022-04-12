import Tuits from "../tuits";
import * as service from "../../services/dislike-service";
import {useEffect, useState} from "react";

const MyDislikes = () => {
    const [dislikedTuits, setDislikedTuits] = useState([]);
    const findTuitsDislike = () =>
        service.findAllTuitsDislikedByUser("me")
            .then((tuits) => setDislikedTuits(tuits));
    useEffect(findTuitsDislike,[]);
    return(
        <div>
            <h1>My Dislikes</h1>
            <Tuits tuits={dislikedTuits} refreshTuits={findTuitsDislike}/>
        </div>
    )
}
export default MyDislikes;
