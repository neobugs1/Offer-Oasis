export default function Checkbox({ className = "", ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                "rounded border-gray-300 dark:border-gray-700 shadow-sm" +
                className
            }
        />
    );
}
