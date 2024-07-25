const Input = (props) => {
  const {
    label,
    placeholder,
    name,
    required = false,
    register,
    className,
  } = props;

  return (
    <div className={className}>
      <label htmlFor={name} className="block font-semibold text-sm">
        {label}
        {required ? <span className="text-red-500">*</span> : null}
      </label>
      <input
        {...register(name)}
        placeholder={placeholder}
        type="text"
        className="w-full rounded border border-[#ebedf2] px-2 py-2 text-sm outline-[#2684ff] h-[42px] placeholder:font-light placeholder:text-[#BFC3C7] mt-2"
      />
    </div>
  );
};

export default Input;
