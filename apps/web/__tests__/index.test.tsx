import { render, screen } from "@testing-library/react";
import React from "react";

const Title = () => <h1>ChoreChamp</h1>;

it("renders title", () => {
  render(<Title />);
  expect(screen.getByText(/ChoreChamp/i)).toBeInTheDocument();
});
