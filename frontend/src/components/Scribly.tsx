import { Triangle } from '../assets/icons/Icons';

const Scribly = () => {
    return (
        <div className="relative">
            <h1 className="titleMove pop fadeIn font-casualHandy text-9xl">
                Scribly
            </h1>

            {/* Triangles at the bottom left */}
            <Triangle
                width="30pt"
                height="50pt"
                className="pop fadeIn absolute -bottom-[200px] -left-[78px] rotate-[80deg]"
            />
            <Triangle
                width="30pt"
                height="50pt"
                className="pop fadeIn absolute -bottom-[224px] -left-[58px] rotate-[45deg]"
            />
            <Triangle
                width="30pt"
                height="50pt"
                className="pop fadeIn absolute -bottom-[240px] -left-[30px] rotate-[12deg]"
            />

            {/* Triangles at the top right (mirrors of the bottom left)*/}
            <Triangle
                width="30pt"
                height="50pt"
                className="pop fadeIn absolute -right-[78px] -top-10 rotate-[260deg] "
            />
            <Triangle
                width="30pt"
                height="50pt"
                className="pop fadeIn absolute -right-[58px] -top-16 rotate-[225deg]"
            />
            <Triangle
                width="30pt"
                height="50pt"
                className="pop fadeIn absolute -right-[30px] -top-20 rotate-[192deg]"
            />
        </div>
    );
};

export default Scribly;
