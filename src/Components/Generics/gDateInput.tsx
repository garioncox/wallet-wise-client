import { GDateInputController } from "./Controls/gDateInputControl";

const GDateInput: React.FC<{
  label?: string;
  control: GDateInputController;
}> = ({ label, control }) => {
  return (
    <div className="relative pb-5 pt-8">
      <label className="absolute top-0 left-2">{label}</label>
      <div>
        <input
          type="date"
          className="rounded shadow-inner p-2"
          value={control.value}
          onChange={(e) => {
            control.setValue(e.target.value);
            control.setHasBeenTouched(true);
          }}
          onBlur={() => control.setHasBeenTouched(true)}
        />
      </div>
      {control.hasBeenTouched && (
        <p className="absolute text-sm text-red-500 left-3">{control.error}</p>
      )}
    </div>
  );
};

export default GDateInput;
