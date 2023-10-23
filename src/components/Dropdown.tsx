interface IOption {
  value: string;
}

interface IDropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: IOption[];
  value?: string;
}

export const Dropdown = (props: IDropdownProps) => {
  const { label, options, value, onChange } = props;

  return (
    <div className="flex flex-col w-full md:w-[40%]">
      <select
        value={value}
        onChange={onChange}
        className="p-2 border border-gray-300 rounded-md text-[#000] text-sm outline-none focus:border focus:border-[#000]"
      >
        <option className="text-gray-300">{label}</option>
        {options.map((option: IOption, index: number) => {
          return (
            <option key={index} className="text-[#000]">
              {option.value}
            </option>
          );
        })}
      </select>
    </div>
  );
};
