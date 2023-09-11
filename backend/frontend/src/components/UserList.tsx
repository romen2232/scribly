import { Link } from "react-router-dom";
import {User} from "../utils/types"
import UserItem from "./UserItem";
import { t } from "i18next";
import { useEffect, useState } from "react";

export interface IUserInfoProps {
    users: User[];
    isFollowing?: boolean;
    children?: React.ReactNode;
}

const UserList: React.FC<IUserInfoProps> = ({ users, children }) => {
    const [userList, setUserList] = useState<User[]>(users);
    useEffect(() => {
        setUserList(users);
    }, [users]);
    return (
    <div>
        {userList?.map((user) => (
            <Link to={ t('/profile') +'/'+ user.username} key={user.id}>
            <UserItem key={user.id} user={user} >
             {children}
            </UserItem>
            </Link>
        ))}
    </div>
)
}
export default UserList;