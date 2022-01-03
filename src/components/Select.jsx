// options sind die categorien die wir hier obne reinstopfen

function Select({ name, value, children, options, onSelectChange }) {
  return (
    <>
      <label htmlFor={name}>{children}</label>
      <select value={value} onChange={onSelectChange} name={name} id={name}>
        <option value="">–– Please choose ––</option>
        {options.map((option) => (
          <option key={option._id} value={option.categories_name}>
            {option.categories_name}
          </option>
        ))}
      </select>
    </>
  );
}

export default Select;