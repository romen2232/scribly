import { FC, InputHTMLAttributes } from 'react';
export interface IInputFieldProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    inputType: 'text' | 'password';
}

export const InputField: FC<IInputFieldProps> = ({
    label,
    inputType,
    ...props
}) => {
    let labelComponent = null;
    if (label) {
        labelComponent = (
            <label className="sr-only" htmlFor={props.name}>
                {label}
            </label>
        );
    }
    return (
        <div className="mb-4 flex flex-col">
            {labelComponent}
            <input
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                type={inputType}
                name={props.name}
                {...props}
            />
        </div>
    );
};
