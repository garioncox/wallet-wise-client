import { GMoneyInputControl } from "./Controls/gMoneyInputControl";

const GMoneyInput: React.FC<{
  label?: string;
  control: GMoneyInputControl;
  minimum?: number;
  maximum?: number;
}> = ({ label, control, minimum, maximum }) => {
  return (
    <div className="relative pb-5 pt-8">
      <label className="absolute top-0 left-2">{label}</label>
      <div>
        <span className="mr-2 text-xl text-christi-600">$</span>
        <input
          type="number"
          className="rounded shadow-inner p-2"
          step="0.01"
          min={minimum ?? 0}
          max={maximum ?? 10}
          value={control.value}
          onChange={(e) => {
            const roundedValue = Number(Number(e.target.value).toFixed(2));
            control.setValue(roundedValue);
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

export default GMoneyInput;
