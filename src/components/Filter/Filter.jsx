import PropTypes from "prop-types";
import s from "./Filter.module.css";

export default function Filter({ value, change }) {
  return (
    <label className={s.label}>
      Find contacts by name
      <input
        className={s.input}
        type="text"
        value={value}
        onChange={(e) => change(e.target.value)}
        placeholder="Find contact..."
      />
    </label>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
