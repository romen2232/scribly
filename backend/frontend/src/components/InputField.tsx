import { FC, InputHTMLAttributes } from 'react';
export interface IInputFieldProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    inputType: 'text' | 'password' | 'email' | 'number';
    className?: string;
}

export const InputField: FC<IInputFieldProps> = ({
    label,
    inputType,
    ...props
}) => {
    let labelComponent = null;
    if (label) {
        labelComponent = (
            <label className="sr-only " htmlFor={props.name}>
                {label}
            </label>
        );
    }

    const finalClasses = [
        'relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-secondaryYellow-800 focus:outline-none focus:ring-secondaryYellow-800 sm:text-sm bg-mainBackground-100 focus:bg-mainBackground-50',
        props.className,
    ];
    return (
        <div className="mb-4 flex w-full flex-col ">
            {labelComponent}
            <input
                className={finalClasses.join(' ')}
                type={inputType}
                name={props.name}
                {...props}
            />
        </div>
    );
};
