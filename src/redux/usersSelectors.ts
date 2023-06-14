import { createSelector } from "reselect";
import { AppStateType } from "./reduxStore"

export const getUsersSelector = (state: AppStateType) => state.usersPage.users;
export const someSmartUsersSelectorFromReselect = createSelector(getUsersSelector, users => {
    //return users.someArrMethodThatReturnsANewArray...
});
export const getCurrentPageSelector = (state: AppStateType) => state.usersPage.currentPage;
export const getTotalUsersSelector = (state: AppStateType) => state.usersPage.totalUsers;
export const getPageSizeSelector = (state: AppStateType) => state.usersPage.pageSize;
export const getIsFetchingSelector = (state: AppStateType) => state.usersPage.isFetching;
export const getFollowingInProgressSelector = (state: AppStateType) => state.usersPage.followingInProgress;
export const getIsAuthSelector = (state: AppStateType) => state.auth.isAuth;