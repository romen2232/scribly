import { Link } from "react-router-dom";
import {User} from "../utils/types"
import UserItem from "./UserItem";
import { t } from "i18next";

export interface IUserInfoProps {
    users: User[]|null;
    children?: React.ReactNode;
}

const UserList: React.FC<IUserInfoProps> = ({ users, children }) => {
    return (
    <div>
        {users?.map((user) => (
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