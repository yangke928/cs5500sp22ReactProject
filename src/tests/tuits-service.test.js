import {
    findAllTuits,
    findTuitById,
    findTuitByUser,
    createTuit, deleteTuit
} from "../services/tuits-service";
import {deleteUsersByUsername, createUser} from "../services/users-service";

const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
};
const sampleTuit = {
    tuit:"newTuit",
}
let newUser
let newTuit


describe('can create tuit with REST API', () => {
  // sample tuit to insert

    beforeAll( async () => {
        newUser = await createUser(ripley);
        sampleTuit.postedBy = newUser._id
        return newUser
    })

    afterAll( async () => {
        await deleteTuit(newTuit._id)
        return await deleteUsersByUsername(ripley.username)
    })

    test('can insert new tuit with REST API', async() => {
        const newTuit = await createTuit(newUser._id,sampleTuit);
        expect(newTuit.tuit).toEqual(sampleTuit.tuit);
        expect(newTuit.postedBy).toEqual(sampleTuit.postedBy);
    });
});

describe('can delete tuit wtih REST API', () => {

    beforeAll( async () => {
        newUser = await createUser(ripley);
        newTuit = await createTuit(newUser._id,sampleTuit);
        return newTuit
    })

    afterAll( async () => {
        await deleteTuit(newTuit._id)
        return await deleteUsersByUsername(ripley.username)
    })

    test('can delete new tuit from REST API by tid', async() => {
        const status = await deleteTuit(newTuit._id);
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });

});

describe('can retrieve a tuit by their primary key with REST API', () => {

    beforeAll( async () => {
        newUser = await createUser(ripley);
        return newUser
    })

    afterAll( async () => {
        await deleteTuit(newTuit._id)
        return await deleteUsersByUsername(ripley.username)
    })

    test('can retrieve a tuit by their primary key with REST API', async() => {
        const newTuit = await createTuit(newUser._id,sampleTuit);
        expect(newTuit.tuit).toEqual(sampleTuit.tuit);
        expect(newTuit.postedBy).toEqual(newUser._id);

        const existingTuit = await findTuitById(newTuit._id);

        expect(existingTuit.tuit).toEqual(newTuit.tuit);
        expect(existingTuit.postedBy).toEqual(newUser);
    });
});


describe('can retrieve all tuits with REST API', () => {

    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };
    const adam = {
        username: 'adam_smith',
        password: 'not0sum',
        email: 'wealth@nations.com'
    };
    const sowell = {
        username: 'thommas_sowell',
        password: 'compromise',
        email: 'compromise@solutions.com'
    };
    const sampleTuitRipley = {
        tuit:"newTuit_ripley",
    }
    const sampleTuitAdam = {
        tuit:"newTuit_adam",
    }
    const sampleTuitSowell = {
        tuit:"newTuit_sowell",
    }

    let newUserRipley
    let newTuitRipley
    let newUserAdam
    let newTuitAdam
    let newUserSowell
    let newTuitSowell
    let newTuits = ["newTuit_ripley","newTuit_adam","newTuit_sowell"]

    beforeAll( async () => {
        newUserRipley = await createUser(ripley);
        newUserAdam = await createUser(adam);
        newUserSowell = await createUser(sowell);
        const newTuitRipley = await createTuit(newUserRipley._id,sampleTuitRipley);
        const newTuitAdam = await createTuit(newUserAdam._id,sampleTuitAdam);
        const newTuitSowell= await createTuit(newUserSowell._id,sampleTuitSowell);
        return newTuitSowell
    })

    afterAll( async () => {
        await deleteTuit(newTuitRipley._id)
        await deleteTuit(newTuitAdam._id)
        await deleteTuit(newTuitSowell._id)
        await deleteUsersByUsername(ripley.username)
        await deleteUsersByUsername(sowell.username)
        return await deleteUsersByUsername(adam.username)
    })

    test('can insert new tuit with REST API', async() => {
        const tuits = await  findAllTuits()
        expect(tuits.length).toBeGreaterThanOrEqual(3);
        const tuitsWeInserted = tuits.filter(
            tuit => newTuits.indexOf(tuit.tuit) >= 0);
        tuitsWeInserted.forEach(tuit => {
            console.log(tuit)
            const tuitText = newTuits.find(tuitText => tuitText === tuit.tuit);
            expect(tuit.tuit).toEqual(tuitText);
        });
    });
});
