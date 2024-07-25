const Badge = (props) => {
  const {
    backgroundColor = "bg-sky-100",
    label,
    hasDelete,
    onDelete,
    id,
  } = props;

  return (
    <div
      className={`rounded-lg flex items-center px-3 py-1.5 text-xs ${backgroundColor}`}
    >
      <div>{label}</div>
      {hasDelete ? (
        <div
          className="ml-1 w-4 h-4 flex items-center justify-center cursor-pointer"
          onClick={() => onDelete(id, label)}
        >
          <img src="./cross.svg" alt="cross" className="h-4 w-4" />
        </div>
      ) : null}
    </div>
  );
};

export default Badge;
