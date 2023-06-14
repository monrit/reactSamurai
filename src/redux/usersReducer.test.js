import usersReducer, { followSuccess, setCurrentPage, setFollowingInProgress, setIsFetching, setTotalUsers, setUsers, unfollowSuccess } from "./usersReducer";

const state = {
    users: [
        {
            "name": "ReactPro",
            "id": 27386,
            "uniqueUrlName": null,
            "photos": {
                "small": null,
                "large": null
            },
            "status": null,
            "followed": true
        },
        {
            "name": "Say4Havi",
            "id": 27385,
            "uniqueUrlName": null,
            "photos": {
                "small": null,
                "large": null
            },
            "status": null,
            "followed": false
        },
        {
            "name": "wtfn11wtfn11",
            "id": 27384,
            "uniqueUrlName": null,
            "photos": {
                "small": null,
                "large": null
            },
            "status": null,
            "followed": false
        },
        {
            "name": "Khant2709",
            "id": 27383,
            "uniqueUrlName": null,
            "photos": {
                "small": null,
                "large": null
            },
            "status": null,
            "followed": false
        },
        {
            "name": "Katashelo",
            "id": 27382,
            "uniqueUrlName": null,
            "photos": {
                "small": null,
                "large": null
            },
            "status": null,
            "followed": false
        }
    ],
    currentPage: 1,
    totalUsers: 100, //should be 0 and be taken from server, you have this feature in getUsers thunk creator
    pageSize: 5,
    isFetching: true,
    followingInProgress: []
};

const userId = 27385;
const currentPage = 455;
const totalUsers = 120;
const isFetching = true;
const users = ["user1", "user2"];

test(`Expected to be followed after follow AC`, () => {
    const localState = usersReducer(state, followSuccess(userId));
    expect(localState.users.find(user => user["id"] === userId)["followed"]).toBe(true);
});

test(`Expected to be unfollowed after unfollow AC`, () => {
    const localState = usersReducer(state, unfollowSuccess(userId));
    expect(localState.users.find(user => user["id"] === userId)["followed"]).toBe(false);
});

test(`EXPECT CURRENT PAGE SHOULD BE ${currentPage}`, () => {
    const localState = usersReducer(state, setCurrentPage(currentPage));
    expect(localState.currentPage).toBe(currentPage);
});

test(`EXPECT TOTAL USERS SHOULD BE ${totalUsers}`, () => {
    const localState = usersReducer(state, setTotalUsers(totalUsers));
    expect(localState.totalUsers).toBe(totalUsers);
});

test(`EXPECT IS FETCHING SHOULD BE ${isFetching}`, () => {
    const localState = usersReducer(state, setIsFetching(isFetching));
    expect(localState.isFetching).toBe(isFetching);
});

test(`Expect to users array to be seted`, () => {
    const localState = usersReducer(state, setUsers(users));
    expect(localState.users).toBe(users)
});

test(`Expect following in progress array to be setted`, () => {
    const localState = usersReducer(state, setFollowingInProgress(isFetching, userId));
    expect(localState.followingInProgress.length).toBe(isFetching ? state.followingInProgress.length + 1: state.followingInProgress.length);
});