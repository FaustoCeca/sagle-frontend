import { useFormContext } from "react-hook-form";

interface Option {
    id: number;
    name: string;
}

interface MultipleSelectProps {
    name: string;
    label: string;
    options: Option[];
    loading?: boolean;
    error?: string | null;
    required?: boolean;
}


const MultipleSelects = ({
    name,
    label,
    options,
    loading = false,
    error = null,
    required = false
}: MultipleSelectProps) => {
    const { register } = useFormContext();
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            <select
                multiple
                {...register(name, {required: required ? "This field is required" : false})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 min-h-[120px]"
            >
                {
                    loading ? (
                        <option value="">Loading options...</option>
                    ) : error ? (
                        <option value="">Error loading options</option>
                    ) : (
                        options.map((options: {
                            id: number;
                            name: string;
                        }) => (
                            <option
                                key={options.id}
                                value={options.id}
                            >
                                {options.name}
                            </option>
                        ))
                    )
                }
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
}

export default MultipleSelects;