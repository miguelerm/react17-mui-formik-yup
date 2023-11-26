import React, { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import ContainerHours, { OpenDay } from "./Presenter";
import convertToAmPm from "./convert-to-am-pm";

function Test() {
  const defaultDays: OpenDay[] = [
    { id: 1, open: true, opening: "10:00", closing: "12:00" },
    { id: 2, open: true, opening: "09:00", closing: "14:00" },
    { id: 3, open: true, opening: "08:00", closing: "10:00" },
    { id: 4, open: true, opening: "14:00", closing: "16:00" },
    { id: 5, open: true, opening: "15:00", closing: "18:00" }
  ];
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const [days, setDays] = useState(defaultDays);

  function handleCheck(index: number): void {
    console.log('handleCheck: ', arguments);
  }

  function handleClear(): void {
    console.log('handleClear: ', arguments);
  }

  function updateDay(index: number, prop: keyof OpenDay, value: string)
  {
    setDays(days.map((day, idx) => idx === index ? { ...day, [prop]: value }: day ));
  }

  function handleChangeOpen(
    event: SelectChangeEvent<any>,
    index: number
  ): void {
    updateDay(index, 'opening', event.target.value);
  }

  function handleChangeClose(
    event: SelectChangeEvent<any>,
    index: number
  ): void {
    updateDay(index, 'closing', event.target.value);
  }

  function handleSave(): void {
    console.log('handleSave: ', arguments);
  }

  return (
    <div className="App">
      <ContainerHours
        actionEnable={true}
        isCheckDisable={false}
        days={days}
        weekDays={weekDays}
        handleCheck={handleCheck}
        handleClear={handleClear}
        handleChangeOpen={handleChangeOpen}
        handleChangeClose={handleChangeClose}
        handleSave={handleSave}
        convertToAmPm={convertToAmPm}
      />
    </div>
  );
}

export default Test;
