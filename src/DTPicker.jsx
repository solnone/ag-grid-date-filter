import flatpickr from "flatpickr";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export default forwardRef(({ onDateChanged, api}, ref) => {
  const [value, setValue] = useState(null);
  const [picker, setPicker] = useState(null);
  const refFlatPickr = useRef(null);
  const refInput = useRef(null);

  const onChange = (selectedDates) => {
    setValue(selectedDates[0]);
    onDateChanged();
  };

  useEffect(() => {
    setPicker(
      flatpickr(refFlatPickr.current, {
        onChange,
        dateFormat: "Z",
        wrap: true,
        enableTime: true,
        enableSeconds: true,
      })
    );
  }, []);

  useEffect(() => {
    if (picker) {
      picker.calendarContainer.classList.add("ag-custom-component-popup");
    }
  }, [picker]);

  useEffect(() => {
    if (picker) {
      picker.setDate(value);
    }
  }, [value, picker]);

  useImperativeHandle(ref, () => ({
    getDate() {
      return value;
    },

    setDate(date) {
      if (api.isDestroyed()) return;
      setValue(date);
      onDateChanged();
    },

    setInputPlaceholder(placeholder) {
      if (refInput.current) {
        refInput.current.setAttribute("placeholder", placeholder);
      }
    },

    setInputAriaLabel(label) {
      if (refInput.current) {
        refInput.current.setAttribute("aria-label", label);
      }
    },
  }));

  return (
    <div
      className="ag-input-wrapper custom-date-filter"
      role="presentation"
      ref={refFlatPickr}
      style={{ width: "100%" }}
    >
      <input type="text" ref={refInput} data-input style={{ width: "100%", paddingRight: 35 }} />
      <a className="input-button" title="clear" data-clear>
        <i className="fa fa-times"></i>
      </a>
    </div>
  );
});
