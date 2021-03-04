import { createSelector, State } from '@ngrx/store';
import { Role } from '../_models/role.model';
import { User } from '../_models/user.model';
import { AuthState } from '../_reducers/auth.reducer';

// Lodash
import { each, find, some } from 'lodash';

export const selectAuthState = (state: any) => {
  return state.auth;
};

export const isLoggedIn = createSelector(
  selectAuthState,
  (auth: AuthState) => auth.loggedIn
);

export const isLoggedOut = createSelector(
  isLoggedIn,
  (loggedIn: boolean) => !loggedIn
);

export const currentAuthToken = createSelector(
  selectAuthState,
  (auth: AuthState) => auth.authToken
);

export const isUserLoaded = createSelector(
  selectAuthState,
  (auth: AuthState) => auth.isUserLoaded
);

export const currentUser = createSelector(
  selectAuthState,
  (auth: AuthState) => auth.user
);

export const currentUserRoleIds = createSelector(currentUser, (user: User) => {
  if (!user) {
    return [];
  }

  return user.roles;
});

// export const currentUserPermissionsIds = createSelector(
//   currentUserRoleIds,
//   selectAllRoles,
//   (userRoleIds: number[], allRoles: Role[]) => {
//     return getPermissionsIdsFrom(userRoleIds, allRoles);
//   }
// );

function getPermissionsIdsFrom(
  userRolesIds: number[] = [],
  allRoles: Role[] = []
): number[] {
  const userRoles: Role[] = [];
  each(userRolesIds, (id: number) => {
    const userRole = find(allRoles, (role: Role) => role.id === id);
    if (userRole) {
      userRoles.push(userRole);
    }
  });

  const result: number[] = [];
  each(userRoles, (role: Role) => {
    each(role.permissions, (id) => {
      if (!some(result, (gid) => gid === id)) {
        result.push(id);
      }
    });
  });
  return result;
}
