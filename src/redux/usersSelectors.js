export const getUsersSelector = state => state.usersPage.users;
export const getCurrentPageSelector = state => state.usersPage.currentPage;
export const getTotalUsersSelector = state => state.usersPage.totalUsers;
export const getPageSizeSelector = state => state.usersPage.pageSize;
export const getIsFetchingSelector = state => state.usersPage.isFetching;
export const getFollowingInProgressSelector = state => state.usersPage.followingInProgress;
export const getIsAuthSelector = state => state.usersPage.isAuth;