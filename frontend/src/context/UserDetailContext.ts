import { createContext, Dispatch, SetStateAction, Context } from "react";

// Define the UserDetail structure
export interface UserDetail {
  favourites: string[];
  token: string | null;
}

// Define the context type
interface UserDetailContextType {
  userDetails: UserDetail;
  setUserDetails: Dispatch<SetStateAction<UserDetail>>;
}

// Provide a safe default value
const defaultUserDetailContext: UserDetailContextType = {
  userDetails: { favourites: [], token: null },
  setUserDetails: () => {} // Placeholder function to prevent crashes
};

// Create the context
const UserDetailContext: Context<UserDetailContextType> = createContext<UserDetailContextType>(defaultUserDetailContext);

export default UserDetailContext;
