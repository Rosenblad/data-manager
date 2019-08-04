import React from "react";
import { useHandleChange } from "./hooks";
import { render } from "@testing-library/react";
import { OnChangeEvent } from "../types";

describe("hooks", () => {
  describe("useHandleChange", () => {
    const onChangeMock = jest.fn();

    function TestComponent({ name, value }: any) {
      const handleChange = useHandleChange(name, onChangeMock);
      const event = { target: { value } } as OnChangeEvent;
      handleChange(event);

      return null;
    }

    it("invokes callback with field name and value", () => {
      render(<TestComponent name="url" value="c" />);
      expect(onChangeMock).toHaveBeenCalledWith({ key: "url", value: "c" });
      render(<TestComponent name="key" value="a" />);
      expect(onChangeMock).toHaveBeenCalledWith({ key: "key", value: "a" });
      render(<TestComponent name="value" value="b" />);
      expect(onChangeMock).toHaveBeenCalledWith({ key: "value", value: "b" });
    });
  });
});
