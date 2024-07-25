const Textarea = (props) => {
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
      <textarea
        {...register(name)}
        placeholder={placeholder}
        className="w-full rounded border border-[#ebedf2] px-2 py-2 text-sm outline-[#2684ff] placeholder:font-light placeholder:text-[#BFC3C7] mt-2"
        rows="4"
      ></textarea>
    </div>
  );
};

export default Textarea;
