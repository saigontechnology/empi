import Select from "react-select";
import { Controller } from "react-hook-form";

const Dropdown = (props) => {
  const {
    placeholder,

    list = [],
    label,
    name,
    className,
    required,
    control,
  } = props;

  return (
    <div className={className}>
      {label ? (
        <label className="block font-semibold text-sm mb-2">
          {label}
          {required ? <span className="text-red-500">*</span> : null}
        </label>
      ) : null}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <Select
            options={list}
            isClearable={true}
            onChange={(data) => onChange(data.value)}
            name={name}
            placeholder={placeholder}
            styles={{
              placeholder: (baseStyles) => ({
                ...baseStyles,
                fontSize: "12px",
                color: "#BFC3C7",
                fontWeight: "300",
              }),
              option: (baseStyles) => {
                return {
                  ...baseStyles,
                  fontSize: "14px",
                };
              },
              control: (baseStyles) => {
                return {
                  ...baseStyles,
                  borderColor: "#ebedf2",
                  height: "42px",
                };
              },
              valueContainer: (baseStyles) => ({
                ...baseStyles,
                padding: "4px",
              }),
              input: (baseStyles) => ({
                ...baseStyles,
                fontSize: "14px",
              }),
              singleValue: (baseStyles) => ({
                ...baseStyles,
                fontSize: "14px",
              }),
              menu: (baseStyles) => ({
                ...baseStyles,
                maxHeight: "200px",
                overflowY: "hidden",
              }),
            }}
          />
        )}
      />
    </div>
  );
};

export default Dropdown;
