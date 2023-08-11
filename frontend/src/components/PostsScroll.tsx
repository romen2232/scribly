import { Note } from '../utils/types';
import Post from './Post';

export interface IPostScrollProps {
    posts: Note[];
}

export default function PostsScroll(props: IPostScrollProps) {
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row justify-between px-5">
                <p className="text-lg font-bold text-gray-700">Posts</p>
            </div>
            <div className="flex w-full flex-col items-center px-8">
                {props.posts.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}
