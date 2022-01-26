import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ExpressionInput } from './ExpressionInput'

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders empty input field with appropriate label', () => {
    render(<ExpressionInput />);

    expect(screen.getByText("Logical Expression:")).toBeInTheDocument();
    expect(screen.getByText("Logical Expression:")).toBeInTheDocument();
})

it("changes \\lor \\land \\lnot \\oplus into appropriate characters", () => {
    render(<ExpressionInput />);

    expect(screen.getByLabelText("Logical Expression:")).toHaveValue("");
    userEvent.type(screen.getByLabelText("Logical Expression:"), "\\oplus ")
    expect(screen.getByLabelText("Logical Expression:")).toHaveValue("⊕ ");

    userEvent.clear(screen.getByLabelText("Logical Expression:"));
    userEvent.type(screen.getByLabelText("Logical Expression:"), "5 \\oplus 4 ");
    expect(screen.getByLabelText("Logical Expression:")).toHaveValue("5⊕4 ");

    userEvent.type(screen.getByLabelText("Logical Expression:"), " \\lor idonno");
    expect(screen.getByLabelText("Logical Expression:")).toHaveValue("5⊕4∨ idonno");

    userEvent.type(screen.getByLabelText("Logical Expression:"), " \\land p ");
    expect(screen.getByLabelText("Logical Expression:")).toHaveValue("5⊕4∨idonno∧p ");

    userEvent.clear(screen.getByLabelText("Logical Expression:"));
    userEvent.type(screen.getByLabelText("Logical Expression:"), " \\lnot p");
    expect(screen.getByLabelText("Logical Expression:")).toHaveValue("∼ p");

    userEvent.clear(screen.getByLabelText("Logical Expression:"));
    userEvent.type(screen.getByLabelText("Logical Expression:"), "\\lor \\land \\lnot \\oplus ");
    expect(screen.getByLabelText("Logical Expression:")).toHaveValue("∨∧∼⊕ ")
})