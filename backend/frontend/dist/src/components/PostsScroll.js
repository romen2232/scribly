import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Post from './Post';
export default function PostsScroll(props) {
    return (_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: "flex flex-row justify-between px-5", children: _jsx("p", { className: "text-lg font-bold text-gray-700", children: "Posts" }) }), _jsx("div", { className: "flex w-full flex-col items-center px-8", children: props.posts.map((post) => (_jsx(Post, { post: post }, post.id))) })] }));
}
