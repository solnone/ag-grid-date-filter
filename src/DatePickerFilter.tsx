import { IDateParams } from "ag-grid-community";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import ReactDatePicker from "react-datepicker";

export const DatePickerFilter = forwardRef<unknown, IDateParams>(
  ({ onDateChanged, api }, ref) => {
    const [value, setValue] = useState<Date | null>(null);

    useEffect(onDateChanged, [value]);

    useImperativeHandle(ref, () => ({
      getDate(): Date | null {
        return value;
      },
      setDate(date: Date | null) {
        if (api.isDestroyed()) return;
        setValue(date);
      },
    }));

    return (
      <ReactDatePicker
        portalId="root"
        placeholderText="dd/MM/yyyy"
        dateFormat="dd/MM/yyyy"
        popperClassName="ag-custom-component-popup"
        selected={value}
        onChange={setValue}
        enableTabLoop
        strictParsing
        useWeekdaysShort
        isClearable
        todayButton='今天'
        locale="zh-tw"
      />
    );
  }
);
