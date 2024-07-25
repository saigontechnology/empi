import Select from "react-select";
const MultiSelect = (props) => {
  const { placeholder, list = [], onChange } = props;

  return (
    <Select
      options={list}
      isMulti
      isClearable={true}
      onChange={onChange}
      placeholder={placeholder}
      styles={{
        placeholder: (baseStyles) => ({
          ...baseStyles,
          fontSize: "14px",
          color: "#BFC3C7",
          fontWeight: "300",
        }),
        multiValue: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "#F5F4F8",
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
      }}
    />
  );
};

export default MultiSelect;
