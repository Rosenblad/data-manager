import { reduceParams, changeField, initialState } from "./reducers";

describe("reducers", () => {
  const filledParam = { key: "a", value: "a" };
  const emptyParam = { key: "", value: "" };
  const halfFilledParam = { key: "a", value: "" };

  describe("reduceParams", () => {
    it("adds an item if all fields are being used", () => {
      const params = [filledParam];

      expect(reduceParams(params)).toStrictEqual([filledParam, emptyParam]);
    });

    it("does not add a new field when last field is empty", () => {
      const params1 = [filledParam, emptyParam];
      const params2 = [emptyParam];
      const params3 = [halfFilledParam];

      expect(reduceParams(params1)).toStrictEqual(params1);
      expect(reduceParams(params2)).toStrictEqual(params2);
      expect(reduceParams(params3)).toStrictEqual(params3);
    });

    it("removes unwanted items", () => {
      const params = [emptyParam, filledParam, emptyParam];

      expect(reduceParams(params)).toStrictEqual([filledParam, emptyParam]);
    });
  });

  describe("changeField", () => {
    it("throws if key is empty", () => {
      expect(() =>
        changeField(initialState, { changeSet: { key: "", value: "hello" } })
      ).toThrow();
    });

    it("updates the url", () => {
      const payload1 = { changeSet: { key: "url", value: "hello" } };
      expect(changeField(initialState, payload1)).toMatchObject({
        url: "hello"
      });
      const payload2 = { changeSet: { key: "url", value: "bye" } };
      expect(changeField(initialState, payload2)).toMatchObject({
        url: "bye"
      });
    });

    it.only("updates params", () => {
      const payload = {
        changeSet: { key: "params[0].value", value: "hello" }
      };
      expect(changeField(initialState, payload)).toStrictEqual({
        url: "",
        params: [
          {
            key: "",
            value: "hello"
          }
        ]
      });

      const payload2 = {
        changeSet: { key: "params[1].key", value: "key2" }
      };
      const initialState2 = {
        ...initialState,
        params: [filledParam, emptyParam]
      };
      const nextState = changeField(initialState2, payload2);
      expect(nextState).toStrictEqual({
        url: '',
        params: [
          filledParam,
          {
            key: 'key2',
            value: '',
          },
        ]
      });

      const payload3 = {
        changeSet: { key: 'params[1].value', value: 'value2' },
      };
      expect(changeField(nextState, payload3)).toStrictEqual({
        url: "",
        params: [
          filledParam,
          {
            key: "key2",
            value: "value2"
          },
          { key: "", value: "" }
        ]
      });
    });
  });
});
