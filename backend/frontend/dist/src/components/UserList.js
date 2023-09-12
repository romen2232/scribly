import { jsx as _jsx } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import UserItem from "./UserItem";
import { t } from "i18next";
import { useEffect, useState } from "react";
const UserList = ({ users, children }) => {
    const [userList, setUserList] = useState(users);
    useEffect(() => {
        setUserList(users);
    }, [users]);
    return (_jsx("div", { children: userList?.map((user) => (_jsx(Link, { to: t('/profile') + '/' + user.username, children: _jsx(UserItem, { user: user, children: children }, user.id) }, user.id))) }));
};
export default UserList;
