import React from "react";
import { render, fireEvent, within } from "@testing-library/react";

import Document from "./Document";

describe("Document", () => {
  const props = { id: "id" };

  it("renders title", () => {
    const { getByText } = render(<Document {...props} title="Title" />);
    expect(getByText("Title")).toBeDefined();
  });

  it("renders secondary title", () => {
    const { getByText } = render(
      <Document {...props} secondaryTitle="Secondary" />
    );
    expect(getByText("Secondary")).toBeDefined();
  });

  it("renders an image", () => {
    const { getByTitle } = render(
      <Document {...props} image="http://example.com/img.jpg" />
    );
    const image = getByTitle("Image");
    expect(image).toBeDefined();
  });

  it("renders meta", () => {
    const mockMeta = [{ key: "metakey", value: "metavalue" }];
    const { getByText } = render(<Document {...props} meta={mockMeta} />);
    expect(getByText("metakey")).toBeDefined();
    expect(getByText("metavalue")).toBeDefined();
  });

  describe("avatar", () => {
    it("renders avatar", () => {
      const { getByAltText } = render(
        <Document {...props} avatar="http://example.com/img.jpg" />
      );

      expect(getByAltText("avatar")).toBeDefined();
    });

    it("does not render avatar", () => {
      const { getByAltText } = render(<Document {...props} />);
      expect(() => getByAltText('avatar')).toThrow();
    });
  });

  it("renders actions", () => {
    const handleClickDelete = jest.fn();
    const { getByTitle } = render(
      <Document {...props} onClickDelete={handleClickDelete} />
    );

    const deleteButton = getByTitle("Delete");
    fireEvent.click(deleteButton);

    expect(handleClickDelete).toHaveBeenCalledTimes(1);
  });
});
