import { useState } from "react";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import InputBase from "@mui/material/InputBase";

const Row = () => {
  const [rows, setRows] = useState([]);

  /**
   * Function that adds a row with some properties to an array
   * It uses the hook useState to set the state of the component
   */
  const addRow = () => {
    const newRow = [...rows, { value: 0, disabled: false, operator: "+" }];
    setRows(newRow);
  };

  /**
   * Function that changes a property (a boolean) of an array element (a row)
   * to then set the attribute disabled of some html elements
   * @param {number} i, the index of the row
   */
  const disableRow = (i) => {
    const activeState = [...rows];
    activeState[i].disabled = !activeState[i].disabled;
    setRows(activeState);
  };

  /**
   * Function that deletes an array element (the row) with the splice method
   * @param {number} i, the index of the row to delete
   */
  const deleteRow = (i) => {
    const keptRows = [...rows];
    keptRows.splice(i, 1);
    setRows(keptRows);
  };

  /**
   * Function that changes the property 'operator' (a boolean) of an array element (a row)
   * to then switch the math operator (+ or -) of an html element
   * @param {number} i, the index of the row
   * @param {boolean} op, the operator
   */
  const switchOperator = (i, op) => {
    const opState = [...rows];
    opState[i].operator = op;
    setRows(opState);
  };

  /**
   * Function that takes the input number of an html input element and
   * sets the property 'value' of the row with it
   * @param {number} i, the index of the row
   * @param {*} inputNumber
   */
  const handleInput = (i, inputNumber) => {
    const valueState = [...rows];
    valueState[i].value = inputNumber;
    setRows(valueState);
  };

  /**
   * Function that calculates the sum given some values
   * (taken from the property 'value' of every row)
   * @returns the sum
   */
  const calculateSum = () => {
    let sum = 0;
    rows.forEach((row) => {
      if (row.disabled === false) {
        if (row.operator === "+") {
          sum += Number(row.value);
        } else {
          sum -= Number(row.value);
        }
      }
    });
    return sum;
  };

  return (
    <>
      <Button
        variant="contained"
        color="warning"
        style={{ margin: 15 }}
        onClick={() => addRow()}
      >
        Add row
      </Button>
      {rows.map((r, i) => (
        <div className="row" key={i}>
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              maxWidth: "fit-content",
              margin: "auto",
            }}
          >
            <select
              id="operator-select"
              onChange={(e) => switchOperator(i, e.target.value)}
              value={r.operator}
              disabled={r.disabled}
            >
              <option>+</option>
              <option>-</option>
            </select>
            <InputBase
              type="text"
              value={r.value}
              name="number"
              placeholder="Enter a number"
              onChange={(e) => handleInput(i, e.target.value)}
              disabled={r.disabled}
              sx={{ padding: 1.5 }}
            ></InputBase>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <ButtonGroup variant="text" color="secondary">
              <Button color="error" onClick={() => deleteRow(i)}>
                Delete
              </Button>
              <Button color="secondary" onClick={() => disableRow(i)}>
                {r.disabled ? "Enable " : "Disable"}
              </Button>
            </ButtonGroup>
          </Paper>
        </div>
      ))}
      <h3>Result: {calculateSum(rows)}</h3>
    </>
  );
};

export default Row;
