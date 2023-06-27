import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";

test("it shows and a button", () => {
  //render the component
  render(<UserForm />);
  //manipulate teh component or find an element in it
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");
  //Assertion - make sure the component is doing what we expect it to do
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("it calls onUserAdd when the form is submitted", () => {
  //not best implementation
  const argList = [];
  const callback = (...args) => {
    argList.push(args);
  };

  //try to render my component
  render(<UserForm onUserAdd={callback} />);

  //Find the two inputs
  const [nameInput, emailInput] = screen.getAllByRole("textbox");

  //simulate typing in a name
  user.click(nameInput);
  user.keyboard("jane");

  //simulate typing in an email
  user.click(emailInput);
  user.keyboard("jane@jane.com");

  //find the button
  const button = screen.getByRole("button");

  //simulate clicking the button
  user.click(button);

  //assertion to make sure "onUserAdd" gets called with email/name
  expect(argList).toHaveLength(1);
  expect(argList[0][0]).toEqual({ name: "jane", email: "jane@jane.com" });
});
